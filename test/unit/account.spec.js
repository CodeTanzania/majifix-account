'use strict';


//dependencies
const path = require('path');
const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');
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

      it('should be an embedded subdocument', function () {

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


      describe('schema', function () {

        it('should have GeoJSON type field', function () {

          const type = Account.schema.tree.location.tree.type;
          const instance =
            Account.schema.paths.location.schema.paths.type
            .instance;

          expect(instance).to.be.equal('String');
          expect(type).to.exist;
          expect(type).to.be.an('object');
          expect(type.type).to.be.a('function');
          expect(type.type.name).to.be.equal('String');
          expect(type.trim).to.be.true;
          expect(type.default).to.exist;

        });


        it('should have GeoJSON coordinates field', function () {

          const coordinates = Account.schema.tree.location.tree
            .coordinates;
          const instance =
            Account.schema.paths.location.schema.paths.coordinates
            .instance;

          expect(instance).to.be.equal('Array');
          expect(coordinates).to.exist;
          expect(coordinates).to.be.an('object');
          expect(coordinates.type[0]).to.be.a('function');
          expect(coordinates.type[0].name).to.be.equal(
            'Number');

        });

      });

    });


    describe('bills', function () {

      it('should be an array of embedded subdocument', function () {

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

      describe('schema', function () {

        it('should have number field', function () {

          const number = Account.schema.tree.bills[0].tree.number;
          const instance =
            Account.schema.paths.bills.schema.paths.number
            .instance;

          expect(instance).to.be.equal('String');
          expect(number).to.exist;
          expect(number).to.be.an('object');
          expect(number.type).to.be.a('function');
          expect(number.type.name).to.be.equal('String');
          expect(number.trim).to.be.true;
          expect(number.uppercase).to.be.true;

        });

        describe('period', function () {

          it('should be an embedded subdocument', function () {

            const period = Account.schema.tree.bills[0]
              .tree.period;
            const instance = Account.schema.paths.bills
              .schema
              .paths.period.instance;
            const tree = Account.schema.tree.bills[0].tree
              .period
              .tree;

            expect(instance).to.be.equal('Embedded');
            expect(period).to.exist;
            expect(period).to.be.an('object');
            expect(tree).to.exist;
            expect(tree.startedAt).to.exist;
            expect(tree.endedAt).to.exist;
            expect(tree.duedAt).to.exist;

          });

          it('should have start date', function () {

            const startedAt = Account.schema.tree.bills[
              0].tree.period.tree.startedAt;
            const instance = Account.schema.paths.bills
              .schema.paths.period.schema.paths.startedAt
              .instance;

            expect(instance).to.be.equal('Date');
            expect(startedAt).to.exist;
            expect(startedAt).to.be.an('object');
            expect(startedAt.required).to.not.exist;
            expect(startedAt.index).to.not.exist;

          });

          it('should have end date', function () {

            const endedAt = Account.schema.tree.bills[
              0].tree.period.tree.endedAt;
            const instance = Account.schema.paths.bills
              .schema.paths.period.schema.paths.endedAt
              .instance;

            expect(instance).to.be.equal('Date');
            expect(endedAt).to.exist;
            expect(endedAt).to.be.an('object');
            expect(endedAt.required).to.not.exist;
            expect(endedAt.index).to.not.exist;

          });

          it('should have due date', function () {

            const duedAt = Account.schema.tree.bills[
              0].tree.period.tree.duedAt;
            const instance = Account.schema.paths.bills
              .schema.paths.period.schema.paths.duedAt
              .instance;

            expect(instance).to.be.equal('Date');
            expect(duedAt).to.exist;
            expect(duedAt).to.be.an('object');
            expect(duedAt.required).to.not.exist;
            expect(duedAt.index).to.not.exist;

          });

        });

        describe('balance', function () {

          it('should be an embedded subdocument', function () {

            const balance = Account.schema.tree.bills[0]
              .tree
              .balance;
            const instance = Account.schema.paths.bills
              .schema
              .paths.balance.instance;
            const tree = Account.schema.tree.bills[0].tree
              .balance
              .tree;

            expect(instance).to.be.equal('Embedded');
            expect(balance).to.exist;
            expect(balance).to.be.an('object');
            expect(tree).to.exist;
            expect(tree.outstand).to.exist;
            expect(tree.open).to.exist;
            expect(tree.charges).to.exist;
            expect(tree.close).to.exist;

          });

          it('should have outstand balance', function () {

            const outstand = Account.schema.tree.bills[
              0].tree.balance.tree.outstand;
            const instance = Account.schema.paths.bills
              .schema.paths.balance.schema.paths.outstand
              .instance;

            expect(instance).to.be.equal('Number');
            expect(outstand).to.exist;
            expect(outstand).to.be.an('object');
            expect(outstand.required).to.not.exist;
            expect(outstand.index).to.not.exist;

          });

          it('should have open balance', function () {

            const open = Account.schema.tree.bills[
              0].tree.balance.tree.open;
            const instance = Account.schema.paths.bills
              .schema.paths.balance.schema.paths.open
              .instance;

            expect(instance).to.be.equal('Number');
            expect(open).to.exist;
            expect(open).to.be.an('object');
            expect(open.required).to.not.exist;
            expect(open.index).to.not.exist;

          });

          it('should have period charges', function () {

            const charges = Account.schema.tree.bills[
              0].tree.balance.tree.charges;
            const instance = Account.schema.paths.bills
              .schema.paths.balance.schema.paths.charges
              .instance;

            expect(instance).to.be.equal('Number');
            expect(charges).to.exist;
            expect(charges).to.be.an('object');
            expect(charges.required).to.not.exist;
            expect(charges.index).to.not.exist;

          });

          it('should have close balance', function () {

            const close = Account.schema.tree.bills[
              0].tree.balance.tree.close;
            const instance = Account.schema.paths.bills
              .schema.paths.balance.schema.paths.close
              .instance;

            expect(instance).to.be.equal('Number');
            expect(close).to.exist;
            expect(close).to.be.an('object');
            expect(close.required).to.not.exist;
            expect(close.index).to.not.exist;

          });

          it('should have debt balance', function () {

            const debt = Account.schema.tree.bills[
              0].tree.balance.tree.debt;
            const instance = Account.schema.paths.bills
              .schema.paths.balance.schema.paths.debt
              .instance;

            expect(instance).to.be.equal('Number');
            expect(debt).to.exist;
            expect(debt).to.be.an('object');
            expect(debt.required).to.not.exist;
            expect(debt.index).to.not.exist;

          });

        });

        describe('items', function () {

          it('should an array of embedded subdocument',
            function () {

              const items = Account.schema.tree.bills[0].tree
                .items;
              const instance = Account.schema.paths.bills
                .schema
                .paths.items.instance;
              const tree = Account.schema.tree.bills[0].tree
                .items[0].tree;

              expect(instance).to.be.equal('Array');
              expect(items).to.exist;
              expect(items[0]).to.be.an('object');
              expect(tree).to.exist;
              expect(tree.name).to.exist;
              expect(tree.quantity).to.exist;
              expect(tree.price).to.exist;
              expect(tree.unit).to.exist;

            });

          describe('item', function () {

            it('should have name field', function () {

              const name = Account.schema.tree.bills[
                0].tree.items[0].tree.name;
              const instance = Account.schema.paths
                .bills
                .schema.paths.items.schema.paths
                .name
                .instance;

              expect(instance).to.be.equal('String');
              expect(name).to.exist;
              expect(name).to.be.an('object');
              expect(name.trim).to.be.true;
              expect(name.required).to.not.exist;
              expect(name.index).to.not.exist;

            });


            it('should have quantity field', function () {

              const quantity = Account.schema.tree.bills[
                0].tree.items[0].tree.quantity;
              const instance = Account.schema.paths
                .bills
                .schema.paths.items.schema.paths
                .quantity
                .instance;

              expect(instance).to.be.equal('Number');
              expect(quantity).to.exist;
              expect(quantity).to.be.an('object');
              expect(quantity.required).to.not.exist;
              expect(quantity.index).to.not.exist;

            });

            it('should have price field', function () {

              const price = Account.schema.tree.bills[
                0].tree.items[0].tree.price;
              const instance = Account.schema.paths
                .bills
                .schema.paths.items.schema.paths
                .price
                .instance;

              expect(instance).to.be.equal('Number');
              expect(price).to.exist;
              expect(price).to.be.an('object');
              expect(price.required).to.not.exist;
              expect(price.index).to.not.exist;

            });

            it('should have unit field', function () {

              const unit = Account.schema.tree.bills[
                0].tree.items[0].tree.unit;
              const instance = Account.schema.paths
                .bills
                .schema.paths.items.schema.paths
                .unit
                .instance;

              expect(instance).to.be.equal('String');
              expect(unit).to.exist;
              expect(unit).to.be.an('object');
              expect(unit.trim).to.be.true;
              expect(unit.required).to.not.exist;
              expect(unit.index).to.not.exist;

            });

          });
        });

        it('should have notes field', function () {

          const notes = Account.schema.tree.bills[0].tree.notes;
          const instance =
            Account.schema.paths.bills.schema.paths.notes
            .instance;

          expect(instance).to.be.equal('String');
          expect(notes).to.exist;
          expect(notes).to.be.an('object');
          expect(notes.type).to.be.a('function');
          expect(notes.type.name).to.be.equal('String');
          expect(notes.trim).to.be.true;

        });

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

    describe('store', function () {

      const _id = new mongoose.Types.ObjectId();
      const model = { number: faker.random.uuid() };

      let store;

      beforeEach(function () {
        store = sinon.mock(Account)
          .expects('store')
          .yields(null, { _id: _id, number: model.number });
      });

      afterEach(function () {
        store.restore();
      });

      it('should be able to create account', function (done) {

        expect(Account.store).to.exist;

        Account
          .store(model, function (error, created) {
            expect(store).to.have.been.called;
            expect(store).to.have.been.calledOnce;
            expect(store)
              .to.have.been.calledWith(model);
            expect(created._id).to.be.eql(_id);
            expect(created.number).to.be.equal(model.number);
            done(error, created);
          });

      });

    });

    describe('get', function () {

      const _id = new mongoose.Types.ObjectId();

      let get;

      beforeEach(function () {
        get = sinon.mock(Account)
          .expects('get')
          .yields(null, [{ _id: _id }]);
      });

      afterEach(function () {
        get.restore();
      });

      it('should be able get account', function (done) {

        expect(Account.get).to.exist;

        Account
          .get(function (error, found) {
            expect(get).to.have.been.called;
            expect(get).to.have.been.calledOnce;
            expect(found).to.have.length(1);
            expect(found[0]._id).to.be.eql(_id);
            done(error, found);
          });

      });

    });

    describe('getById', function () {

      const _id = new mongoose.Types.ObjectId();

      let getById;

      beforeEach(function () {
        getById = sinon.mock(Account)
          .expects('getById')
          .yields(null, { _id: _id });
      });

      afterEach(function () {
        getById.restore();
      });

      it('should be able get account', function (done) {

        expect(Account.getById).to.exist;

        Account
          .getById(_id, function (error, found) {
            expect(getById).to.have.been.called;
            expect(getById).to.have.been.calledOnce;
            expect(getById).to.have.been.calledWith(_id);
            expect(found._id).to.be.eql(_id);
            done(error, found);
          });

      });


    });

    describe('getByIdAndUpdate', function () {

      const _id = new mongoose.Types.ObjectId();
      const updates = { number: faker.random.uuid() };

      let getByIdAndUpdate;

      beforeEach(function () {
        getByIdAndUpdate = sinon.mock(Account)
          .expects('getByIdAndUpdate')
          .yields(null, { _id: _id, number: updates.number });
      });

      afterEach(function () {
        getByIdAndUpdate.restore();
      });

      it('should be able to update account', function (done) {

        expect(Account.getByIdAndUpdate).to.exist;

        Account
          .getByIdAndUpdate(_id, updates,
            function (error, updated) {
              expect(getByIdAndUpdate).to.have.been.called;
              expect(getByIdAndUpdate).to.have.been.calledOnce;
              expect(getByIdAndUpdate)
                .to.have.been.calledWith(_id, updates);
              expect(updated._id).to.be.eql(_id);
              expect(updated.number).to.be.equal(updates.number);
              done(error, updated);
            });

      });

    });

    describe('getByIdAndRemove', function () {

      const _id = new mongoose.Types.ObjectId();

      let getByIdAndRemove;

      beforeEach(function () {
        getByIdAndRemove = sinon.mock(Account)
          .expects('getByIdAndRemove')
          .yields(null, { _id: _id });
      });

      afterEach(function () {
        getByIdAndRemove.restore();
      });

      it('should be able to remove account', function (done) {

        expect(Account.getByIdAndRemove).to.exist;

        Account
          .getByIdAndRemove(_id, function (error, removed) {
            expect(getByIdAndRemove).to.have.been.called;
            expect(getByIdAndRemove).to.have.been.calledOnce;
            expect(getByIdAndRemove)
              .to.have.been.calledWith(_id);
            expect(removed._id).to.be.eql(_id);
            done(error, removed);
          });

      });

    });

  });

});