'use strict';


/**
 * @module majifix-account
 * @name Period
 * @description a period under which a bill is applicable.
 * Its is the period of time between billings.
 *
 * @see {@link https://www.thebalance.com/billing-cycle-960690}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
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
 * @name Period
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const Period = new Schema({
  /**
   * @name name
   * @description Human readable period name e.g November, Jan-Jun etc
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * January, Jan-Jun
   */
  name: {
    type: String,
    trim: true
  },


  /**
   * @name billedAt
   * @description A date when a bill come to effect
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 2018-01-01
   */
  billedAt: {
    type: Date,
    fake: {
      generator: 'date',
      type: 'past'
    }
  },


  /**
   * @name startedAt
   * @description A bill period start date(or time)
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 2018-01-01
   */
  startedAt: {
    type: Date,
    fake: {
      generator: 'date',
      type: 'past'
    }
  },


  /**
   * @name endedAt
   * @description A bill period end date(or time)
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 2018-01-20
   */
  endedAt: {
    type: Date,
    fake: {
      generator: 'date',
      type: 'recent'
    }
  },


  /**
   * @name duedAt
   * @description A bill period due date(or time). Mostly used by
   * jurisdiction to refer the date when an account should have
   * already pay the bill.
   *
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * 2018-01-30
   */
  duedAt: {
    type: Date,
    fake: {
      generator: 'date',
      type: 'future'
    }
  }

}, SUB_DOCUMENT_OPTIONS);


/* export period schema */
module.exports = Period;
