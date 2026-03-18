#!/bin/bash

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

# Create a temporary file to store file paths and their word counts
> "$OUTPUT_DIR/word_counts.txt"

# Create a markdown output file for priority files
cat > "$OUTPUT_DIR/to_humanize_priority.md" << EOL
# Priority Files to Humanize

This list contains the files with the highest concentration of AI words that should be prioritized for humanization.

> **Note:** Not all "AI words" need to be removed. Words that are contextually appropriate (like "Fusion" in fiction about fusion-creating life forms) can be kept if they make sense in context. Focus on words that sound unnatural or could be simplified.

## Top 10 Files
EOL

# Count significant words in each file
while IFS= read -r line; do
    if [[ $line =~ ^docs/ ]]; then
        current_file="$line"
        word_count=0
    elif [[ $line =~ occurrences ]]; then
        # Only count if it's not marked as (basic)
        if [[ ! $line =~ \(basic\)$ ]]; then
            word_count=$((word_count + 1))
        fi
    elif [[ -z "$line" ]]; then
        # End of file entry, save count if it's significant
        if [ $word_count -ge 5 ]; then
            echo "$current_file|$word_count" >> "$OUTPUT_DIR/word_counts.txt"
        fi
    fi
done < "$OUTPUT_DIR/to_humanize.txt"

# Sort by word count (descending) and display the top 20 files
echo "Top 20 files with the most AI words:"
echo "=================================="
sort -t'|' -k2,2nr "$OUTPUT_DIR/word_counts.txt" | head -20 | while IFS='|' read -r file count; do
    echo "$file: $count significant AI words"
done

# Build the priority markdown file
counter=1
sort -t'|' -k2,2nr "$OUTPUT_DIR/word_counts.txt" | head -10 | while IFS='|' read -r filepath word_count; do
    echo -e "\n$counter. **$filepath** ($word_count AI words)" >> "$OUTPUT_DIR/to_humanize_priority.md"
    
    # Create a temp file to store word counts for this file
    > "$OUTPUT_DIR/temp_word_counts.txt"
    
    # Extract AI words for this file
    in_file=0
    
    while IFS= read -r line; do
        if [[ "$line" == "$filepath" ]]; then
            in_file=1
        elif [[ $in_file -eq 1 && $line =~ ^\ \ \ \ -\  ]]; then
            # Extract just the word and count
            if [[ "$line" =~ \ -\ ([^\ ]+)\ \(([0-9]+)\ occurrences\) ]]; then
                word="${BASH_REMATCH[1]}"
                count="${BASH_REMATCH[2]}"
                
                # Add to temp file if not marked as basic
                if [[ ! $line =~ \(basic\)$ ]]; then
                    echo "$word|$count" >> "$OUTPUT_DIR/temp_word_counts.txt"
                fi
            fi
        elif [[ $in_file -eq 1 && -z "$line" ]]; then
            # End of this file's entry
            in_file=0
            break
        elif [[ $in_file -eq 1 && $line =~ ^docs/ ]]; then
                # We've reached the next file
                break
            fi
    done < "$OUTPUT_DIR/to_humanize.txt"
    
    # Consolidate word counts (combine duplicates)
    > "$OUTPUT_DIR/temp_consolidated.txt"
    cat "$OUTPUT_DIR/temp_word_counts.txt" | sort | while IFS='|' read -r word count; do
        existing=$(grep "^$word|" "$OUTPUT_DIR/temp_consolidated.txt" 2>/dev/null)
        if [ -n "$existing" ]; then
            # Word already exists, add counts
            existing_count=$(echo "$existing" | cut -d'|' -f2)
            new_count=$((existing_count + count))
            # Replace the line
            sed -i '' "s/^$word|$existing_count/$word|$new_count/" "$OUTPUT_DIR/temp_consolidated.txt"
        else
            # New word, add it
            echo "$word|$count" >> "$OUTPUT_DIR/temp_consolidated.txt"
        fi
    done
    
    # Build the words list from the consolidated file
    words_list=""
    while IFS='|' read -r word count; do
        if [ -z "$words_list" ]; then
            words_list="   - $word ($count)"
        else
            words_list="$words_list, $word ($count)"
        fi
    done < "$OUTPUT_DIR/temp_consolidated.txt"
    
    # Add the words list to the file
    echo "$words_list" >> "$OUTPUT_DIR/to_humanize_priority.md"
    
    # Increment counter
    ((counter++))
    
    # Clean up temp files
    rm "$OUTPUT_DIR/temp_word_counts.txt" "$OUTPUT_DIR/temp_consolidated.txt"
done

# Add the next 10 files in a more compact format
echo -e "\n## Next 10 Files" >> "$OUTPUT_DIR/to_humanize_priority.md"
counter=11
sort -t'|' -k2,2nr "$OUTPUT_DIR/word_counts.txt" | sed -n '11,20p' | while IFS='|' read -r filepath word_count; do
    echo "$counter. **$filepath** ($word_count AI words)" >> "$OUTPUT_DIR/to_humanize_priority.md"
    ((counter++))
done

# Add the replacement guidelines
cat >> "$OUTPUT_DIR/to_humanize_priority.md" << EOL

## Replacement Guidelines

When replacing these AI words, aim for:

1. Simpler, more direct alternatives
2. Words that would be understood by a 2nd grader
3. Avoid technical jargon
4. Avoid flowery language
5. Make the text more natural-sounding

For example:
- Replace "Explore" with "look at" or "check out"
- Replace "Leverage" with "use" or "work with"
- Replace "Dynamics" with "how things work" or "connections"
- Replace "Implications" with "effects" or "results"

> **Remember:** You don't need to replace every instance of these words, especially when they're appropriate for the context (like technical terms in technical articles, or specific creative elements in fiction). Focus on making the text sound more natural while preserving meaning.
EOL

echo "Created priority report in $OUTPUT_DIR/to_humanize_priority.md"

# Create a symbolic link for backward compatibility
ln -sf "$OUTPUT_DIR/to_humanize_priority.md" to_humanize_priority.md
echo "Created symbolic link at to_humanize_priority.md for backward compatibility"

# Clean up
rm "$OUTPUT_DIR/word_counts.txt" 