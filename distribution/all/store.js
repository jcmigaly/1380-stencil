
const store = function(config) {
  let context = {};
  context.gid = config.gid || 'all';
  context.hash = config.hash || util.id.naiveHash;
  return {
    get: (configuration, callback) => {
    },

    put: (state, configuration, callback) => {
    },

    del: (configuration, callback) => {
    },

    reconf: (configuration, callback) => {
    },

  };
};

module.exports = store;
