/* dependencies */
import _ from 'lodash';
import { expect } from 'chai';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import account from '../../src/index';

const { Account } = account;

describe('Account GetPhones', () => {
  let customerAccounts;
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, Account, done));

  before(done => create(jurisdiction, done));

  // let accounts;

  before(done => {
    customerAccounts = Account.fake(32);
    customerAccounts = _.map(customerAccounts, (data, index) => {
      customerAccounts = data;
      if (index % 2 === 0) {
        customerAccounts.jurisdiction = jurisdiction;
      }
      return customerAccounts;
    });
    create(...customerAccounts, done);
  });

  it('should be able to get without options', done => {
    Account.getPhones((error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results).to.have.length(32);
      done(error, results);
    });
  });

  it('should be able to get with options', done => {
    const criteria = { jurisdiction: { $in: [jurisdiction._id] } };
    Account.getPhones(criteria, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results).to.have.length(16);
      done(error, results);
    });
  });

  it('should be able to get with options', done => {
    const criteria = {
      $or: [
        { jurisdiction: { $in: [jurisdiction._id] } },
        { jurisdiction: null },
      ],
    };
    Account.getPhones(criteria, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results).to.have.length(32);
      done(error, results);
    });
  });

  after(done => clear(Jurisdiction, Account, done));
});
