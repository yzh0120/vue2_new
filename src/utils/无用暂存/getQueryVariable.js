export function getQueryVariable(path, variable) {
  var query = null;
  if (path.indexOf("?") > -1) {
    query = path.split("?")[1];
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        if ("undefined" == pair[1]) {
          beark;
        } else {
          return pair[1];
        }
      }
    }
    return "";
  }
}
