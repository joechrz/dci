var roleBind = require('../role-bind');
var rolesModule = require('../roles');
var ex = require('../execute-context');

function context(constructor) {
  var roles = rolesModule.init();

  // create an environment that ensures all context properties are bound
  // when execute is called.
  var env = function(roleBindings, executor) {
    return function() {
      var valueBindings = {};

      Object.keys(roleBindings).forEach(function(envProp) {
        valueBindings[envProp] = roles.rolePlay(roleBindings[envProp]);
      });

      var prototype = {
        execute: ex.bindExecutor(roles, roleBindings, valueBindings, executor)
      };

      Object.assign(prototype, valueBindings);
      return Object.create(prototype);
    };
  };

  return constructor.call(this, roles, env);
}

module.exports = context;
