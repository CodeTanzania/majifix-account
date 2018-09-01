'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const faker = require('@benmaruchu/faker');
const { Account } = require(path.join(__dirname, '..', '..'));

describe('Account', () => {

  let account;

  before((done) => {
    Account.deleteMany(done);
  });

  describe.skip('instance fetch', () => {});

  describe('static fetch', () => {

    before((done) => {
      account = Account.fake();
      account.post((error, created) => {
        account = created;
        done(error, created);
      });
    });

    it('should have fetch capability', () => {
      expect(Account.fetch).to.exist;
      expect(Account.fetch).to.be.a('function');
      expect(Account.fetch.length).to.be.equal(3);
    });

    it('should be able to fetch with invalid args length', (done) => {
      const { identity } = Account.fake();
      Account.fetch(identity, (error, fetched) => {
        expect(error).to.not.exist;
        expect(fetched).to.exist;
        expect(fetched).to.be.empty;
        done(error, fetched);
      });
    });

    it('should be able to fetch with invalid args length', (done) => {
      Account.fetch((error, fetched) => {
        expect(error).to.not.exist;
        expect(fetched).to.exist;
        expect(fetched).to.be.empty;
        done(error, fetched);
      });
    });

    it('should be able to fetch without provider', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetch(identity, fetchedAt, (error, fetched) => {
        expect(error).to.not.exist;
        expect(fetched).to.exist;
        expect(fetched).to.be.empty;
        done(error, fetched);
      });
    });

    it('should be able to fetch with provider', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(null, {
          name: faker.name.findName()
        });
      };

      Account.fetch(identity, fetchedAt, (error, fetched) => {
        expect(error).to.not.exist;
        expect(fetched).to.exist;
        expect(fetched).to.be.not.be.empty;
        expect(fetched.name).to.exist;
        expect(fetched.fetchedAt).to.exist;
        delete Account.fetchAccount;
        done(error, fetched);
      });
    });

    it('should be able to fetch with provider', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(null, {
          name: faker.name.findName(),
          bills: [],
          accessors: []
        });
      };

      Account.fetch(identity, fetchedAt, (error, fetched) => {
        expect(error).to.not.exist;
        expect(fetched).to.exist;
        expect(fetched).to.be.not.be.empty;
        expect(fetched.name).to.exist;
        expect(fetched.fetchedAt).to.exist;
        delete Account.fetchAccount;
        done(error, fetched);
      });
    });

    it('should be able to handle fetch with provider error', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(new Error('No Data'));
      };

      Account.fetch(identity, fetchedAt, (error, fetched) => {
        expect(error).to.exist;
        expect(fetched).to.not.exist;
        done();
      });
    });

    it('should be able to fetch and upsert without provider', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetchAndUpsert(identity, fetchedAt, (error) => {
        expect(error).to.exist;
        done();
      });
    });

    it('should be able to fetch and upsert with provider', (done) => {
      const account = Account.fake();

      const { identity, fetchedAt } = account;
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(null, account.toObject());
      };

      Account.fetchAndUpsert(identity, fetchedAt, (error, upserted) => {
        expect(error).to.not.exist;
        expect(upserted).to.exist;
        expect(upserted).to.be.not.be.empty;
        expect(upserted.identity).to.be.eql(account.identity);
        expect(upserted.fetchedAt).to.exist;
        delete Account.fetchAccount;
        done(error, upserted);
      });
    });

    it('should be able to fetch and upsert with provider', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(null, {
          name: faker.name.findName(),
          bills: [],
          accessors: []
        });
      };

      Account.fetchAndUpsert(identity, fetchedAt, (error) => {
        expect(error).to.exist;
        delete Account.fetchAccount;
        done();
      });
    });

    it('should be able to handle fetch and upsert with error', (done) => {
      const { identity, fetchedAt } = Account.fake();
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(new Error('No Data'));
      };

      Account.fetchAndUpsert(identity, fetchedAt, (error) => {
        expect(error).to.exist;
        done();
      });
    });

    it('should be able to handle fetch and upsert existing', (done) => {
      const { identity, fetchedAt } = account;
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(null, {});
      };

      Account.fetchAndUpsert(identity, fetchedAt, (error, upserted) => {
        expect(error).to.not.exist;
        expect(upserted).to.exist;
        expect(upserted.number).to.be.eql(account.number);
        expect(upserted.fetchedAt).to.exist;
        done();
      });
    });

    it('should be able to fetch if get by filter miss', (done) => {
      const account = Account.fake();
      const options = { filter: { number: account.number } };
      Account.fetchAccount = (identity, fetchedAt, cb) => {
        return cb(null, account.toObject());
      };

      Account.get(options, (error, fetched) => {
        expect(error).to.not.exist;
        expect(fetched).to.exist;
        expect(fetched.data).to.be.not.be.empty;
        expect(fetched.data).to.have.length.at.least(1);
        delete Account.fetchAccount;
        done(error, fetched);
      });
    });

    it('should be able to fetch if get by filter miss', (done) => {
      const account = Account.fake();
      const options = { filter: { number: account.number } };

      Account
        .get(options, (error, fetched) => {
          expect(error).to.not.exist;
          expect(fetched).to.exist;
          expect(fetched.data).to.be.be.empty;
          done(error, fetched);
        });
    });

    it('should not fetch if get found data', (done) => {
      const options = { filter: { number: account.number } };

      Account
        .get(options, (error, fetched) => {
          expect(error).to.not.exist;
          expect(fetched).to.exist;
          expect(fetched.data).to.be.not.be.empty;
          expect(fetched.data).to.have.length.at.least(1);
          done(error, fetched);
        });
    });

  });

  after((done) => {
    Account.deleteMany(done);
  });

});
