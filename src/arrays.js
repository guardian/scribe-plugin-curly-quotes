define([], function() {

  function toArray(nodeList) {
    var array = [];
    if (nodeList && nodeList.length && nodeList.item) {
      for (var i = 0; i < nodeList.length; i++) {
        var item = nodeList.item(i);
        if (item) {
          array.push(item);
        }
      }
    }
    return array;
  }

  return {
    toArray: toArray
  };
});
