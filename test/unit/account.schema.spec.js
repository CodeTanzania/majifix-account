'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const Account =
  require(path.join(__dirname, '..', '..', 'lib', 'account.model'));


describe('Account', function () {

  describe('Schema', function () {

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
      expect(jurisdiction.autopopulate).to.exist;

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


    it('should have phone field', function () {

      const phone = Account.schema.tree.phone;
      const instance = Account.schema.paths.phone.instance;

      expect(instance).to.be.equal('String');
      expect(phone).to.exist;
      expect(phone).to.be.an('object');
      expect(phone.type).to.be.a('function');
      expect(phone.type.name).to.be.equal('String');
      expect(phone.required).to.be.true;
      expect(phone.trim).to.be.true;
      expect(phone.index).to.be.true;
      expect(phone.searchable).to.be.true;

    });


    it('should have email field', function () {

      const email = Account.schema.tree.email;
      const instance = Account.schema.paths.email.instance;

      expect(instance).to.be.equal('String');
      expect(email).to.exist;
      expect(email).to.be.an('object');
      expect(email.type).to.be.a('function');
      expect(email.type.name).to.be.equal('String');
      expect(email.trim).to.be.true;
      expect(email.lowercase).to.be.true;
      expect(email.index).to.be.true;
      expect(email.searchable).to.be.true;

    });

    it('should have neighborhood field', function () {

      const neighborhood = Account.schema.tree.neighborhood;
      const instance = Account.schema.paths.neighborhood.instance;

      expect(instance).to.be.equal('String');
      expect(neighborhood).to.exist;
      expect(neighborhood).to.be.an('object');
      expect(neighborhood.type).to.be.a('function');
      expect(neighborhood.type.name).to.be.equal('String');
      expect(neighborhood.trim).to.be.true;
      expect(neighborhood.searchable).to.be.true;

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

    it('should have locale field', function () {

      const locale = Account.schema.tree.locale;
      const instance = Account.schema.paths.locale.instance;

      expect(instance).to.be.equal('String');
      expect(locale).to.exist;
      expect(locale).to.be.an('object');
      expect(locale.type).to.be.a('function');
      expect(locale.type.name).to.be.equal('String');
      expect(locale.trim).to.be.true;
      expect(locale.index).to.be.true;
      expect(locale.searchable).to.be.true;
      expect(locale.default).to.exist;
      expect(locale.default).to.be.equal(Account.DEFAULT_LOCALE);

    });

    describe('location', function () {

      it('should be an embedded subdocument', function () {

        const location = Account.schema.tree.location;
        const instance = Account.schema.paths.location.instance;
        const tree = Account.schema.paths.location.schema.tree;

        expect(instance).to.be.equal('Embedded');
        expect(location).to.exist;
        expect(location).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;

      });

      it('should have GeoJSON type field', function () {

        const schema = Account.schema.paths.location.schema;
        const type = schema.tree.type;
        const instance = schema.paths.type.instance;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;

      });


      it('should have GeoJSON coordinates field', function () {

        const schema = Account.schema.paths.location.schema;
        const coordinates = schema.tree.coordinates;
        const instance = schema.paths.coordinates.instance;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.a('function');
        expect(coordinates.type[0].name).to.be.equal(
          'Number');

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
          expect(tree.name).to.exist;
          expect(tree.startedAt).to.exist;
          expect(tree.endedAt).to.exist;
          expect(tree.duedAt).to.exist;

        });

        it('should have name', function () {

          const name = Account.schema.tree.bills[
            0].tree.period.tree.name;
          const instance = Account.schema.paths.bills
            .schema.paths.period.schema.paths.name
            .instance;

          expect(instance).to.be.equal('String');
          expect(name).to.exist;
          expect(name).to.be.an('object');
          expect(name.trim).to.exist;
          expect(name.required).to.not.exist;
          expect(name.index).to.not.exist;

        });


        it('should have bill date', function () {

          const billedAt = Account.schema.tree.bills[
            0].tree.period.tree.billedAt;
          const instance = Account.schema.paths.bills
            .schema.paths.period.schema.paths.billedAt
            .instance;

          expect(instance).to.be.equal('Date');
          expect(billedAt).to.exist;
          expect(billedAt).to.be.an('object');
          expect(billedAt.required).to.not.exist;
          expect(billedAt.index).to.not.exist;

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

          it('should have time field', function () {

            const time = Account.schema.tree.bills[
              0].tree.items[0].tree.time;
            const instance = Account.schema.paths
              .bills
              .schema.paths.items.schema.paths
              .time
              .instance;

            expect(instance).to.be.equal('Date');
            expect(time).to.exist;
            expect(time).to.be.an('object');

          });

        });
      });

      it('should have currency field', function () {

        const currency = Account.schema.tree.bills[0].tree.currency;
        const instance =
          Account.schema.paths.bills.schema.paths.currency
          .instance;

        expect(instance).to.be.equal('String');
        expect(currency).to.exist;
        expect(currency).to.be.an('object');
        expect(currency.type).to.be.a('function');
        expect(currency.type.name).to.be.equal('String');
        expect(currency.trim).to.be.true;
        expect(currency.uppercase).to.be.true;

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

});