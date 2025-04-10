const http = require('http');
const url = require('url');
const log = require('../util/log');
const { serialize, deserialize } = require('../util/serialization');
const local = require('./local')
const routes = require('./routes');
const { read } = require('fs');
const path = require('path');
const start = require('@brown-ds/distribution/distribution/local/node').start; 


/*
    The start function will be called to start your node.
    It will take a callback as an argument.
    After your node has booted, you should call the callback.
*/

// const start = function(callback) {
//   const server = http.createServer((req, res) => {
//     /* Your server will be listening for PUT requests. */


//     // Write some code...
//     if (req.method !== 'PUT') {
//       res.writeHead(405, { 'Content-Type': 'application/json' });
//       return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
//     }


//     /*
//       The path of the http request will determine the service to be used.
//       The url will have the form: http://node_ip:node_port/service/method
//     */


//     // Write some code...
//     // Parse the request URL
//     const parsedUrl = url.parse(req.url, true);
//     const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

//     const gid = pathParts[0]
//     console.log(`gid: ${gid}`)
//     const service = pathParts[1]
//     console.log(`service: ${service}`)
//     const method = pathParts[2]
//     console.log(`method: ${method}`)

//     console.log(`NID TO SERVICE STUFF ->> printing global.toLocal`)
//     console.log(global.toLocal)

//     /*

//       A common pattern in handling HTTP requests in Node.js is to have a
//       subroutine that collects all the data chunks belonging to the same
//       request. These chunks are aggregated into a body variable.

//       When the req.on('end') event is emitted, it signifies that all data from
//       the request has been received. Typically, this data is in the form of a
//       string. To work with this data in a structured format, it is often parsed
//       into a JSON object using JSON.parse(body), provided the data is in JSON
//       format.

//       Our nodes expect data in JSON format.
//   */

//     // Write some code...

//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk
//     });

//     req.on('end', () => {

//       /* Here, you can handle the service requests.
//       Use the local routes service to get the service you need to call.
//       You need to call the service with the method and arguments provided in the request.
//       Then, you need to serialize the result and send it back to the caller.
//       */

//     // Write some code...
//     let deserializedBody = deserialize(body)

//     if (service in global.toLocal && method === 'call') {
//       global.toLocal[service](...deserializedBody, (e, v) => {
//         if (e) {
//           console.log(`IM A BODY WORSHIPPER`)

//           res.end(serialize(e))
//           return
//         }
//         if (v) {
//           console.log(`IM A MUNCH`)
//           res.end(serialize(r))
//           return
//         }
//         res.end()
//         return
//       })
//     }

//     if (!(service in local) && !(service in global.toLocal)) {
//       console.log('IM FUCKING BATMAN')
//       res.end(serialize((new Error('Unsupported method'))))
//       return
//     }

//     let routeResult = ''

//     // build configuration object for routes
//     let routesConfig = {
//       'service': service,
//       'gid': gid
//     }

//     // Use local routes service to get the service I need to call
//     routes.get(routesConfig, (e, v) => {
//       if (e) {
//         routeResult = e
//       } else if (v) {
//         routeResult = v

//       }
//     })

//     if (routeResult instanceof Error) {
//       res.end(serialize(routeResult))
//       return
//     }

//     routeResult[method](...deserializedBody, (e, r) => {
//       if (e) {
//         res.end(serialize(e))
//         return
//       } 
//       res.end(serialize(r))
//       return
//     })
//     });
//   });

//   /*
//     Your server will be listening on the port and ip specified in the config
//     You'll be calling the `callback` callback when your server has successfully
//     started.

//     At some point, we'll be adding the ability to stop a node
//     remotely through the service interface.
//   */

//   server.listen(global.nodeConfig.port, global.nodeConfig.ip, () => {
//     log(`Server running at http://${global.nodeConfig.ip}:${global.nodeConfig.port}/`);
//     global.distribution.node.server = server;
//     callback(server);
//   });

//   server.on('error', (error) => {
//     // server.close();
//     log(`Server error: ${error}`);
//     throw error;
//   });
// };

module.exports = {
  start: start,
};
