/**
 * @module majifix-account
 * @apiDefine Account  Account
 *
 * @apiDescription A representation of an entity
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

/**
 * @apiDefine Account
 * @apiSuccess {ObjectId} _id Unique account identifier
 * @apiSuccess {ObjectId} [jurisdiction = undefined] jurisdiction under
 * which this account belongs
 * @apiSuccess {String} category Human readable category of the account(or customer)
 * @apiSuccess {String} number Unique human readable account number
 * @apiSuccess {String} name Human readable name of the account
 * @apiSuccess {String} phone Primary mobile phone number used to
 * contact an account direct by a jurisdiction
 * @apiSuccess {String} [email] Primary email address used to contact
 * @apiSuccess {String} [neighborhood] Human readable district or town
 * of an account
 * @apiSuccess {String} [address] Human readable physical address of
 * an account
 * @apiSuccess {String} [locale="en"] defines the account's language, region
 * and any special variant preferences
 * @apiSuccess {Object} [location=undefined] jurisdiction point of interest on
 * account
 * @apiSuccess {Number[]} [location.coordinates] data pair for longitude and
 * latitude in format [ `<x>`, `<y>` ] or [ `<longitude>` , `<latitude>` ]
 * @apiSuccess {Number} [location.coordinates[0]] longitude
 * @apiSuccess {Number} [location.coordinates[1]] latitude
 * @apiSuccess {Object[]} [bills=undefined] account bill(or invoice)
 * from jurisdiction
 * @apiSuccess {Number} [bills.number] bill(or invoice) number from jurisdiction
 * e.g pay number, reference number etc
 * @apiSuccess {Object} [bills.period] bill(or invoice) period
 * @apiSuccess {String} [bills.period.name] Human readable bill period name
 * e.g November, Jan-Jun, May2018 etc
 * @apiSuccess {Date} [bills.period.billedAt] A date when a bill come to effect
 * i.e bill run or bill generated
 * @apiSuccess {Date} [bills.period.startedAt] A bill period start date(or time)
 * @apiSuccess {Date} [bills.period.endedAt] A bill period end date(or time)
 * @apiSuccess {Date} [bills.period.duedAt] A bill period due date(or time).
 * Mostly used by jurisdiction to refer the date when an account should
 * have already pay the bill.
 * @apiSuccess {Object} [bills.balance] bill(or invoice) balances
 * @apiSuccess {Number} [bills.balance.outstand] Current bill period outstand
 * balance i.e total amount still due after all payments within a bill period
 * @apiSuccess {Number} [bills.balance.open] Current bill period open balance
 * @apiSuccess {Number} [bills.balance.charges] Current bill period charges
 * @apiSuccess {Number} [bills.balance.debt] Current bill period
 * account total additional debt i.e loan
 * @apiSuccess {Number} [bills.balance.close] Current bill period close balance
 * i.e total amount due before any payments within a bill period.
 * @apiSuccess {Object} [bills.items] bill(or invoice) items
 * @apiSuccess {String} [bills.items.name] Human readable name of bill item
 * @apiSuccess {Number} [bills.items.quantity] Bill item quantity
 * @apiSuccess {Number} [bills.items.price] Bill item total price
 * e.g if quantity if 5 then price must be total for all of the 5 item
 * @apiSuccess {String} [bills.items.unit] Human readable unit of bill item
 * @apiSuccess {Date} [bills.items.time] Date when a bill item realized.
 * @apiSuccess {String} [bills.currency] Human readable bill currency code
 * i.e USD, TZS etc
 * @apiSuccess {String} [bills.notes] Additional human readable
 * information about the bill from jurisdiction
 * @apiSuccess {Boolean} [active=true] state whether the account is
 * active as per contract with a jurisdiction
 * @apiSuccess {Date} createdAt Date when account was created
 * @apiSuccess {Date} updatedAt Date when account was last updated
 */

