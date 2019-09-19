import _ from 'lodash';
import { expect, faker, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import account from '../../src';

const { Account } = account;

describe('Account verify', () => {
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

  it('should be able to verify access by account', done => {
    const accessor = {
      account: customerAccount.number,
      phone: customerAccount.phone,
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.not.exist;
      expect(verified).to.exist;
      expect(verified._id).to.eql(customerAccount._id);
      expect(verified.number).to.eql(customerAccount.number);
      done(error, verified);
    });
  });

  it('should be able to verify access by identity', done => {
    const accessor = {
      identity: customerAccount.identity,
      phone: customerAccount.phone,
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.not.exist;
      expect(verified).to.exist;
      expect(verified._id).to.eql(customerAccount._id);
      expect(verified.number).to.eql(customerAccount.number);
      expect(verified.identity).to.eql(customerAccount.identity);
      done(error, verified);
    });
  });

  it('should be able to verify access by account', done => {
    const accessor = {
      account: customerAccount.number,
      phone: customerAccount.accessors[0].phone,
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.not.exist;
      expect(verified).to.exist;
      expect(verified._id).to.eql(customerAccount._id);
      expect(verified.number).to.eql(customerAccount.number);
      done(error, verified);
    });
  });

  it('should be able to verify access by identity', done => {
    const accessor = {
      identity: customerAccount.identity,
      phone: customerAccount.accessors[0].phone,
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.not.exist;
      expect(verified).to.exist;
      expect(verified._id).to.eql(customerAccount._id);
      expect(verified.number).to.eql(customerAccount.number);
      expect(verified.identity).to.eql(customerAccount.identity);
      done(error, verified);
    });
  });

  it('should be able to verify shallow access by account', done => {
    const accessor = {
      account: customerAccount.number,
      phone: faker.phone.phoneNumber(),
      shallow: true,
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.not.exist;
      expect(verified).to.exist;
      expect(verified._id).to.eql(customerAccount._id);
      expect(verified.number).to.eql(customerAccount.number);

      const _accessor = _.find(verified.accessors, { phone: accessor.phone });
      expect(_accessor).to.exist;
      expect(_accessor.verifiedAt).to.not.exist;
      expect(_accessor.phone).to.be.equal(accessor.phone);

      done(error, verified);
    });
  });

  it('should be able to verify shallow access by identity', done => {
    const accessor = {
      identity: customerAccount.identity,
      phone: faker.phone.phoneNumber(),
      shallow: true,
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.not.exist;
      expect(verified).to.exist;
      expect(verified._id).to.eql(customerAccount._id);
      expect(verified.number).to.eql(customerAccount.number);
      expect(verified.identity).to.eql(customerAccount.identity);

      const _accessor = _.find(verified.accessors, { phone: accessor.phone });
      expect(_accessor).to.exist;
      expect(_accessor.verifiedAt).to.not.exist;
      expect(_accessor.phone).to.be.equal(accessor.phone);

      done(error, verified);
    });
  });

  it('should be able to restrict access', done => {
    const accessor = {
      account: customerAccount.number,
      phone: faker.phone.phoneNumber(),
    };

    Account.verify(accessor, (error, verified) => {
      expect(error).to.exist;
      expect(error.status).to.be.eql(202);
      expect(verified).to.not.exist;
      done();
    });
  });

  after(done => clear(Jurisdiction, Account, done));
});
