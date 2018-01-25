'use strict';



/**
 * @module Bill
 * @name Bill
 * @description account bill(or invoice) from jurisdiction. 
 *
 * @see Jurisdiction
 * @see Account
 * @see  {@link https://en.wikipedia.org/wiki/Invoice}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


//global dependencies(or imports)
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/**
 * @name BillSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const BillSchema = new Schema({
  /**
   * @name number
   * @description Unique human readable bill number(i.e invoice number, 
   *              payment control number etc) issued by jurisdiction.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  number: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    searchable: true,
  },




  /**
   * @name notes
   * @description Additional human readable information about the bill from
   *              jurisdiction.
   *        
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  notes: {
    type: String,
    trim: true,
    searchable: true
  }

}, { _id: false, id: false, timestamps: false, emitIndexErrors: true });



//-----------------------------------------------------------------------------
// BillSchema Hooks
//-----------------------------------------------------------------------------
BillSchema.pre('validate', function (next) {

  next();

});



/**
 * @name Bill
 * @description export account schema
 * @type {Model}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = BillSchema;