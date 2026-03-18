#!/bin/bash

# Files to remove
REMOVE_FILES=(
  "ai_word_search.sh"
  "ai_word_search_fixed.sh"
  "grep_banned_words.sh"
  "grep_yaml_banned_words.sh"
  "ai_words_files.txt"
  "ai_words_details.txt"
  "ai_words_counts.txt"
  "to_humanize_detailed.txt"
  "word_counts.csv"
  "simple_word_search.sh"
)

echo "Cleaning up unnecessary files..."

for file in "${REMOVE_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Removing $file"
    rm "$file"
  fi
done

# Check for unused YAML files in prompts directory
YAML_FILES=(
  "prompts/humanization_yaml.md"
)

for file in "${YAML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Removing $file"
    rm "$file"
  fi
done

echo "Cleanup completed. Kept file_humanization_report.sh and to_humanize.txt" 