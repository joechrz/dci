var test = require('tape');
var context = require('.');

test('money transfer', function(t) {
  var TransferFunds = context(function(roles, env) {
    roles.define('MoneyProvider', [ 'balance' ], {
      withdraw: function(amount) {
        if (this.balance > amount) {
          this.balance -= amount;
        }
        else {
          throw new Error('Insufficient Funds: ' + this.balance + ' to withdraw ' + amount);
        }
      }
    });

    roles.define('MoneyAccepter', [ 'balance' ], {
      deposit: function(amount) {
        this.balance += amount;
      }
    });

    return env({ from: 'MoneyProvider', to: 'MoneyAccepter' }, function(amount) {
      this.from.withdraw(amount);
      this.to.deposit(amount);
    });
  });

  var checking = { balance: 1000 };
  var savings = { balance: 5000 };

  TransferFunds().from(checking).to(savings).execute(500);
  t.equal(checking.balance, 500);
  t.equal(savings.balance, 5500);
  t.end();
});
