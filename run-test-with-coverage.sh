#!/bin/bash

# Function to print usage
print_usage() {
    echo "Usage: $0 --test-file-path <path> --coverage-file-path <path>"
    echo "  --test-file-path: Path to the test file"
    echo "  --coverage-file-path: Full path to the output coverage file"
}

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --test-file-path) TEST_FILE_PATH="$2"; shift ;;
        --coverage-file-path) COVERAGE_FILE_PATH="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; print_usage; exit 1 ;;
    esac
    shift
done

# Check if required arguments are provided
if [ -z "$TEST_FILE_PATH" ] || [ -z "$COVERAGE_FILE_PATH" ]; then
    echo "Error: Both --test-file-path and --coverage-file-path are required."
    print_usage
    exit 1
fi

# Extract the directory path from COVERAGE_FILE_PATH
COVERAGE_DIR=$(dirname "$COVERAGE_FILE_PATH")

# Ensure the coverage directory exists
mkdir -p "$COVERAGE_DIR"

# Run the test and generate coverage
NODE_ENV=test npx nyc --reporter=lcovonly --report-dir="$COVERAGE_DIR" --temp-dir=./.nyc_output mocha "$TEST_FILE_PATH" --require ./test/helpers/start-server.js

if [ $? -eq 0 ]; then
    if [ -f "$COVERAGE_DIR/lcov.info" ]; then
        # Move the file to the desired location
        mv "$COVERAGE_DIR/lcov.info" "$COVERAGE_FILE_PATH"
        echo "Coverage report generated successfully at $COVERAGE_FILE_PATH"
    else
        echo "Error: lcov.info file not found"
        exit 1
    fi
else
    echo "Error: Test execution failed"
    exit 1
fi