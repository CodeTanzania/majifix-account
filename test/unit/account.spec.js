'use strict';

//dependencies
const path = require('path');
const expect = require('chai').expect;
const starter = require(path.join(__dirname, '..', '..'));

describe('starter', function () {

  it('should be an object', function () {
    expect(starter).to.not.be.null;
    expect(starter).to.be.an('object');
  });

});