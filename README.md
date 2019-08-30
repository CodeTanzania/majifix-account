# majifix-account

[![Build Status](https://travis-ci.org/CodeTanzania/majifix-account.svg?branch=develop)](https://travis-ci.org/CodeTanzania/majifix-account)
[![Dependencies Status](https://david-dm.org/CodeTanzania/majifix-account.svg)](https://david-dm.org/CodeTanzania/majifix-account)
[![Coverage Status](https://coveralls.io/repos/github/CodeTanzania/majifix-account/badge.svg?branch=develop)](https://coveralls.io/github/CodeTanzania/majifix-account?branch=develop)
[![GitHub License](https://img.shields.io/github/license/CodeTanzania/majifix-account)](https://github.com/CodeTanzania/majifix-account/blob/develop/LICENSE)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/CodeTanzania/majifix-account/tree/develop) 

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@codetanzania/majifix-account)](https://www.npmjs.com/package/@codetanzania/majifix-account)

A representation of an entity (i.e organization, individual, customer, or client) which receiving service(s) from a particular [jurisdiction](https://github.com/CodeTanzania/majifix-jurisdiction).

It's a simplified version obtained after merging:

- [https://www.popoloproject.com/specs/organization.html](https://www.popoloproject.com/specs/organization.html)
- [https://www.popoloproject.com/specs/person.html](https://www.popoloproject.com/specs/person.html)
- [https://www.popoloproject.com/specs/contact-detail.html](https://www.popoloproject.com/specs/contact-detail.html)
- [http://wiki.open311.org/GeoReport_v2/#post-service-request](http://wiki.open311.org/GeoReport_v2/#post-service-request)

## Requirements

- [NodeJS v12+](https://nodejs.org)
- [Npm v6+](https://www.npmjs.com/)
- [MongoDB v4+](https://www.mongodb.com/)
- [Mongoose v5.6+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @codetanzania/majifix-account --save
```

## Usage

```js
import { connect } from '@lykmapipo/mongoose-common';
import { Account, start } from '@codetanzania/majifix-account';

// connect to mongodb
connect(process.env.MONGODB_URI, error => { ... });

// fire http server
start(error => { ... });
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## References

- [Open311 GeoReport v2](http://wiki.open311.org/GeoReport_v2/)
- [popolo project](https://www.popoloproject.com/)
- [http://geojson.org/](http://geojson.org/)
- [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)
- [https://opengovdata.io/](https://opengovdata.io/)

## Licence

The MIT License (MIT)

Copyright (c) CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
