/**
 * @module majifix-account
 * @name Account
 * @description A representation of an entity
 * (i.e organization, individual, customer, or client) which
 * receiving service(s) from a particular jurisdiction.
 *
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction}
 * @see {@link https://en.wikipedia.org/wiki/Customer}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */

// TODO add push notification(apns, fcm) details
// TODO add device details
// TODO implement majifix-alerts and depend on it
// TODO fetch multi jurisdiction level(or hierarchy)
// TODO add dependencies to messages(for email, sms, ivr etc)
// TODO send alerts(messages) in background
// TODO restrict account delete with 403 Forbidden
// TODO payment history
// TODO add i10n label to fields

/* dependencies */
import _ from 'lodash';
import async from 'async';
import moment from 'moment';
import mongoose from 'mongoose';
import actions from 'mongoose-rest-actions';
import { Point } from 'mongoose-geojson-schemas';
import { getString } from '@lykmapipo/env';
import {
  phone as phoneUtils,
  schema,
  models,
} from '@codetanzania/majifix-common';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';

/** declarations */
import Bill from './bill.schema';
import Accessor from './accessor.schema';

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;
const { toE164 } = phoneUtils;
const isEmpty = v => {
  if (_.isNumber(v)) {
    return false;
  }
  if (_.isBoolean(v)) {
    return false;
  }
  if (_.isDate(v)) {
    return false;
  }
  return _.isEmpty(v);
};

/* local constants */
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const { JURISDICTION_MODEL_NAME, ACCOUNT_MODEL_NAME } = models;
const { SCHEMA_OPTIONS } = schema;

