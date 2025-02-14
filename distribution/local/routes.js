/** @typedef {import("../types").Callback} Callback */

/* Status Service */
const status = require('./status');
/* Comm Service */
const comm = require('./comm');

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

    if (configuration in services) {
        try {
            callback(null, services[configuration])
            return
        } catch (error) {
            callback(new Error(error))
            return
        }
    }
    callback(new Error('Service not supported'))
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
