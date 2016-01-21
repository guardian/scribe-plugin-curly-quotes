require('node-amd-require')({
  baseUrl: __dirname,
  paths: {
  }
});

var arrays = require('../../../src/arrays');

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('arrays', function() {
  describe('toArray', function() {
    it('should be a function', function() {
      assert.isFunction(arrays.toArray);
    });

    describe('given empty input', function() {
      it('should create an empty array', function() {
        var result = arrays.toArray({});

        assert.equal(result.length, 0);
      });
    });

  });
});
