const fs = require("fs");
const path = require("path");
const util = require("../util/util");

/* Notes/Tips:

- Use absolute paths to make sure they are agnostic to where your code is running from!
  Use the `path` module for that.
*/

// Define an absolute path for the store directory
const STORE_DIR = path.resolve(__dirname, "../../store");

function sanitizeKey(key) {
  key = key || ''
  const sanitized = key.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters
  return sanitized.length > 0 ? sanitized : null;
}

function cleanPutConfig(state, configuration) {
  let key, gid, node
  if (typeof configuration === 'string') {
    key = sanitizeKey(configuration) || util.id.getID(state)
  } else if (typeof configuration === 'object' && configuration !== null) {
    ({key, gid, node} = configuration)
    key = sanitizeKey(key) || util.id.getID(state)
  } else if (!configuration) {
    key = util.id.getID(state)
  } else {
    throw new Error('local.store.put: Incorrect configuration')
  }
  return { key, gid, node }
}

function cleanConfig(configuration) {
  let key, gid, node
  if (typeof configuration === 'string') {
    key = sanitizeKey(configuration)
  } else if (typeof configuration === 'object' && configuration !== null) {
    ({key, gid, node} = configuration)
    key = sanitizeKey(key) || util.id.getID(state)
  } else {
    throw new Error('local.store.get: Incorrect configuration')
  }
  return { key, gid, node }
}

// state is the object we are trying to store
// configuration is the key
function put(state, configuration, callback) {
  if (!callback) {
    callback = (e, v) => e ? console.error(`local.store.put error: ${e}`) : console.log(`local.store.put value: ${v}`)
  }
  // clean up configuration and isolate key, gid, node
  let key, gid, node;
  try {
      ({ key, gid, node } = cleanPutConfig(state, configuration))
  } catch (error) {
      return callback(error)
  }
  const subDirs = []

  if (gid) {
    subDirs.push(gid)
  } 
  if (node) {
    subDirs.push(node)
  }

  // Construct full directory path
  const fullDirPath = path.join(STORE_DIR, ...subDirs)
  try {
     // Ensure directories exist
     fs.mkdirSync(fullDirPath, { recursive: true })
  } catch (error) {
    callback(new Error('local.store.put fs.mkdirSync error'))
  }

  // Define file path
  const filePath = path.join(fullDirPath, key + ".json");
    
  fs.writeFile(filePath, util.serialize(state), (err) => {
    callback(err, state);
  })
}

function get(configuration, callback) {
  if (!callback) {
    callback = (e, v) => e ? console.error(`local.store.get error: ${e}`) : console.log(`local.store.get value: ${v}`)
  }

  let key, gid, node;
  try {
      ({ key, gid, node } = cleanConfig( configuration))
  } catch (error) {
      return callback(error)
  }
  const subDirs = []

  if (gid) {
    subDirs.push(gid)
  } 
  if (node) {
    subDirs.push(node)
  }

  // Construct full directory path
  const fullDirPath = path.join(STORE_DIR, ...subDirs)

  const filePath = path.join(fullDirPath, key + ".json")

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(new Error('local.store.get: Key not in memory'))
      return
    }
    const parsedData = util.deserialize(data)
    callback(null, parsedData)
  })
}

function del(configuration, callback) {
  if (!callback) {
    callback = (e, v) => e ? console.error(`local.store.del error: ${e}`) : console.log(`local.store.del value: ${v}`)
  }
  
  let key, gid, node;
  try {
      ({ key, gid, node } = cleanConfig( configuration))
  } catch (error) {
      return callback(error)
  }
  const subDirs = []

  if (gid) {
    subDirs.push(gid)
  } 
  if (node) {
    subDirs.push(node)
  }

   // Construct full directory path
   const fullDirPath = path.join(STORE_DIR, ...subDirs)

   const filePath = path.join(fullDirPath, key + ".json")

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(new Error('local.store.get: Key not in memory'))
      return
    }
    const parsedData = util.deserialize(data)
    fs.unlink(filePath, (e) => {
      if (e) {
        callback(new Error('local.store.del: file could not be deleted'))
        return
      }
      callback(null, parsedData)
    })
  })
}

module.exports = {put, get, del};
