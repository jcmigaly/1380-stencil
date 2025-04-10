/** @typedef {import("../types.js").Node} Node */

const assert = require('assert');
const crypto = require('crypto');

// The ID is the SHA256 hash of the JSON representation of the object
/** @typedef {!string} ID */

/**
 * @param {any} obj
 * @return {ID}
 */
function getID(obj) {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(obj));
  return hash.digest('hex');
}

/**
 * The NID is the SHA256 hash of the JSON representation of the node
 * @param {Node} node
 * @return {ID}
 */
function getNID(node) {
  node = {ip: node.ip, port: node.port};
  return getID(node);
}

/**
 * The SID is the first 5 characters of the NID
 * @param {Node} node
 * @return {ID}
 */
function getSID(node) {
  return getNID(node).substring(0, 5);
}


function getMID(message) {
  const msg = {};
  msg.date = new Date().getTime();
  msg.mss = message;
  return getID(msg);
}

function idToNum(id) {
  const n = parseInt(id, 16);
  assert(!isNaN(n), 'idToNum: id is not in KID form!');
  return n;
}

function naiveHash(kid, nids) {
  nids.sort();
  return nids[idToNum(kid) % nids.length];
}

function consistentHash(kid, nids) {
  if (nids.length === 0) {
    throw new Error("NIDs list cannot be empty")
  }

  const kidNum = idToNum(kid);
  const numList = nids.map(idToNum)

  const sortedNums = [...numList].sort((a, b) => a - b)

  for (let num of sortedNums) {
      if (num > kidNum) {
          return nids[numList.indexOf(num)] 
      }
  }

  return nids[numList.indexOf(sortedNums[0])]
}


function rendezvousHash(kid, nids) {
  if (nids.length === 0) {
    throw new Error("NIDs list cannot be empty");
  }

  let maxHashValue = -1;
  let selectedNID = null;

  for (let nid of nids) {
      const combined = kid + nid;

      const hash = getID(combined)

      const hashNum = idToNum(hash)

      if (hashNum > maxHashValue) {
          maxHashValue = hashNum
          selectedNID = nid
      }
  }

  return selectedNID
}

module.exports = {
  getID,
  getNID,
  getSID,
  getMID,
  naiveHash,
  consistentHash,
  rendezvousHash,
};
