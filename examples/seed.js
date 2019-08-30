const _ = require('lodash');
const { waterfall } = require('async');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Account } = require('../lib');
const samples = require('./samples');

/* track seeding time */
let seedStart;
let seedEnd;

const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};

const clearSeed = next => clear(Account, Jurisdiction, () => next());

const seedJurisdiction = next => Jurisdiction.fake().post(next);

const seedAccount = (jurisdiction, next) => {
  let accounts = samples(50);

  accounts = _.forEach(accounts, sample => {
    const account = new Account(sample);
    account.set({ jurisdiction });
    return account;
  });

  Account.create(accounts, next);
};

const seed = () => {
  seedEnd = Date.now();
  waterfall([clearSeed, seedJurisdiction, seedAccount], (error, results) => {
    if (error) {
      throw error;
    }
    seedEnd = Date.now();

    log('time', null, seedEnd - seedStart);
    log('final', error, results);
    process.exit(0);
  });
};

// connect and seed
connect(error => {
  if (error) {
    throw error;
  }
  seed();
});
