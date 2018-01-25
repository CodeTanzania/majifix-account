'use strict';


//dependencies
const path = require('path');
const expect = require('chai').expect;
const Account = require(path.join(__dirname, '..', '..', 'models', 'account'));


describe('account', function () {
  it('should exists', function () {
    expect(Account).to.exist;
  });
});