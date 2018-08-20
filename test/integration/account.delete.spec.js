'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Account } = require(path.join(__dirname, '..', '..'));

describe('Account', function () {

  before(function (done) {
    Account.deleteMany(done);
  });

  describe('static delete', function () {

    let account;

    before(function (done) {
      const fake = Account.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      Account
        .del(account._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      Account
        .del(account._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let account;

    before(function (done) {
      const fake = Account.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      account
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      account
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(account._id);
          done();
        });
    });

  });

  after(function (done) {
    Account.deleteMany(done);
  });

});
