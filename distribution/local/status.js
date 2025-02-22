const log = require('../util/log');

const status = {};
status.spawn = require('@brown-ds/distribution/distribution/local/status').spawn; 
status.stop = require('@brown-ds/distribution/distribution/local/status').stop; 

global.moreStatus = {
  sid: global.distribution.util.id.getSID(global.nodeConfig),
  nid: global.distribution.util.id.getNID(global.nodeConfig),
  counts: 0,
};

status.get = function(configuration, callback) {
  callback = callback || function() { };
  // Need to get new memory usage info on every call
  const memoryUsage = process.memoryUsage()

  // Isolate method that was passed in
  switch (configuration) {
    case 'sid':
      try {
        callback(null, global.moreStatus.sid)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break

    case 'ip':
      try {
        callback(null, global.nodeConfig.ip)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break

    case 'nid':
      try {
        callback(null, global.moreStatus.nid)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break
    
    case 'port':
      try {
        callback(null, global.nodeConfig.port)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break

    case 'counts':
      try {
        callback(null, global.moreStatus.counts)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break

    case 'heapTotal':
      try {
        callback(null, memoryUsage.heapTotal)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break
    
    case 'heapUsed':
      try {
        callback(null, memoryUsage.heapUsed)
        global.moreStatus.counts += 1
      } catch (error) {
        callback(new Error(error))
      }
      break
    default:
      callback(new Error('Unsupported method'))
  }
};


// status.spawn = function(configuration, callback) {
// };

// status.stop = function(callback) {
// };

module.exports = status;
