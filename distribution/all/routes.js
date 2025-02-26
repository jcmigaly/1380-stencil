/** @typedef {import("../types").Callback} Callback */

// const routes = require('@brown-ds/distribution/distribution/all/routes'); 

// function routes(config) {
//   const context = {};
//   context.gid = config.gid || 'all';

//   /**
//    * @param {object} service
//    * @param {string} name
//    * @param {Callback} callback
//    */
//   function put(service, name, callback = () => { }) {
//   }

//   /**
//    * @param {object} service
//    * @param {string} name
//    * @param {Callback} callback
//    */
//   function rem(service, name, callback = () => { }) {
//   }

//   return {put, rem};
// }

module.exports = require('@brown-ds/distribution/distribution/all/routes');
