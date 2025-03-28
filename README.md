# distribution

This is the distribution library. When loaded, distribution introduces functionality supporting the distributed execution of programs. To download it:

## Installation

```sh
$ npm i '@brown-ds/distribution'
```

This command downloads and installs the distribution library.

## Testing

There are several categories of tests:
  *	Regular Tests (`*.test.js`)
  *	Scenario Tests (`*.scenario.js`)
  *	Extra Credit Tests (`*.extra.test.js`)
  * Student Tests (`*.student.test.js`) - inside `test/test-student`

### Running Tests

By default, all regular tests are run. Use the options below to run different sets of tests:

1. Run all regular tests (default): `$ npm test` or `$ npm test -- -t`
2. Run scenario tests: `$ npm test -- -c` 
3. Run extra credit tests: `$ npm test -- -ec`
4. Run the `non-distribution` tests: `$ npm test -- -nd`
5. Combine options: `$ npm test -- -c -ec -nd -t`

## Usage

To import the library, be it in a JavaScript file or on the interactive console, run:

```js
let distribution = require("@brown-ds/distribution");
```

Now you have access to the full distribution library. You can start off by serializing some values. 

```js
let s = distribution.util.serialize(1); // '{"type":"number","value":"1"}'
let n = distribution.util.deserialize(s); // 1
```

You can inspect information about the current node (for example its `sid`) by running:

```js
distribution.local.status.get('sid', console.log); // 8cf1b
```

You can also store and retrieve values from the local memory:

```js
distribution.local.mem.put({name: 'nikos'}, 'key', console.log); // {name: 'nikos'}
distribution.local.mem.get('key', console.log); // {name: 'nikos'}
```

You can also spawn a new node:

```js
let node = { ip: '127.0.0.1', port: 8080 };
distribution.local.status.spawn(node, console.log);
```

Using the `distribution.all` set of services will allow you to act 
on the full set of nodes created as if they were a single one.

```js
distribution.all.status.get('sid', console.log); // { '8cf1b': '8cf1b', '8cf1c': '8cf1c' }
```

You can also send messages to other nodes:

```js
distribution.all.comm.send(['sid'], {node: node, service: 'status', method: 'get'}, console.log); // 8cf1c
```

# Results and Reflections

> ...
# M1: Serialization / Deserialization


## Summary

> Summarize your implementation, including key challenges you encountered. Remember to update the `report` section of the `package.json` file with the total number of hours it took you to complete each task of M1 (`hours`) and the lines of code per task.

My implementation consists of two software components totaling 195 lines of code. Key challenges included handling special types like undefined, null, and functions, which I solved by implementing custom transformations. Ensuring correct serialization of nested objects required a depth-first traversal while modifying properties in place. I also tested performance using multiple iterations to measure execution time accurately.

## Correctness & Performance Characterization


> Describe how you characterized the correctness and performance of your implementation


*Correctness*: I wrote 12 tests, which execute in 0.44 seconds. These tests ensure correctness across a variety of object types, including base type objects, function objects with and without curly braces, and nested objects. By covering these different structures, the tests help verify that the implementation behaves as expected across multiple use cases.


*Performance*: The latency of various subsystems is described in the `"latency"` portion of package.json. The characteristics of my development machines are summarized in the `"dev"` portion of package.json.


# M2: Actors and Remote Procedure Calls (RPC)

## Summary

> Summarize your implementation, including key challenges you encountered. Remember to update the `report` section of the `package.json` file with the total number of hours it took you to complete each task of M2 (`hours`) and the lines of code per task.


My implementation comprises 4 major software components, totaling 130 lines of code. Key challenges included understanding the flow of the program, as this was my first real experience working will callbacks and not async/await. Alot of my time was spent trying to reason how would I pass things back to previous functions. Additionally, I found it a challenge to get my last scenario to run as the spawn() function was not completed. I imported spawn() from the solution code but kept getting the following error: Error: listen EADDRINUSE: address already in use 127.0.0.1:1234. I debugged heavily, went on EdStem to try kill all processes but to no avail. Given this, I was not able to calculate throughput and latency. 


## Correctness & Performance Characterization

> Describe how you characterized the correctness and performance of your implementation


*Correctness*: I wrote 5 tests; these tests take 0.561s to execute.


*Performance*: I characterized the performance of comm and RPC by sending 1000 service requests in a tight loop. Average throughput and latency is recorded in `package.json`.


## Key Feature

> How would you explain the implementation of `createRPC` to someone who has no background in computer science — i.e., with the minimum jargon possible?

Imagine you have two friends, Max and Tommy. Max knows how to do math, like adding 2 + 2, but Tommy doesn’t. So Max tells Tommy, "Hey, if you ever need to add numbers, just ask me!"

Now, whenever Tommy needs 2 + 2, he doesn’t try to figure it out himself. Instead, he writes a note, gives it to a messenger, and Max sends back the answer. Tommy doesn’t need to know how Max does the math—he just trusts that Max will get it right.

That’s basically how createRPC works. One part of a program (Tommy) asks another part (Max) to do something remotely. Instead of passing paper notes, they send messages over a network.


# M4: Distributed Storage


## Summary

> Summarize your implementation, including key challenges you encountered

For M4, I implemented a distributed storage system that enables storing and retrieving objects across a group of nodes using primary keys. The solution ensures that any node in the system can invoke these operations with consistent behavior. Key challenges I encountered were with store.all.test, as I didn't realize I had to implement hashes to get them going. Weirdly enough I believe there is something wrong with the testing code because I was passing test 2-8 without implementing them, and made sure I wasn't overriding global with any bad distribution imports.


Remember to update the `report` section of the `package.json` file with the total number of hours it took you to complete each task of M4 (`hours`) and the lines of code per task.


## Correctness & Performance Characterization

> Describe how you characterized the correctness and performance of your implementation


*Correctness* -- 9 tests that take 1.4 seconds total


*Performance* -- I wasn't able to get AWS nodes up and running in time.


## Key Feature

> Why is the `reconf` method designed to first identify all the keys to be relocated and then relocate individual objects instead of fetching all the objects immediately and then pushing them to their corresponding locations?

The reconf method first identifies the keys to be relocated before moving individual objects to avoid unnecessary data transfers and ensure consistency. This approach reduces inefficiencies by preventing the transfer of unaffected objects and allows for better load balancing across nodes. It also improves fault tolerance, as a precomputed list of keys helps resume the process in case of failure, ensuring a more reliable and efficient relocation process.
