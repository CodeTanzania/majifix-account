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

  describe('static get by id', function () {

    let account;

    before(function (done) {
      const fake = Account.fake();
      fake
        .post(function (error, created) {
          account = created;
          done(error, created);
        });
    });

    it('should be able to get an instance', function (done) {
      Account
        .getById(account._id, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(account._id);
          done(error, found);
        });
    });

    it('should throw if not exists', function (done) {
      const account = Account.fake();

      Account
        .getById(account._id, function (error, found) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(found).to.not.exist;
          done();
        });
    });

  });

  after(function (done) {
    Account.remove(done);
  });

});