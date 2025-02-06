/*
    In this file, add your own test cases that correspond to functionality introduced for each milestone.
    You should fill out each test case so it adequately tests the functionality you implemented.
    You are left to decide what the complexity of each test case should be, but trivial test cases that abuse this flexibility might be subject to deductions.

    Imporant: Do not modify any of the test headers (i.e., the test('header', ...) part). Doing so will result in grading penalties.
*/

// const {serialize, deserialize} = require('@brown-ds/distribution/distribution/util/util.js');
const distribution = require('../../config.js');
const util = distribution.util;

test('(1 pts) student test', () => {
  // Test case to see what Number gets serialized to
  const number = 1;
  const s = util.serialize(number);
  const d = util.deserialize(s);
  expect(number).toEqual(d);
});


test('(1 pts) student test', () => {
  // Test case to see what String gets serialized to
  const string = 'I am Batman';
  const s = util.serialize(string);
  const d = util.deserialize(s);
  expect(string).toEqual(d);
});


test('(1 pts) student test', () => {
  // Test case to see what Boolean gets serialized to
  const boolean = true;
  const s = util.serialize(boolean);
  const d = util.deserialize(s);
  expect(boolean).toEqual(d);
});

test('(1 pts) student test', () => {
  // Test case to see what null gets serialized to
  const nil = null;
  const s = util.serialize(nil);
  const d = util.deserialize(s);
  expect(nil).toEqual(d);
});

test('(1 pts) student test', () => {
  // Test case to see what undefined gets serialized to
  const undef = undefined;
  const s = util.serialize(undef);
  const d = util.deserialize(s);
  expect(undef).toEqual(d);
});

test('(1 pts) student test', () => {
  // Test case to see what undefined gets serialized to
  const undef = undefined;
  const s = util.serialize(undef);
  const d = util.deserialize(s);
  expect(undef).toEqual(d);
});
