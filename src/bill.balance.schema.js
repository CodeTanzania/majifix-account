import { createSubSchema } from '@lykmapipo/mongoose-common';

/**
 * @name Balance
 * @description represents how much is owed on a bill(or invoice).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const Balance = createSubSchema({
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

/* export balance schema */
export default Balance;
