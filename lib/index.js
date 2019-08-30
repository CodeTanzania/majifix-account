'use strict';

const _ = require('lodash');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const expressCommon = require('@lykmapipo/express-common');
const async = require('async');
const moment = require('moment');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const mongooseGeojsonSchemas = require('mongoose-geojson-schemas');
const phone = require('@lykmapipo/phone');
const mongooseCommon = require('@lykmapipo/mongoose-common');
const majifixCommon = require('@codetanzania/majifix-common');
const majifixJurisdiction = require('@codetanzania/majifix-jurisdiction');

/**
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
const Period = mongooseCommon.createSubSchema({
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
    trim: true,
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
      type: 'past',
    },
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
      type: 'past',
    },
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
      type: 'recent',
    },
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
      type: 'future',
    },
  },
});

/**
 * @name Balance
 * @description represents how much is owed on a bill(or invoice).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const Balance = mongooseCommon.createSubSchema({
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
});

/**
 * @name SubItem
 * @description bill(or invoice) sub-item(or deriving item). Its a
 * collection of item used to derive a bill item.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const SubItem = mongooseCommon.createSubSchema({
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
      type: 'productName',
    },
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
      type: 'number',
    },
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
      type: 'number',
    },
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
    trim: true,
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
      type: 'recent',
    },
  },
});

/**
 * @name Item
 * @description bill(or invoice) item(or line item)
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const Item = mongooseCommon.createSubSchema({
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
      type: 'productName',
    },
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
      type: 'number',
    },
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
      type: 'number',
    },
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
    trim: true,
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
      type: 'recent',
    },
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
  items: [SubItem],
});

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
const Bill = mongooseCommon.createSubSchema({
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

/* constants */
const DEFAULT_LOCALE = env.getString('DEFAULT_LOCALE', 'en');
const LOCALES = env.getStringSet('LOCALES', [DEFAULT_LOCALE]);
const SUB_SCHEMA_OPTIONS = { timestamps: true };

/**
 * @name Accessor
 * @description list of parties(individual etc) that are allowed to
 * access account.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const Accessor = mongooseCommon.createSubSchema(
  {
    /**
     * @name name
     * @description Name of the accessor
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    name: {
      type: String,
      trim: true,
      index: true,
      fake: {
        generator: 'name',
        type: 'findName',
      },
    },

    /**
     * @name phone
     * @description Valid mobile phone number of the accessor
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    phone: {
      type: String,
      trim: true,
      index: true,
      fake: {
        generator: 'phone',
        type: 'phoneNumber',
      },
    },

    /**
     * @name email
     * @description Valid email address of the accessor
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} lowercase - force lower-casing
     * @property {boolean} index - ensure database index
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      fake: {
        generator: 'internet',
        type: 'email',
      },
    },

    /**
     * @name locale
     * @description Defines the accessor language, region and any
     * special variant preferences.
     *
     * Used to localize(format) account user interfaces.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
     * @private
     * @since 0.1.0
     * @version 1.0.0
     */
    locale: {
      type: String,
      trim: true,
      index: true,
      default: DEFAULT_LOCALE,
      enum: LOCALES,
      fake: true,
    },

    /**
     * @name verifiedAt
     * @description A date when accessor verified
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    verifiedAt: {
      type: Date,
      index: true,
      fake: {
        generator: 'date',
        type: 'soon',
      },
    },
  },
  SUB_SCHEMA_OPTIONS
);

/* constants */
const DEFAULT_LOCALE$1 = env.getString('DEFAULT_LOCALE', 'en');
const OPTION_SELECT = {
  number: 1,
  identity: 1,
  name: 1,
  phone: 1,
  email: 1,
  locale: 1,
};
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: majifixCommon.POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: majifixCommon.COLLECTION_NAME_ACCOUNT };
const INDEX_UNIQUE = { jurisdiction: 1, number: 1, identity: 1 };

/* helpers */
const isEmpty = v => {
  if (_.isNumber(v)) {
    return false;
  }
  if (_.isBoolean(v)) {
    return false;
  }
  if (_.isDate(v)) {
    return false;
  }
  return _.isEmpty(v);
};

