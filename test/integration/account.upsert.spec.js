'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
// const faker = require('@benmaruchu/faker');
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

  describe('upsert', function () {

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

    it('should be able to upsert existing', function (done) {

      const updates = account.toObject();

      Account
        .upsert(updates, function (error, upsert) {
          expect(error).to.not.exist;
          expect(upsert).to.exist;
          expect(upsert._id).to.eql(account._id);
          expect(upsert.number).to.eql(account.number);
          expect(upsert.accessors.length)
            .to.be.equal(account.accessors.length);
          expect(_.map(upsert.accessors, 'phone'))
            .to.have.members(_.map(account.accessors, 'phone'));
          done(error, upsert);
        });
    });

    it('should be able to upsert existing', function (done) {

      const accessors =
        ([].concat(Account.fake().toObject().accessors)
          .concat(account.toObject().accessors));
      const updates =
        (_.merge({}, account.toObject(), { accessors: accessors }));
      Account
        .upsert(updates, function (error, upsert) {
          expect(error).to.not.exist;
          expect(upsert).to.exist;
          expect(upsert._id).to.eql(account._id);
          expect(upsert.number).to.eql(account.number);
          expect(upsert.accessors.length)
            .to.be.equal(accessors.length);
          expect(_.map(upsert.accessors, 'phone'))
            .to.have.members(_.map(accessors, 'phone'));
          done(error, upsert);
        });
    });

    it('should be able not to upsert empty fields', function (done) {

      const updates = ({ email: '', phone: '', number: account.number });
      Account
        .upsert(updates, function (error, upsert) {
          expect(error).to.not.exist;
          expect(upsert).to.exist;
          expect(upsert._id).to.eql(account._id);
          expect(upsert.number).to.eql(account.number);
          expect(upsert.phone).to.eql(account.phone);
          expect(upsert.email).to.eql(account.email);
          done(error, upsert);
        });
    });

    it('should be able to upsert new', function (done) {

      const updates = Account.fake().toObject();

      Account
        .upsert(updates, function (error, upsert) {
          expect(error).to.not.exist;
          expect(upsert).to.exist;
          expect(upsert._id).to.exist;
          expect(upsert.accessors).to.exist;
          done(error, upsert);
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
