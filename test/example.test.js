const config = { 
    ip: "127.0.0.1",
    port: 8080,
    "onStart": (server) => console.log("Batman")

};
const distribution = require('../distribution.js')(config);

// let localServer = null;

// beforeAll((done) => {
//   distribution.node.start((server) => {
//     localServer = server;
//     done();
//   });
// });

// afterAll((done) => {
//   localServer.close();
//   done();
// });

test('hello world', (done) => {
    const otherNode = {
        ip: '127.0.0.1',
        port: 8081
    }

    const remote = {node: otherNode, service: 'status', method: 'get'}
    distribution.local.comm.send(['heapTotal'], remote, (e, v) => {
        console.log('error', e)
        console.log('heapTotal', v)
        done()
    })
});

// ===================================================================================================
// v2

// const newNode = { 
//     "ip": "127.0.0.1",
//     "port": 8081,
//     "onStart": (server) => console.log("hi!")
// };

// console.log(distribution.util.serialize(newNode))

// c='{"type":"object","value":{"ip":"{\"type\":\"string\",\"value\":\"127.0.0.1\"}","port":"{\"type\":\"number\",\"value\":\"8081\"}","onStart":"{\"type\":\"function\",\"value\":\"server => console.log(\\\"hi!\\\")\"}"}}'
// ./distribution.js --config "$c"
