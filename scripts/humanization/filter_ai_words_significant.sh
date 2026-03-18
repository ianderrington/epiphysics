#!/bin/bash

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

# Create a new filtered output file for significant usage
> "$OUTPUT_DIR/to_humanize_significant.txt"

# Common words to exclude or count at a lower weight (considered basic/less concerning)
BASIC_WORDS=("Navigation" "That" "Very" "Just" "However" "Probably" "Actually" "Really" "Basically" "Certainly")

# Variables to track the current file
current_file=""
word_count=0
significant_words=0
file_content=""

# Process the input file line by line
while IFS= read -r line; do
    # Check if this is a file path line
    if [[ $line =~ ^docs/ ]]; then
        # If we have a previous file to evaluate
        if [ -n "$current_file" ]; then
            # Only keep files with at least 5 significant words
            if [ $significant_words -ge 5 ]; then
                echo -e "$file_content" >> "$OUTPUT_DIR/to_humanize_significant.txt"
            fi
        fi
        
        # Reset for new file
        current_file=$line
        word_count=0
        significant_words=0
        file_content="$line\n  Words found:"
    elif [[ $line =~ ^\ \ \ \ -\  ]]; then
        # Extract the word from the line
        word=$(echo "$line" | sed -E 's/^    - ([^(]+) \([0-9]+ occurrences\)$/\1/')
        count=$(echo "$line" | sed -E 's/^    - [^(]+ \(([0-9]+) occurrences\)$/\1/')
        
        # Check if this is a basic word
        is_basic=0
        for basic_word in "${BASIC_WORDS[@]}"; do
            if [[ "$word" == "$basic_word" ]]; then
                is_basic=1
                break
            fi
        done
        
        # If it's not a basic word, increment significant words
        if [ $is_basic -eq 0 ]; then
            file_content="$file_content\n$line"
            word_count=$((word_count + 1))
            significant_words=$((significant_words + 1))
        else
            # Still count the basic word but don't add it to significant count
            file_content="$file_content\n$line (basic)"
            word_count=$((word_count + 1))
        fi
    elif [[ -z "$line" ]]; then
        file_content="$file_content\n"
    fi
done < "$OUTPUT_DIR/to_humanize.txt"

# Process the last file
if [ -n "$current_file" ]; then
    if [ $significant_words -ge 5 ]; then
        echo -e "$file_content" >> "$OUTPUT_DIR/to_humanize_significant.txt"
    fi
fi

# Count files in filtered report
filtered_count=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize_significant.txt")
original_count=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize.txt")

echo "Filtering complete."
echo "Original report had $original_count files with AI words."
echo "Filtered report has $filtered_count files with 5+ significant AI words."
echo "Results saved in $OUTPUT_DIR/to_humanize_significant.txt"

# Create symbolic link in root directory for backward compatibility
ln -sf "$OUTPUT_DIR/to_humanize_significant.txt" to_humanize_significant.txt
echo "Created symbolic link at to_humanize_significant.txt for backward compatibility"

# Create a summary of the most significant files
echo -e "\nTop files with the most AI words:"
echo "=================================="
while IFS= read -r line; do
    if [[ $line =~ ^docs/ ]]; then
        file_path=$line
    fi
    if [[ -z "$line" ]]; then
        word_count=$(echo "$file_content" | grep -c "occurrences)")
        if [ $word_count -ge 5 ]; then
            echo "$file_path: $word_count significant AI words"
        fi
        file_content=""
    fi
    file_content="$file_content\n$line"
done < "$OUTPUT_DIR/to_humanize_significant.txt" | sort -t: -k2,2nr | head -10 