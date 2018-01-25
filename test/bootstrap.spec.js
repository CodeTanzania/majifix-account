'use strict';


//force environment to be test
process.env.NODE_ENV = 'test';


//dependencies
require('chai').use(require('sinon-chai'));
require('sinon');
require('sinon-mongoose');