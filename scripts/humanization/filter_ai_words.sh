#!/bin/bash

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

# Create a new filtered output file
> "$OUTPUT_DIR/to_humanize_filtered.txt"

# Common words to exclude or count at a lower weight (considered basic/less concerning)
BASIC_WORDS=("Navigation" "That" "Very" "Just" "However" "Probably" "Actually" "Really" "Basically" "Certainly")

# Variables to track the current file
current_file=""
word_count=0
significant_words=0
file_content=""
found_navigation_only=0

# Process the input file line by line
while IFS= read -r line; do
    # Check if this is a file path line
    if [[ $line =~ ^docs/ ]]; then
        # If we have a previous file to evaluate
        if [ -n "$current_file" ]; then
            # If it has significant words or more than 5 total words, add it to output
            if [ $significant_words -gt 0 ] || [ $word_count -gt 5 ]; then
                echo -e "$file_content" >> "$OUTPUT_DIR/to_humanize_filtered.txt"
            fi
        fi
        
        # Reset for new file
        current_file=$line
        word_count=0
        significant_words=0
        file_content="$line\n  Words found:"
        found_navigation_only=0
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
        
        # Only count Navigation once for front matter
        if [[ "$word" == "Navigation" ]]; then
            # Increment found_navigation_only to track if this is the only word
            found_navigation_only=$((found_navigation_only + 1))
        fi
        
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
    if [ $significant_words -gt 0 ] || [ $word_count -gt 5 ]; then
        echo -e "$file_content" >> "$OUTPUT_DIR/to_humanize_filtered.txt"
    fi
fi

# Count files in filtered report
filtered_count=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize_filtered.txt")
original_count=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize.txt")

echo "Filtering complete."
echo "Original report had $original_count files with AI words."
echo "Filtered report has $filtered_count files with significant AI word usage."
echo "Results saved in $OUTPUT_DIR/to_humanize_filtered.txt"

# Create symbolic link in root directory for backward compatibility
# This will be removed in future versions
ln -sf "$OUTPUT_DIR/to_humanize_filtered.txt" to_humanize_filtered.txt
echo "Created symbolic link at to_humanize_filtered.txt for backward compatibility" 