const { assert } = require('chai');
const { type } = require('./utils');

describe('util type', () => {
  it('should return string', () => {
    assert.equal(type('1'), 'string');
  });

  it('should return number', () => {
    assert.equal(type(1), 'number');
  });

  it('should return boolean', () => {
    assert.equal(type(true), 'boolean');
  });

  it('should return null', () => {
    assert.equal(type(null), 'null');
  });

  it('should return undefined', () => {
    assert.equal(type(undefined), 'undefined');
  });

  it('should return array', () => {
    assert.equal(type([]), 'array');
  });

  it('should return object', () => {
    assert.equal(type({}), 'object');
  });

  it('should return function', () => {
    assert.equal(type(() => {}), 'function');
  });
});
