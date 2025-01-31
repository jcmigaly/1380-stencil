#!/bin/bash
# This is a student test

# Test that empty tags are converted to '\n'

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/../..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}

# create file inline
INPUT_HTML="$(
cat << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
        }

        .container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
        }

        h1 {
            color: #4CAF50;
        }

        a {
            color: #5D4037;
            text-decoration: none;
            font-size: 1.2em;
        }

        a:hover {
            color: #FF5722;
        }

        .footer {
            margin-top: 30px;
            padding: 10px;
            background-color: #3F51B5;
            color: white;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to CS1380 simple links</h1>
        <p></p>
        <p></p>
    </div>
    <div class="footer">
        <p>© 2023 CS1380. All rights reserved.</p>
    </div>
</body>
</html>
EOF
)"

OUTPUT_FILE="$(
cat << EOF
WELCOME TO CS1380 SIMPLE LINKS





© 2023 CS1380. All rights reserved.
EOF
)"

if $DIFF <(echo "$INPUT_HTML" | c/getText.js | sort) <(echo "$OUTPUT_FILE" | sort) >&2;
then
    echo "$0 success: texts are identical"
    exit 0
else
    echo "$0 failure: texts are not identical"
    exit 1
fi