/**
 * @name AccountSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const AccountSchema = new Schema(
  {
    /**
     * @name jurisdiction
     * @description jurisdiction under which this account belongs.
     *
     * This is applicable where multiple jurisdiction(s) utilize
     * same majifix system(or platform)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {object} autopopulate.select - jurisdiction fields to
     * select when populating
     * @property {boolean} index - ensure database index
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    jurisdiction: {
      type: ObjectId,
      ref: JURISDICTION_MODEL_NAME,
      exists: true,
      autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
      index: true,
    },

    /**
     * @name category
     * @description Human readable category of the account(or customer)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    category: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'name',
        type: 'jobType',
      },
    },

    /**
     * @name number
     * @description Unique human readable account number.
     *
     * Used as a unique identifier for an account per jurisdiction.
     *
     * This should be a real account number from e.g billing system,
     * membership database etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} uppercase - force upper casing
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    number: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      uppercase: true,
      fake: {
        generator: 'finance',
        type: 'account',
      },
    },

    /**
     * @name identity
     * @description Human readable account identifier.
     *
     * This may be e.g meter number, facility id etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} uppercase - force upper casing
     * @property {object} fake - fake data generator options
     *
     * @since 1.3.0
     * @version 1.0.0
     * @instance
     */
    identity: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      uppercase: true,
      fake: {
        generator: 'finance',
        type: 'account',
      },
    },

    /**
     * @name name
     * @description Human readable name of the account
     *
     * This is either a full name of an individual or organization
     * that a jurisdiction used to when refer to the account.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'name',
        type: 'findName',
      },
    },

    /**
     * @name phone
     * @description Primary mobile phone number used to contact an account
     * direct by a jurisdiction.
     *
     * Used when a jurisdiction want to send an sms message or
     * call the account.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'phone',
        type: 'phoneNumber',
      },
    },

    /**
     * @name email
     * @description Primary email address used to contact an account direct
     * by a jurisdiction.
     *
     * Used when a jurisdiction want to send direct mail to the
     * account.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} lowercase - force lower casing
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    email: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      lowercase: true,
      fake: {
        generator: 'internet',
        type: 'email',
      },
    },

    /**
     * @name neighborhood
     * @description Human readable district or town of an account.
     *
     * Used when a jurisdiction what to target accounts
     * resides in a specific area within its boundaries.
     *
     * @see {@link https://en.wikipedia.org/wiki/Neighbourhood}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    neighborhood: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'county',
      },
    },

    /**
     * @name address
     * @description Human readable physical address of an account.
     *
     * Used when a jurisdiction what to physical go or visit the
     * the account.
     *
     * @see {@link https://en.wikipedia.org/wiki/Address_(geography)}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    address: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'streetAddress',
      },
    },

    /**
     * @name locale
     * @description Defines the account's language, region and any
     * special variant preferences.
     *
     * Used to localize(format) account user interfaces.
     *
     * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    locale: {
      type: String,
      trim: true,
      searchable: true,
      index: true,
      default: DEFAULT_LOCALE,
      fake: true,
    },

    /**
     * @name location
     * @description jurisdiction point of interest on account.
     *
     * This may be a point where there an installed meter,
     * antenna, house etc.
     *
     * @see {@link https://tools.ietf.org/html/rfc7946#page-22}
     *
     * @type {object}
     * @property {object} location - geo json point
     * @property {string} location.type - Point
     * @property {number[]} location.coordinates - longitude, latitude pair of the geo point
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * {
     *    type: 'Point',
     *    coordinates: [-76.80207859497996, 55.69469494228919]
     * }
     */
    location: Point,

    /**
     * @name accessors
     * @description List of individuals who can access account
     * information
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    accessors: [Accessor],

    /**
     * @name bills
     * @description Latest account bills of the account from the jurisdiction.
     *
     * This is optional as to some of jurisdiction(s) is not applicable.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    bills: [Bill],

    /**
     * @name extras
     * @description account additional details
     *
     * @type {object}
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   'dob': '1988-06-25'
     * }
     */
    extras: {
      type: Mixed,
      set: function set(val) {
        const value = _.merge({}, val);
        return value;
      },
      fake: {
        generator: 'helpers',
        type: 'userCard',
      },
    },

    /**
     * @name fetchedAt
     * @description Latest time when account is synchronized from it source i.e
     * Billing System(or API) etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} hide - hide field
     * @property {boolean} default - value to set when non provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    fetchedAt: {
      type: Date,
      index: true,
      hide: true,
      default: moment(new Date())
        .subtract(1, 'years')
        .toDate(),
      fake: true,
    },
  },
  SCHEMA_OPTIONS
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

// ensure `unique` compound index on jurisdiction and number
// to fix unique indexes on number in case they are used in more than
// one jurisdiction with different administration
const uniqueIndex = { jurisdiction: 1, number: 1, identity: true };
AccountSchema.index(uniqueIndex, { unique: true });

/*
 *------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
AccountSchema.pre('validate', function cb(next) {
  // ensure location details
  this.ensureLocation();

  // ensure unique accessors
  this.ensureUniqueAccessors();

  // always sort bills in desc order
  this.bills = _.orderBy(this.bills, 'period.billedAt', 'desc');

  next();
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name ensureUniqueAccessors
 * @function ensureUniqueAccessors
 * @description clear duplicate accessors
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.ensureUniqueAccessors = function ensureUniqueAccessors() {
  // obtain accessors
  const accessors = [].concat(this.accessors);

  // remove duplicate accessors
  const objects = {};
  _.forEach(accessors, function cb(accessor) {
    if (accessor && !_.isEmpty(accessor.phone)) {
      let object = _.get(objects, accessor.phone);
      object = _.merge({}, object, accessor.toObject());
      if (object.phone) {
        objects[object.phone] = object;
      }
    }
  });

  // reset accessors
  this.accessors = _.values(objects);

  // return self
  return this;
};

/**
 * @name upsertAccessor
 * @function upsertAccessor
 * @description update existing accessor
 * @param {string} phone valid accessor phone number
 * @param {object} updates valid accessor updates
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.upsertAccessor = function upsertAccessor(phone, updates) {
  // obtain unique accessors
  this.ensureUniqueAccessors();
  let accessors = [].concat(this.accessors);

  // obtain exist accessor
  let accessor = _.find(accessors, function cb(accountAccessor) {
    return accountAccessor.phone === phone;
  });

  // remove found accessor
  accessors = _.filter(accessors, function cb(accountAccessor) {
    return accountAccessor.phone !== phone;
  });

  // merge accessor details
  accessor = accessor ? accessor.toObject() : {};
  accessor = _.merge({}, accessor, { phone }, updates);

  // ensure e.164 format
  accessor.phone = toE164(accessor.phone);

  // update accessors
  accessors = [].concat(accessors).concat(accessor);
  this.accessors = accessors;
  this.ensureUniqueAccessors();

  // return self
  return this;
};

/**
 * @name removeAccessor
 * @function removeAccessor
 * @description update existing accessor
 * @param {object} phone valid accessor phone number
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.removeAccessor = function removeAccessor(phone) {
  // obtain unique accessors
  this.ensureUniqueAccessors();
  let accessors = [].concat(this.accessors);

  // remove required accessor
  accessors = _.filter(accessors, function cb(accessor) {
    return accessor.phone !== phone;
  });

  // update accessors
  this.accessors = [].concat(accessors);

  // return self
  return this;
};

/**
 * @name ensureLocation
 * @function ensureLocation
 * @description compute account location
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.ensureLocation = function ensureLocation() {
  // check if account should be able to set location
  const shouldSetLocation =
    !this.location &&
    this.jurisdiction &&
    _.isFunction(this.jurisdiction.ensureLocation);

  if (shouldSetLocation) {
    // ensure jurisdiction location
    this.jurisdiction.ensureLocation();

    // ensure account location
    if (this.jurisdiction.location) {
      this.location = _.merge({}, this.jurisdiction.location.toObject());
    }
  }

  return this.location;
};

/**
 * @name beforePost
 * @function beforePost
 * @description pre save account logics
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.beforePost = function beforePost(done) {
  // obtain jurisdiction id
  const jurisdictionId = _.get(this, 'jurisdiction._id') || this.jurisdiction;

  // load fresh jurisdiction
  if (jurisdictionId) {
    return Jurisdiction.getById(
      jurisdictionId,
      function cb(error, jurisdiction) {
        if (!error && jurisdiction) {
          // set fresh jurisdiction
          this.jurisdiction = jurisdiction;

          // ensure location
          this.ensureLocation();

          // ensure unique accessors
          this.ensureUniqueAccessors();
        }

        return done(error, this);
      }.bind(this)
    );
  }

  // continue

  // ensure location
  this.ensureLocation();

  // ensure unique accessors
  this.ensureUniqueAccessors();

  return done(null, this);
};

/**
 * @name beforePatch
 * @function beforePatch
 * @description pre patch account logics
 * @param {object} updates patches to be applied to account instance
 * @param {Function} done callback to invoke on success or error
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.beforePatch = function beforePatch(updates, done) {
  return this.beforePost(done);
};

/**
 * @name beforePut
 * @function beforePut
 * @description pre put account logics
 * @param {object} updates patches to be applied to account instance
 * @param {Function} done callback to invoke on success or error
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.beforePut = function beforePut(updates, done) {
  return this.beforePost(done);
};

/**
 * @name afterPost
 * @function afterPost
 * @description post save account logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.afterPost = function afterPost(done) {
  /* @todo 1. update account from sync endpoint in background */
  /* @todo 2. sync account to public api(cloud instance) in background */
  done();
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
AccountSchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
AccountSchema.statics.MODEL_NAME = ACCOUNT_MODEL_NAME;

