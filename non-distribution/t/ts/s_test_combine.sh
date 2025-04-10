#!/bin/bash
# This is a student test

# Test for any duplicates in merge so that they are handled correctly 

DIFF_PERCENT=${DIFF_PERCENT:-0}

# create file inline
LOCAL_INDEX_FILE="$(
cat << EOF
stuff level | 4 | https://cs.brown.edu/courses/csci1380/sandbox/1
EOF
)"

INITIAL_GLOBAL_INDEX_FILE="$(
cat << EOF
stuff level | https://cs.brown.edu/courses/csci1380/sandbox/1 3
EOF
)"

cd "$(dirname "$0")/../.." || exit 1

NEW_GLOBAL_INDEX_FILE="$(
    echo "$LOCAL_INDEX_FILE" | ./c/merge.js <(echo "$INITIAL_GLOBAL_INDEX_FILE") | sort
)"

EXPECTED_GLOBAL_INDEX_FILE="$(
cat << EOF
stuff level | https://cs.brown.edu/courses/csci1380/sandbox/1 4
EOF
)"

if DIFF_PERCENT=$DIFF_PERCENT ./t/gi-diff.js <(echo "$NEW_GLOBAL_INDEX_FILE") <(echo "$EXPECTED_GLOBAL_INDEX_FILE") >&2
then
    echo "$0 success: global indexes are identical"
    exit 0
else
    echo "$0 failure: global indexes are not identical"
    exit 1
fi
