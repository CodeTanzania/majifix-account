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
      const instance = Account.schema.paths.jurisdiction.instance;

      expect(instance).to.be.equal('ObjectID');
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
      const instance = Account.schema.paths.number.instance;

      expect(instance).to.be.equal('String');
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
      const instance = Account.schema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.required).to.be.true;
      expect(name.trim).to.be.true;
      expect(name.index).to.be.true;
      expect(name.searchable).to.be.true;

    });


    it('should have phones field', function () {

      const phones = Account.schema.tree.phones;
      const instance = Account.schema.paths.phones.instance;

      expect(instance).to.equal('Array');
      expect(phones).to.exist;
      expect(phones).to.be.an('object');
      expect(phones.type[0]).to.be.a('function');
      expect(phones.type[0].name).to.be.equal('String');
      expect(phones.required).to.be.true;
      expect(phones.index).to.be.true;
      expect(phones.searchable).to.be.true;

    });


    it('should have emails field', function () {

      const emails = Account.schema.tree.emails;
      const instance = Account.schema.paths.emails.instance;


      expect(instance).to.be.equal('Array');
      expect(emails).to.exist;
      expect(emails).to.be.an('object');
      expect(emails.type[0]).to.be.a('function');
      expect(emails.type[0].name).to.be.equal('String');
      expect(emails.index).to.be.true;
      expect(emails.searchable).to.be.true;

    });

    it('should have address field', function () {

      const address = Account.schema.tree.address;
      const instance = Account.schema.paths.address.instance;

      expect(instance).to.be.equal('String');
      expect(address).to.exist;
      expect(address).to.be.an('object');
      expect(address.type).to.be.a('function');
      expect(address.type.name).to.be.equal('String');
      expect(address.trim).to.be.true;
      expect(address.searchable).to.be.true;

    });

    describe('location', function () {

      it('should be embedded subdocument', function () {

        const location = Account.schema.tree.location;
        const instance = Account.schema.paths.location.instance;
        const tree = Account.schema.tree.location.tree;

        expect(instance).to.be.equal('Embedded');
        expect(location).to.exist;
        expect(location).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;

      });


      it('should have GeoJSON type field', function () {

        const type = Account.schema.tree.location.tree.type;
        const instance =
          Account.schema.paths.location.schema.paths.type.instance;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.trim).to.be.true;
        expect(type.default).to.exist;

      });


      it('should have GeoJSON coordinates field', function () {

        const coordinates = Account.schema.tree.location.tree.coordinates;
        const instance =
          Account.schema.paths.location.schema.paths.coordinates
          .instance;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.a('function');
        expect(coordinates.type[0].name).to.be.equal('Number');

      });


    });


    describe('bills', function () {

      it('should be array of embedded subdocument', function () {

        const bills = Account.schema.tree.bills;
        const instance = Account.schema.paths.bills.instance;
        const tree = Account.schema.tree.bills[0].tree;

        expect(instance).to.be.equal('Array');
        expect(bills).to.exist;
        expect(tree).to.exist;
        expect(tree.number).to.exist;
        expect(tree.period).to.exist;
        expect(tree.balance).to.exist;
        expect(tree.items).to.exist;
        expect(tree.notes).to.exist;

      });

    });


    it('should have active field', function () {

      const active = Account.schema.tree.active;
      const instance = Account.schema.paths.active.instance;

      expect(instance).to.be.equal('Boolean');
      expect(active).to.exist;
      expect(active).to.be.an('object');
      expect(active.type).to.be.a('function');
      expect(active.type.name).to.be.equal('Boolean');
      expect(active.index).to.be.true;

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