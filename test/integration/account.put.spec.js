'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Account } = require(path.join(__dirname, '..', '..'));

describe('Account', function () {

  let jurisdiction;

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
    Account.deleteMany(done);
  });

  describe('static put', function () {

    let account;

    before(function (done) {
      account = Account.fake();
      account.jurisdiction = jurisdiction;

      account
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to put', function (done) {

      account = account.fakeOnly('name');

      Account
        .put(account._id, account, function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(account._id);
          expect(updated.name).to.eql(account.name);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {

      const fake = Account.fake();

      Account
        .put(fake._id, fake, function (error, updated) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance put', function () {

    let account;

    before(function (done) {
      account = Account.fake();
      account.jurisdiction = jurisdiction;

      account
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to put', function (done) {
      account = account.fakeOnly('name');

      account
        .put(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(account._id);
          expect(updated.name).to.eql(account.name);
          done(error, updated);
        });
    });

    it('should not throw if not exists', function (done) {
      account
        .put(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(account._id);
          done();
        });
    });

  });

  after(function (done) {
    Account.deleteMany(done);
  });

  after(function (done) {
    Jurisdiction.deleteMany(done);
  });

});
