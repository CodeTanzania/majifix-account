import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import account from '../../src';

const { Account } = account;

describe('Account static put', () => {
  let customerAccount;

  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, Account, done));

  before(done => create(jurisdiction, done));

  before(done => {
    customerAccount = Account.fake();
    customerAccount.jurisdiction = jurisdiction;

    customerAccount.post((error, created) => {
      customerAccount = created;
      done(error, created);
    });
  });

  it('should be able to put', done => {
    customerAccount = customerAccount.fakeOnly('name');

    Account.put(customerAccount._id, customerAccount, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(customerAccount._id);
      expect(updated.name).to.eql(customerAccount.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = Account.fake().toObject();

    Account.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(Jurisdiction, Account, done));
});

describe('Account instance put', () => {
  let customerAccount;

  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, Account, done));

  before(done => create(jurisdiction, done));

  before(done => {
    customerAccount = Account.fake();
    customerAccount.jurisdiction = jurisdiction;

    customerAccount.post((error, created) => {
      customerAccount = created;
      done(error, created);
    });
  });

  it('should be able to put', done => {
    customerAccount = customerAccount.fakeOnly('name');

    customerAccount.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(customerAccount._id);
      expect(updated.name).to.eql(customerAccount.name);
      done(error, updated);
    });
  });

  it('should not throw if not exists', done => {
    customerAccount.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(customerAccount._id);
      done();
    });
  });

  after(done => clear(Jurisdiction, Account, done));
});
