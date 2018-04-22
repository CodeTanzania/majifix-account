'use strict';

/*** dependencies */
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

  describe('static post', function () {

    let account;

    it('should be able to post', function (done) {

      account = Account.fake();

      Account
        .post(account, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(account._id);
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

});