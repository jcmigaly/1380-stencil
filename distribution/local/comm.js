/** @typedef {import("../types").Callback} Callback */
/** @typedef {import("../types").Node} Node */

const http = require('http');
const { serialize, deserialize } = require('../util/serialization');
const { prototype } = require("events");

/**
 * @typedef {Object} Target
 * @property {string} service
 * @property {string} method
 * @property {Node} node
 */

/**
 * @param {Array} message
 * @param {Target} remote
 * @param {Callback} [callback]
 * @return {void}
 */
function send(message, remote, callback) {
    console.log('message')
    
    console.log(message)

    // Serialize the message
    let serializedMessage = serialize(message)
    console.log(serializedMessage)

    // Build path
    let path = '/local/' + remote.service + '/' + remote.method

    // Set up options object for http.request
    let options = {
        hostname: remote.node.ip,
        port: remote.node.port,
        path: path,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(serializedMessage)
        }
    }

    const req = http.request(options, (res) => {
        let data = ''
    
        // Handle data chunks
        res.on('data', (chunk) => {
            data += chunk
        })
    
        // Handle end of response
        res.on('end', () => {
            callback(null, deserialize(data))
        })
    })
    
    // Handle network errors
    req.on('error', (err) => {
        console.log('ERROR', err)
        callback(err)  // Pass the error to the callback
    })

    req.write(serializedMessage)
    req.end()
}

module.exports = {send};
