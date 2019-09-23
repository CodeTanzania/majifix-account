import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  clear as clearDb,
  create,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import account from '../../src';

const { Account, accountRouter } = account;

describe('Account Rest API', () => {
  const jurisdiction = Jurisdiction.fake();
  const customerAccount = Account.fake();
  customerAccount.set({ jurisdiction });

  const options = {
    pathList: '/accounts',
    pathSingle: '/accounts/:id',
    pathSchema: '/accounts/schema/',
    pathExport: '/accounts/export/',
  };

  before(done => clearDb(Account, Jurisdiction, done));

  before(() => clearHttp());

  before(done => create(jurisdiction, done));

  it('should handle POST /accounts', done => {
    const { testPost } = testRouter(options, accountRouter);
    testPost({ ...customerAccount.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Account(body);
        expect(created._id).to.exist.and.be.eql(customerAccount._id);
        expect(created.number).to.exist.and.be.eql(customerAccount.number);
        expect(created.name).to.exist.and.be.eql(customerAccount.name);
        done(error, body);
      });
  });

  it.skip('should handle GET /accounts/schema', done => {
    const { testGetSchema } = testRouter(options, accountRouter);
    testGetSchema().expect(200, done);
  });

  it.skip('should handle GET /accounts/export', done => {
    const { testGetExport } = testRouter(options, accountRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle GET /accounts', done => {
    const { testGet } = testRouter(options, accountRouter);
    testGet()
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        // expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /accounts by filters', done => {
    const { testGet } = testRouter(options, accountRouter);
    testGet()
      .query({ filter: { number: customerAccount.number } })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        // expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /accounts/:id', done => {
    const { testGet } = testRouter(options, accountRouter);
    const params = { id: customerAccount._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Account(body);
        expect(found._id).to.exist.and.be.eql(customerAccount._id);
        expect(found.number).to.exist.and.be.eql(customerAccount.number);
        expect(found.name).to.exist.and.be.eql(customerAccount.name);
        done(error, body);
      });
  });

  it('should handle PATCH /accounts/:id', done => {
    const { testPatch } = testRouter(options, accountRouter);
    const { name } = customerAccount.fakeOnly('name');
    const params = { id: customerAccount._id.toString() };
    testPatch(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Account(body);
        expect(patched._id).to.exist.and.be.eql(customerAccount._id);
        expect(patched.number).to.exist.and.be.eql(customerAccount.number);
        expect(patched.name).to.exist.and.be.eql(customerAccount.name);
        done(error, body);
      });
  });

  it('should handle PUT /accounts/:id', done => {
    const { testPut } = testRouter(options, accountRouter);
    const { name } = customerAccount.fakeOnly('name');
    const params = { id: customerAccount._id.toString() };
    testPut(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Account(body);
        expect(patched._id).to.exist.and.be.eql(customerAccount._id);
        expect(patched.number).to.exist.and.be.eql(customerAccount.number);
        expect(patched.name).to.exist.and.be.eql(customerAccount.name);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /accounts/:id', done => {
    const { testDelete } = testRouter(options, accountRouter);
    const params = { id: customerAccount._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Account(body);
        expect(patched._id).to.exist.and.be.eql(customerAccount._id);
        expect(patched.number).to.exist.and.be.eql(customerAccount.number);
        expect(patched.name).to.exist.and.be.eql(customerAccount.name);
        done(error, body);
      });
  });

  it.skip('should handle POST /accounts/verify', done => {
    const { testPost } = testRouter(options, accountRouter);
    const requestor = {
      phone: customerAccount.phone,
      account: customerAccount.number,
    };

    testPost(requestor)
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const updates = new Account(body);
        expect(updates._id).to.exist.and.be.eql(customerAccount._id);
        expect(updates.number).to.exist.and.be.eql(customerAccount.number);
        expect(updates.name).to.exist.and.be.eql(customerAccount.name);
        done(error, body);
      });
  });

  it.skip('should handle HTTP GET on /jurisdictions/:id/accounts', done => {
    const { testGet } = testRouter(options, accountRouter);
    const params = { id: customerAccount._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const result = new Account(body);
        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        // expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(Jurisdiction, Account, done));
});