/* static methods */

/**
 * @name afterGet
 * @function afterGet
 * @description after get query logics
 * @param {object} mquery valid mquery
 * @param {object} result valid get results
 * @param {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.afterGet = function afterGet(mquery, result, done) {
  // ref
  const Account = this;
  const results = result;
  // check for filter
  const { filter } = _.merge({}, { filter: {} }, mquery);
  const identity = _.toUpper(filter.number || filter.identity);

  // not data try fetch from providers
  const shouldFetch =
    results && _.isEmpty(results.data) && !_.isEmpty(identity);
  if (shouldFetch) {
    Account.fetchAndUpsert(identity, function cb(error, account) {
      if (!error && account) {
        const data = [].concat(results.data).concat(account);
        results.data = data;
        results.total = results.size;
        results.size = data.length;
      }
      // TODO handle swallowed error
      done(null, results);
    });
  }

  // continue with same results
  else {
    done(null, results);
  }
};

/**
 * @name verify
 * @function verify
 * @description verify if the requestor can access account
 * @param {object} requestor valid requestor details
 * @param {Function} done a callback to invoke on success or error
 * @returns {Account|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.verify = function verify(requestor, done) {
  /* @todo verify device */

  // ensure accessor
  const accessor = _.merge({}, { shallow: false }, requestor);
  accessor.number = _.toUpper(accessor.number) || _.toUpper(accessor.account);
  accessor.identity = _.toUpper(accessor.identity);

  // refs
  const Account = this;

  // ensure phone number
  if (_.isEmpty(accessor.phone)) {
    const error = new Error('Missing Phone Number');
    error.status = 400;
    return done(error);
  }

  // ensure account number
  if (_.isEmpty(accessor.number) && _.isEmpty(accessor.identity)) {
    const error = new Error('Missing Account Number or Identity');
    error.status = 400;
    return done(error);
  }

  // start verify
  return async.waterfall(
    [
      // 1...retrieve account by account number
      function findAccountByIdentities(next) {
        const { number, identity } = accessor;
        Account.fetchAndUpsert(number || identity, function cb(error, account) {
          let cbError = error;
          if (!account) {
            cbError = new Error('Invalid Account Number or Identity');
            cbError.status = 400;
          }
          next(cbError, account);
        });
      },

      // 2...verify phone number for access
      function verifyPhoneNumberAccess(account, next) {
        // check if accessor phone is allowed
        let phones = _.chain([].concat(account.accessors)).map(function cb(
          accountAccessor
        ) {
          if (accountAccessor.verifiedAt) {
            return accountAccessor.phone;
          }
          return undefined;
        });
        phones = phones
          .union([account.phone])
          .compact()
          .uniq()
          .value();
        const isAllowed = _.includes(phones, accessor.phone);

        // allow access
        if (isAllowed) {
          next(null, account);
        }

        // request access and notify forbidden
        else {
          // add accessor request
          const guest = _.merge({}, accessor, {
            phone: toE164(accessor.phone),
          });
          account.upsertAccessor(guest.phone, guest);

          /* @todo create new service request */
          /* @todo notify account owner */
          /* @todo notify system admins */

          // persist account
          account.put(function cb(/* error, saved */) {
            // notify request accepted
            const error = new Error('Waiting for Verification');
            error.status = 202;

            // allow shallow access
            if (accessor.shallow) {
              next(null, account);
            }

            // restrict access
            else {
              next(error);
            }
          });
        }
      },
    ],
    function cb(error, result) {
      const cbError = error;
      // ensure error status
      if (cbError && !cbError.status) {
        cbError.status = 400;
      }
      return done(cbError, result);
    }
  );
};

