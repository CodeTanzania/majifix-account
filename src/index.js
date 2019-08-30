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
 * const { Account, start } = require('@codetanzania/majifix-account');
 * start(error => { ... });
 *
 */
import _ from 'lodash';
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { start } from '@lykmapipo/express-common';
import Account from './account.model';
import accountRouter from './account.http.router';

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/* export function */
const account = integration => {
  // ensure integration
  if (integration) {
    const { fetchAccount } = integration;
    if (_.isFunction(fetchAccount)) {
      Account.fetchAccount = fetchAccount;
    }
  }
  return account;
};

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
account.info = info;

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.apiVersion = httpApiVersion();

/**
 * @name accountRouter
 * @description account http router
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.accountRouter = accountRouter;

/**
 * @name Account
 * @description Account model
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.Account = Account;

/**
 * @function start
 * @name start
 * @description start http server
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.start = start;

export default account;
