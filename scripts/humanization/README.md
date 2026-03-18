# Humanization Scripts

This directory contains scripts for identifying and tracking AI-sounding language in content files.

## Important Notes

> **Context Matters**: Not all identified "AI words" need to be replaced. Words that are appropriate for the context (like technical terms in technical articles or specific creative elements in fiction) can be kept. Focus on words that sound unnatural or could be simplified to make the content more accessible.

## Scripts Overview

| Script | Description |
|--------|-------------|
| `run_full_analysis.sh` | **One-step solution**: Runs all analysis steps in sequence |
| `file_humanization_report.sh` | Main script that analyzes markdown files for AI words and generates the primary report |
| `filter_ai_words.sh` | Filters the main report to remove basic words and focus on more significant AI language |
| `filter_ai_words_significant.sh` | Creates a report focusing only on files with 5+ significant AI words |
| `summarize_significant.sh` | Generates a user-friendly summary of the most significant files to address |
| `check_progress.sh` | Tracks humanization progress over time by comparing current and previous reports |
| `cleanup_humanization.sh` | Cleans up temporary files created during the analysis process |

## Output Files

All output files are stored in the `scripts/humanization/output/` directory:

- `to_humanize.txt`: Complete list of all files with AI words
- `to_humanize_filtered.txt`: Filtered list with basic words removed
- `to_humanize_significant.txt`: Files with 5+ significant AI words
- `to_humanize_priority.md`: Markdown-formatted list of priority files

Progress reports are saved in the `scripts/humanization/output/progress/` directory.

## Usage Flow

**Option 1: Run everything in one step**:
```bash
./scripts/humanization/run_full_analysis.sh
```

**Option 2: Run steps individually**:

1. **Generate the initial reports**:
   ```bash
   ./scripts/humanization/file_humanization_report.sh
   ```

2. **Filter and identify priority files**:
   ```bash
   ./scripts/humanization/filter_ai_words.sh
   ./scripts/humanization/filter_ai_words_significant.sh
   ```

3. **View a summary of the most important files to humanize**:
   ```bash
   ./scripts/humanization/summarize_significant.sh
   ```

4. **Track your progress over time**:
   ```bash
   ./scripts/humanization/check_progress.sh
   ```

5. **Clean up temporary files when done**:
   ```bash
   ./scripts/humanization/cleanup_humanization.sh
   ```

## Additional Resources

For more information, refer to the main humanization documentation:
- [HUMANIZATION.md](../../HUMANIZATION.md) - Overview of the humanization process
- [reference/replacements.md](./reference/replacements.md) - Guide for replacing AI words 
- [GUIDE.md](./GUIDE.md) - Quick reference guide for content editors 