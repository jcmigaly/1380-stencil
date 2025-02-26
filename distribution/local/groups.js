const { group } = require('yargs');
const groups = require('@brown-ds/distribution/distribution/local/groups') 


// const groups = {
//     all: {},
// };

// groups.get = function(name, callback) {
//     // Default to no-ops if gid not recorded in groups
//     if (!(name in groups)) {
//         callback(new Error('gid not found'))
//         return
//     }
//     callback(null, groups[name])
//     return
// };

// groups.put = function(config, group, callback) {
//     // isolate GID
//     let gid = null
//     if (typeof config === 'string') {
//         gid  = {gid: config}
//     } else if ("gid" in config) {
//         gid = config.gid
//     } else {
//         callback(new Error('Config object not defined correctly'))
//         return
//     }

//     // isolate group -> each entry in group object must be 5 string -> {ip: string, port: number}
//     if (!isValidShape(group)) {
//         callback(new Error('Group object not defined correctly'))
//         return
//     }

//     // in groups object add the gid -> nodes object
//     groups[config] = group

//     // update 'all' group
//     for (const key in group) {
//         if (!key in groups.all) {
//             groups.all[key] = group[key]
//         }
//     }

//     // attach distributed services to new gid
//     global.distribution[gid] = {}
//     distribution[gid].status =
//         require('../all/status')(config);
//     distribution[gid].comm =
//         require('../all/comm')(config);
//     distribution[gid].gossip =
//         require('../all/gossip')(config);
//     distribution[gid].groups =
//         require('../all/groups')(config);
//     distribution[gid].routes =
//         require('../all/routes')(config);
//     distribution[gid].mem =
//         require('../all/mem')(config);
//     distribution[gid].store =
//         require('../all/store')(config);

//     callback(null, group)
// };

// groups.del = function(name, callback) {
//     // Default to no-ops if gid not recorded in groups
//     if (!(name in groups)) {
//         callback(new Error('gid not found'))
//         return
//     }
//     let result = groups[name]
//     delete groups[name]
//     callback(null, result)
//     return

// };

// groups.add = function(name, node, callback) {
//     if (!callback) {
//         callback = (e, v) => e ? console.error(`e: ${e}`) : console.log(`v: ${v}`);
//     }
    
//     if (!(name in groups)) {
//         callback(new Error('gid not found'))
//         return
//     }

//     let sid = global.distribution.util.id.getSID(node)

//     groups[name][sid] = node
//     callback(null, groups[name])
//     return
// };

// groups.rem = function(name, node, callback) {
//     if (!callback) {
//         callback = (e, v) => e ? console.error(`e: ${e}`) : console.log(`v: ${v}`);
//     }

//     if (!(name in groups)) {
//         callback(new Error('gid not found'))
//         return
//     }

//     if (!(node in groups[name])) {
//         console.log('HREE')
//         callback(new Error('Node not in gid'))
//         return
//     }

//     let deletedNode = groups[name][node]
//     delete groups[name][node]
//     callback(null, deletedNode)
//     return

// };

// function isValidShape(obj) {
//     // Ensure the input is an object
//     if (typeof obj !== "object" || obj === null) {
//         return false
//     }

//     return Object.entries(obj).every(([key, value]) => {
//         // Check if the key is a string of exactly 5 characters
//         if (typeof key !== "string" || key.length !== 5) {
//             return false
//         }

//         // Check if the value is an object with required properties
//         if (
//             typeof value !== "object" ||
//             value === null ||
//             typeof value.ip !== "string" ||
//             typeof value.port !== "number"
//         ) {
//             return false
//         }

//         return true
//     })
// }

module.exports = groups;
