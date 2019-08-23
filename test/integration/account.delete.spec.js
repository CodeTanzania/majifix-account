import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import account from '../../src';

const { Account } = account;

describe('Account', () => {
  let customerAccount;
  before(done => clear(Account, done));
  describe('static delete', () => {
    before(done => {
      customerAccount = Account.fake();
      customerAccount.post((error, created) => {
        customerAccount = created;
        done(error, created);
      });
    });

    it('should be able to delete', done => {
      Account.del(customerAccount._id, (error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(customerAccount._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', done => {
      Account.del(customerAccount._id, (error, deleted) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(deleted).to.not.exist;
        done();
      });
    });
  });

  describe('instance delete', () => {
    before(done => {
      customerAccount = Account.fake();
      customerAccount.post((error, created) => {
        customerAccount = created;
        done(error, created);
      });
    });

    it('should be able to delete', done => {
      customerAccount.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(customerAccount._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', done => {
      customerAccount.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(customerAccount._id);
        done();
      });
    });
  });

  after(done => clear(Account, done));
});
