#!/bin/bash

# Convert input to a stream of non-stopword terms
# Usage: ./process.sh < input > output

# Convert each line to one word per line, **remove non-letter characters**, make lowercase, convert to ASCII; then remove stopwords (inside d/stopwords.txt)
# Commands that will be useful: tr, iconv, grep

tr ' ' '\n' | tr -cd 'a-zA-Z\n' | tr 'A-Z' 'a-z' | iconv -f UTF-8 -t ASCII//TRANSLIT | sed 's/[0-9]*//g' | sed 's/indexhtml//g' | sed 's/^level.*$/level/g' | grep -v -w -f ./d/stopwords.txt

