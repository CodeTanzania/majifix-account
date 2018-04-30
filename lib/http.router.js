'use strict';


/**
 * @module majifix-account
 * @apiDefine Account  Account
 *
 * @apiDescription A representation of an entity 
 * (i.e organization, individual, customer, or client) which 
 * receiving service(s) from a particular jurisdiction
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Account
 * @apiSuccess {String} _id Unique account identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under 
 * which this account belongs
 * @apiSuccess {String} number Unique human readable account number
 * @apiSuccess {String} name Human readable name of the account
 * @apiSuccess {String} phone Primary mobile phone number used to 
 * contact an account direct by a jurisdiction
 * @apiSuccess {String} [email] Primary email address used to contact 
 * @apiSuccess {String} [neighborhood] Human readable district or town 
 * of an account
 * @apiSuccess {String} [address] Human readable physical address of 
 * an account 
 * @apiSuccess {String} [locale="en"] defines the account's language, region 
 * and any special variant preferences
 * @apiSuccess {Object} location jurisdiction point of interest on account  
 * @apiSuccess {Number[]} location.coordinates data pair for 
 * longitude and latitude in format [ `<x>`, `<y>` ] 
 * or [ `<longitude>` , `<latitude>` ]
 * @apiSuccess {Number} location.coordinates[0] longitude  
 * @apiSuccess {Number} location.coordinates[1] latidute  
 * @apiSuccess {Object[]} [bills] account bill(or invoice) from jurisdiction
 * @apiSuccess {Number} [bills.number] account bill(or invoice) from jurisdiction
 * @apiSuccess {Object} [bills.period] bill(or invoice) period
 * @apiSuccess {String} [bills.period.name] Human readable period name e.g November, Jan-Jun etc
 * @apiSuccess {Date} [bills.period.billedAt] A date when a bill come to effect
 * @apiSuccess {Date} [bills.period.startedAt] A bill period start date(or time)
 * @apiSuccess {Date} [bills.period.endedAt] A bill period end date(or time)
 * @apiSuccess {Date} [bills.period.duedAt] A bill period due date(or time). 
 * Mostly used by jurisdiction to refer the date when an account should 
 * have already pay the bill
 * @apiSuccess {Object} [bills.balance] bill(or invoice) balances
 * @apiSuccess {Number} [bills.balance.outstand] Current bill period outstand balance
 * @apiSuccess {Number} [bills.balance.open] Current bill period open balance
 * @apiSuccess {Number} [bills.balance.charges] Current bill period charges
 * @apiSuccess {Number} [bills.balance.debt] Current bill period 
 * account total additional debt i.e loan
 * @apiSuccess {Number} [bills.balance.close] Current bill period close balance
 * @apiSuccess {Object} [bills.items] bill(or invoice) items
 * @apiSuccess {String} [bills.notes] Additional human readable 
 * information about the bill from jurisdiction 
 * @apiSuccess {Boolean} [active=true] state whether the account is 
 * active as per contract with a jurisdiction
 * 
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/**
 * @apiDefine Accounts
 * @apiSuccess {Object[]} data List of accounts
 * @apiSuccess {String} data._id Unique account identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] 
 * jurisdiction under which this account belongs
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * 
 */


/**
 * @apiDefine AccountRequestHeader
 *
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/**
 * @apiDefine AccountRequestHeaderExample
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const Router = require('@lykmapipo/express-common').Router;


/*** local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';
const DATE_FORMAT = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';


/*** declarations */
const Account = require(path.join(__dirname, 'account.model'));
const router = new Router({ version: API_VERSION });


/*** expose account model */
Object.defineProperty(router, 'Model', {
  get() {
    return Account;
  }
});



/**
 * @api {get} /accounts List Accounts
 * @apiVersion 1.0.0
 * @apiName GetAccounts
 * @apiGroup Account
 *  
 * @apiDescription Returns a list of accounts
 *
 * @apiUse AccountRequestHeader
 *
 * @apiUse Accounts
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse AccountRequestHeaderExample
 *   
 */
router.get('/accounts', function getAccounts(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Account
    .get(options, function onGetAccounts(error, results) {

      //foward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        //set last modified headers
        if (results.lastModified) {
          results.lastModified =
            moment(results.lastModified).format(DATE_FORMAT);
          response.set('Last-Modified', results.lastModified);
        }
        response.status(200);
        response.json(results);
      }

    });

});



/**
 * @api {post} /accounts Create New Account
 * @apiVersion 1.0.0
 * @apiName PostAccount
 * @apiGroup Account
 *  
 * @apiDescription Create new account
 *
 * @apiUse AccountRequestHeader
 *
 * @apiUse Account
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse AccountRequestHeaderExample
 *   
 */
router.post('/accounts', function postAccount(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Account
    .post(body, function onPostAccount(error, created) {

      //foward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});



/**
 * @api {get} /accounts/:id Get Existing Account
 * @apiVersion 1.0.0
 * @apiName GetAccount
 * @apiGroup Account
 *  
 * @apiDescription Get existing account
 *
 * @apiUse AccountRequestHeader
 *
 * @apiUse Account
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse AccountRequestHeaderExample
 *   
 */
router.get('/accounts/:id', function getAccount(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain account id
  options._id = request.params.id;

  Account
    .getById(options, function onGetAccount(error, found) {

      //foward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /accounts/:id Patch Existing Account
 * @apiVersion 1.0.0
 * @apiName PatchAccount
 * @apiGroup Account
 *  
 * @apiDescription Patch existing account
 *
 * @apiUse AccountRequestHeader
 *
 * @apiUse Account
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse AccountRequestHeaderExample
 *   
 */
router.patch('/accounts/:id', function patchAccount(request, response, next) {

  //obtain account id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  Account
    .patch(_id, patches, function onPatchAccount(error, patched) {

      //foward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



/**
 * @api {put} /accounts/:id Put Existing Account
 * @apiVersion 1.0.0
 * @apiName PutAccount
 * @apiGroup Account
 *  
 * @apiDescription Put existing account
 *
 * @apiUse AccountRequestHeader
 *
 * @apiUse Account
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse AccountRequestHeaderExample
 *   
 */
router.put('/accounts/:id', function putAccount(request, response, next) {

  //obtain account id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  Account
    .put(_id, updates, function onPutAccount(error, updated) {

      //foward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});



/**
 * @api {delete} /accounts/:id Delete Existing Account
 * @apiVersion 1.0.0
 * @apiName DeleteAccount
 * @apiGroup Account
 *  
 * @apiDescription Delete existing account
 *
 * @apiUse AccountRequestHeader
 *
 * @apiUse Account
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse AccountRequestHeaderExample
 *   
 */
router.delete('/accounts/:id', function deleteAccount(request, response, next) {

  //obtain account id
  const _id = request.params.id;

  Account
    .del(_id, function onDeleteAccount(error, deleted) {

      //foward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});


/*** expose router */
module.exports = router;