/**
 * @name Account
 * @description A representation of an entity
 * (i.e organization, individual, customer, or client) which
 * receiving service(s) from a particular jurisdiction.
 *
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction}
 * @see {@link https://en.wikipedia.org/wiki/Customer}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const AccountSchema = mongooseCommon.createSchema(
  {
    /**
     * @name jurisdiction
     * @description jurisdiction under which this account belongs.
     *
     * This is applicable where multiple jurisdiction(s) utilize
     * same majifix system(or platform)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {object} autopopulate.select - jurisdiction fields to
     * select when populating
     * @property {boolean} index - ensure database index
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    jurisdiction: {
      type: mongooseCommon.ObjectId,
      ref: majifixJurisdiction.Jurisdiction.MODEL_NAME,
      exists: { refresh: true, select: majifixJurisdiction.Jurisdiction.OPTION_SELECT },
      autopopulate: majifixJurisdiction.Jurisdiction.OPTION_AUTOPOPULATE,
      index: true,
    },

    /**
     * @name category
     * @description Human readable category of the account(or customer)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    category: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'name',
        type: 'jobType',
      },
    },

    /**
     * @name number
     * @description Unique human readable account number.
     *
     * Used as a unique identifier for an account per jurisdiction.
     *
     * This should be a real account number from e.g billing system,
     * membership database etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} uppercase - force upper casing
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    number: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      uppercase: true,
      fake: {
        generator: 'finance',
        type: 'account',
      },
    },

    /**
     * @name identity
     * @description Human readable account identifier.
     *
     * This may be e.g meter number, facility id etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} uppercase - force upper casing
     * @property {object} fake - fake data generator options
     *
     * @since 1.3.0
     * @version 1.0.0
     * @instance
     */
    identity: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      uppercase: true,
      fake: {
        generator: 'finance',
        type: 'account',
      },
    },

    /**
     * @name name
     * @description Human readable name of the account
     *
     * This is either a full name of an individual or organization
     * that a jurisdiction used to when refer to the account.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'name',
        type: 'findName',
      },
    },

    /**
     * @name phone
     * @description Primary mobile phone number used to contact an account
     * direct by a jurisdiction.
     *
     * Used when a jurisdiction want to send an sms message or
     * call the account.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'phone',
        type: 'phoneNumber',
      },
    },

    /**
     * @name email
     * @description Primary email address used to contact an account direct
     * by a jurisdiction.
     *
     * Used when a jurisdiction want to send direct mail to the
     * account.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} lowercase - force lower casing
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    email: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      lowercase: true,
      fake: {
        generator: 'internet',
        type: 'email',
      },
    },

    /**
     * @name neighborhood
     * @description Human readable district or town of an account.
     *
     * Used when a jurisdiction what to target accounts
     * resides in a specific area within its boundaries.
     *
     * @see {@link https://en.wikipedia.org/wiki/Neighbourhood}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    neighborhood: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'county',
      },
    },

    /**
     * @name address
     * @description Human readable physical address of an account.
     *
     * Used when a jurisdiction what to physical go or visit the
     * the account.
     *
     * @see {@link https://en.wikipedia.org/wiki/Address_(geography)}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    address: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'streetAddress',
      },
    },

    /**
     * @name locale
     * @description Defines the account's language, region and any
     * special variant preferences.
     *
     * Used to localize(format) account user interfaces.
     *
     * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    locale: {
      type: String,
      trim: true,
      searchable: true,
      index: true,
      default: DEFAULT_LOCALE$1,
      fake: true,
    },

    /**
     * @name location
     * @description jurisdiction point of interest on account.
     *
     * This may be a point where there an installed meter,
     * antenna, house etc.
     *
     * @see {@link https://tools.ietf.org/html/rfc7946#page-22}
     *
     * @type {object}
     * @property {object} location - geo json point
     * @property {string} location.type - Point
     * @property {number[]} location.coordinates - longitude, latitude pair
     * of the geo point
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     * @example
     * {
     *    type: 'Point',
     *    coordinates: [-76.80207859497996, 55.69469494228919]
     * }
     */
    location: mongooseGeojsonSchemas.Point,

    /**
     * @name accessors
     * @description List of individuals who can access account
     * information
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    accessors: [Accessor],

    /**
     * @name bills
     * @description Latest account bills of the account from the jurisdiction.
     *
     * This is optional as to some of jurisdiction(s) is not applicable.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    bills: [Bill],

    /**
     * @name extras
     * @description account additional details
     *
     * @type {object}
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   'dob': '1988-06-25'
     * }
     */
    extras: {
      type: mongooseCommon.Mixed,
      set: function set(val) {
        const value = _.merge({}, val);
        return value;
      },
      fake: {
        generator: 'helpers',
        type: 'userCard',
      },
    },

    /**
     * @name fetchedAt
     * @description Latest time when account is synchronized from it source i.e
     * Billing System(or API) etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} hide - hide field
     * @property {boolean} default - value to set when non provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    fetchedAt: {
      type: Date,
      index: true,
      hide: true,
      default: moment(new Date())
        .subtract(1, 'years')
        .toDate(),
      fake: true,
    },
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

/**
 * @name index
 * @description ensure unique compound index on number, identity
 * and jurisdiction to force unique account definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
AccountSchema.index(INDEX_UNIQUE, { unique: true });

/*
 *------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
AccountSchema.pre('validate', function cb(next) {
  // ensure location details
  this.ensureLocation();

  // ensure unique accessors
  this.ensureUniqueAccessors();

  // always sort bills in desc order
  this.bills = _.orderBy(this.bills, 'period.billedAt', 'desc');

  next();
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name ensureUniqueAccessors
 * @function ensureUniqueAccessors
 * @description clear duplicate accessors
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.ensureUniqueAccessors = function ensureUniqueAccessors() {
  // obtain accessors
  const accessors = [].concat(this.accessors);

  // remove duplicate accessors
  const objects = {};
  _.forEach(accessors, function cb(accessor) {
    if (accessor && !_.isEmpty(accessor.phone)) {
      let object = _.get(objects, accessor.phone);
      object = _.merge({}, object, accessor.toObject());
      if (object.phone) {
        objects[object.phone] = object;
      }
    }
  });

  // reset accessors
  this.accessors = _.values(objects);

  // return self
  return this;
};

/**
 * @name upsertAccessor
 * @function upsertAccessor
 * @description update existing accessor
 * @param {string} phone valid accessor phone number
 * @param {object} updates valid accessor updates
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.upsertAccessor = function upsertAccessor(phone$1, updates) {
  // obtain unique accessors
  this.ensureUniqueAccessors();
  let accessors = [].concat(this.accessors);

  // obtain exist accessor
  let accessor = _.find(accessors, function cb(accountAccessor) {
    return accountAccessor.phone === phone$1;
  });

  // remove found accessor
  accessors = _.filter(accessors, function cb(accountAccessor) {
    return accountAccessor.phone !== phone$1;
  });

  // merge accessor details
  accessor = accessor ? accessor.toObject() : {};
  accessor = _.merge({}, accessor, { phone: phone$1 }, updates);

  // ensure e.164 format
  accessor.phone = phone.toE164(accessor.phone);

  // update accessors
  accessors = [].concat(accessors).concat(accessor);
  this.accessors = accessors;
  this.ensureUniqueAccessors();

  // return self
  return this;
};

/**
 * @name removeAccessor
 * @function removeAccessor
 * @description update existing accessor
 * @param {object} phone valid accessor phone number
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.removeAccessor = function removeAccessor(phone) {
  // obtain unique accessors
  this.ensureUniqueAccessors();
  let accessors = [].concat(this.accessors);

  // remove required accessor
  accessors = _.filter(accessors, function cb(accessor) {
    return accessor.phone !== phone;
  });

  // update accessors
  this.accessors = [].concat(accessors);

  // return self
  return this;
};

/**
 * @name ensureLocation
 * @function ensureLocation
 * @description compute account location
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.ensureLocation = function ensureLocation() {
  // check if account should be able to set location
  const shouldSetLocation =
    !this.location &&
    this.jurisdiction &&
    _.isFunction(this.jurisdiction.ensureLocation);

  if (shouldSetLocation) {
    // ensure jurisdiction location
    this.jurisdiction.ensureLocation();

    // ensure account location
    if (this.jurisdiction.location) {
      this.location = _.merge({}, this.jurisdiction.location.toObject());
    }
  }

  return this.location;
};

/**
 * @name beforePost
 * @function beforePost
 * @description pre save account logics
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.beforePost = function beforePost(done) {
  // ensure location
  this.ensureLocation();

  // ensure unique accessors
  this.ensureUniqueAccessors();

  return done(null, this);
};

/**
 * @name beforePatch
 * @function beforePatch
 * @description pre patch account logics
 * @param {object} updates patches to be applied to account instance
 * @param {Function} done callback to invoke on success or error
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.beforePatch = function beforePatch(updates, done) {
  return this.beforePost(done);
};

/**
 * @name beforePut
 * @function beforePut
 * @description pre put account logics
 * @param {object} updates patches to be applied to account instance
 * @param {Function} done callback to invoke on success or error
 * @returns {object} valid account instance
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.beforePut = function beforePut(updates, done) {
  return this.beforePost(done);
};

/**
 * @name afterPost
 * @function afterPost
 * @description post save account logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
AccountSchema.methods.afterPost = function afterPost(done) {
  done();
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
AccountSchema.statics.MODEL_NAME = majifixCommon.MODEL_NAME_ACCOUNT;
AccountSchema.statics.OPTION_SELECT = OPTION_SELECT;
AccountSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/**
 * @name afterGet
 * @function afterGet
 * @description after get query logics
 * @param {object} mquery valid mquery
 * @param {object} result valid get results
 * @param {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.afterGet = function afterGet(mquery, result, done) {
  // ref
  const Account = this;
  const results = result;

  // check for filter
  const { filter } = _.merge({}, { filter: {} }, mquery);
  const identity = _.toUpper(filter.number || filter.identity);

  // not data try fetch from providers
  const shouldFetch =
    results && _.isEmpty(results.data) && !_.isEmpty(identity);
  if (shouldFetch) {
    Account.fetchAndUpsert(identity, function cb(error, account) {
      if (!error && account) {
        const data = [].concat(results.data).concat(account);
        results.data = data;
        results.total = results.size;
        results.size = data.length;
      }
      // TODO handle swallowed error
      done(null, results);
    });
  }

  // continue with same results
  else {
    done(null, results);
  }
};

/**
 * @name verify
 * @function verify
 * @description verify if the requestor can access account
 * @param {object} requestor valid requestor details
 * @param {Function} done a callback to invoke on success or error
 * @returns {Account|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.verify = function verify(requestor, done) {
  /* @todo verify device */

  // ensure accessor
  const accessor = _.merge({}, { shallow: false }, requestor);
  accessor.number = _.toUpper(accessor.number) || _.toUpper(accessor.account);
  accessor.identity = _.toUpper(accessor.identity);

  // refs
  const Account = this;

  // ensure phone number
  if (_.isEmpty(accessor.phone)) {
    const error = new Error('Missing Phone Number');
    error.status = 400;
    return done(error);
  }

  // ensure account number
  if (_.isEmpty(accessor.number) && _.isEmpty(accessor.identity)) {
    const error = new Error('Missing Account Number or Identity');
    error.status = 400;
    return done(error);
  }

  // start verify
  return async.waterfall(
    [
      // 1...retrieve account by account number
      function findAccountByIdentities(next) {
        const { number, identity } = accessor;
        Account.fetchAndUpsert(number || identity, function cb(error, account) {
          let cbError = error;
          if (!account) {
            cbError = new Error('Invalid Account Number or Identity');
            cbError.status = 400;
          }
          next(cbError, account);
        });
      },

      // 2...verify phone number for access
      function verifyPhoneNumberAccess(account, next) {
        // check if accessor phone is allowed
        let phones = _.chain([].concat(account.accessors)).map(function cb(
          accountAccessor
        ) {
          if (accountAccessor.verifiedAt) {
            return accountAccessor.phone;
          }
          return undefined;
        });
        phones = phones
          .union([account.phone])
          .compact()
          .uniq()
          .value();
        const isAllowed = _.includes(phones, accessor.phone);

        // allow access
        if (isAllowed) {
          next(null, account);
        }

        // request access and notify forbidden
        else {
          // add accessor request
          const guest = _.merge({}, accessor, {
            phone: phone.toE164(accessor.phone),
          });
          account.upsertAccessor(guest.phone, guest);

          /* @todo create new service request */
          /* @todo notify account owner */
          /* @todo notify system admins */

          // persist account
          account.put(function cb(/* error, saved */) {
            // notify request accepted
            const error = new Error('Waiting for Verification');
            error.status = 202;

            // allow shallow access
            if (accessor.shallow) {
              next(null, account);
            }

            // restrict access
            else {
              next(error);
            }
          });
        }
      },
    ],
    function cb(error, result) {
      const cbError = error;
      // ensure error status
      if (cbError && !cbError.status) {
        cbError.status = 400;
      }
      return done(cbError, result);
    }
  );
};

