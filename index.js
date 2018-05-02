'use strict';


/**
 * @name majifix-account
 * @description A representation of an entity (i.e organization, individual,
 *              customer, or client) which receiving service(s) from
 *              a particular jurisdiction
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const account = require('majifix-account');
 *
 * ...
 *
 * account.app.start();
 *
 */


/* dependencies */
const path = require('path');
const app = require('@lykmapipo/express-common');


/* import models */
const Account =
  require(path.join(__dirname, 'lib', 'account.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export account model */
exports.model = Account;
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