define(['./constants'], function (constants) {

  function isWordCharacter(character) {
      return /[^\s()]/.test(character);
  }

  function replaceQuotesFromContext(openCurly, closeCurly) {
    return function(m, prev) {
      prev = prev || '';
      var hasCharsBefore = isWordCharacter(prev);
      // Optimistic heuristic, would need to look at DOM structure
      // (esp block vs inline elements) for more robust inference
      if (hasCharsBefore) {
        return prev + closeCurly;
      } else {
        return prev + openCurly;
      }
    };
  }

  // Recursively convert the quotes to curly quotes. We have to do this
  // recursively instead of with a global match because the latter would
  // not detect overlaps, e.g. "'1'" (text can only be matched once).
  function convert(str) {
    if (! /['"]/.test(str)) {
      return str;
    } else {
      var foo = str.
        // Use [\s\S] instead of . to match any characters _including newlines_
        replace(/([\s\S])?'/,
                replaceQuotesFromContext(constants.openSingleCurly, constants.closeSingleCurly)).
        replace(/([\s\S])?"/,
                replaceQuotesFromContext(constants.openDoubleCurly, constants.closeDoubleCurly));
      return convert(foo);
    }
  }

  return {
    convert: convert
  }
});
