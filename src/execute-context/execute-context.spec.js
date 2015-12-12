var executeContext = require('.');
var test = require('tape');
var roles = require('../roles');

test('should bind a context executor', function(t) {
  t.plan(1);
  roles.define('moneySource', ['balance'], {
    check: function() {
      return this.balance;
    }
  });

  var executor = executeContext.bindExecutor(
    roles,
    { account: 'moneySource' },
    { account: function() { return { balance: 100 } } },
    function() {
      t.equal(this.account.check(), 100);
    }
  );

  executor();
});
