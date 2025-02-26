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

// state is the object we are trying to store
// configuration is the key
function put(state, configuration, callback) {
  if (!callback) {
    callback = (e, v) => e ? console.error(`local.store.put error: ${e}`) : console.log(`local.store.put value: ${v}`)
  }
  // clean up configuration
  const safeKey = sanitizeKey(configuration) || util.id.getID(state);

  // navigate to correct directry
  const filePath = path.join(STORE_DIR, safeKey + ".json")
  fs.writeFile(filePath, util.serialize(state), (err) => {
    callback(err, state);
});
}

function get(configuration, callback) {
  if (!callback) {
    callback = (e, v) => e ? console.error(`local.store.get error: ${e}`) : console.log(`local.store.get value: ${v}`)
  }

  const safeKey = sanitizeKey(configuration)

  if (!safeKey) {
    callback(new Error("local.store.get: Invalid key"))
    return 
  }
  const filePath = path.join(STORE_DIR, safeKey + ".json")

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
  
  const safeKey = sanitizeKey(configuration)

  if (!safeKey) {
    callback(new Error("local.store.del: Invalid key"))
    return 
  }
  const filePath = path.join(STORE_DIR, safeKey + ".json")

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
