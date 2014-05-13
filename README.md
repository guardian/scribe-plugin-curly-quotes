# scribe-plugin-curly-quotes [![Build Status](https://travis-ci.org/guardian/scribe-plugin-curly-quotes.svg?branch=master)](https://travis-ci.org/guardian/scribe-plugin-curly-quotes)

## Installation
```
bower install scribe-plugin-curly-quotes
```

Alternatively, you can [access the distribution files through GitHub releases](https://github.com/guardian/scribe-plugin-curly-quotes/releases).

## Usage Example

scribe-plugin-curly-quotes is an AMD module:

``` js
require(['scribe', 'scribe-plugin-curly-quotes'], function (Scribe, scribePluginToolbar) {
  var scribeElement = document.querySelector('.scribe');
  // Create an instance of Scribe
  var scribe = new Scribe(scribeElement);

  var toolbarElement = document.querySelector('.toolbar');
  scribe.use(scribePluginToolbar(toolbarElement));
});
```