/**
 * @name fetch
 * @function fetch
 * @description pull account from the provided source
 * @param {string} identity valid account number or identity
 * @param {Date} fetchedAt last fetch date of account from it source
 * @param {Function} done a callback to invoke on success or error
 * @returns {object|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.fetch = function fetch(identity, fetchedAt, done) {
  // refs
  const Account = this;

  // ensure arguments
  const hasArguments =
    _.isString(identity) && _.isDate(fetchedAt) && _.isFunction(done);

  // ensure callback
  let cb = _.isFunction(identity) ? identity : done;
  cb = _.isFunction(fetchedAt) ? fetchedAt : cb;

  // check fetch provider
  const canFetch =
    _.isFunction(Account.fetchAccount) && Account.fetchAccount.length === 3;

  // do fetch account from provider
  if (hasArguments && canFetch) {
    return Account.fetchAccount(identity, fetchedAt, function afterFetch(
      error,
      fetched
    ) {
      let _fetched = fetched; // eslint-disable-line no-underscore-dangle
      if (!error && !_.isEmpty(fetched)) {
        _fetched = _.merge({}, { fetchedAt: new Date() }, fetched);
        _fetched = _.omitBy(_fetched, isEmpty);
      }
      cb(error, _fetched);
    });
  }

  // dont fetch: return

  return cb(null, {});
};

/**
 * @name fetchAndUpsert
 * @function fetchAndUpsert
 * @description pull account from the provided source and upsert
 * @param {string} identity valid account number or identity
 * @param {Function} done a callback to invoke on success or error
 * @returns {object|Error} valid account instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.fetchAndUpsert = function fetchAndUpsert(identity, done) {
  // ref
  const Account = this;

  // prepare last fetched date
  const fetchedAt = moment(new Date())
    .subtract(1, 'years')
    .toDate();

  return async.waterfall(
    [
      // 1.
      function findExisting(next) {
        const criteria = {
          $or: [{ number: identity }, { identity }],
        };
        Account.findOne(criteria, function cb(error, found) {
          next(error, found || {});
        });
      },

      // 2.
      function fetchAccount(account, next) {
        // prepare latest fetched date
        let _fetchedAt = fetchedAt; // eslint-disable-line no-underscore-dangle
        if (account) {
          // reset to latest account fetch date
          _fetchedAt = account.fetchedAt || _fetchedAt;

          // obtain latest billed date
          const _bills = _.orderBy(account.bills, 'period.billedAt', 'desc'); // eslint-disable-line no-underscore-dangle
          let { billedAt } = (_.first(_bills) || {}).period || {};
          billedAt = billedAt || _fetchedAt;
          billedAt = moment(billedAt)
            .add(1, 'days')
            .toDate();

          // reset fetched date to latest billed date
          _fetchedAt = _fetchedAt > billedAt ? billedAt : _fetchedAt;
        }
        Account.fetch(identity, _fetchedAt, function cb(error, fetched) {
          next(error, account, fetched);
        });
      },

      // 3.
      function findAccountJurisdiction(account, fetched, next) {
        // ensure fetched
        let _fetched = _.merge({}, fetched); // eslint-disable-line no-underscore-dangle
        _fetched = _.omitBy(_fetched, isEmpty);
        const { jurisdiction } = _fetched;

        // back off not fetched
        if (_.isEmpty(_fetched) || _.isEmpty(jurisdiction)) {
          next(null, account, _fetched);
        }

        // fetch jurisdiction
        else {
          // prepare criteria
          const criteria = {
            $or: [{ name: jurisdiction }, { code: jurisdiction }],
          };

          // fetch jurisdiction
          majifixJurisdiction.Jurisdiction.findOne(criteria, function cb(error, data) {
            _fetched.jurisdiction = data || account.jurisdiction;
            next(error, account, _fetched);
          });
        }
      },

      // 4.
      function upsertFetchedAccount(account, fetched, next) {
        // ensure fetched
        let _fetched = _.merge({}, fetched); // eslint-disable-line no-underscore-dangle
        _fetched = _.omitBy(_fetched, isEmpty);

        // upsert
        if (account && account.post) {
          // upsert accessors
          _.forEach(_fetched.accessors, function cb(accessor) {
            if (!_.isEmpty(accessor.phone)) {
              account.upsertAccessor(accessor.phone, accessor);
            }
          });

          // TODO bills upsert

          // unset
          delete _fetched.accessors;

          // set other & patch
          account.put(_fetched, next);
        }

        // create
        else if (!_.isEmpty(_fetched)) {
          Account.post(_fetched, next);
        }

        // invalid account number or identity
        else {
          const error = new Error('Invalid Account Number or Identity');
          error.status = 400;
          next(error);
        }
      },
    ],
    done
  );
};

/**
 * @name getPhones
 * @function getPhones
 * @description pull distinct account phones
 * @param {object} [criteria] valid query criteria
 * @param {Function} done a callback to invoke on success or error
 * @returns {string[]|Error} set of phone number or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
AccountSchema.statics.getPhones = function getPhones(criteria, done) {
  // refs
  const Account = this;

  // normalize arguments
  const _criteria = _.isFunction(criteria) ? {} : _.merge({}, criteria); // eslint-disable-line no-underscore-dangle
  const _done = _.isFunction(criteria) ? criteria : done; // eslint-disable-line no-underscore-dangle

  return Account.find(_criteria)
    .distinct('phone')
    .exec(function onGetPhones(error, phones) {
      let data = phones;
      if (!error) {
        data = _.uniq(_.compact([].concat(phones)));
      }
      return _done(error, data);
    });
};

/* export account model */
const Account = mongooseCommon.model(majifixCommon.MODEL_NAME_ACCOUNT, AccountSchema);

/* constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
const PATH_VERIFY = '/accounts/verify';
const PATH_LIST = '/accounts';
const PATH_SINGLE = '/accounts/:id';
const PATH_ACCESSORS = '/accounts/:id/accessors';
const PATH_ACCESSORS_SINGLE = '/accounts/:id/accessors/:phone';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/accounts';

/**
 * @name AccountHttpRouter
 * @namespace AccountHttpRouter
 *
 * @description A representation of an entity
 * (i.e organization, individual, customer, or client) which
 * receiving service(s) from a particular jurisdiction.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */
const router = new expressCommon.Router({
  version: API_VERSION,
});

/**
 * @name GetAccounts
 * @memberof AccountHttpRouter
 * @description Returns a list of accounts
 */
router.get(PATH_LIST, function getAccounts(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  Account.get(options, function onGetAccounts(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @name PostAccount
 * @memberof AccountHttpRouter
 * @description Create new Account
 */
router.post(PATH_LIST, function postAccount(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  Account.post(body, function onPostAccount(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});

/**
 * @name GetAccount
 * @memberof AccountHttpRouter
 * @description Get existing account
 */
router.get(PATH_SINGLE, function getAccount(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  Account.getById(options, function onGetAccount(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @name PatchAccount
 * @memberof AccountHttpRouter
 * @description Patch existing account
 */
router.patch(PATH_SINGLE, function patchAccount(request, response, next) {
  // obtain account id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
  const patches = _.merge({}, request.body);

  Account.patch(_id, patches, function onPatchAccount(error, patched) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(patched);
    }
  });
});

/**
 * @name PutAccount
 * @memberof AccountHttpRouter
 * @description Put existing account
 */
router.put(PATH_SINGLE, function putAccount(request, response, next) {
  // obtain account id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
  const updates = _.merge({}, request.body);

  Account.put(_id, updates, function onPutAccount(error, updated) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(updated);
    }
  });
});

/**
 * @name DeleteAccount
 * @memberof AccountHttpRouter
 * @description Delete existing account
 */
router.delete(PATH_SINGLE, function deleteAccount(request, response, next) {
  // obtain account id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  Account.del(_id, function onDeleteAccount(error, deleted) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});

/**
 * @name GetJurisdictionAccounts
 * @memberof AccountHttpRouter
 * @description Returns a list of accounts of specified jurisdiction
 */
router.get(PATH_JURISDICTION, function getAccounts(request, response, next) {
  // obtain request options
  const { jurisdiction } = request.params;
  const filter = jurisdiction ? { filter: { jurisdiction } } : {};
  const options = _.merge({}, filter, request.mquery);

  Account.get(options, function onGetAccounts(error, found) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @name VerifyAccountAccess
 * @memberof AccountHttpRouter
 * @description Create new Account
 */
router.post(PATH_VERIFY, function verifyAccess(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  Account.verify(body, function onVerified(error, account) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(account);
    }
  });
});

/**
 * @name GetAccountAccessor
 * @memberof AccountHttpRouter
 * @description Get account accessors
 */
router.get(PATH_ACCESSORS, function getAccountAccessors(
  request,
  response,
  next
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // lockup account
  Account.getById(options, function onGetAccout(error, account) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(account);
    }
  });
});

/**
 * @name CreateAccountAccessor
 * @memberof AccountHttpRouter
 * @description Create account accessors
 */
router.post(PATH_ACCESSORS, function postAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor
  const accessor = request.body;

  // obtain accessor phone
  const { phone } = accessor;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function upsertAccessors(account, next) {
        account.upsertAccessor(phone, accessor).put(next);
      },
    ],
    function onUpsertAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name PatchAccountAccessor
 * @memberof AccountHttpRouter
 * @description Patch account accessors
 */
router.patch(PATH_ACCESSORS_SINGLE, function patchAccountAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor
  const accessor = request.body;

  // obtain accessor phone
  const { phone } = request.params;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function upsertAccessors(account, next) {
        account.upsertAccessor(phone, accessor).put(next);
      },
    ],
    function onUpsertAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name PutAccountAccessor
 * @memberof AccountHttpRouter
 * @description Put account accessors
 */
router.put(PATH_ACCESSORS_SINGLE, function putAccountAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor
  const accessor = request.body;

  // obtain accessor phone
  const { phone } = request.params;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function upsertAccessors(account, next) {
        account.upsertAccessor(phone, accessor).put(next);
      },
    ],
    function onUpsertAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name DeleteAccountAccessor
 * @memberof AccountHttpRouter
 * @description Delete account accessors
 */
router.delete(PATH_ACCESSORS_SINGLE, function removeAccountAccountAccessors(
  request,
  response,
  cb
) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain account id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain accessor phone
  const { phone } = request.params;

  async.waterfall(
    [
      function getAccountById(next) {
        Account.getById(options, next);
      },

      function removeAccessors(account, next) {
        account.removeAccessor(phone).put(next);
      },
    ],
    function onRemoveAccessor(error, account) {
      // forward error
      if (error) {
        cb(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(account);
      }
    }
  );
});

/**
 * @name majifix-account
 * @description A representation of an entity
 * (i.e organization, individual, customer, or client) which
 * receiving service(s) from a particular jurisdiction.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { Account, start } = require('@codetanzania/majifix-account');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = common.pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/* export function */
const account = integration => {
  // ensure integration
  if (integration) {
    const { fetchAccount } = integration;
    if (_.isFunction(fetchAccount)) {
      Account.fetchAccount = fetchAccount;
    }
  }
  return account;
};

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
account.info = info;

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.apiVersion = env.apiVersion();

/**
 * @name accountRouter
 * @description account http router
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.accountRouter = router;

/**
 * @name Account
 * @description Account model
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.Account = Account;

/**
 * @function start
 * @name start
 * @description start http server
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
account.start = expressCommon.start;

module.exports = account;
