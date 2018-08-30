'use strict';


/**
 * @name majifix-account
 * @description A representation of an entity
 * (i.e organization, individual, customer, or client) which
 * receiving service(s) from a particular jurisdiction.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('@codetanzania/majifix-account');
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


/* import models */
const Account =
  require(path.join(__dirname, 'lib', 'account.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export function*/
function account() {}


/* export package(module) info */
account.info = info;


/* export account model */
account.Account = Account;


/* export account router */
account.router = router;


/* export router api version */
account.apiVersion = router.apiVersion;


/* export app */
Object.defineProperty(account, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind account router */
    app.mount(router);
    return app;
  }

});


exports = module.exports = account;
