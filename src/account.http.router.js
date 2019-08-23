import _ from 'lodash';
import async from 'async';
import { getString } from '@lykmapipo/env';
import { Router } from '@lykmapipo/express-common';
import Account from './account.model';

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_VERIFY = '/accounts/verify';
const PATH_LIST = '/accounts';
const PATH_SINGLE = '/accounts/:id';
const PATH_ACCESSORS = '/accounts/:id/accessors';
const PATH_ACCESSORS_SINGLE = '/accounts/:id/accessors/:phone';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/accounts';

/**
 * @name AccountHttpRouter
 * @namespace AccountHttpRouter
 *
 * @description A representation of an entity
 * (i.e organization, individual, customer, or client) which
 * receiving service(s) from a particular jurisdiction.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetAccounts
 * @memberof AccountHttpRouter
 * @description Returns a list of accounts
 */
router.get(PATH_LIST, function getAccounts(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  Account.get(options, function onGetAccounts(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @name PostAccount
 * @memberof AccountHttpRouter
 * @description Create new Account
 */
router.post(PATH_LIST, function postAccount(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  Account.post(body, function onPostAccount(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});

/**
 * @name GetAccount
 * @memberof AccountHttpRouter
 * @description Get existing account
 */
router.get(PATH_SINGLE, function getAccount(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  Account.getById(options, function onGetAccount(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @name PatchAccount
 * @memberof AccountHttpRouter
 * @description Patch existing account
 */
router.patch(PATH_SINGLE, function patchAccount(request, response, next) {
  // obtain account id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
  const patches = _.merge({}, request.body);

  Account.patch(_id, patches, function onPatchAccount(error, patched) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(patched);
    }
  });
});

/**
 * @name PutAccount
 * @memberof AccountHttpRouter
 * @description Put existing account
 */
router.put(PATH_SINGLE, function putAccount(request, response, next) {
  // obtain account id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
  const updates = _.merge({}, request.body);

  Account.put(_id, updates, function onPutAccount(error, updated) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(updated);
    }
  });
});

/**
 * @name DeleteAccount
 * @memberof AccountHttpRouter
 * @description Delete existing account
 */
router.delete(PATH_SINGLE, function deleteAccount(request, response, next) {
  // obtain account id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  Account.del(_id, function onDeleteAccount(error, deleted) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});

/**
 * @name GetJurisdictionAccounts
 * @memberof AccountHttpRouter
 * @description Returns a list of accounts of specified jurisdiction
 */
router.get(PATH_JURISDICTION, function getAccounts(request, response, next) {
  // obtain request options
  const { jurisdiction } = request.params;
  const filter = jurisdiction ? { filter: { jurisdiction } } : {};
  const options = _.merge({}, filter, request.mquery);

  Account.get(options, function onGetAccounts(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @name VerifyAccountAccess
 * @memberof AccountHttpRouter
 * @description Create new Account
 */
router.post(PATH_VERIFY, function verifyAccess(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  Account.verify(body, function onVerified(error, account) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(account);
    }
  });
});

/**
 * @name GetAccountAccessor
 * @memberof AccountHttpRouter
 * @description Get account accessors
 */
router.get(PATH_ACCESSORS, function getAccountAccessors(
  request,
  response,
  next
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // lockup account
  Account.getById(options, function onGetAccout(error, account) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(account);
    }
  });
});

/**
 * @name CreateAccountAccessor
 * @memberof AccountHttpRouter
 * @description Create account accessors
 */
router.post(PATH_ACCESSORS, function postAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor
  const accessor = request.body;

  // obtain accessor phone
  const { phone } = accessor;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function upsertAccessors(account, next) {
        account.upsertAccessor(phone, accessor).put(next);
      },
    ],
    function onUpsertAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name PatchAccountAccessor
 * @memberof AccountHttpRouter
 * @description Patch account accessors
 */
router.patch(PATH_ACCESSORS_SINGLE, function patchAccountAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor
  const accessor = request.body;

  // obtain accessor phone
  const { phone } = request.params;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function upsertAccessors(account, next) {
        account.upsertAccessor(phone, accessor).put(next);
      },
    ],
    function onUpsertAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name PutAccountAccessor
 * @memberof AccountHttpRouter
 * @description Put account accessors
 */
router.put(PATH_ACCESSORS_SINGLE, function putAccountAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor
  const accessor = request.body;

  // obtain accessor phone
  const { phone } = request.params;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function upsertAccessors(account, next) {
        account.upsertAccessor(phone, accessor).put(next);
      },
    ],
    function onUpsertAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name DeleteAccountAccessor
 * @memberof AccountHttpRouter
 * @description Delete account accessors
 */
router.delete(PATH_ACCESSORS_SINGLE, function removeAccountAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor phone
  const { phone } = request.params;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function removeAccessors(account, next) {
        account.removeAccessor(phone).put(next);
      },
    ],
    function onRemoveAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/* expose router */
export default router;
