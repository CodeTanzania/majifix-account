'use strict';


//dependencies
const path = require('path');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Model = mongoose.Model;
const Account = require(path.join(__dirname, '..', '..', 'models', 'account'));


describe('Account', function () {

  describe('schema', function () {

    it('should have jurisdiction field', function () {

      const jurisdiction = Account.schema.tree.jurisdiction;

      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.autoset).to.be.true;

    });

    it('should have number field', function () {

      const number = Account.schema.tree.number;

      expect(number).to.exist;
      expect(number).to.be.an('object');
      expect(number.type).to.be.a('function');
      expect(number.type.name).to.be.equal('String');
      expect(number.required).to.be.true;
      expect(number.uppercase).to.be.true;
      expect(number.trim).to.be.true;
      expect(number.index).to.be.true;
      expect(number.searchable).to.be.true;

    });

    it('should have name field', function () {

      const name = Account.schema.tree.name;

      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.index).to.be.true;
      expect(name.searchable).to.be.true;

    });

  });


  describe('model', function () {

    it('should be an instance of mongoose model', function () {
      expect(Account).to.not.be.null;
      expect(Account.prototype).to.be.an.instanceof(Model);
    });

    it('should have accounts collection name', function () {
      expect(Account.collection.name).to.be.equal('accounts');
      expect(Account.collection.collectionName).to.be.equal(
        'accounts');
    });

  });

});