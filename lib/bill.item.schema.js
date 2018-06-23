'use strict';


/**
 * @module majifix-account
 * @name Item
 * @description bill(or invoice) item(or line item)
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schema } = require('@codetanzania/majifix-common');


/* local constants */
const { SUB_DOC_SCHEMA_OPTIONS } = schema;
const SUB_DOCUMENT_OPTIONS =
  _.merge({}, SUB_DOC_SCHEMA_OPTIONS, { timestamps: false });


/* declarations */
const SubItem = require(path.join(__dirname, 'bill.subitem.schema'));


/**
 * @name Item
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const Item = new Schema({
  /**
   * @name name
   * @description Human readable name of bill item.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   *
   * @example
   * Water Consumption
   */
  name: {
    type: String,
    trim: true,
    fake: {
      generator: 'commerce',
      type: 'productName'
    }
  },


  /**
   * @name quantity
   * @description Bill item quantity
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   *
   * @example
   * 5
   */
  quantity: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },



  /**
   * @name price
   * @description Bill item total price e.g if quantity if 5 then price
   * must be total for all of the 5 item.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   *
   * @example
   * 6000
   */
  price: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name unit
   * @description Human readable unit of bill item.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   *
   * @example
   * Water Consumption is in cubic meter so its cbm
   */
  unit: {
    type: String,
    trim: true
  },


  /**
   * @name name
   * @description Date when a bill item realized. e.g Date when a
   * meter reading was taken.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 2018-06-01
   */
  time: {
    type: Date,
    fake: {
      generator: 'date',
      type: 'recent'
    }
  },


  /**
   * @name items
   * @description collection of items used to derive this item
   *
   * @type {object}
   * @property {object} type - schema(data) type
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  items: [SubItem]

}, SUB_DOCUMENT_OPTIONS);

/* export item schema */
module.exports = Item;
