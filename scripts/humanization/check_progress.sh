#!/bin/bash

# Check progress by running the analysis again and comparing with original results

echo "Checking humanization progress..."

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

# Save the current date for the report
DATE=$(date +"%Y-%m-%d")
PROGRESS_DIR="$OUTPUT_DIR/progress"
mkdir -p "$PROGRESS_DIR"

# Run the main analysis script
./scripts/humanization/file_humanization_report.sh

# Create a backup of the current results
cp "$OUTPUT_DIR/to_humanize.txt" "$PROGRESS_DIR/to_humanize_$DATE.txt"

# Run the filtered version
./scripts/humanization/filter_ai_words.sh
cp "$OUTPUT_DIR/to_humanize_filtered.txt" "$PROGRESS_DIR/to_humanize_filtered_$DATE.txt"

# Run the significant version
./scripts/humanization/filter_ai_words_significant.sh
cp "$OUTPUT_DIR/to_humanize_significant.txt" "$PROGRESS_DIR/to_humanize_significant_$DATE.txt"

# Count the number of files in each report
TOTAL_FILES=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize.txt")
FILTERED_FILES=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize_filtered.txt")
SIGNIFICANT_FILES=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize_significant.txt")

# Check if we have previous results to compare with
if [ -f "$PROGRESS_DIR/latest_counts.txt" ]; then
    echo "Comparing with previous results:"
    
    # Get previous counts
    PREV_TOTAL=$(grep "Total files:" "$PROGRESS_DIR/latest_counts.txt" | awk '{print $3}')
    PREV_FILTERED=$(grep "Filtered files:" "$PROGRESS_DIR/latest_counts.txt" | awk '{print $3}')
    PREV_SIGNIFICANT=$(grep "Significant files:" "$PROGRESS_DIR/latest_counts.txt" | awk '{print $3}')
    
    # Calculate differences
    TOTAL_DIFF=$((PREV_TOTAL - TOTAL_FILES))
    FILTERED_DIFF=$((PREV_FILTERED - FILTERED_FILES))
    SIGNIFICANT_DIFF=$((PREV_SIGNIFICANT - SIGNIFICANT_FILES))
    
    echo "Total files: $TOTAL_FILES (${TOTAL_DIFF:+reduced by $TOTAL_DIFF}${TOTAL_DIFF:--})"
    echo "Filtered files: $FILTERED_FILES (${FILTERED_DIFF:+reduced by $FILTERED_DIFF}${FILTERED_DIFF:--})"
    echo "Significant files: $SIGNIFICANT_FILES (${SIGNIFICANT_DIFF:+reduced by $SIGNIFICANT_DIFF}${SIGNIFICANT_DIFF:--})"
    
    # Calculate percentage progress
    if [ $PREV_SIGNIFICANT -gt 0 ]; then
        PERCENT_PROGRESS=$(( (PREV_SIGNIFICANT - SIGNIFICANT_FILES) * 100 / PREV_SIGNIFICANT ))
        echo "Progress on significant files: $PERCENT_PROGRESS%"
    fi
else
    echo "No previous results found. Creating baseline."
    echo "Total files: $TOTAL_FILES"
    echo "Filtered files: $FILTERED_FILES"
    echo "Significant files: $SIGNIFICANT_FILES"
fi

# Save current counts for future comparison
echo "Date: $DATE" > "$PROGRESS_DIR/latest_counts.txt"
echo "Total files: $TOTAL_FILES" >> "$PROGRESS_DIR/latest_counts.txt"
echo "Filtered files: $FILTERED_FILES" >> "$PROGRESS_DIR/latest_counts.txt"
echo "Significant files: $SIGNIFICANT_FILES" >> "$PROGRESS_DIR/latest_counts.txt"

echo "Progress report saved in $PROGRESS_DIR/"
echo "Run this script periodically to track your humanization progress." 