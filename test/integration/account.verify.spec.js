'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const faker = require('@benmaruchu/faker');
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

  describe('verify', function () {

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

    it('should be able to verify access', function (done) {

      const accessor = {
        account: account.number,
        phone: account.phone
      };

      Account
        .verify(accessor, function (error, verified) {
          expect(error).to.not.exist;
          expect(verified).to.exist;
          expect(verified._id).to.eql(account._id);
          expect(verified.number).to.eql(account.number);
          done(error, verified);
        });
    });

    it('should be able to verify access', function (done) {

      const accessor = {
        account: account.number,
        phone: account.accessors[0].phone
      };

      Account
        .verify(accessor, function (error, verified) {
          expect(error).to.not.exist;
          expect(verified).to.exist;
          expect(verified._id).to.eql(account._id);
          expect(verified.number).to.eql(account.number);
          done(error, verified);
        });
    });

    it('should be able to verify shallow access', function (done) {

      const accessor = {
        account: account.number,
        phone: faker.phone.phoneNumber(),
        shallow: true
      };

      Account
        .verify(accessor, function (error, verified) {
          expect(error).to.not.exist;
          expect(verified).to.exist;
          expect(verified._id).to.eql(account._id);
          expect(verified.number).to.eql(account.number);

          const _accessor =
            _.find(verified.accessors, { phone: accessor.phone });
          expect(_accessor).to.exist;
          expect(_accessor.verifiedAt).to.not.exist;
          expect(_accessor.phone).to.be.equal(accessor.phone);

          done(error, verified);
        });
    });

    it('should be able to verify access', function (done) {

      const accessor = {
        account: account.number,
        phone: faker.phone.phoneNumber()
      };

      Account
        .verify(accessor, function (error, verified) {
          expect(error).to.exist;
          expect(error.status).to.be.eql(202);
          expect(verified).to.not.exist;
          done();
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
