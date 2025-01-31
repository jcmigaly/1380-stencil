#!/bin/bash
# This is a student test

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/../..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}

term="check"

cat "$T_FOLDER"/d/d7.txt > d/global-index.txt

OUTPUT_FILE="$(
cat << EOF
check | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 2
check stuff | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 2
check stuff level | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 2
level check | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 1
level check stuff | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 1
link check | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 1
link check stuff | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 1
simpl link check | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 1
stuff level check | https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html 1
EOF
)"

if $DIFF <(./query.js "$term") <(echo "$OUTPUT_FILE") >&2;
then
    echo "$0 success: search results are identical"
    exit 0
else
    echo "$0 failure: search results are not identical"
    exit 1
fi
