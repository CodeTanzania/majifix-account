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


//TODO add push notification(apns, fcm) details
//TODO add device details
//TODO implement alert module
//TODO fetch multi jurisdiction level(or hierarchy)
//TODO add dependencies to jurisdiction
//TODO add dependencies to messages(for email, sms, ivr etc)
//TODO send alerts(messages) in background


//global dependencies(or imports)
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


//local constants
const GEO_POINT = 'Point';


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
   * @name phones
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
    required: true,
    searchable: true
  },




  /**
   * @name emails
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


/**
 * @name get
 * @param  {Object} criteria valid model query criteria
 * @param  {Object} [optns] additional opetation options
 * @param  {Function} [done]  a callback to invoke on success or error
 * @return {Model[]|Error}  found model instances or error
 * @see {@link http://mongoosejs.com/docs/api.html#find_find}
 * @type {Function}
 * @since 0.1.0
 * @version 0.1.0
 * @author lally elias <lallyelias87@mail.com>
 * @public
 * @static
 */
AccountSchema.statics.get = function (criteria, projection, options, done) {
  return this.find(criteria, projection, options, done);
};



/**
 * @name store
 * @param  {Object|}   model valid model to save(or create)
 * @param  {Function} [done]  a callback to invoke on success or error
 * @return {Model|Error}  created model instance or error
 * @see {@link http://mongoosejs.com/docs/api.html#create_create}
 * @type {Function}
 * @since 0.1.0
 * @version 0.1.0
 * @author lally elias <lallyelias87@mail.com>
 * @public
 * @static
 */
AccountSchema.statics.store = function (model, done) {
  return this.create(model, done);
};



/**
 * @name getById
 * @param  {ObjectId|String}  id valid mongodb object id
 * @param  {Object}   [optns] additional operations options
 * @param  {Function} [done]  a callback to invoke on success or error
 * @return {Model|Error}  updated model instance or error
 * @see {@link http://mongoosejs.com/docs/api.html#findbyid_findById}
 * @type {Function}
 * @since 0.1.0
 * @version 0.1.0
 * @author lally elias <lallyelias87@mail.com>
 * @public
 * @static
 */
AccountSchema.statics.getById = function (id, options, done) {
  return this.findById(id, options, done);
};



/**
 * @name getByIdAndUpdate
 * @param  {ObjectId|String}  id valid mongodb object id
 * @param  {Object}   updates valid instance updates
 * @param  {Object}   [optns] additional operations options
 * @param  {Function} [done]  a callback to invoke on success or error
 * @return {Model|Error}  updated model instance or error
 * @see {@link http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate}
 * @type {Function}
 * @since 0.1.0
 * @version 0.1.0
 * @author lally elias <lallyelias87@mail.com>
 * @public
 * @static
 */
AccountSchema.statics.getByIdAndUpdate = function (id, update, optns, done) {
  return this.findByIdAndUpdate(id, update, optns, done);
};



/**
 * @name getByIdAndRemove
 * @param  {ObjectId|String}  id valid mongodb object id
 * @param  {Object}   [optns] additional operations options
 * @param  {Function} [done]  a callback to invoke on success or error
 * @return {Model|Error}  removed model instance or error
 * @see {@link http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove}
 * @type {Function}
 * @since 0.1.0
 * @version 0.1.0
 * @author lally elias <lallyelias87@mail.com>
 * @public
 * @static
 */
AccountSchema.statics.getByIdAndRemove = function (id, optns, done) {
  return this.findByIdAndRemove(id, opts, done);
};



/**
 * @name Account
 * @description register and export account model
 * @type {Model}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = mongoose.model('Account', AccountSchema);