import _ from 'lodash';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import account from '../../src';

const { Account } = account;

describe('Account', () => {
  let customerAccount;
  before(done => clear(Account, done));

  describe('get by id', () => {
    before(done => {
      customerAccount = Account.fake();
      create(customerAccount, done);
    });

    it('should be able to get an instance', done => {
      Account.getById(customerAccount._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(customerAccount._id);
        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: customerAccount._id,
        select: 'number',
      };

      Account.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(customerAccount._id);
        expect(found.number).to.exist;

        // ...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(2);
        _.map(
          [
            'locale',
            'active',
            'bills',
            'name',
            'phone',
            'email',
            'neighborhood',
            'address',
            'location',
            'createdAt',
            'updatedAt',
          ],
          field => {
            expect(fields).to.not.include(field);
          }
        );

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      const { _id } = Account.fake();

      Account.getById(_id, (error, found) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(found).to.not.exist;
        done();
      });
    });
  });

  after(done => clear(Account, done));
});
