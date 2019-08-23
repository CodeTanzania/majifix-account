import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import account from '../../src';

const { Account } = account;

describe('Account', () => {
  let customerAccount;
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, Account, done));

  before(done => create(jurisdiction, done));

  describe('static post', () => {
    it('should be able to post', done => {
      customerAccount = Account.fake();
      customerAccount.jurisdiction = jurisdiction;

      Account.post(customerAccount, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(customerAccount._id);
        expect(created.jurisdiction._id).to.eql(
          customerAccount.jurisdiction._id
        );
        expect(created.name).to.eql(customerAccount.name);
        expect(created.number).to.eql(customerAccount.number);
        done(error, created);
      });
    });
  });

  describe('instance post', () => {
    it('should be able to post', done => {
      customerAccount = Account.fake();
      customerAccount.jurisdiction = jurisdiction;

      customerAccount.post((error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(customerAccount._id);
        expect(created.name).to.eql(customerAccount.name);
        expect(created.number).to.eql(customerAccount.number);
        done(error, created);
      });
    });
  });

  after(done => clear(Jurisdiction, Account, done));
});
