const { performance } = require('perf_hooks');
const { serialize, deserialize } = require('.//serialization'); // Adjust the path as needed

function measureLatency(func, input, iterations = 100000) {
    let times = [];

    for (let i = 0; i < iterations; i++) {
        let start = performance.now();
        func(input);
        let end = performance.now();
        times.push(end - start);
    }

    return {
        average: times.reduce((sum, t) => sum + t, 0) / times.length,
    };
}

// Example functions to test
const base = null
const testFunc = (a, b) => a + b;
const object = {
    array: [],
    date: new Date(),
    error: new Error('This is the error'),
    object: {
      child: 'child',
    },
    boolean: false,
    func: (a, b) => a + b,
    null: null,
    number: 1,
    string: 'hi',
    undefined: undefined,
  };
const serializedFunc = serialize(testFunc);
console.log(serializedFunc)

// Test Serialization Latency
console.log("Serialization Latency:", measureLatency(serialize, testFunc));

// Test Deserialization Latency
console.log("Deserialization Latency:", measureLatency(deserialize, JSON.stringify(serializedFunc)));

// Base structures
// Serialization Latency: { average: 0.00039535269999999657 }
// Deserialization Latency: { average: 0.00026152415000001427 }

// Test structures
// Serialization Latency: { average: 0.000994478150000013 }
// Deserialization Latency: { average: 0.00026889444000002897 }

// Complex recursive structures
// Serialization Latency: { average: 0.0039248703399999176 }
// Deserialization Latency: { average: 0.000254707669999911 }

// AWS EC2

// Base structures
// Serialization Latency: { average: 0.0014286449898278806 }
// Deserialization Latency: { average: 0.0009149764200788923 }

// Test structures
// Serialization Latency: { average: 0.0013656093999487348 }
// Deserialization Latency: { average: 0.0009841037800896446 }

// Complex recursive structures
// Serialization Latency: { average: 0.00945042749014101 }
// Deserialization Latency: { average: 0.0019686386798927562 }

