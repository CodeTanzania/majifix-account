'use strict';


/**
 * @module majifix-account
 * @apiDefine Account  Account
 *
 * @apiDescription A representation of an entity 
 * (i.e organization, individual, customer, or client) which 
 * receiving service(s) from a particular jurisdiction.
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
 * @apiSuccess {Object} [location] jurisdiction point of interest on account
 * @apiSuccess {Number[]} [location.coordinates=undefined] data pair for
 * longitude and latitude in format [ `<x>`, `<y>` ]
 * or [ `<longitude>` , `<latitude>` ]
 * @apiSuccess {Number} [location.coordinates[0]] longitude
 * @apiSuccess {Number} [location.coordinates[1]] latitude
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
 * @apiSuccess {String} [bills.items.name] Human readable name of bill item
 * @apiSuccess {Number} [bills.items.quantity] Bill item quantity
 * @apiSuccess {Number} [bills.items.price] Bill item total price
 * e.g if quantity if 5 then price must be total for all of the 5 item
 * @apiSuccess {String} [bills.items.unit] Human readable unit of bill item
 * @apiSuccess {String} [bills.notes] Additional human readable
 * information about the bill from jurisdiction
 * @apiSuccess {Boolean} [active=true] state whether the account is
 * active as per contract with a jurisdiction
 * @apiSuccess {Date} createdAt Date when account was created
 * @apiSuccess {Date} updatedAt Date when account was last updated
 *
 */


/**
 * @apiDefine Accounts
 * @apiSuccess {Object[]} data List of accounts
 * @apiSuccess {String} data._id Unique account identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] jurisdiction under
 * which this account belongs
 * @apiSuccess {String} data.number Unique human readable account number
 * @apiSuccess {String} data.name Human readable name of the account
 * @apiSuccess {String} data.phone Primary mobile phone number used to
 * contact an account direct by a jurisdiction
 * @apiSuccess {String} [data.email] Primary email address used to contact
 * @apiSuccess {String} [data.neighborhood] Human readable district or town
 * of an account
 * @apiSuccess {String} [data.address] Human readable physical address of
 * an account
 * @apiSuccess {String} [data.locale="en"] defines the account's language, region
 * and any special variant preferences
 * @apiSuccess {Object} [data.location] jurisdiction point of interest on account
 * @apiSuccess {Number[]} [data.location.coordinates=undefined] data pair for
 * longitude and latitude in format [ `<x>`, `<y>` ]
 * or [ `<longitude>` , `<latitude>` ]
 * @apiSuccess {Number} [data.location.coordinates[0]] longitude
 * @apiSuccess {Number} [data.location.coordinates[1]] latitude
 * @apiSuccess {Object[]} [data.bills] account bill(or invoice) from jurisdiction
 * @apiSuccess {Number} [data.bills.number] account bill(or invoice) from jurisdiction
 * @apiSuccess {Object} [data.bills.period] bill(or invoice) period
 * @apiSuccess {String} [data.bills.period.name] Human readable period name e.g November, Jan-Jun etc
 * @apiSuccess {Date} [data.bills.period.billedAt] A date when a bill come to effect
 * @apiSuccess {Date} [data.bills.period.startedAt] A bill period start date(or time)
 * @apiSuccess {Date} [data.bills.period.endedAt] A bill period end date(or time)
 * @apiSuccess {Date} [data.bills.period.duedAt] A bill period due date(or time).
 * Mostly used by jurisdiction to refer the date when an account should
 * have already pay the bill
 * @apiSuccess {Object} [data.bills.balance] bill(or invoice) balances
 * @apiSuccess {Number} [data.bills.balance.outstand] Current bill period outstand balance
 * @apiSuccess {Number} [data.bills.balance.open] Current bill period open balance
 * @apiSuccess {Number} [data.bills.balance.charges] Current bill period charges
 * @apiSuccess {Number} [data.bills.balance.debt] Current bill period
 * account total additional debt i.e loan
 * @apiSuccess {Number} [data.bills.balance.close] Current bill period close balance
 * @apiSuccess {Object} [data.bills.items] bill(or invoice) items
 * @apiSuccess {String} [data.bills.items.name] Human readable name of bill item
 * @apiSuccess {Number} [data.bills.items.quantity] Bill item quantity
 * @apiSuccess {Number} [data.bills.items.price] Bill item total price
 * e.g if quantity if 5 then price must be total for all of the 5 item
 * @apiSuccess {String} [data.bills.items.unit] Human readable unit of bill item
 * @apiSuccess {String} [data.bills.notes] Additional human readable
 * information about the bill from jurisdiction
 * @apiSuccess {Boolean} [data.active=true] state whether the account is
 * active as per contract with a jurisdiction
 * @apiSuccess {Date} data.createdAt Date when account was created
 * @apiSuccess {Date} data.updatedAt Date when account was last updated
 * @apiSuccess {Number} total Total number of client
 * @apiSuccess {Number} size Number of client returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest account
 * was last modified
 *
 */


