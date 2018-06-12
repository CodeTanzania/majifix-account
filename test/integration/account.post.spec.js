'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Account } = require(path.join(__dirname, '..', '..'));

describe('Account', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.remove(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(function (done) {
    Account.remove(done);
  });

  describe('static post', function () {

    let account;

    it('should be able to post', function (done) {

      account = Account.fake();
      account.jurisdiction = jurisdiction;

      Account
        .post(account, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(account._id);
          expect(created.jurisdiction._id)
            .to.eql(account.jurisdiction._id);
          expect(created.name).to.eql(account.name);
          expect(created.number).to.eql(account.number);
          done(error, created);
        });
    });

  });

  describe('instance post', function () {

    let account;

    it('should be able to post', function (done) {

      account = Account.fake();
      account.jurisdiction = jurisdiction;

      account
        .post(function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(account._id);
          expect(created.name).to.eql(account.name);
          expect(created.number).to.eql(account.number);
          done(error, created);
        });
    });

  });

  after(function (done) {
    Account.remove(done);
  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});