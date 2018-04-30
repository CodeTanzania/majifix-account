'use strict';



/**
 * @module majifix-account
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


/*** dependencies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/*** local constants */
const SUB_DOCUMENT_OPTIONS =
  ({ _id: false, id: false, timestamps: false, emitIndexErrors: true });


/**
 * @name Period
 * @description bill(or invoice) period 
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const Period = new Schema({
  /**
   * @name name
   * @description Human readable period name e.g November, Jan-Jun etc
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * Januany, Jan-Jun
   */
  name: {
    type: String,
    trim: true
  },


  /**
   * @name billedAt
   * @description A date when a bill come to effect
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @name dued
   * @description A bill period due date(or time). Mostly used by jurisdiction
   *              to refer the date when an account should have already pay
   *              the bill.
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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



/**
 * @name Balance
 * @description bill(or invoice) balances 
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const Balance = new Schema({
  /**
   * @name outstand
   * @description Current bill period outstand balance
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * 800
   */
  outstand: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name open
   * @description Current bill period open balance
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * 200
   */
  open: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name charges
   * @description Current bill period charges
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * 100
   */
  charges: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name debt
   * @description Current bill period account total additional debt i.e loan
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * 700
   */
  debt: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name close
   * @description Current bill period close balance
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * 300
   */
  close: {
    type: Number,
    fake: {
      generator: 'random',
      type: 'number'
    }
  }

}, SUB_DOCUMENT_OPTIONS);


/**
 * @name Item
 * @description bill(or invoice) item 
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const Item = new Schema({
  /**
   * @name name
   * @description Human readable name of bill item.
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   *              must be total for all of the 5 item.
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * Water Consumption is in cubic meter so its cbm
   */
  unit: {
    type: String,
    trim: true
  }

}, SUB_DOCUMENT_OPTIONS);



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
   *              payment control number etc) issued by jurisdiction.
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
   *              cover for the service from jurisdiction.
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
   * @name notes
   * @description Additional human readable information about the bill from
   *              jurisdiction.
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



/**
 * @name Bill
 * @description export bill schema
 * @type {Model}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = Bill;