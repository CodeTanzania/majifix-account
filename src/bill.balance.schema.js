/**
 * @module majifix-account
 * @name Balance
 * @description represents how much is owed on a bill(or invoice).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */

/**
 * @todo add i10n label to fields
 */

/* dependencies */
import _ from 'lodash';
import mongoose from 'mongoose';

const { Schema } = mongoose;
const { schema } = require('@codetanzania/majifix-common');

/* local constants */
const { SUB_DOC_SCHEMA_OPTIONS } = schema;
const SUB_DOCUMENT_OPTIONS = _.merge({}, SUB_DOC_SCHEMA_OPTIONS, {
  timestamps: false,
});

/**
 * @name Balance
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const Balance = new Schema(
  {
    /**
     * @name outstand
     * @description Current bill period outstand balance
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 800
     */
    outstand: {
      type: Number,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },

    /**
     * @name open
     * @description Current bill period open balance
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 200
     */
    open: {
      type: Number,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },

    /**
     * @name charges
     * @description Current bill period charges
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 100
     */
    charges: {
      type: Number,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },

    /**
     * @name debt
     * @description Current bill period account total additional
     * debt e.g loan etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 700
     */
    debt: {
      type: Number,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },

    /**
     * @name close
     * @description Current bill period close balance
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * 300
     */
    close: {
      type: Number,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },
  },
  SUB_DOCUMENT_OPTIONS
);

/* export balance schema */
export default Balance;
