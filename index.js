'use strict';


/*** dependencies*/
const path = require('path');


/*** export http app */
const app = require(path.join(__dirname, '..', 'http', 'app'));
module.exports = app;