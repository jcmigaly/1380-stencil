const comm = require('../local/comm')
const local = require('../local/local')
const util = require('../util/util')

function store(config) {
  const context = {};
  context.gid = config.gid || 'all';
  context.hash = config.hash || global.distribution.util.id.naiveHash;

  /* For the distributed store service, the configuration will
          always be a string */
  return {
    get: (configuration, callback) => {
      // Get node object (maps SID -> nodes)
      let nodeList
      local.groups.get(context.gid, (error, result) => {
        if (error) {
          callback(new Error('all.mem.put local.groups.get'))
          return
        }
        nodeList = result
      })

      let nidList = []

      // Loop through each property, calculate NID from value
      for (let key in nodeList) {
        nidList.push(util.id.getNID(nodeList[key]))
      }

      // Convert primary key (configuration) to hash
      let kid = util.id.getID(configuration)
      const storageNodeNID = context.hash(kid, nidList)

      // Find the actual node the storageNodeNID corresponds to
      const sid = storageNodeNID.substring(0, 5);
      // Isolate the node we are sending to
      const n = nodeList[sid]

      // Build local.comm.send
      let message = [{'key': configuration, 'gid': context.gid, 'node': util.id.getNID(global.nodeConfig)}]
      let remote = {'node': n, 'service': 'store', 'method': 'get'}
      local.comm.send(message, remote, (e, v) => {
        if (e) {
          callback(e)
          return
        }
        callback(null, v)
      })
    },

    put: (state, configuration, callback) => {
      // Get node object (maps SID -> nodes)
      let nodeList
      local.groups.get(context.gid, (error, result) => {
        if (error) {
          callback(new Error('all.mem.put local.groups.get'))
          return
        }
        nodeList = result
      })

      let nidList = []

      // Loop through each property, calculate NID from value
      for (let key in nodeList) {
        nidList.push(util.id.getNID(nodeList[key]))
      }

      // Convert primary key (configuration) to hash
      let kid = util.id.getID(configuration)
      const storageNodeNID = context.hash(kid, nidList)

      // Find the actual node the storageNodeNID corresponds to
      const sid = storageNodeNID.substring(0, 5);
      // Isolate the node we are sending to
      const n = nodeList[sid]

      // Build local.comm.send
      let message = [state, {'key': configuration, 'gid': context.gid, 'node': util.id.getNID(global.nodeConfig)}]
      let remote = {'node': n, 'service': 'store', 'method': 'put'}
      local.comm.send(message, remote, (e, v) => {
        if (e) {
          callback(e)
          return
        }
        callback(null, v)
      })
    },

    del: (configuration, callback) => {
      // Get node object (maps SID -> nodes)
      let nodeList
      local.groups.get(context.gid, (error, result) => {
        if (error) {
          callback(new Error('all.mem.put local.groups.get'))
          return
        }
        nodeList = result
      })

      let nidList = []

      // Loop through each property, calculate NID from value
      for (let key in nodeList) {
        nidList.push(util.id.getNID(nodeList[key]))
      }

      // Convert primary key (configuration) to hash
      let kid = util.id.getID(configuration)
      const storageNodeNID = context.hash(kid, nidList)

      // Find the actual node the storageNodeNID corresponds to
      const sid = storageNodeNID.substring(0, 5);
      // Isolate the node we are sending to
      const n = nodeList[sid]

      // Build local.comm.send
      let message = [{'key': configuration, 'gid': context.gid, 'node': util.id.getNID(global.nodeConfig)}]
      let remote = {'node': n, 'service': 'store', 'method': 'get'}
      local.comm.send(message, remote, (e, v) => {
        if (e) {
          callback(e)
          return
        }
        callback(null, v)
      })
    },

    reconf: (configuration, callback) => {
    },
  };
};

module.exports = require('@brown-ds/distribution/distribution/all/store');;
