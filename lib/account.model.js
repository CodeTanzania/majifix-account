'use strict';


/**
 * @module majifix-account
 * @name Account
 * @description An entity (i.e organization, individual, customer, or client)
 *              which receiving service(s) or good(s) from a particular
 *              jurisdiction(or vendor).
 *
 * @see Jurisdiction
 * @see  {@link https://en.wikipedia.org/wiki/Customer}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


//TODO add push notification(apns, fcm) details
//TODO add device details
//TODO implement majifix-alerts and depend on it
//TODO fetch multi jurisdiction level(or hierarchy)
//TODO add dependencies to jurisdiction
//TODO add dependencies to messages(for email, sms, ivr etc)
//TODO send alerts(messages) in background
//TODO restrict account delete with 403 Forbidden


/* dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


/* local constants*/
const GEO_POINT = 'Point';
const DEFAULT_LOCALE = 'en';


/** declarations */
const GeoPoint = require(path.join(__dirname, 'geopoint.schema'));
const Bill = require(path.join(__dirname, 'bill.schema'));


/**
 * @name AccountSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const AccountSchema = new Schema({
  /**
   * @name jurisdiction
   * @description jurisdiction under which this account belongs.
   *
   *              This is applicable where multiple jurisdiction(s) utilize
   *              same majifix system(or platform)
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   *
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
    autopopulate: true,
    index: true
  },


  /**
   * @name number
   * @description Unique human readable account number.
   *
   *              Used as a unique identifier for an account per jurisdiction.
   *
   *              This should be a real account number from e.g billing system,
   *              membership database etc.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  number: {
    type: String,
    required: true,
    index: true,
    trim: true,
    uppercase: true,
    searchable: true,
    fake: {
      generator: 'finance',
      type: 'account'
    }
  },


  /**
   * @name name
   * @description Human readable name of the account
   *
   *        This is either a full name of an individual or organization
   *        that a jurisdiction used to when refer to the account.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'name',
      type: 'findName'
    }
  },


  /**
   * @name phone
   * @description Primary mobile phone number used to contact an account
   *              direct by a jurisdiction.
   *
   *              Used when a jurisdiction want to send an sms message or
   *              call the account.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    }
  },


  /**
   * @name email
   * @description Primary email address used to contact an account direct
   *              by a jurisdiction.
   *
   *              Used when a jurisdiction want to send direct mail to the
   *              account.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'email'
    }
  },


  /**
   * @name neighborhood
   * @description Human readable district or town of an account.
   *
   *              Used when a jurisdiction what to target accounts
   *              resides in a specific area within its boundaries.
   *
   * @type {Object}
   * @see {@link https://en.wikipedia.org/wiki/Neighbourhood}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  neighborhood: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'city'
    }
  },


  /**
   * @name address
   * @description Human readable physical address of an account.
   *
   *              Used when a jurisdiction what to physical go or visit the
   *              the account.
   *
   * @type {Object}
   * @see {@link https://en.wikipedia.org/wiki/Address_(geography)}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  address: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    }
  },


  /**
   * @name locale
   * @description defines the account's language, region and any
   *              special variant preferences.
   *
   *              Used to format account user interfaces.
   *
   * @type {Object}
   * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  locale: {
    type: String,
    trim: true,
    default: DEFAULT_LOCALE,
    index: true,
    searchable: true
  },


  /**
   * @name location
   * @description jurisdiction point of interest on account.
   *
   *        This may be a point where there a meter number, installed
   *        antenna, house etc.
   *
   * @since  0.1.0
   * @see {@link https://tools.ietf.org/html/rfc7946#page-22}
   * @version  0.1.0
   * @type {Object}
   * @private
   */
  location: GeoPoint,


  /**
   * @name bills
   * @description Latest account bills of the account from the jurisdiction.
   *
   *        This is optional as to some of jurisdiction(s)
   *        is not applicable.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  bills: [Bill],


  /**
   * @name active
   * @description state whether the account is active as per contract with
   *              a jurisdiction.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  active: {
    type: Boolean,
    index: true,
    default: true
  }

}, {
  timestamps: true,
  emitIndexErrors: true
});



//Virtual

/**
 * @name longitude
 * @description obtain jurisdiction longitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
AccountSchema.virtual('longitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[0] : 0;
});

/**
 * @name latitude
 * @description obtain jurisdiction latitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
AccountSchema.virtual('latitude').get(function () {
  return this.location && this.location.coordinates ?
    this.location.coordinates[1] : 0;
});



// Indexes

/**
 * ensure 2dsphere index on jurisdiction location and boundaries
 */
AccountSchema.index({
  location: '2dsphere'
});

/**
 * ensure unique account number per jurisdiction
 */
AccountSchema.index({
  jurisdiction: 1,
  number: 1
}, {
  unique: true
});



//Hooks

/**
 * pre validate schema hook
 */
AccountSchema.pre('validate', function (next) {

  //ensure location details
  this.location = _.merge({}, {
    type: GEO_POINT,
    coordinates: [0, 0] //TODO get coordinates from jurisdiction
  }, this.location ? this.location.toObject() : {});

  next();

});



//Instance


/**
 * @name beforeSave
 * @description pre save account logics
 * @param  {Function} done callback to invoke on success or error
 */
AccountSchema.methods.beforePost = function (done) {
  //TODO implement Account#locate():GeoPoint
  //TODO fetch account coordinates from jurisdiction if available on save
  done();
};


/**
 * @name afterPost
 * @description pre save account logics
 * @param  {Function} done callback to invoke on success or error
 */
AccountSchema.methods.afterPost = function (done) {
  //TODO in background
  //1...update account from sync and point
  //2...sync account to public api(cloud instance)
  done();
};



//Plugins

/* use mongoose rest actions*/
AccountSchema.plugin(actions);



//Statics
AccountSchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;


/* export Account model */
module.exports = mongoose.model('Account', AccountSchema);