function getMissingProperties(obj, propertyList) {
  return propertyList.filter(function(prop) {
    return !obj.hasOwnProperty(prop);
  });
}

module.exports = {
  init: function() {
    var roles = {};

    return {
      define: function(name, propDeps, roleMethods) {
        roles[name] = {
          prototype: roleMethods,
          interface: propDeps
        };
      },

      rolePlay: function (roleName, defaultValue) {
        var value = defaultValue;

        return function(obj) {
          if (obj === undefined) {
            return value;
          }

          var unmatched = getMissingProperties(obj, roles[roleName].interface);
          if (unmatched.length === 0) {
            value = obj;
            return this;
          }
          else {
            throw new Error('Cannot play "' + roleName + '" - missing properties: ' + JSON.stringify(unmatched));
          }
        };
      },

      get: function(name) {
        return roles[name];
      },

      getAll: function() {
        return roles;
      }
    };
  }
};
