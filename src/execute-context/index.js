var roleBind = require('../role-bind');

module.exports = {
  bindExecutor: function(roles, roleBindings, valueBindings, executor) {
    return function() {
      var unbound = [];
      var bound = {};

      // bind data to role for each of the context properties
      Object.keys(valueBindings).forEach(function(prop) {
        var dataValue = valueBindings[prop]();

        if (!dataValue) {
          unbound.push(prop);
          return;
        }

        var role = roles.get(roleBindings[prop]);
        bound[prop] = roleBind(dataValue, role);
      });

      if (unbound.length > 0) {
        throw new Error('Cannot execute context - unbound context properties: ' + JSON.stringify(unbound));
      }

      return executor.apply(bound, arguments);
    }
  }
};
