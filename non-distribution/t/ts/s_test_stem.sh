#!/bin/bash
# This is a student test

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/../..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}

INPUT_FILE="$(
cat << EOF
cats
fish
flies
jumps
running
EOF
)"

OUTPUT_FILE="$(
cat << EOF
cat
fish
fli
jump
run
EOF
)"


if $DIFF <(echo "$INPUT_FILE" | c/stem.js | sort) <(echo "$OUTPUT_FILE" | sort) >&2;
then
    echo "$0 success: stemmed words are identical"
    exit 0
else
    echo "$0 failure: stemmed words are not identical"
    exit 1
fi
