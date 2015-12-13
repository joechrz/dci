var roles = require('.').init();
var test = require('tape');

test('should define roles', function(t) {
  roles.define('testRole', ['foo'], {
    bar: function() { }
  });

  var r = roles.get('testRole');
  t.ok(r);
  t.deepEqual(r.interface, ['foo']);
  t.ok(r.prototype);
  t.ok(r.prototype.bar);
  t.end();
});

test('should role play', function(t) {
  roles.define('testRole', ['foo'], {
    bar: function() { }
  });

  var data = { foo: 'baz' };
  var rpProp = roles.rolePlay('testRole');
  rpProp(data);
  t.deepEqual(data, rpProp());
  t.end();
});
