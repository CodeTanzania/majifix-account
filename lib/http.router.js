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
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under which this account belongs
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