/**
 * @apiDefine Accounts
 * @apiSuccess {Object[]} data List of accounts
 * @apiSuccess {ObjectId} data._id Unique account identifier
 * @apiSuccess {ObjectId} [data.jurisdiction = undefined] jurisdiction under
 * which this account belongs
 * @apiSuccess {String} data.category Human readable category of the
 * account(or customer)
 * @apiSuccess {String} data.number Unique human readable account number
 * @apiSuccess {String} data.name Human readable name of the account
 * @apiSuccess {String} data.phone Primary mobile phone number used to
 * contact an account direct by a jurisdiction
 * @apiSuccess {String} [data.email] Primary email address used to contact
 * @apiSuccess {String} [data.neighborhood] Human readable district or town
 * of an account
 * @apiSuccess {String} [data.address] Human readable physical address of
 * an account
 * @apiSuccess {String} [data.locale="en"] defines the account's language, region
 * and any special variant preferences
 * @apiSuccess {Object} [data.location=undefined] jurisdiction point of interest on
 * account
 * @apiSuccess {Number[]} [data.location.coordinates] data pair for longitude and
 * latitude in format [ `<x>`, `<y>` ] or [ `<longitude>` , `<latitude>` ]
 * @apiSuccess {Number} [data.location.coordinates[0]] longitude
 * @apiSuccess {Number} [data.location.coordinates[1]] latitude
 * @apiSuccess {Object[]} [data.bills=undefined] account bill(or invoice)
 * from jurisdiction
 * @apiSuccess {Number} [data.bills.number] bill(or invoice) number from jurisdiction
 * e.g pay number, reference number etc
 * @apiSuccess {Object} [data.bills.period] bill(or invoice) period
 * @apiSuccess {String} [data.bills.period.name] Human readable bill period name
 * e.g November, Jan-Jun, May2018 etc
 * @apiSuccess {Date} [data.bills.period.billedAt] A date when a bill come to effect
 * i.e bill run or bill generated
 * @apiSuccess {Date} [data.bills.period.startedAt] A bill period start date(or time)
 * @apiSuccess {Date} [data.bills.period.endedAt] A bill period end date(or time)
 * @apiSuccess {Date} [data.bills.period.duedAt] A bill period due date(or time).
 * Mostly used by jurisdiction to refer the date when an account should
 * have already pay the bill.
 * @apiSuccess {Object} [data.bills.balance] bill(or invoice) balances
 * @apiSuccess {Number} [data.bills.balance.outstand] Current bill period outstand
 * balance i.e total amount still due after all payments within a bill period
 * @apiSuccess {Number} [data.bills.balance.open] Current bill period open balance
 * @apiSuccess {Number} [data.bills.balance.charges] Current bill period charges
 * @apiSuccess {Number} [data.bills.balance.debt] Current bill period
 * account total additional debt i.e loan
 * @apiSuccess {Number} [data.bills.balance.close] Current bill period close balance
 * i.e total amount due before any payments within a bill period.
 * @apiSuccess {Object} [data.bills.items] bill(or invoice) items
 * @apiSuccess {String} [data.bills.items.name] Human readable name of bill item
 * @apiSuccess {Number} [data.bills.items.quantity] Bill item quantity
 * @apiSuccess {Number} [data.bills.items.price] Bill item total price
 * e.g if quantity if 5 then price must be total for all of the 5 item
 * @apiSuccess {String} [data.bills.items.unit] Human readable unit of bill item
 * @apiSuccess {Date} [bills.items.time] Date when a bill item realized.
 * @apiSuccess {String} [data.bills.currency] Human readable bill currency code
 * i.e USD, TZS etc
 * @apiSuccess {String} [data.bills.notes] Additional human readable
 * information about the bill from jurisdiction
 * @apiSuccess {Boolean} [data.active=true] state whether the account is
 * active as per contract with a jurisdiction
 * @apiSuccess {Date} data.createdAt Date when account was created
 * @apiSuccess {Date} data.updatedAt Date when account was last updated
 * @apiSuccess {Number} total Total number of accounts
 * @apiSuccess {Number} size Number of accounts returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest account
 * was last modified
 */

/**
 * @apiDefine AccountSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "_id": "5ae6e306f6eea02c073de6eb",
 *    "category": "Domestic",
 *    "number": "50524",
 *    "name": "Terrell Stoltenberg",
 *    "phone": "809-584-7580",
 *    "email": "ayden.goodwin@majifix.com",
 *    "neighborhood": "Joanieborough",
 *    "address": "30337 Cristobal Divide",
 *    "locale": "en",
 *    "location":
 *    {
 *      "type": "Point",
 *      "coordinates": [
 *        39.2563,
 *        -6.9328
 *      ]
 *    },
 *    "bills": [
 *    {
 *      "number": "895052418",
 *      "period":
 *      {
 *        "billedAt": "2018-03-30T09:33:57.784Z",
 *        "startedAt": "2018-02-28T09:33:57.784Z",
 *        "endedAt": "2018-03-30T09:33:57.784Z",
 *        "duedAt": "2018-04-30T09:33:57.784Z"
 *      },
 *      "balance":
 *      {
 *        "outstand": 3235,
 *        "open": 7,
 *        "charges": 210,
 *        "debt": 281,
 *        "close": 145
 *      },
 *      "items": [
 *      {
 *        "name": "Previous Readings",
 *        "quantity": 281,
 *        "unit": "cbm"
 *      },
 *      {
 *        "time": "2018-03-05T10:06:02.820Z",
 *        "name": "Current Readings",
 *        "quantity": 206,
 *        "unit": "cbm"
 *      },
 *      {
 *        "name": "Unit Consumed",
 *        "quantity": 80,
 *        "unit": "cbm"
 *      }],
 *      "currency": "HRK",
 *      "notes": "Veniam dolorum totam sint excepturi culpa voluptatem quasi."
 *    }],
 *    "createdAt": "2018-04-30T09:33:58.451Z",
 *    "updatedAt": "2018-04-30T09:33:58.451Z",
 *    "active": true
 *  }
 */

