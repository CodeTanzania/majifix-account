'use strict';

/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const { Jurisdiction } = require('majifix-jurisdiction');

/* declarations */
const { Account, app } = require(path.join(__dirname, '..', '..'));


describe.only('Account', function () {

  describe('Rest API', function () {

    let jurisdiction;

    before(function (done) {
      mongoose.connect('mongodb://localhost/majifix-account', done);
    });

    before(function (done) {
      Jurisdiction.remove(done);
    });

    before(function (done) {
      Account.remove(done);
    });

    before(function (done) {
      jurisdiction = Jurisdiction.fake();
      jurisdiction.post(done);
    });

    let account;

    it('should handle HTTP POST on /accounts', function (done) {

      account = Account.fake();
      account.jurisdiction = jurisdiction;

      request(app)
        .post('/v1.0.0/accounts')
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

          done(error, response);

        });

    });

    it('should handle HTTP GET on /accounts', function (done) {

      request(app)
        .get('/v1.0.0/accounts')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
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

    it('should handle HTTP GET on /accounts/:id', function (done) {

      request(app)
        .get(`/v1.0.0/accounts/${account._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(account._id.toString());
          expect(found.number).to.be.equal(account.number);
          expect(found.name).to.be.equal(account.name);

          done(error, response);

        });

    });

    it('should handle HTTP PATCH on /accounts/:id', function (done) {

      const patch = account.fakeOnly('name');

      request(app)
        .patch(`/v1.0.0/accounts/${account._id}`)
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

          done(error, response);

        });

    });

    it('should handle HTTP PUT on /accounts/:id', function (done) {

      const put = account.fakeOnly('name');

      request(app)
        .put(`/v1.0.0/accounts/${account._id}`)
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

          done(error, response);

        });

    });

    it('should handle HTTP GET on /jurisdictions/:id/accounts',
      function (done) {

        request(app)
          .get(
            `/v1.0.0/jurisdictions/${account.jurisdiction._id}/accounts`
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
        .delete(`/v1.0.0/accounts/${account._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(account._id.toString());
          expect(deleted.number).to.be.equal(account.number);
          expect(deleted.name).to.be.equal(account.name);

          done(error, response);

        });

    });


    after(function (done) {
      Account.remove(done);
    });

    after(function (done) {
      Jurisdiction.remove(done);
    });

  });

});