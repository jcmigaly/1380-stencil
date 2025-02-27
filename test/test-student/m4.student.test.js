/*
    In this file, add your own test cases that correspond to functionality introduced for each milestone.
    You should fill out each test case so it adequately tests the functionality you implemented.
    You are left to decide what the complexity of each test case should be, but trivial test cases that abuse this flexibility might be subject to deductions.

    Imporant: Do not modify any of the test headers (i.e., the test('header', ...) part). Doing so will result in grading penalties.
*/

const distribution = require('../../config.js');
const id = distribution.util.id;


test('(1 pts) student test', (done) => {
  const user = {first: 'Lily', last: 'Reynolds'};
  const key = 'lily+jc';

  distribution.local.store.put(user, key, (e, v) => {
    distribution.local.store.del(key, (e, v) => {
      distribution.local.store.get(key, (e, v) => {
        try {
          expect(e).toBeInstanceOf(Error);
          expect(v).toBeFalsy();
          done();
        } catch (error) {
          done(error);
        }
      })
    })
  })
});


test('(1 pts) student test', (done) => {
  const key = 'jc+lily';

  distribution.local.mem.del(key, (e, v) => {
    try {
      expect(e).toBeInstanceOf(Error);
      expect(v).toBeFalsy();
      done();
    } catch (error) {
      done(error);
    }
  })
});


test('(1 pts) student test', (done) => {
  const user = {first: 'Lily', last: 'Reynolds'};
  const key = 'jc+lily';

  distribution.local.mem.put(user, key, (e, v) => {
    distribution.local.mem.del(key, (e, v) => {
      distribution.local.mem.get(key, (e, v) => {
        try {
          expect(e).toBeInstanceOf(Error);
          expect(v).toBeFalsy();
          done();
        } catch (error) {
          done(error);
        }
      })
    })
  })
});

test('(1 pts) student test', (done) => {
  const user = {first: 'Lily', last: 'Reynolds'};

  distribution.local.mem.put(user, null, (e, v) => {
    distribution.local.mem.get(id.getID(user), (e, v) => {
      try {
        expect(e).toBeFalsy();
        expect(v).toBe(user);
        done();
      } catch (error) {
        done(error);
      }
    })
  })
});

test('(1 pts) student test', (done) => {
  const key = 'lily+jc';

  distribution.local.mem.del(key, (e, v) => {
    try {
      expect(e).toBeInstanceOf(Error);
      expect(v).toBeFalsy();
      done();
    } catch (error) {
      done(error);
    }
  })
});
