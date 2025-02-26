const util = require('../util/util')

const namesToObjects ={}

function cleanPutConfig(state, configuration) {
    let key
    let gid
    // handle different configurations
    if (typeof configuration === 'string') {
        key = configuration
    } else if (typeof configuration === 'object' && configuration != null) {
        ({key, gid} = configuration)
    } else if (!configuration) {
        key = util.id.getID(state)
    } else {
        throw new Error('local.mem.put: Incorrect configuration')
    }
    return { key, gid }
}

function cleanConfig(configuration) {
    let key
    let gid
    // handle different configurations
    if (typeof configuration === 'string') {
        key = configuration
    } else if (typeof configuration === 'object' && configuration != null) {
        ({key, gid} = configuration)
    } else if (!configuration) {
        throw new Error('Empty configuration for get or del')
    } else {
        throw new Error('local.mem.put: Incorrect configuration')
    }
    return { key, gid }
}

// state is the object we are trying to store
// configuration is the key
function put(state, configuration, callback) {
    if (!callback) {
        callback = (e, v) => e ? console.error(`local.mem.put error: ${e}`) : console.log(`local.mem.put value: ${v}`)
    }

    // isolate key and gid
    let key, gid;
    try {
        ({ key, gid } = cleanPutConfig(state, configuration))
    } catch (error) {
        return callback(error)
    }

    // if we get this request from specific gid we map gid -> key -> name
    if (gid) {
        namesToObjects[gid][key]
        callback(null, namesToObjects[gid][key])
        return
    } else {
        namesToObjects[key] = state
        callback(null, namesToObjects[key])
    }
};

function get(configuration, callback) {
    if (!callback) {
        callback = (e, v) => e ? console.error(`local.mem.get error: ${e}`) : console.log(`local.mem.get value: ${v}`)
    }

    // isolate key and gid
    let key, gid;
    try {
        ({ key, gid } = cleanConfig(configuration))
    } catch (error) {
        return callback(error)
    }

    if (gid) {
        if (!(key in namesToObjects[gid])) {
            callback(new Error('local.mem.get gid path: key not in mem'))
            return
        }
        callback(null, namesToObjects[gid][key])
        return
    } else {
        // key not in our mem
        if (!(key in namesToObjects)) {
            callback(new Error('local.mem.get: Key not in mem'))
            return
        }
        callback(null, namesToObjects[key])
        return
    }
}


function del(configuration, callback) {
    if (!callback) {
        callback = (e, v) => e ? console.error(`local.mem.get error: ${e}`) : console.log(`local.mem.get value: ${v}`)
    }

    // isolate key and gid
    let key, gid;
    try {
        ({ key, gid } = cleanConfig(configuration))
    } catch (error) {
        return callback(error)
    }

    // key not in our mem
    if (!(configuration in namesToObjects)) {
        callback(new Error('local.mem.del: Key not in mem'))
        return
    }

    // let deepClone
    let queryObject
    if (gid) {
        if (!(key in namesToObjects[gid])) {
            callback(new Error('local.mem.del gid path: key not in mem'))
            return
        }
        // deepClone = util.deserialize(util.serialize(namesToObjects[gid][key]))
        queryObject = namesToObjects[configuration]
        delete namesToObjects[gid][key]
        callback(null, queryObject)
        return
    } else {
        // key not in our mem
        if (!(key in namesToObjects)) {
            callback(new Error('local.mem.del: Key not in mem'))
            return
        }
        // deepClone = util.deserialize(util.serialize(namesToObjects[key]))
        queryObject = namesToObjects[configuration]
        delete namesToObjects[key]
        callback(null, queryObject)
        return
    }
};

module.exports = {put, get, del};
