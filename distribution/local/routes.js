/** @typedef {import("../types").Callback} Callback */

/* Status Service */
const status = require('./status');
/* Comm Service */
const comm = require('./comm');
const { local } = require("@brown-ds/distribution");

/**
 * @param {string} configuration
 * @param {Callback} callback
 * @return {void}
 */
function get(configuration, callback) {
    if (!callback) {
        callback = (e, v) => e ? console.error(`e: ${e}`) : console.log(`v: ${v}`);
    }
    global.moreStatus.counts += 1

    let gid = 'local'
    let service = ''
    if (typeof configuration === 'string') {
        // service = configuration
        if (configuration in services) {
            try {
                callback(null, services[configuration])
                return
            } catch (error) {
                callback(new Error(error))
                return
            }
        } 
        else {
            const rpc = global.toLocal[configuration];
            if (rpc) {
                callback(null, { call: rpc });
                return
            } else {
                callback(new Error(`Service ${configuration} not found!`));
                return
            }
        }
    } else if (typeof configuration === 'object' && 'service' in configuration && 'gid' in configuration) {
        gid = configuration['gid']
        service = configuration['service']
        if (!(gid in global.distribution)) {
            callback(new Error('gid not found'))
            return
        }
        else if (!(service in global.distribution[gid])) {
            const rpc = global.toLocal[gid][service];
            if (rpc) {
                callback(null, { call: rpc });
                return
            } else {
                callback(new Error(`Service ${service} not found!`));
                return
            }

            // callback(new Error('service not offered for the inputted gid'))
            // return

        }
        callback(null, global.distribution[gid][service])
        return
    }
    callback(new Error('routes.get was given incorrect config arguement'))
}

/**
 * @param {object} service
 * @param {string} configuration
 * @param {Callback} callback
 * @return {void}
 */
function put(service, configuration, callback) {
    callback = callback || function() {};
    // Check if trying to re-write service that already exists
    if (configuration in services) {
        callback(new Error('Service is trying to be re-written'))
    } 

    // Add new service
    try {
        services[configuration] = service
        callback(null, configuration)
    } catch (error) {
        callback(new Error(error))
    }
}

/**
 * @param {string} configuration
 * @param {Callback} callback
 */
function rem(configuration, callback) {
};

module.exports = {get, put, rem};

// Need to put here so module.exports is defined
const services = {
    status: status,
    comm: comm,
    routes: module.exports
}
