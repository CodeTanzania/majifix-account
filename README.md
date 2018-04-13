majifix-account
====================

[![Build Status](https://travis-ci.org/CodeTanzania/majifix-account.svg?branch=develop)](https://travis-ci.org/CodeTanzania/majifix-account)
[![Dependencies Status](https://david-dm.org/CodeTanzania/majifix-account/status.svg?style=flat-square)](https://david-dm.org/CodeTanzania/majifix-account)

A representation of an entity (i.e organization, individual, customer, or client) which receiving service(s) from a particular [jurisdiction](https://github.com/CodeTanzania/majifix-jurisdiction).

It's a simplified version obtained after merging:
- [https://www.popoloproject.com/specs/organization.html](https://www.popoloproject.com/specs/organization.html)
- [https://www.popoloproject.com/specs/person.html](https://www.popoloproject.com/specs/person.html)
- [https://www.popoloproject.com/specs/contact-detail.html](https://www.popoloproject.com/specs/contact-detail.html)
- [http://wiki.open311.org/GeoReport_v2/#post-service-request](http://wiki.open311.org/GeoReport_v2/#post-service-request)

## Requirements
- [NodeJS v9.9.0+](https://nodejs.org)
- [Mongoose v5.0.14+](https://github.com/Automattic/mongoose)

## Installation
```sh
$ npm install majifix-account --save
```

## Usage
```js
//ensure mongo uri
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-account');

//dependencies
const mongoose = require('mongoose');
const { app } = require('majifix-account');

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI);

//fire the app
app.start(function (error, env) {
  ...
});
```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Run example
```sh
$ npm run dev
```
 Then in your browser open http://localhost:5000/v1.0.0/accounts

* Then run test
```sh
$ npm test
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

Copyright (c) 2018 CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.