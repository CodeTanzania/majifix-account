'use strict';

/* dependencies */
const path = require('path');
const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const { Account } = require(path.join(__dirname, '..', '..'));

describe('Account', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/majifix-account', done);
  });

  before(function (done) {
    Account.remove(done);
  });

  describe('static put', function () {

    let account;

    before(function (done) {
      const fake = Account.fake();
      fake
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
      const fake = Account.fake();
      fake
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

    it('should throw if not exists', function (done) {
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
    Account.remove(done);
  });

});