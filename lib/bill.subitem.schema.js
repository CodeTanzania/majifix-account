'use strict';


/**
 * @module majifix-account
 * @name SubItem
 * @description bill(or invoice) sub-item(or deriving item). Its a
 * collection of item used to derive a bill item.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @todo add i10n label to fields
 */


/* dependencies */
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schema } = require('@codetanzania/majifix-common');


/* local constants */
const { SUB_DOC_SCHEMA_OPTIONS } = schema;
const SUB_DOCUMENT_OPTIONS =
  _.merge({}, SUB_DOC_SCHEMA_OPTIONS, { timestamps: false });


/**
 * @name SubItem
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const SubItem = new Schema({
  /**
   * @name name
   * @description Human readable name of bill sub item.
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
   * Previous Reeding
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
   * @description Sub item quantity
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
   * @description Sub item total price e.g if quantity if 5 then price
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
   * @description Human readable unit of sub item.
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
   * Previous Reeding is in cubic meter so its cbm
   */
  unit: {
    type: String,
    trim: true
  },


  /**
   * @name name
   * @description Date when a sub item realized. e.g Date when a
   * meter reading was taken.
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
   * 2018-06-01
   */
  time: {
    type: Date,
    fake: {
      generator: 'date',
      type: 'recent'
    }
  }

}, SUB_DOCUMENT_OPTIONS);


/* export sub item schema */
module.exports = SubItem;
