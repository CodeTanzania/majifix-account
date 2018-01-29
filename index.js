'use strict';



//global dependencies(or imports)
const path = require('path');
const _ = require('lodash');
let mongoose = require('mongoose');


//local dependencies(or import)
const AccountSchema = require(path.join(__dirname, 'models', 'account'));


//default options
const defaults = {
  //model name
  name: 'Account'
};



module.exports = function factory(optns) {

  //normalize options
  const options = _.merge({}, defaults, optns);

  //restore mongoose
  mongoose = (options.mongoose || mongoose);

  //TODO check if model should be registered
  //register mongoose model
  const Account = mongoose.model(options.name, AccountSchema);

  //TODO register a router and export it
  //TODO use mongoose-rest-actions to expose http resources


  //return
  return {
    AccountSchema: AccountSchema,
    Account: Account
  };


};