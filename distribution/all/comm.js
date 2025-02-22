/** @typedef {import("../types").Callback} Callback */
const groups = require('../local/groups')
const local = require('../local/comm')

/**
 * NOTE: This Target is slightly different from local.all.Target
 * @typdef {Object} Target
 * @property {string} service
 * @property {string} method
 */

/**
 * @param {object} config
 * @return {object}
 */
function comm(config) {
  const context = {};
  context.gid = config.gid || 'all';

  context.gid = groups[config.gid]

  /**
   * @param {Array} message
   * @param {object} configuration
   * @param {Callback} callback
   */
  function send(message, configuration, callback) {
    // make node to value map
    let nodeErrors = {}

    // make node to error map
    let nodeValues = {}

    let numberOfNodes = Object.keys(context.gid).length

    for (let key in context.gid) {
      // build remote
      let remote = {
        node: context.gid[key],
        service: configuration.service,
        method: configuration.method
      }
      local.comm.send(message, remote, (err, val) => {
        if (err) {
          nodeErrors[key] = err
        } 
        else if (val) {
          nodeValues[key] = val
        }

        numberOfNodes--
        if (numberOfNodes === 0) {
          callback(nodeErrors, nodeValues)
        }
      })
    }
  }

  return {send};
};

module.exports = comm;
