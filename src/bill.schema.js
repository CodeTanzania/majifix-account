import { createSubSchema } from '@lykmapipo/mongoose-common';
import Period from './bill.period.schema';
import Balance from './bill.balance.schema';
import Item from './bill.item.schema';

/**
 * @name Bill
 * @description account bill(or invoice) from jurisdiction.
 *
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction}
 * @see {@link https://en.wikipedia.org/wiki/Invoice}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const Bill = createSubSchema({
  /**
   * @name number
   * @description Unique human readable bill number(i.e invoice number,
   * payment control number etc) issued by jurisdiction.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper casing
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   *
   * @example
   * TP4547
   */
  number: {
    type: String,
    trim: true,
    uppercase: true,
  },

  /**
   * @name period
   * @description A bill period under which an account is obligated to
   * cover for the service from jurisdiction.
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
   * {
   *   form: 2018-01-01
   *   to: 2018-01-31
   * }
   */
  period: Period,

  /**
   * @name balance
   * @description Current bill balances
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
   * {
   *   outstand: 1200,
   *   open: 800,
   *   charges: 200,
   *   close: 1200,
   *   debt: 200
   * }
   */
  balance: Balance,

  /**
   * @name items
   * @description Current bill items
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
   * {
   *   name: 'Clean Water',
   *   quantity: 2,
   *   price: 400,
   *   unit: 'cbm'
   * }
   */
  items: [Item],

  /**
   * @name currency
   * @description Human readable bill currency code(i.e USD, TZS etc).
   *
   * Mostly used when format bill amounts per specific locale.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper casing
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   *
   * @example
   * TZS, USD etc
   */
  currency: {
    type: String,
    trim: true,
    uppercase: true,
    fake: {
      generator: 'finance',
      type: 'currencyCode',
    },
  },

  /**
   * @name notes
   * @description Additional human readable information about the
   * bill from jurisdiction.
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
   * You should pay this bill before its due date
   */
  notes: {
    type: String,
    trim: true,
    fake: {
      generator: 'lorem',
      type: 'sentence',
    },
  },
});

/* export bill schema */
export default Bill;
