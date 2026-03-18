#!/bin/bash

# Define output directory
OUTPUT_DIR="scripts/humanization/output"
mkdir -p "$OUTPUT_DIR"

# Load AI words from the reference file
AI_WORDS_FILE="scripts/humanization/reference/humanization.md"
if [ -f "$AI_WORDS_FILE" ]; then
  echo "Loading AI words from reference file..."
  
  # Extract words from both Basic and Advanced sections
  # Extract comma-separated words from lines that don't start with # or aren't empty
  WORDS_STRING=$(grep -v '^#' "$AI_WORDS_FILE" | grep -v '^$' | tr -d '\n')
  
  # Initialize empty array
  AI_WORDS=()
  
  # Split the string by commas and add each word to the array
  IFS=',' read -ra AI_WORDS <<< "$WORDS_STRING"
  
  # Trim whitespace from each word
  for i in "${!AI_WORDS[@]}"; do
    AI_WORDS[$i]=$(echo "${AI_WORDS[$i]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  done
  
  echo "Loaded ${#AI_WORDS[@]} words from reference file."
else
  # Comprehensive list of AI words to search for (fallback if file doesn't exist)
  echo "Using hardcoded AI words list..."
AI_WORDS=(
  # Original list from humanization.md
  "Unveil" "Leverage" "Constantly" "Testament" "Tapestry" "Beacon" "Labyrinth" 
  "In Conclusion" "Resonates with" "Resonate" "Captivate" "Symphony" "Unleash" 
  "Explore" "Delve" "harnessing" "revolutionize" "juncture" "cusp" "Hurdles" 
  "Bustling" "Harnessing" "Unveiling the power" "Realm" "Depicted" "Demystify" 
  "Insurmountable" "New Era" "Poised" "Unravel" "Entanglement" "Unprecedented" 
  "Eerie connection" "unliving" "Enrich" "Multifaceted" "Elevate" "Discover" 
  "Supercharge" "Unlock" "Tailored" "Elegant" "Dive" "Ever-evolving" "pride" 
  "Meticulously" "Grappling" "Weighing" "Picture" "Architect" "Adventure" 
  "Journey" "Embark" "Navigate" "Navigation" "dazzle" "Enlighten" "Esteemed" 
  "Shed light" "Firstly" "Moreover" "Crucial" "To consider" 
  "It is important to consider" "There are a few considerations" "Ensure" 
  "Furthermore" "Vital" "It's essential to" "Game changer" "However" 
  "It's important to note that" "It's worth mentioning that" "Let's uncover" 
  "Due to the fact that" "It's important to bear in mind" 
  "Treasure trove" "Secret weapon" "Tailor"
  
  # New additions
  "At the heart of" "In essence" "Facilitating" "Intrinsic" "Integral" "Core" 
  "Facet" "Nuance" "Culmination" "Manifestation" "Inherent" "Confluence" 
  "Underlying" "Intricacies" "Epitomize" "Embodiment" "Iteration" "Synthesize" 
  "Amplify" "Impetus" "Catalyst" "Synergy" "Cohesive" "Paradigm" "Dynamics" 
  "Implications" "Prerequisite" "Fusion" "Holistic" "Quintessential" "Cohesion" 
  "Symbiosis" "Integration" "Encompass" "Emanate" "Illuminate" "Reverberate" 
  "Augment" "Infuse" "Extrapolate" "Embody" "Unify" "Inflection" "Instigate" 
  "Envisage" "Elucidate" "Substantiate" "Catalyze" "Resilience" "Evoke" 
  "Pinnacle" "Evolve" "Digital Bazaar" "Centerpiece" "Subtlety" "Immanent" 
  "Exemplify" "Blend" "Comprehensive" "Archetypal" "Unity" "Harmony" 
  "Conceptualize" "Reinforce" "Mosaic" "Catering"
)
fi

# Find all markdown files
echo "Finding all markdown files..."
MD_FILES=$(find docs -name "*.md" -type f | sort)

# Create output file
> "$OUTPUT_DIR/to_humanize.txt"

echo "Searching for AI words in each file..."

# Process each file
for file in $MD_FILES; do
  echo "Checking file: $file"
  
  # Keep track of words found in this file
  WORDS_FOUND=()
  WORDS_COUNT=()
  
  # Check each word in the file
  for word in "${AI_WORDS[@]}"; do
    # Skip empty words
    if [ -z "$word" ]; then
      continue
    fi
    
    COUNT=$(grep -i "$word" "$file" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$COUNT" -gt 0 ]; then
      WORDS_FOUND+=("$word")
      WORDS_COUNT+=("$COUNT")
    fi
  done
  
  # If any words were found, add them to the report
  if [ ${#WORDS_FOUND[@]} -gt 0 ]; then
    echo "$file" >> "$OUTPUT_DIR/to_humanize.txt"
    echo "  Words found:" >> "$OUTPUT_DIR/to_humanize.txt"
    
    # List all words found with their counts
    for i in "${!WORDS_FOUND[@]}"; do
      echo "    - ${WORDS_FOUND[$i]} (${WORDS_COUNT[$i]} occurrences)" >> "$OUTPUT_DIR/to_humanize.txt"
    done
    
    echo "" >> "$OUTPUT_DIR/to_humanize.txt"
  fi
done

# Count unique files
FILE_COUNT=$(grep -c "^docs/" "$OUTPUT_DIR/to_humanize.txt")

echo "Completed. Found AI words in $FILE_COUNT unique files."
echo "Results saved in $OUTPUT_DIR/to_humanize.txt"

# Create symbolic link in root directory for backward compatibility
# This will be removed in future versions
ln -sf "$OUTPUT_DIR/to_humanize.txt" to_humanize.txt
echo "Created symbolic link at to_humanize.txt for backward compatibility" 