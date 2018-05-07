'use strict';

//ensure mongo uri
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-account');

//dependencies
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { Jurisdiction } = require('majifix-jurisdiction');
const { Account, app } = require(path.join(__dirname, '..'));
let samples = require('./samples')(20);

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      Account.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedJurisdiction(next) {
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.post(next);
    },

    function seedAccounts(jurisdiction, next) {
      //fake accounts
      samples = _.map(samples, function (sample) {
        sample.jurisdiction = jurisdiction;
        return sample;
      });
      Account.create(samples, next);
    }

  ], function (error, results) {

    //fire the app
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}/v1.0.0/accounts`);
    });

  });

}

boot();