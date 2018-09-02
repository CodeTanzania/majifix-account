'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const account = require(path.join(__dirname, '..', '..'))({
  fetchAccount: function (identity, fetchedAt, done) {
    done(null, {});
  }
});


describe('account', () => {

  it('should be exported', () => {
    expect(account).to.exist;
    expect(account).to.be.a('function');
    expect(account.name).to.be.equal('account');
    expect(account.length).to.be.equal(1);
  });

  it('should be export Account', () => {
    const { Account } = account;
    expect(Account).to.exist;
    expect(Account.fetchAccount).to.exist;
  });

});
