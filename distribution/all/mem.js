const comm = require('../local/comm')
const util = require('../util/util')


function mem(config) {
  const context = {};
  context.gid = config.gid || 'all';
  context.hash = config.hash || global.distribution.util.id.naiveHash;

  /* For the distributed mem service, the configuration will
          always be a string */
  return {
    get: (configuration, callback) => {
      return
    },

    put: (state, configuration, callback) => {
      // Get node object (maps SID -> nodes)
      let nodeList = global.distribution.local.groups[context.gid]

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
      let message = [state, {'key': configuration, 'gid': context.gid}]
      let remote = {'node': n, 'service': 'mem', 'method': 'put'}
      comm.send(message, remote, (e, v) => {
        if (e) {
          callback(e)
          return
        }
        callback(null, v)
      })
    },

    del: (configuration, callback) => {
      return
    },

    reconf: (configuration, callback) => {
      return
    },
  };
};

module.exports = mem;
