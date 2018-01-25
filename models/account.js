'use strict';



/**
 * @module Account
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


//Important!: ensure 2dsphere index before any geo queries

//TODO add service inverse relation mapping & use restrictive population
//TODO add service group inverse relation mapping & use restrictive population
//TODO add physical address
//TODO update jurisdiction ui to support color updates
//TODO se unique key(jurisdiction, account)
//TODO add push notification details
//TODO add device details

//global dependencies(or imports)
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;



//local constants
const GEO_POINT = 'Point';
const STRING_DEFAULT_VALUE = 'N/A';



const GeoPoint = require(path.join(__dirname, 'geopoint'));
const Bill = require(path.join(__dirname, 'bill'));



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
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
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
    searchable: true
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
    searchable: true
  },




  /**
   * @name phone
   * @description Primary mobile phone number(s) used to contact an account 
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
  phones: {
    type: [String],
    index: true,
    searchable: true,
    required: true,
  },




  /**
   * @name email
   * @description Primary email address(s) used to contact an account direct 
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
  emails: {
    type: [String],
    index: true,
    trim: true,
    searchable: true
  },




  /**
   * @name address
   * @description Human readable physical address of an account.
   * 
   *              Used when a jurisdiction what to physical go or visit the
   *              the account.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  address: {
    type: String,
    trim: true,
    default: STRING_DEFAULT_VALUE
  },




  /**
   * @name location
   * @description jurisdiction point of interest on account.
   *
   *        This may be a point where there a meter number, installed
   *        antenna, house etc.
   *         
   * @since  0.1.0
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
    default: true
  }

}, { timestamps: true, emitIndexErrors: true });



//-----------------------------------------------------------------------------
// AccountSchema Virtuals
//-----------------------------------------------------------------------------

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



//-----------------------------------------------------------------------------
// AccountSchema Indexes
//-----------------------------------------------------------------------------

//ensure `2dsphere` on jurisdiction location and boundaries
AccountSchema.index({ location: '2dsphere' });
AccountSchema.index({ jurisdiction: 1, number: 1 }, { unique: true });



//-----------------------------------------------------------------------------
// AccountSchema Hooks
//-----------------------------------------------------------------------------
AccountSchema.pre('validate', function (next) {

  //ensure location details
  this.location = _.merge({}, {
    type: GeoPOINT,
    coordinates: [0, 0]
  }, this.location ? this.location.toObject() : {});

  next();

});




//-----------------------------------------------------------------------------
// AccountSchema Static Methods
//-----------------------------------------------------------------------------

//TODO implement alert
//TODO fetch multi jurisdiction level(or hierarch)



/**
 * @name Account
 * @description register and export account model
 * @type {Model}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = mongoose.model('Account', AccountSchema);