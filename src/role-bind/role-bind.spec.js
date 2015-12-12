var roleBind = require('.');
var test = require('tape');

test('should bind role methods', function(t) {
  t.plan(1);

  var role = {
    prototype: {
      testMethod: function() {
        t.equal(this.testValue, 'ok');
      }
    },
    interface: ['testValue']
  };

  var dataObj = {
    testValue: 'ok'
  };

  var bound = roleBind(dataObj, role);
  bound.testMethod();
});
