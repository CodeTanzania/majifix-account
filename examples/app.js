'use strict';

//ensure mongo uri
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-account');

//dependencies
const path = require('path');
const async = require('async');
const mongoose = require('mongoose');
const { Account, app } = require(path.join(__dirname, '..'));
const samples = require('./samples')(20);

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clear(next) {
      Account.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seed(next) {
      //fake accounts
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