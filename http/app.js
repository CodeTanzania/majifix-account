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
 * const account = require('@lykmapipo/majifix-account');
 *
 * ...
 * 
 * account.start();
 * 
 */


/*** dependencies */
const path = require('path');
const app = require('@lykmapipo/express-common');


/*** import models */
const modelsPath = path.join(__dirname, '..', 'models');
const Account = require(path.join(modelsPath, 'account'));


/**import routers*/
const router = require(path.join(__dirname, 'router'));


/*** export account model */
app.model = Account;


/*** export account router */
app.router = router


/*** export app */
module.exports = app;