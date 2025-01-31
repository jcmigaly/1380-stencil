#!/bin/bash
# This is a student test

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/../..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}

INPUT_FILE="$(
cat << EOF
A
THE
1
EOF
)"

OUTPUT_FILE="$(
cat << EOF
EOF
)"


if $DIFF <(echo "$INPUT_FILE" | c/process.sh | sort) <(echo "$OUTPUT_FILE" | sort | sed '/^$/d') >&2;
then
    echo "$0 success: texts are identical"
    exit 0
else
    echo "$0 failure: texts are not identical"
    exit 1
fi

