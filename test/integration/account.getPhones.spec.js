'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Account } = require(path.join(__dirname, '..', '..'));


describe('Account GetPhones', function () {

  let jurisdiction;
  let accounts;

  before(function (done) {
    Account.deleteMany(done);
  });

  before(function (done) {
    Jurisdiction.deleteMany(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });


  before(function (done) {
    accounts = Account.fake(32);
    accounts = _.map(accounts, function (account, index) {
      if (index % 2 === 0) {
        account.jurisdiction = jurisdiction;
      }
      return account;
    });

    const fakes = _.map(accounts, function (account) {
      return function (next) {
        account.post(next);
      };
    });
    async.parallel(fakes, function (error, created) {
      accounts = created;
      done(error, created);
    });
  });

  it('should be able to get without options', function (done) {

    Account.getPhones(function (error, results) {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results).to.have.length(32);
      done(error, results);
    });

  });

  it('should be able to get with options', function (done) {

    const criteria = { jurisdiction: { $in: [jurisdiction._id] } };
    Account.getPhones(criteria, function (error, results) {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results).to.have.length(16);
      done(error, results);
    });

  });

  it('should be able to get with options', function (done) {

    const criteria = {
      $or: [
        { jurisdiction: { $in: [jurisdiction._id] } },
        { jurisdiction: null }
      ]
    };
    Account.getPhones(criteria, function (error, results) {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results).to.have.length(32);
      done(error, results);
    });

  });

  after(function (done) {
    Account.deleteMany(done);
  });

  after(function (done) {
    Jurisdiction.deleteMany(done);
  });

});
