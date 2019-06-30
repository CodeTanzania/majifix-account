/* dependencies */
import { expect } from 'chai';
import account from '../../src/index';

describe('account', () => {
  it('should be exported', () => {
    expect(account).to.exist;
    expect(account).to.be.a('function');
    expect(account.name).to.be.equal('account');
    expect(account.length).to.be.equal(1);
  });

  it('should be export Account', () => {
    const { Account } = account({
      fetchAccount: (identity, fetchedAt, done) => done(null, {}),
    });
    expect(Account).to.exist;
    expect(Account.fetchAccount).to.exist;
  });
});
