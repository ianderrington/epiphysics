#!/bin/bash

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

# Run all humanization analysis steps in sequence
echo "Running full humanization analysis..."

# Step 0: Clean up any existing symlinks or old files
echo "Step 0/5: Cleaning up old files..."
if [ -L "to_humanize.txt" ]; then rm to_humanize.txt; fi
if [ -L "to_humanize_filtered.txt" ]; then rm to_humanize_filtered.txt; fi
if [ -L "to_humanize_significant.txt" ]; then rm to_humanize_significant.txt; fi
if [ -L "to_humanize_priority.md" ]; then rm to_humanize_priority.md; fi

# Step 1: Generate the main report
echo "Step 1/5: Generating main AI word report..."
./scripts/humanization/file_humanization_report.sh

# Step 2: Filter for significant files
echo "Step 2/5: Filtering for significant AI words..."
./scripts/humanization/filter_ai_words.sh
./scripts/humanization/filter_ai_words_significant.sh

# Step 3: Summarize findings
echo "Step 3/5: Summarizing significant files..."
./scripts/humanization/summarize_significant.sh

# Step 4: Update progress tracking
echo "Step 4/5: Updating progress tracking..."
./scripts/humanization/check_progress.sh

# Step 5: Clean up temporary files
echo "Step 5/5: Cleaning up temporary files..."
./scripts/humanization/cleanup_humanization.sh

echo ""
echo "Analysis complete!"
echo ""
echo "Next steps:"
echo "1. Review $OUTPUT_DIR/to_humanize_priority.md for the highest priority files to humanize"
echo "2. Use scripts/humanization/reference/replacements.md for word replacement suggestions"
echo "3. After making changes, run this script again to track progress" 