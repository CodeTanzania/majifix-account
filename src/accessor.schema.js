import { getString, getStringSet } from '@lykmapipo/env';
import { createSubSchema } from '@lykmapipo/mongoose-common';

/* constants */
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStringSet('LOCALES', [DEFAULT_LOCALE]);
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
const Accessor = createSubSchema(
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

/* export accessor schema */
export default Accessor;
