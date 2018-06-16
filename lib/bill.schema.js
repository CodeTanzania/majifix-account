'use strict';



/**
 * @module majifix-account
 * @name Bill
 * @description account bill(or invoice) from jurisdiction.
 *
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction}
 * @see {@link https://en.wikipedia.org/wiki/Invoice}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


//TODO add bill currency


/* dependencies */
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/* local constants */
const SUB_DOCUMENT_OPTIONS =
  ({ _id: false, id: false, timestamps: false, emitIndexErrors: true });


/* declarations */
const Period = require(path.join(__dirname, 'bill.period.schema'));
const Balance = require(path.join(__dirname, 'bill.balance.schema'));
const Item = require(path.join(__dirname, 'bill.item.schema'));


/**
 * @name BillSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const Bill = new Schema({
  /**
   * @name number
   * @description Unique human readable bill number(i.e invoice number,
   * payment control number etc) issued by jurisdiction.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * TP4547
   */
  number: {
    type: String,
    trim: true,
    uppercase: true
  },


  /**
   * @name period
   * @description A bill period under which an account is obligated to
   * cover for the service from jurisdiction.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * TZS, USD etc
   */
  currency: {
    type: String,
    trim: true,
    uppercase: true,
    fake: {
      generator: 'finance',
      type: 'currencyCode'
    }
  },


  /**
   * @name notes
   * @description Additional human readable information about the
   * bill from jurisdiction.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * You should pay this bill before its due date
   */
  notes: {
    type: String,
    trim: true,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  }


}, SUB_DOCUMENT_OPTIONS);



/* export bill schema */
module.exports = Bill;
