require('node-amd-require')({
  baseUrl: __dirname,
  paths: {
  }
});

var formatters = require('../../../src/formatters');

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

describe('Formatters', function() {
  describe('convert', function() {
    it('should be a function', function() {
      assert.isFunction(formatters.convert);
    });

    it('should not change a string with no quotes', function() {
      var testString = "Hello world";
      var convertedText = formatters.convert(testString);

      assert.equal(convertedText, testString);
    });

    it('should convert single quotes', function() {
      var output = formatters.convert("'1'");

      assert.equal(output, "‘1’");
    });

    it('should convert double quotes', function() {
      var output = formatters.convert('"1"');

      assert.equal(output, '“1”');
    });
  });
});
