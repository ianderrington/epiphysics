#!/bin/bash

# This script cleans up temporary files created during the humanization process
# while preserving the main report files.

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

echo "Cleaning up temporary files from humanization process..."

# Temporary files to clean up (add more as needed)
TEMP_FILES=(
  "$OUTPUT_DIR/ai_words_files.txt"
  "$OUTPUT_DIR/ai_words_details.txt"
  "$OUTPUT_DIR/ai_words_counts.txt"
  "$OUTPUT_DIR/word_counts.csv"
  "$OUTPUT_DIR/word_counts.txt"
)

# Clean up temp files
for file in "${TEMP_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Removing temporary file: $file"
    rm "$file"
  fi
done

# Clean up symlinks in root directory
ROOT_SYMLINKS=(
  "to_humanize.txt"
  "to_humanize_filtered.txt"
  "to_humanize_significant.txt"
  "to_humanize_priority.md"
)

for link in "${ROOT_SYMLINKS[@]}"; do
  if [ -L "$link" ]; then
    echo "Removing symlink: $link"
    rm "$link"
  fi
done

# Preserve important files, just list them
IMPORTANT_FILES=(
  "$OUTPUT_DIR/to_humanize.txt"
  "$OUTPUT_DIR/to_humanize_filtered.txt"
  "$OUTPUT_DIR/to_humanize_significant.txt"
  "$OUTPUT_DIR/to_humanize_priority.md"
  "scripts/humanization/reference/replacements.md"
  "HUMANIZATION.md"
  "scripts/humanization/GUIDE.md"
)

echo ""
echo "Preserved important files:"
for file in "${IMPORTANT_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "- $file"
  else
    echo "- $file (not found)"
  fi
done

echo ""
echo "Cleanup completed."
echo "To generate new reports, run: ./scripts/humanization/run_full_analysis.sh" 