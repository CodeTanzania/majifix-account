'use strict';


/**
 * @module majifix-account
 * @apiDefine Account  Account
 *
 * @apiDescription An entity(i.e application) that interact with 
 * resource server(i.e API Server) on behalf of end user.
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/*** local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';


/*** declarations */
const Account = require(path.join(__dirname, 'account.model'));
const router = new Router({ version: API_VERSION });


/*** expose account model */
Object.defineProperty(router, 'Model', {
  get() {
    return Account;
  }
});


/**TODO api doc*/
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
        response.status(200);
        response.json(results);
      }

    });

});


/**TODO api doc*/
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


/**TODO api doc*/
router.get('/accounts/:id', function getAccount(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain client id
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


/**TODO api doc*/
router.patch('/accounts/:id', function patchAccount(request, response, next) {

  //obtain client id
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


/**TODO api doc*/
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


/**TODO api doc*/
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