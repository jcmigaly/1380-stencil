/*
    In this file, add your own test cases that correspond to functionality introduced for each milestone.
    You should fill out each test case so it adequately tests the functionality you implemented.
    You are left to decide what the complexity of each test case should be, but trivial test cases that abuse this flexibility might be subject to deductions.

    Imporant: Do not modify any of the test headers (i.e., the test('header', ...) part). Doing so will result in grading penalties.
*/

const distribution = require('../../config.js');
const local = distribution.local
const id = distribution.util.id

const config = distribution.node.config;

test('(1 pts) student test', (done) => {
  // Test: status.get ...

  // NID
  local.status.get('nid', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(id.getNID(config))
    } catch (error) {
      done(error)
    }
  })

  // SID
  local.status.get('sid', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(id.getSID(config))
      done()
    } catch (error) {
      done(error)
    }
  })
});


test('(1 pts) student test', (done) => {
  // Test: routes.get

  const status = local.status;

  local.routes.get('status', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(status);
      done();
    } catch (error) {
      done(error);
    }
  })
});


test('(1 pts) student test', (done) => {
  // Test: routes.put

  const newService = {};

  newService.new = () => {
    return 'new!'
  }

  local.routes.put(newService, 'new', (e, v) => {
    local.routes.get('new', (e, v) => {
      try {
        expect(e).toBeFalsy();
        expect(v.new()).toBe('new!');
        done();
      } catch (error) {
        done(error);
      }
    })
  })

});

test('(1 pts) student test', (done) => {
  // Test: routes.get

  const routes = local.routes;

  local.routes.get('routes', (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(routes);
      done();
    } catch (error) {
      done(error);
    }
  })
});

test('(1 pts) student test me', (done) => {
  // Test: comm.send
  const node = distribution.node.config;

  const remote = {node: node, service: 'status', method: 'get'};
  const message = ['nid']; // Arguments to the method

  local.comm.send(message, remote, (e, v) => {
    try {
      expect(e).toBeFalsy();
      expect(v).toBe(id.getNID(node));
      done();
    } catch (error) {
      done(error);
    }
  })
});

// /* Test infrastructure */

// let localServer = null;

// beforeAll((done) => {
//   distribution.node.start((server) => {
//     localServer = server;
//     done();
//   });
// });

// afterAll((done) => {
//   localServer.close();
//   done();
// });