# scribe-plugin-curly-quotes [![Build Status](https://travis-ci.org/guardian/scribe-plugin-curly-quotes.svg?branch=master)](https://travis-ci.org/guardian/scribe-plugin-curly-quotes)

Substitutes plain quotation marks with their semantic equivalents.

## Installation
```
bower install scribe-plugin-curly-quotes
```

Alternatively, you can [access the distribution files through GitHub releases](https://github.com/guardian/scribe-plugin-curly-quotes/releases).

## Usage Example

scribe-plugin-curly-quotes is an AMD module:

``` js
require(['scribe', 'scribe-plugin-curly-quotes'], function (Scribe, scribePluginCurlyQuotes) {
  var scribeElement = document.querySelector('.scribe');
  // Create an instance of Scribe
  var scribe = new Scribe(scribeElement);

  scribe.use(scribePluginCurlyQuotes());
});
```

## Developing and testing

Run `./setup.sh` to download dependencies

Run `./run-tests.sh` to run the tests