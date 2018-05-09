'use strict';


/**
 * @name majifix-account
 * @description A representation of an entity 
 * (i.e organization, individual, customer, or client) which 
 * receiving service(s) from a particular jurisdiction.
 * 
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('majifix-account');
 *
 * ...
 *
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];
const info = _.merge({}, _.pick(pkg, fields));


/* ensure api version */
process.env.API_VERSION = (process.env.API_VERSION || info.version);


/* import models */
const Account =
  require(path.join(__dirname, 'lib', 'account.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export package(module) info */
exports.info = info;


/* export account model */
exports.Account = Account;


/* export account router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind account router */
    app.mount(router);
    return app;
  }

});