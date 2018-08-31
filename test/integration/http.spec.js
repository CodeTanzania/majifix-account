'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const request = require('supertest');
const { expect } = require('chai');
const faker = require('@benmaruchu/faker');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');

/* declarations */
const { Account, app, apiVersion } = require(path.join(__dirname, '..', '..'));


describe('Account', function () {

  describe('Rest API', function () {

    let jurisdiction;

    before(function (done) {
      Jurisdiction.deleteMany(done);
    });

    before(function (done) {
      Account.deleteMany(done);
    });

    before(function (done) {
      jurisdiction = Jurisdiction.fake();
      jurisdiction.post(done);
    });

    let account;

    it('should handle POST /accounts', function (done) {

      account = Account.fake();
      account.jurisdiction = jurisdiction;

      request(app)
        .post(`/v${apiVersion}/accounts`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(account)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.number).to.exist;
          expect(created.name).to.exist;

          account = created;

          done(error, response);

        });

    });

    it('should handle GET /accounts', function (done) {

      request(app)
        .get(`/v${apiVersion}/accounts`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.data).to.have.length.at.least(1);
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);

        });

    });

    it('should handle GET /accounts by filters', function (done) {

      request(app)
        .get(
          `/v${apiVersion}/accounts?filter[number]=${account.number}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.data).to.have.length.at.least(1);
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);

        });

    });

    it('should handle GET /accounts/:id', function (done) {

      request(app)
        .get(`/v${apiVersion}/accounts/${account._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(account._id);
          expect(found.number).to.be.equal(account.number);
          expect(found.name).to.be.equal(account.name);

          done(error, response);

        });

    });

    it('should handle PATCH /accounts/:id', function (done) {

      const patch = { name: faker.finance.accountName() };

      request(app)
        .patch(`/v${apiVersion}/accounts/${account._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(account._id);
          expect(patched.number).to.be.equal(account.number);
          expect(patched.name).to.be.equal(patch.name);

          account = patched;

          done(error, response);

        });

    });

    it('should handle PUT /accounts/:id', function (done) {

      const put = { name: faker.finance.accountName() };

      request(app)
        .put(`/v${apiVersion}/accounts/${account._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {

          expect(error).to.not.exist;
          expect(response).to.exist;

          const puted = response.body;

          expect(puted._id).to.exist;
          expect(puted._id).to.be.equal(account._id);
          expect(puted.number).to.be.equal(account.number);
          expect(puted.name).to.be.equal(put.name);

          account = puted;

          done(error, response);

        });

    });

    it('should handle POST /accounts/:id/accessors', function (done) {

      const accessor = Account.fake().accessors[0].toObject();

      request(app)
        .post(`/v${apiVersion}/accounts/${account._id}/accessors`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(accessor)
        .expect(200)
        .end(function (error, response) {

          expect(error).to.not.exist;
          expect(response).to.exist;

          const updates = response.body;

          expect(updates._id).to.exist;
          expect(updates._id).to.be.equal(account._id);
          expect(updates.number).to.be.equal(account.number);
          expect(updates.name).to.be.equal(account.name);

          expect(updates.accessors.length)
            .to.be.above(account.accessors.length);

          account = updates;

          done(error, response);

        });

    });

    it('should handle GET /accounts/:id/accessors', function (done) {

      request(app)
        .get(
          `/v${apiVersion}/accounts/${account._id}/accessors`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
          const result = response.body;
          expect(result._id).to.exist;
          expect(result._id).to.be.equal(account._id);
          expect(result.number).to.be.equal(account.number);
          expect(result.name).to.be.equal(account.name);
          expect(result.accessors).to.have.length.at.least(1);
          done(error, response);

        });

    });

    it('should handle PATCH /accounts/:id/accessors/:phone', function (
      done) {

      const accessor = account.accessors[0];
      const phone = accessor.phone;
      const patch = { phone: faker.phone.phoneNumber() };

      request(app)
        .patch(
          `/v${apiVersion}/accounts/${account._id}/accessors/${phone}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {

          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(account._id.toString());
          expect(patched.number).to.be.equal(account.number);
          expect(patched.name).to.be.equal(account.name);

          //assert accessor
          const _accessor = _.find(patched.accessors, patch);
          expect(_accessor).to.exist;
          expect(_accessor.name).to.be.eql(accessor.name);
          expect(_accessor.email).to.be.eql(accessor.email);
          expect(_accessor.phone).to.be.eql(patch.phone);

          account = patched;

          done(error, response);

        });

    });

    it('should handle PUT /accounts/:id/accessors/:phone', function (
      done) {

      const accessor = account.accessors[0];
      const phone = accessor.phone;
      const put = { phone: faker.phone.phoneNumber() };

      request(app)
        .put(
          `/v${apiVersion}/accounts/${account._id}/accessors/${phone}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {

          expect(error).to.not.exist;
          expect(response).to.exist;

          const puted = response.body;

          expect(puted._id).to.exist;
          expect(puted._id).to.be.equal(account._id.toString());
          expect(puted.number).to.be.equal(account.number);
          expect(puted.name).to.be.equal(account.name);

          //assert accessor
          const _accessor = _.find(puted.accessors, put);
          expect(_accessor).to.exist;
          expect(_accessor.name).to.be.eql(accessor.name);
          expect(_accessor.email).to.be.eql(accessor.email);
          expect(_accessor.phone).to.be.eql(put.phone);

          account = puted;

          done(error, response);

        });

    });

    it('should handle POST /accounts/verify', function (done) {

      const requestor = { phone: account.phone, account: account.number };

      request(app)
        .post(`/v${apiVersion}/accounts/verify`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(requestor)
        .expect(200)
        .end(function (error, response) {

          expect(error).to.not.exist;
          expect(response).to.exist;

          const updates = response.body;

          expect(updates._id).to.exist;
          expect(updates._id).to.be.equal(account._id);
          expect(updates.number).to.be.equal(account.number);
          expect(updates.name).to.be.equal(account.name);

          done(error, response);

        });

    });

    it('should handle POST /accounts/verify', function (done) {

      const requestor = { phone: account.phone, identity: account.identity };

      request(app)
        .post(`/v${apiVersion}/accounts/verify`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(requestor)
        .expect(200)
        .end(function (error, response) {

          expect(error).to.not.exist;
          expect(response).to.exist;

          const updates = response.body;

          expect(updates._id).to.exist;
          expect(updates._id).to.be.equal(account._id);
          expect(updates.number).to.be.equal(account.number);
          expect(updates.name).to.be.equal(account.name);

          done(error, response);

        });

    });

    it('should handle DELETE /accounts/:id/accessors/:phone', function (
      done) {

      const accessor = account.accessors[0];
      const phone = accessor.phone;

      request(app)
        .delete(
          `/v${apiVersion}/accounts/${account._id}/accessors/${phone}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(account._id);
          expect(deleted.number).to.be.equal(account.number);
          expect(deleted.name).to.be.equal(account.name);

          //assert accessors
          const _accessor = _.find(deleted.accessors, { phone: phone });
          expect(_accessor).to.not.exist;

          account = deleted;

          done(error, response);

        });

    });

    it('should handle HTTP GET on /jurisdictions/:id/accounts',
      function (done) {

        request(app)
          .get(
            `/v${apiVersion}/jurisdictions/${account.jurisdiction._id}/accounts`
          )
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (error, response) {
            expect(error).to.not.exist;
            expect(response).to.exist;

            //assert payload
            const result = response.body;
            expect(result.data).to.exist;
            expect(result.total).to.exist;
            expect(result.limit).to.exist;
            expect(result.skip).to.exist;
            expect(result.page).to.exist;
            expect(result.pages).to.exist;
            expect(result.lastModified).to.exist;
            done(error, response);

          });

      });

    it('should handle HTTP DELETE on /accounts/:id', function (done) {

      request(app)
        .delete(`/v${apiVersion}/accounts/${account._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(account._id);
          expect(deleted.number).to.be.equal(account.number);
          expect(deleted.name).to.be.equal(account.name);

          done(error, response);

        });

    });


    after(function (done) {
      Account.deleteMany(done);
    });

    after(function (done) {
      Jurisdiction.deleteMany(done);
    });

  });

});