/**
 * @apiDefine AccountSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "_id": "5ae6e306f6eea02c073de6eb",
 *    "number": "50524",
 *    "name": "Terrell Stoltenberg",
 *    "phone": "809-584-7580",
 *    "email": "ayden.goodwin@majifix.com",
 *    "neighborhood": "Joanieborough",
 *    "address": "30337 Cristobal Divide",
 *    "locale": "en",
 *    "location":
 *    {
 *      "type": "Point",
 *      "coordinates": [
 *        39.2563, -6.9328
 *      ]
 *    },
 *    "bills": [
 *    {
 *      "number": "895052418",
 *      "period":
 *      {
 *        "billedAt": "2018-03-30T09:33:57.784Z",
 *        "startedAt": "2018-02-28T09:33:57.784Z",
 *        "endedAt": "2018-03-30T09:33:57.784Z",
 *        "duedAt": "2018-04-30T09:33:57.784Z"
 *      },
 *      "balance":
 *      {
 *        "outstand": 3235,
 *        "open": 7,
 *        "charges": 210,
 *        "debt": 281,
 *        "close": 145
 *      },
 *      "items": [
 *      {
 *        "name": "Previous Readings",
 *        "quantity": 281,
 *        "unit": "cbm"
 *      },
 *      {
 *        "name": "Current Readings",
 *        "quantity": 206,
 *        "unit": "cbm"
 *      },
 *      {
 *        "name": "Unit Consumed",
 *        "quantity": 80,
 *        "unit": "cbm"
 *      }],
 *      "notes": "Veniam dolorum totam sint excepturi culpa voluptatem quasi."
 *    }],
 *    "createdAt": "2018-04-30T09:33:58.451Z",
 *    "updatedAt": "2018-04-30T09:33:58.451Z",
 *    "active": true
 *  }
 *
 */


/**
 * @apiDefine AccountsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "data": [{
 *      "_id": "5ae6e306f6eea02c073de6eb",
 *      "number": "50524",
 *      "name": "Terrell Stoltenberg",
 *      "phone": "809-584-7580",
 *      "email": "ayden.goodwin@majifix.com",
 *      "neighborhood": "Joanieborough",
 *      "address": "30337 Cristobal Divide",
 *      "locale": "en",
 *      "location":
 *      {
 *        "type": "Point",
 *        "coordinates": [
 *          39.2563, -6.9328
 *          ]
 *      },
 *      "bills": [{
 *        "number": "895052418",
 *        "period":
 *        {
 *          "billedAt": "2018-03-30T09:33:57.784Z",
 *          "startedAt": "2018-02-28T09:33:57.784Z",
 *          "endedAt": "2018-03-30T09:33:57.784Z",
 *          "duedAt": "2018-04-30T09:33:57.784Z"
 *        },
 *        "balance":
 *        {
 *          "outstand": 3235,
 *          "open": 7,
 *          "charges": 210,
 *          "debt": 281,
 *          "close": 145
 *        },
 *        "items": [
 *        {
 *          "name": "Previous Readings",
 *          "quantity": 281,
 *          "unit": "cbm"
 *        },
 *        {
 *          "name": "Current Readings",
 *          "quantity": 206,
 *          "unit": "cbm"
 *        },
 *        {
 *          "name": "Unit Consumed",
 *          "quantity": 80,
 *          "unit": "cbm"
 *         }],
 *         "notes": "Veniam dolorum totam sint excepturi culpa voluptatem quasi."
 *       }],
 *       "createdAt": "2018-04-30T09:33:58.451Z",
 *       "updatedAt": "2018-04-30T09:33:58.451Z",
 *       "active": true
 *      }],
 *      "total": 20,
 *      "size": 10,
 *      "limit": 10,
 *      "skip": 0,
 *      "page": 1,
 *      "pages": 2,
 *      "lastModified": "Mon, 30 Apr 2018 12:33:58 GMT"
 *   }
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


/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';


/* declarations */
const Account = require(path.join(__dirname, 'account.model'));
const router = new Router({
  version: API_VERSION
});


/* expose account model */
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
 * @apiUse AccountsSuccessResponse
 *
 */
router.get('/accounts', function getAccounts(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Account
    .get(options, function onGetAccounts(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
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
 * @apiUse AccountSuccessResponse
 *
 */
router.post('/accounts', function postAccount(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Account
    .post(body, function onPostAccount(error, created) {

      //forward error
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
 * @apiUse AccountSuccessResponse
 *
 */
router.get('/accounts/:id', function getAccount(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain account id
  options._id = request.params.id;

  Account
    .getById(options, function onGetAccount(error, found) {

      //forward error
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
 * @apiUse AccountSuccessResponse
 *
 */
router.patch('/accounts/:id', function patchAccount(request, response, next) {

  //obtain account id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  Account
    .patch(_id, patches, function onPatchAccount(error, patched) {

      //forward error
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
 * @apiUse AccountSuccessResponse
 *
 */
router.put('/accounts/:id', function putAccount(request, response, next) {

  //obtain account id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  Account
    .put(_id, updates, function onPutAccount(error, updated) {

      //forward error
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
 * @apiUse AccountSuccessResponse
 *
 */
router.delete('/accounts/:id', function deleteAccount(request, response, next) {

  //obtain account id
  const _id = request.params.id;

  Account
    .del(_id, function onDeleteAccount(error, deleted) {

      //forward error
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


/* expose router */
module.exports = router;