/**
 * @name fetch
 * @function fetch
 * @description pull account from the provided source
 * @param {string} identity valid account number or identity
 * @param {Date} fetchedAt last fetch date of account from it source
 * @param {Function} done a callback to invoke on success or error
 * @returns {object|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.fetch = function fetch(identity, fetchedAt, done) {
  // refs
  const Account = this;

  // ensure arguments
  const hasArguments =
    _.isString(identity) && _.isDate(fetchedAt) && _.isFunction(done);

  // ensure callback
  let cb = _.isFunction(identity) ? identity : done;
  cb = _.isFunction(fetchedAt) ? fetchedAt : cb;

  // check fetch provider
  const canFetch =
    _.isFunction(Account.fetchAccount) && Account.fetchAccount.length === 3;

  // do fetch account from provider
  if (hasArguments && canFetch) {
    return Account.fetchAccount(identity, fetchedAt, function afterFetch(
      error,
      fetched
    ) {
      let _fetched = fetched; // eslint-disable-line no-underscore-dangle
      if (!error && !_.isEmpty(fetched)) {
        _fetched = _.merge({}, { fetchedAt: new Date() }, fetched);
        _fetched = _.omitBy(_fetched, isEmpty);
      }
      cb(error, _fetched);
    });
  }

  // dont fetch: return

  return cb(null, {});
};

/**
 * @name fetchAndUpsert
 * @function fetchAndUpsert
 * @description pull account from the provided source and upsert
 * @param {string} identity valid account number or identity
 * @param {Function} done a callback to invoke on success or error
 * @returns {object|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.fetchAndUpsert = function fetchAndUpsert(identity, done) {
  // ref
  const Account = this;

  // prepare last fetched date
  const fetchedAt = moment(new Date())
    .subtract(1, 'years')
    .toDate();

  return async.waterfall(
    [
      // 1.
      function findExisting(next) {
        const criteria = {
          $or: [{ number: identity }, { identity }],
        };
        Account.findOne(criteria, function cb(error, found) {
          next(error, found || {});
        });
      },

      // 2.
      function fetchAccount(account, next) {
        // prepare latest fetched date
        let _fetchedAt = fetchedAt; // eslint-disable-line no-underscore-dangle
        if (account) {
          // reset to latest account fetch date
          _fetchedAt = account.fetchedAt || _fetchedAt;

          // obtain latest billed date
          const _bills = _.orderBy(account.bills, 'period.billedAt', 'desc'); // eslint-disable-line no-underscore-dangle
          let { billedAt } = (_.first(_bills) || {}).period || {};
          billedAt = billedAt || _fetchedAt;
          billedAt = moment(billedAt)
            .add(1, 'days')
            .toDate();

          // reset fetched date to latest billed date
          _fetchedAt = _fetchedAt > billedAt ? billedAt : _fetchedAt;
        }
        Account.fetch(identity, _fetchedAt, function cb(error, fetched) {
          next(error, account, fetched);
        });
      },

      // 3.
      function findAccountJurisdiction(account, fetched, next) {
        // ensure fetched
        let _fetched = _.merge({}, fetched); // eslint-disable-line no-underscore-dangle
        _fetched = _.omitBy(_fetched, isEmpty);
        const { jurisdiction } = _fetched;

        // back off not fetched
        if (_.isEmpty(_fetched) || _.isEmpty(jurisdiction)) {
          next(null, account, _fetched);
        }

        // fetch jurisdiction
        else {
          // prepare criteria
          const criteria = {
            $or: [{ name: jurisdiction }, { code: jurisdiction }],
          };

          // fetch jurisdiction
          Jurisdiction.findOne(criteria, function cb(error, data) {
            _fetched.jurisdiction = data || account.jurisdiction;
            next(error, account, _fetched);
          });
        }
      },

      // 4.
      function upsertFetchedAccount(account, fetched, next) {
        // ensure fetched
        let _fetched = _.merge({}, fetched); // eslint-disable-line no-underscore-dangle
        _fetched = _.omitBy(_fetched, isEmpty);

        // upsert
        if (account && account.post) {
          // upsert accessors
          _.forEach(_fetched.accessors, function cb(accessor) {
            if (!_.isEmpty(accessor.phone)) {
              account.upsertAccessor(accessor.phone, accessor);
            }
          });

          // TODO bills upsert

          // unset
          delete _fetched.accessors;

          // set other & patch
          account.put(_fetched, next);
        }

        // create
        else if (!_.isEmpty(_fetched)) {
          Account.post(_fetched, next);
        }

        // invalid account number or identity
        else {
          const error = new Error('Invalid Account Number or Identity');
          error.status = 400;
          next(error);
        }
      },
    ],
    done
  );
};

/**
 * @name getPhones
 * @function getPhones
 * @description pull distinct account phones
 * @param {object} [criteria] valid query criteria
 * @param {Function} done a callback to invoke on success or error
 * @returns {string[]|Error} set of phone number or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.getPhones = function getPhones(criteria, done) {
  // refs
  const Account = this;

  // normalize arguments
  const _criteria = _.isFunction(criteria) ? {} : _.merge({}, criteria); // eslint-disable-line no-underscore-dangle
  const _done = _.isFunction(criteria) ? criteria : done; // eslint-disable-line no-underscore-dangle

  return Account.find(_criteria)
    .distinct('phone')
    .exec(function onGetPhones(error, phones) {
      let data = phones;
      if (!error) {
        data = _.uniq(_.compact([].concat(phones)));
      }
      return _done(error, data);
    });
};

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* use mongoose rest actions */
AccountSchema.plugin(actions);

/* export account model */
export default mongoose.model(ACCOUNT_MODEL_NAME, AccountSchema);
