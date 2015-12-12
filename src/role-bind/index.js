var roleBind = function(dataObject, role) {
  var boundRole = {};

  Object.keys(role.prototype).forEach(function(method) {
    boundRole[method] = role.prototype[method].bind(dataObject);
  });

  return boundRole;
}

module.exports = roleBind;