/**
 * @apiDefine AccountsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "data": [{
 *      "_id": "5ae6e306f6eea02c073de6eb",
 *      "category": "Domestic",
 *      "number": "50524",
 *      "name": "Terrell Stoltenberg",
 *      "phone": "809-584-7580",
 *      "email": "ayden.goodwin@majifix.com",
 *      "neighborhood": "Joanieborough",
 *      "address": "30337 Cristobal Divide",
 *      "locale": "en",
 *      "location":
 *      {
 *        "type": "Point",
 *        "coordinates": [
 *           39.2563,
 *           -6.9328
 *         ]
 *      },
 *      "bills": [{
 *        "number": "895052418",
 *        "period":
 *        {
 *          "billedAt": "2018-03-30T09:33:57.784Z",
 *          "startedAt": "2018-02-28T09:33:57.784Z",
 *          "endedAt": "2018-03-30T09:33:57.784Z",
 *          "duedAt": "2018-04-30T09:33:57.784Z"
 *        },
 *        "balance":
 *        {
 *          "outstand": 3235,
 *          "open": 7,
 *          "charges": 210,
 *          "debt": 281,
 *          "close": 145
 *        },
 *        "items": [
 *        {
 *          "name": "Previous Readings",
 *          "quantity": 281,
 *          "unit": "cbm"
 *        },
 *        {
 *          "time": "2018-03-05T10:06:02.820Z",
 *          "name": "Current Readings",
 *          "quantity": 206,
 *          "unit": "cbm"
 *        },
 *        {
 *          "name": "Unit Consumed",
 *          "quantity": 80,
 *          "unit": "cbm"
 *         }],
 *         "currency": "HRK",
 *         "notes": "Veniam dolorum totam sint excepturi culpa voluptatem quasi."
 *       }],
 *       "createdAt": "2018-04-30T09:33:58.451Z",
 *       "updatedAt": "2018-04-30T09:33:58.451Z",
 *       "active": true
 *      }],
 *      "total": 10,
 *      "size": 1,
 *      "limit": 1,
 *      "skip": 0,
 *      "page": 1,
 *      "pages": 10,
 *      "lastModified": "Mon, 30 Apr 2018 12:33:58 GMT"
 *   }
 */

/**
 * @api {get} /accounts List Accounts
 * @apiGroup Account
 * @apiName GetAccounts
 * @apiVersion 1.0.0
 * @apiDescription Returns a list of accounts
 * @apiUse RequestHeaders
 * @apiUse Accounts
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {post} /accounts Create New Account
 * @apiGroup Account
 * @apiName PostAccount
 * @apiVersion 1.0.0
 * @apiDescription Create new Account
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {get} /accounts/:id Get Existing Account
 * @apiGroup Account
 * @apiName GetAccount
 * @apiVersion 1.0.0
 * @apiDescription Get existing account
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {patch} /accounts/:id Patch Existing Account
 * @apiGroup Account
 * @apiName  PatchAccount
 * @apiVersion 1.0.0
 * @apiDescription Patch existing account
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {put} /accounts/:id Put Existing Account
 * @apiGroup Account
 * @apiName  PutAccount
 * @apiVersion 1.0.0
 * @apiDescription Put existing account
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {delete} /accounts/:id Delete Account
 * @apiGroup Account
 * @apiName  DeleteAccount
 * @apiVersion 1.0.0
 * @apiDescription Delete existing account
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {get} /jurisdictions/:jurisdiction/accounts List Jurisdiction Accounts
 * @apiVersion 1.0.0
 * @apiName GetJurisdictionAccounts
 * @apiGroup Account
 * @apiDescription Returns a list of accounts of specified jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Accounts
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {post} /accounts/verify Verify Account Access
 * @apiGroup Account
 * @apiName VerifyAccountAccess
 * @apiVersion 1.0.0
 * @apiDescription Create new Account
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {get} /accounts/:id/accessors Get Account Accessor
 * @apiGroup Account
 * @apiName GetAccountAccessor
 * @apiVersion 1.0.0
 * @apiDescription Get account accessors
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {post} /accounts/:id/accessors Create Account Accessor
 * @apiGroup Account
 * @apiName CreateAccountAccessor
 * @apiVersion 1.0.0
 * @apiDescription Create account accessors
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {patch} /accounts/:id/accessors/:phone Patch Account Accessor
 * @apiGroup Account
 * @apiName PatchAccountAccessor
 * @apiVersion 1.0.0
 * @apiDescription Patch account accessors
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {put} /accounts/:id/accessors/:phone Put Account Accessor
 * @apiGroup Account
 * @apiName PutAccountAccessor
 * @apiVersion 1.0.0
 * @apiDescription Put account accessors
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {delete} /accounts/:id/accessors/:phone Delete Account Accessor
 * @apiGroup Account
 * @apiName DeleteAccountAccessor
 * @apiVersion 1.0.0
 * @apiDescription Delete account accessors
 * @apiUse RequestHeaders
 * @apiUse Account
 *
 * @apiUse RequestHeadersExample
 * @apiUse AccountSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
