/* ensure mongo uri */
process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/majifix-account';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
// mongoose.set('debug', true);
const { get, mount, start } = require('@lykmapipo/express-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');

const { Account, accountRouter, apiVersion, info } = require(path.join(
  __dirname,
  '..'
));

let samples = require('./samples')(20);

/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);

/**
 *
 */
function boot() {
  async.waterfall(
    [
      function clear(next) {
        Account.remove(function(/* error, results */) {
          next();
        });
      },

      function clearJurisdiction(next) {
        Jurisdiction.remove(function(/* error, results */) {
          next();
        });
      },

      function seedJurisdiction(next) {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.post(next);
      },

      function seedAccounts(jurisdiction, next) {
        /* fake accounts */
        samples = _.map(samples, function(sample, index) {
          if (index % 2 === 0) {
            sample.jurisdiction = jurisdiction;
          }
          return sample;
        });
        Account.create(samples, next);
      },
    ],
    function(error, results) {
      /* expose module info */
      get('/', function(request, response) {
        response.status(200);
        response.json(info);
      });

      // mount routers
      mount(accountRouter);

      /* fire the app */
      start(function(error, env) {
        console.log(`visit http://0.0.0.0:${env.PORT}/${apiVersion}/accounts`);
      });
    }
  );
}

boot();
