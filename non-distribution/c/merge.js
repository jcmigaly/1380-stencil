#!/usr/bin/env node

/*
Merge the current inverted index (assuming the right structure) with the global index file
Usage: cat input | ./merge.js global-index > output

The inverted indices have the different structures!

Each line of a local index is formatted as:
  - `<word/ngram> | <frequency> | <url>`

Each line of a global index is be formatted as:
  - `<word/ngram> | <url_1> <frequency_1> <url_2> <frequency_2> ... <url_n> <frequency_n>`
  - Where pairs of `url` and `frequency` are in descending order of frequency
  - Everything after `|` is space-separated

-------------------------------------------------------------------------------------
Example:

local index:
  word1 word2 | 8 | url1
  word3 | 1 | url9
EXISTING global index:
  word1 word2 | url4 2
  word3 | url3 2

merge into the NEW global index:
  word1 word2 | url1 8 url4 2
  word3 | url3 2 url9 1

Remember to error gracefully, particularly when reading the global index file.
*/

const fs = require('fs');
const readline = require('readline');
// The `compare` function can be used for sorting.
const compare = (a, b) => {
  if (a.freq > b.freq) {
    return -1;
  } else if (a.freq < b.freq) {
    return 1;
  } else {
    return 0;
  }
};
const rl = readline.createInterface({
  input: process.stdin,
});

// 1. Read the incoming local index data from standard input (stdin) line by line.
let localIndex = '';
rl.on('line', (line) => {
  console.log(line);
  localIndex += line + '\n';
  console.log(`HERE: ${localIndex}`);
});

rl.on('close', () => {
  // 2. Read the global index name/location, using process.argv
  // and call printMerged as a callback

  fs.readFileSync(process.argv[2], 'utf-8', printMerged);
});

const printMerged = (err, data) => {
  // console.log("HERE")
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the data into an array of lines
  const localIndexLines = localIndex.split('\n');
  const globalIndexLines = data.split('\n');

  localIndexLines.pop();
  globalIndexLines.pop();

  const local = {};
  const global = {};

  // 3. For each line in `localIndexLines`, parse them and add them to the `local` object where keys are terms and values contain `url` and `freq`.
  for (const line of localIndexLines) {
    // Isolate terms, freq, and url
    const parts = line.split('|').map((part) => part.trim()); // use map because we already have array going
    const term = parts[0];
    const freq = parseInt(parts[1], 10);
    const url = parts[2];

    local[term] = {'url': url, 'freq': freq};
  }

  // 4. For each line in `globalIndexLines`, parse them and add them to the `global` object where keys are terms and values are arrays of `url` and `freq` objects.
  // Use the .trim() method to remove leading and trailing whitespace from a string.
  for (const line of globalIndexLines) {
    const parts = line.split('|').map((part) => part.trim()); // use map because we already have array going
    const term = parts[0];
    const url_freq_string = parts[1];
    // console.log(`url_freq_string: ${url_freq_string}`)
    const freq_urls = url_freq_string.split(' ');

    const url_freq_array = [];

    for (let i = 0; i < freq_urls.length; i += 2) {
      const url = freq_urls[i];
      const freq = parseInt(freq_urls[i + 1], 10);

      if (isNaN(freq)) {
        console.error(`Invalid frequency value for term ${term}: ${freq_urls[i + 1]}`);
        continue; // Skip this pair if the frequency is invalid
      }

      if (!url) {
        console.error(`Invalid URL value for term ${term}`);
        continue; // Skip this pair if the URL is invalid
      }

      url_freq_array.push({'url': url, 'freq': freq});
    }

    global[term] = url_freq_array; // Array of {url, freq} objects
  }

  // 5. Merge the local index into the global index:
  // - For each term in the local index, if the term exists in the global index:
  for (const key in local) {
    const local_index_url = local[key].url;
    const local_index_freq = local[key].freq;
    if (key in global) {
      // - Append the local index entry to the array of entries in the global index.
      // - Sort the array by `freq` in descending order.
      global[key].push({'url': local_index_url, 'freq': local_index_freq});
      global[key].sort(compare);
    }
    // - If the term does not exist in the global index:
    else {
      // - Add it as a new entry with the local index's data.
      const url_freq_array = [];
      url_freq_array.push({'url': local_index_url, 'freq': local_index_freq});
      global[key] = url_freq_array;
    }
  }
  // 6. Print the merged index to the console in the same format as the global index file:
  //    - Each line contains a term, followed by a pipe (`|`), followed by space-separated pairs of `url` and `freq`.
  for (const key in global) {
    let master_string = '';
    master_string += key + ' |';
    global[key].forEach((item) => {
      master_string += ` ${item.url} ${item.freq}`;
    });
    console.log(master_string);
  }
};
