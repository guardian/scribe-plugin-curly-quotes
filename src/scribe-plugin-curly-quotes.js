define([], function () {

  'use strict';

  return function () {

    var openDoubleCurly = '“';
    var closeDoubleCurly = '”';

    var openSingleCurly = '‘';
    var closeSingleCurly = '’';

    var NON_BREAKING_SPACE = '\u00A0';

    return function (scribe) {
      /**
       * Run the formatter as you type on the current paragraph.
       *
       * FIXME: We wouldn't have to do this if the formatters were run on text
       * node mutations, but that's expensive unil we have a virtual DOM.
       */

      var keys = {
        34: '"',
        39: '\''
      };
      var curlyQuoteChar;

      // `input` doesn't tell us what key was pressed, so we grab it beforehand
      scribe.el.addEventListener('keypress', function (event) {
        curlyQuoteChar = keys[event.charCode];
      });

      // When the character is actually inserted, format it to transform.
      scribe.el.addEventListener('input', function (event) {
        if (curlyQuoteChar) {
          var selection = new scribe.api.Selection();
          var pElement = selection.getContaining(function (node) {
            return node.nodeName === 'P';
          });
          selection.placeMarkers();
          pElement.innerHTML = substituteCurlyQuotes(pElement.innerHTML);
          selection.selectMarkers();
          // Reset
          curlyQuoteChar = undefined;
        }
      });

      // Substitute quotes on setting content or paste
      scribe.registerHTMLFormatter('normalize', substituteCurlyQuotes);

      function isWordCharacter(character) {
          return /[^\s()]/.test(character);
      }

      function substituteCurlyQuotes(html) {
        // We don't want to replace quotes within the HTML markup
        // (e.g. attributes), only to text nodes
        var holder = document.createElement('div');
        holder.innerHTML = html;

        // Replace straight single and double quotes with curly
        // equivalent in the given string
        mapTextNodes(holder, function(str) {
          // Tokenise HTML elements vs text between them
          // Note: this is escaped HTML in the text node!
          // Split by elements
          var tokens = str.split(/(<[^>]+?>(?:.*<\/[^>]+?>)?)/);
          return tokens.map(function(token) {
            // Only replace quotes in text between (potential) HTML elements
            // which are not SCRIPT or STYLE
            if (/^<(script|style)/i.test(token)) {
              return token;
            } else {
              if (/^</.test(token)) {
                // Split by tags
                var newTokens = token.split(/(<[^>]+?>)/);
                return newTokens.map(function (newToken) {
                  if (/^</.test(newToken)) {
                    return newToken;
                  } else {
                    return convert(newToken);
                  }
                }).join('');
              } else {
                return convert(token);
              }
            }
          }).join('');
        });

        return holder.innerHTML;
      }

      // Recursively convert the quotes to curly quotes. We have to do this
      // recursively instead of with a global match because the latter would
      // not detect overlaps, e.g. "'1'" (text can only be matched once).
      function convert(str) {
        if (! /([\s\S])?'|"([\s\S])?/.test(str)) {
          return str;
        } else {
          var foo = str.
            // Use [\s\S] instead of . to match any characters _including newlines_
            replace(/([\s\S])?'([\s\S])?/,
                    replaceQuotesFromContext(openSingleCurly, closeSingleCurly)).
            replace(/([\s\S])?"([\s\S])?/,
                    replaceQuotesFromContext(openDoubleCurly, closeDoubleCurly));
          return convert(foo);
        }
      }

      function replaceQuotesFromContext(openCurly, closeCurly) {
        return function(m, prev, next) {
          prev = prev || '';
          next = next || '';
          var isStart = ! prev;
          var isEnd = ! next;
          var hasCharsBefore = isWordCharacter(prev);
          var hasCharsAfter  = isWordCharacter(next);
          // Optimistic heuristic, would need to look at DOM structure
          // (esp block vs inline elements) for more robust inference
          if (hasCharsBefore || (isStart && ! hasCharsAfter && ! isEnd)) {
            return prev + closeCurly + next;
          } else {
            return prev + openCurly + next;
          }
        };
      }

      // Apply a function on all text nodes in a container, mutating in place
      function mapTextNodes(container, func) {
        var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        var node = walker.firstChild();
        if (node) {
          do {
            node.data = func(node.data);
          } while ((node = walker.nextSibling()));
        }

        return node;
      }

    };
  };

});
