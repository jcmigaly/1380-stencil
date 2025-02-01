# non-distribution

This milestone aims (among others) to refresh (and confirm) everyone's
background on developing systems in the languages and libraries used in this
course.

By the end of this assignment you will be familiar with the basics of
JavaScript, shell scripting, stream processing, Docker containers, deployment
to AWS, and performance characterization—all of which will be useful for the
rest of the project.

Your task is to implement a simple search engine that crawls a set of web
pages, indexes them, and allows users to query the index. All the components
will run on a single machine.

## Getting Started

To get started with this milestone, run `npm install` inside this folder. To
execute the (initially unimplemented) crawler run `./engine.sh`. Use
`./query.js` to query the produced index. To run tests, do `npm run test`.
Initially, these will fail.

### Overview

The code inside `non-distribution` is organized as follows:

```
.
├── c            # The components of your search engine
├── d            # Data files like the index and the crawled pages
├── s            # Utility scripts for linting and submitting your solutions
├── t            # Tests for your search engine
├── README.md    # This file
├── crawl.sh     # The crawler
├── index.sh     # The indexer
├── engine.sh    # The orchestrator script that runs the crawler and the indexer
├── package.json # The npm package file that holds information like JavaScript dependencies
└── query.js     # The script you can use to query the produced global index
```

### Submitting

To submit your solution, run `./scripts/submit.sh` from the root of the stencil. This will create a
`submission.zip` file which you can upload to the autograder.

# M0: Setup & Centralized Computing

> Add your contact information below and in `package.json`.

* name: `JonCarlo Migaly`

* email: `joncarlo_migaly@brown.edu`

* cslogin: `jmigaly`


## Summary

> Summarize your implementation, including the most challenging aspects; remember to update the `report` section of the `package.json` file with the total number of hours it took you to complete M0 (`hours`), the total number of JavaScript lines you added, including tests (`jsloc`), the total number of shell lines you added, including for deployment and testing (`sloc`).


My implementation consists of 16 components addressing T1--8. Each of these components were either components of the search engine (ex: getText.js, getURLs.js, etc...), or handwritten tests to test these components. The most challenging aspect was merge.js because I struggled to debug it with console.log() statements. I think initally I didn't understand what output my logs were going to and so when I tried to debug my logs wouldn't show up in the terminal. I ended up asking on ED and used console.error() to log all my problems. Because this was also my first time using JS extensively, I took alot of time to look up modules and the functions we were importing from them. 


## Correctness & Performance Characterization


> Describe how you characterized the correctness and performance of your implementation.


To characterize correctness, we developed 8 that test the following cases: 

s_test_combine = tests that duplicate urls in merge are handled correctly (they are overwritten in global-index)

s_test_end_to_end = tests that when we merge with an empty input we get correct behavior of no added inputs to global-index.txt

s_test_getText = Tests that empty tags in HTML markup are converted to \n

s_test_getURLs = Tests that empty href tags are correctly converted to nothing

s_test_merge = Tests that when we merge one input to empty global-index that we get correct output

s_test_process = Tests that when we pass in all stopwords that they are correctly filtered out and we get empty output

s_test_quert = Tests query term  "check" and ensures we get correct query return

s_test_stem = Tests another list of words to stem and compares them to correct output


*Performance*: The throughput of various subsystems is described in the `"throughput"` portion of package.json. The characteristics of my development machines are summarized in the `"dev"` portion of package.json.


## Wild Guess

> How many lines of code do you think it will take to build the fully distributed, scalable version of your search engine? Add that number to the `"dloc"` portion of package.json, and justify your answer below.
