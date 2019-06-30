/* dependencies */
import _ from 'lodash';
import request from 'supertest';
import { expect } from 'chai';
import faker from '@benmaruchu/faker';
import { app, mount } from '@lykmapipo/express-common';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';

/* declarations */
import account from '../../src/index';

const { Account, apiVersion, router } = account;

describe('Account', () => {
  mount(router);

  describe('Rest API', () => {
    let customerAccount;
    const jurisdiction = Jurisdiction.fake();

    before(done => clear(Jurisdiction, Account, done));

    before(done => create(jurisdiction, done));

    it('should handle POST /accounts', done => {
      customerAccount = Account.fake();
      customerAccount.jurisdiction = jurisdiction;

      request(app)
        .post(`/${apiVersion}/accounts`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(customerAccount)
        .expect(201)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.number).to.exist;
          expect(created.name).to.exist;

          customerAccount = created;

          done(error, response);
        });
    });

    it('should handle GET /accounts', done => {
      request(app)
        .get(`/${apiVersion}/accounts`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
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

    it('should handle GET /accounts by filters', done => {
      request(app)
        .get(`/${apiVersion}/accounts?filter[number]=${customerAccount.number}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
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

    it('should handle GET /accounts/:id', done => {
      request(app)
        .get(`/${apiVersion}/accounts/${customerAccount._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(customerAccount._id);
          expect(found.number).to.be.equal(customerAccount.number);
          expect(found.name).to.be.equal(customerAccount.name);

          done(error, response);
        });
    });

    it('should handle PATCH /accounts/:id', done => {
      const patch = { name: faker.finance.accountName() };

      request(app)
        .patch(`/${apiVersion}/accounts/${customerAccount._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(customerAccount._id);
          expect(patched.number).to.be.equal(customerAccount.number);
          expect(patched.name).to.be.equal(patch.name);

          customerAccount = patched;

          done(error, response);
        });
    });

    it('should handle PUT /accounts/:id', done => {
      const put = { name: faker.finance.accountName() };

      request(app)
        .put(`/${apiVersion}/accounts/${customerAccount._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const puted = response.body;

          expect(puted._id).to.exist;
          expect(puted._id).to.be.equal(customerAccount._id);
          expect(puted.number).to.be.equal(customerAccount.number);
          expect(puted.name).to.be.equal(put.name);

          customerAccount = puted;

          done(error, response);
        });
    });

    it('should handle POST /accounts/:id/accessors', done => {
      const accessor = Account.fake().accessors[0].toObject();

      request(app)
        .post(`/${apiVersion}/accounts/${customerAccount._id}/accessors`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(accessor)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updates = response.body;

          expect(updates._id).to.exist;
          expect(updates._id).to.be.equal(customerAccount._id);
          expect(updates.number).to.be.equal(customerAccount.number);
          expect(updates.name).to.be.equal(customerAccount.name);

          expect(updates.accessors.length).to.be.above(
            customerAccount.accessors.length
          );

          customerAccount = updates;

          done(error, response);
        });
    });

    it('should handle GET /accounts/:id/accessors', done => {
      request(app)
        .get(`/${apiVersion}/accounts/${customerAccount._id}/accessors`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
          const result = response.body;
          expect(result._id).to.exist;
          expect(result._id).to.be.equal(customerAccount._id);
          expect(result.number).to.be.equal(customerAccount.number);
          expect(result.name).to.be.equal(customerAccount.name);
          expect(result.accessors).to.have.length.at.least(1);
          done(error, response);
        });
    });

    it('should handle PATCH /accounts/:id/accessors/:phone', done => {
      const accessor = customerAccount.accessors[0];
      const { phone } = accessor;
      const patch = { phone: faker.phone.phoneNumber() };

      request(app)
        .patch(
          `/${apiVersion}/accounts/${customerAccount._id}/accessors/${phone}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(customerAccount._id.toString());
          expect(patched.number).to.be.equal(customerAccount.number);
          expect(patched.name).to.be.equal(customerAccount.name);

          // assert accessor
          const _accessor = _.find(patched.accessors, patch);
          expect(_accessor).to.exist;
          expect(_accessor.name).to.be.eql(accessor.name);
          expect(_accessor.email).to.be.eql(accessor.email);
          expect(_accessor.phone).to.be.eql(patch.phone);

          customerAccount = patched;

          done(error, response);
        });
    });

    it('should handle PUT /accounts/:id/accessors/:phone', done => {
      const accessor = customerAccount.accessors[0];
      const { phone } = accessor;
      const put = { phone: faker.phone.phoneNumber() };

      request(app)
        .put(
          `/${apiVersion}/accounts/${customerAccount._id}/accessors/${phone}`
        )
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const puted = response.body;

          expect(puted._id).to.exist;
          expect(puted._id).to.be.equal(customerAccount._id.toString());
          expect(puted.number).to.be.equal(customerAccount.number);
          expect(puted.name).to.be.equal(customerAccount.name);

          // assert accessor
          const _accessor = _.find(puted.accessors, put);
          expect(_accessor).to.exist;
          expect(_accessor.name).to.be.eql(accessor.name);
          expect(_accessor.email).to.be.eql(accessor.email);
          expect(_accessor.phone).to.be.eql(put.phone);

          customerAccount = puted;

          done(error, response);
        });
    });

    it('should handle POST /accounts/verify', done => {
      const requestor = {
        phone: customerAccount.phone,
        account: customerAccount.number,
      };

      request(app)
        .post(`/${apiVersion}/accounts/verify`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(requestor)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updates = response.body;

          expect(updates._id).to.exist;
          expect(updates._id).to.be.equal(customerAccount._id);
          expect(updates.number).to.be.equal(customerAccount.number);
          expect(updates.name).to.be.equal(customerAccount.name);

          done(error, response);
        });
    });

    it('should handle POST /accounts/verify', done => {
      const requestor = {
        phone: customerAccount.phone,
        identity: customerAccount.identity,
      };

      request(app)
        .post(`/${apiVersion}/accounts/verify`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(requestor)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updates = response.body;

          expect(updates._id).to.exist;
          expect(updates._id).to.be.equal(customerAccount._id);
          expect(updates.number).to.be.equal(customerAccount.number);
          expect(updates.name).to.be.equal(customerAccount.name);

          done(error, response);
        });
    });

    it('should handle DELETE /accounts/:id/accessors/:phone', done => {
      const accessor = customerAccount.accessors[0];
      const { phone } = accessor;

      request(app)
        .delete(
          `/${apiVersion}/accounts/${customerAccount._id}/accessors/${phone}`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(customerAccount._id);
          expect(deleted.number).to.be.equal(customerAccount.number);
          expect(deleted.name).to.be.equal(customerAccount.name);

          // assert accessors
          const _accessor = _.find(deleted.accessors, { phone });
          expect(_accessor).to.not.exist;

          customerAccount = deleted;

          done(error, response);
        });
    });

    it('should handle HTTP GET on /jurisdictions/:id/accounts', done => {
      request(app)
        .get(
          `/${apiVersion}/jurisdictions/${
            customerAccount.jurisdiction._id
          }/accounts`
        )
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
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

    it('should handle HTTP DELETE on /accounts/:id', done => {
      request(app)
        .delete(`/${apiVersion}/accounts/${customerAccount._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(customerAccount._id);
          expect(deleted.number).to.be.equal(customerAccount.number);
          expect(deleted.name).to.be.equal(customerAccount.name);

          done(error, response);
        });
    });

    after(done => clear(Jurisdiction, Account, done));
  });
});
