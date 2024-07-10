#!/bin/bash

set -e
# Function to display usage information
usage() {
    echo "Usage: $0 --replay-test-dir=<directory> --keep=<file1,file2,...>"
    exit 1
}

# Parse command line arguments
for arg in "$@"
do
    case $arg in
        --replay-test-dir=*)
        REPLAY_TEST_DIR="${arg#*=}"
        shift
        ;;
        --keep=*)
        KEEP_FILES="${arg#*=}"
        shift
        ;;
        *)
        usage
        ;;
    esac
done

# Check if required arguments are provided
if [ -z "$REPLAY_TEST_DIR" ] || [ -z "$KEEP_FILES" ]; then
    usage
fi

# Convert comma-separated list to array
IFS=',' read -ra KEEP_ARRAY <<< "$KEEP_FILES"

# Change to the specified directory
cd "$REPLAY_TEST_DIR" || exit 1

# Loop through all .test.ts files
for file in *.test.ts; do
    # Skip if file doesn't exist (in case no .test.ts files are found)
    [ -e "$file" ] || continue
    
    # Check if the file should be kept
    if [[ ! " ${KEEP_ARRAY[*]} " =~ " ${file} " ]]; then
        echo "Removing: $file"
        rm "$file"
    fi
done

echo "Pruning complete."