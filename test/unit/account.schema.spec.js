import { expect } from '@lykmapipo/mongoose-test-helpers';
import { getString } from '@lykmapipo/env';
import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import Account from '../../src/account.model';

const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

describe('Account', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const jurisdiction = Account.schema.path('jurisdiction');

      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an.instanceof(SchemaTypes.ObjectId);
      expect(jurisdiction.instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.options.type).to.be.a('function');
      expect(jurisdiction.options.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.options.ref).to.be.equal(Jurisdiction.MODEL_NAME);
      expect(jurisdiction.options.index).to.be.true;
      expect(jurisdiction.options.exists).to.exist.and.be.an('object');
      expect(jurisdiction.options.autopopulate).to.exist.and.be.an('object');
    });

    it('should have category field', () => {
      const category = Account.schema.path('category');

      expect(category).to.exist;
      expect(category).to.be.an.instanceof(SchemaTypes.String);
      expect(category.instance).to.be.equal('String');
      expect(category).to.be.an('object');
      expect(category.options.type).to.be.a('function');
      expect(category.options.type.name).to.be.equal('String');
      expect(category.options.trim).to.be.true;
      expect(category.options.index).to.be.true;
      expect(category.options.searchable).to.be.true;
      expect(category.options.fake).to.exist;
    });

    it('should have number field', () => {
      const number = Account.schema.path('number');

      expect(number).to.exist;
      expect(number).to.be.an.instanceof(SchemaTypes.String);
      expect(number.instance).to.be.equal('String');
      expect(number).to.be.an('object');
      expect(number.options.type).to.be.a('function');
      expect(number.options.type.name).to.be.equal('String');
      expect(number.options.required).to.be.true;
      expect(number.options.uppercase).to.be.true;
      expect(number.options.trim).to.be.true;
      expect(number.options.index).to.be.true;
      expect(number.options.searchable).to.be.true;
      expect(number.options.fake).to.exist;
    });

    it('should have identity field', () => {
      const identity = Account.schema.path('identity');

      expect(identity).to.exist;
      expect(identity).to.be.an.instanceof(SchemaTypes.String);
      expect(identity.instance).to.be.equal('String');
      expect(identity).to.be.an('object');
      expect(identity.options.type).to.be.a('function');
      expect(identity.options.type.name).to.be.equal('String');
      expect(identity.options.uppercase).to.be.true;
      expect(identity.options.trim).to.be.true;
      expect(identity.options.index).to.be.true;
      expect(identity.options.searchable).to.be.true;
      expect(identity.options.fake).to.exist;
    });

    it('should have name field', () => {
      const name = Account.schema.path('name');

      expect(name).to.exist;
      expect(name).to.be.an.instanceof(SchemaTypes.String);
      expect(name.instance).to.be.equal('String');
      expect(name).to.be.an('object');
      expect(name.options.type).to.be.a('function');
      expect(name.options.type.name).to.be.equal('String');
      expect(name.options.required).to.be.true;
      expect(name.options.trim).to.be.true;
      expect(name.options.index).to.be.true;
      expect(name.options.searchable).to.be.true;
      expect(name.options.fake).to.exist;
    });

    it('should have phone field', () => {
      const phone = Account.schema.path('phone');

      expect(phone).to.exist;
      expect(phone).to.be.an.instanceof(SchemaTypes.String);
      expect(phone.instance).to.be.equal('String');
      expect(phone).to.be.an('object');
      expect(phone.options.type).to.be.a('function');
      expect(phone.options.type.name).to.be.equal('String');
      expect(phone.options.required).to.be.true;
      expect(phone.options.trim).to.be.true;
      expect(phone.options.index).to.be.true;
      expect(phone.options.searchable).to.be.true;
      expect(phone.options.fake).to.exist;
    });

    it('should have email field', () => {
      const email = Account.schema.path('email');

      expect(email).to.exist;
      expect(email).to.be.an.instanceof(SchemaTypes.String);
      expect(email.instance).to.be.equal('String');
      expect(email).to.be.an('object');
      expect(email.options.type).to.be.a('function');
      expect(email.options.type.name).to.be.equal('String');
      expect(email.options.lowercase).to.be.true;
      expect(email.options.trim).to.be.true;
      expect(email.options.index).to.be.true;
      expect(email.options.searchable).to.be.true;
      expect(email.options.fake).to.exist;
    });

    it('should have neighborhood field', () => {
      const neighborhood = Account.schema.path('neighborhood');

      expect(neighborhood).to.exist;
      expect(neighborhood).to.be.an.instanceof(SchemaTypes.String);
      expect(neighborhood.instance).to.be.equal('String');
      expect(neighborhood).to.be.an('object');
      expect(neighborhood.options.type).to.be.a('function');
      expect(neighborhood.options.type.name).to.be.equal('String');
      expect(neighborhood.options.trim).to.be.true;
      expect(neighborhood.options.index).to.be.true;
      expect(neighborhood.options.searchable).to.be.true;
      expect(neighborhood.options.fake).to.exist;
    });

    it('should have address field', () => {
      const address = Account.schema.path('address');

      expect(address).to.exist;
      expect(address).to.be.an.instanceof(SchemaTypes.String);
      expect(address.instance).to.be.equal('String');
      expect(address).to.be.an('object');
      expect(address.options.type).to.be.a('function');
      expect(address.options.type.name).to.be.equal('String');
      expect(address.options.trim).to.be.true;
      expect(address.options.index).to.be.true;
      expect(address.options.searchable).to.be.true;
      expect(address.options.fake).to.exist;
    });

    it('should have locale field', () => {
      const locale = Account.schema.path('locale');

      expect(locale).to.exist;
      expect(locale).to.be.an.instanceof(SchemaTypes.String);
      expect(locale.instance).to.be.equal('String');
      expect(locale).to.be.an('object');
      expect(locale.options.type).to.be.a('function');
      expect(locale.options.type.name).to.be.equal('String');
      expect(locale.options.default).to.exist;
      expect(locale.options.trim).to.be.true;
      expect(locale.options.index).to.be.true;
      expect(locale.options.searchable).to.be.true;
      expect(locale.options.fake).to.exist;
      expect(locale.options.default).to.be.equal(DEFAULT_LOCALE);
    });

    describe('location', () => {
      it('should be an embedded subdocument', () => {
        const { location } = Account.schema.tree;
        const { instance } = Account.schema.paths.location;
        const { tree } = Account.schema.paths.location.schema;

        expect(instance).to.be.equal('Embedded');
        expect(location).to.exist;
        expect(location).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.type).to.exist;
        expect(tree.coordinates).to.exist;
      });

      it('should have GeoJSON type field', () => {
        const { schema } = Account.schema.paths.location;
        const { type } = schema.tree;
        const { instance } = schema.paths.type;

        expect(instance).to.be.equal('String');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(type.type).to.be.a('function');
        expect(type.type.name).to.be.equal('String');
        expect(type.default).to.exist;
      });

      it.skip('should have GeoJSON coordinates field', () => {
        const { schema } = Account.schema.paths.location;
        const { coordinates } = schema.tree;
        const { instance } = schema.paths.coordinates;

        expect(instance).to.be.equal('Array');
        expect(coordinates).to.exist;
        expect(coordinates).to.be.an('object');
        expect(coordinates.type[0]).to.be.a('function');
        expect(coordinates.type[0].name).to.be.equal('Number');
      });
    });

    describe('bills', () => {
      it('should be an array of embedded subdocument', () => {
        const { bills } = Account.schema.tree;
        const { instance } = Account.schema.paths.bills;
        const { tree } = Account.schema.tree.bills[0];

        expect(instance).to.be.equal('Array');
        expect(bills).to.exist;
        expect(tree).to.exist;
        expect(tree.number).to.exist;
        expect(tree.period).to.exist;
        expect(tree.balance).to.exist;
        expect(tree.items).to.exist;
        expect(tree.notes).to.exist;
      });

      it('should have number field', () => {
        const { number } = Account.schema.tree.bills[0].tree;
        const { instance } = Account.schema.paths.bills.schema.paths.number;

        expect(instance).to.be.equal('String');
        expect(number).to.exist;
        expect(number).to.be.an('object');
        expect(number.type).to.be.a('function');
        expect(number.type.name).to.be.equal('String');
        expect(number.trim).to.be.true;
        expect(number.uppercase).to.be.true;
      });

      describe('period', () => {
        it('should be an embedded subdocument', () => {
          const { period } = Account.schema.tree.bills[0].tree;
          const { instance } = Account.schema.paths.bills.schema.paths.period;
          const { tree } = Account.schema.tree.bills[0].tree.period;

          expect(instance).to.be.equal('Embedded');
          expect(period).to.exist;
          expect(period).to.be.an('object');
          expect(tree).to.exist;
          expect(tree.name).to.exist;
          expect(tree.startedAt).to.exist;
          expect(tree.endedAt).to.exist;
          expect(tree.duedAt).to.exist;
        });

        it('should have name', () => {
          const { name } = Account.schema.tree.bills[0].tree.period.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.period.schema.paths.name;

          expect(instance).to.be.equal('String');
          expect(name).to.exist;
          expect(name).to.be.an('object');
          expect(name.trim).to.exist;
          expect(name.required).to.not.exist;
          expect(name.index).to.not.exist;
        });

        it('should have bill date', () => {
          const { billedAt } = Account.schema.tree.bills[0].tree.period.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.period.schema.paths.billedAt;

          expect(instance).to.be.equal('Date');
          expect(billedAt).to.exist;
          expect(billedAt).to.be.an('object');
          expect(billedAt.required).to.not.exist;
          expect(billedAt.index).to.not.exist;
        });

        it('should have start date', () => {
          const { startedAt } = Account.schema.tree.bills[0].tree.period.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.period.schema.paths.startedAt;

          expect(instance).to.be.equal('Date');
          expect(startedAt).to.exist;
          expect(startedAt).to.be.an('object');
          expect(startedAt.required).to.not.exist;
          expect(startedAt.index).to.not.exist;
        });

        it('should have end date', () => {
          const { endedAt } = Account.schema.tree.bills[0].tree.period.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.period.schema.paths.endedAt;

          expect(instance).to.be.equal('Date');
          expect(endedAt).to.exist;
          expect(endedAt).to.be.an('object');
          expect(endedAt.required).to.not.exist;
          expect(endedAt.index).to.not.exist;
        });

        it('should have due date', () => {
          const { duedAt } = Account.schema.tree.bills[0].tree.period.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.period.schema.paths.duedAt;

          expect(instance).to.be.equal('Date');
          expect(duedAt).to.exist;
          expect(duedAt).to.be.an('object');
          expect(duedAt.required).to.not.exist;
          expect(duedAt.index).to.not.exist;
        });
      });

      describe('balance', () => {
        it('should be an embedded subdocument', () => {
          const { balance } = Account.schema.tree.bills[0].tree;
          const { instance } = Account.schema.paths.bills.schema.paths.balance;
          const { tree } = Account.schema.tree.bills[0].tree.balance;

          expect(instance).to.be.equal('Embedded');
          expect(balance).to.exist;
          expect(balance).to.be.an('object');
          expect(tree).to.exist;
          expect(tree.outstand).to.exist;
          expect(tree.open).to.exist;
          expect(tree.charges).to.exist;
          expect(tree.close).to.exist;
        });

        it('should have outstand balance', () => {
          const { outstand } = Account.schema.tree.bills[0].tree.balance.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.balance.schema.paths.outstand;

          expect(instance).to.be.equal('Number');
          expect(outstand).to.exist;
          expect(outstand).to.be.an('object');
          expect(outstand.required).to.not.exist;
          expect(outstand.index).to.not.exist;
        });

        it('should have open balance', () => {
          const { open } = Account.schema.tree.bills[0].tree.balance.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.balance.schema.paths.open;

          expect(instance).to.be.equal('Number');
          expect(open).to.exist;
          expect(open).to.be.an('object');
          expect(open.required).to.not.exist;
          expect(open.index).to.not.exist;
        });

        it('should have period charges', () => {
          const { charges } = Account.schema.tree.bills[0].tree.balance.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.balance.schema.paths.charges;

          expect(instance).to.be.equal('Number');
          expect(charges).to.exist;
          expect(charges).to.be.an('object');
          expect(charges.required).to.not.exist;
          expect(charges.index).to.not.exist;
        });

        it('should have close balance', () => {
          const { close } = Account.schema.tree.bills[0].tree.balance.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.balance.schema.paths.close;

          expect(instance).to.be.equal('Number');
          expect(close).to.exist;
          expect(close).to.be.an('object');
          expect(close.required).to.not.exist;
          expect(close.index).to.not.exist;
        });

        it('should have debt balance', () => {
          const { debt } = Account.schema.tree.bills[0].tree.balance.tree;
          const {
            instance,
          } = Account.schema.paths.bills.schema.paths.balance.schema.paths.debt;

          expect(instance).to.be.equal('Number');
          expect(debt).to.exist;
          expect(debt).to.be.an('object');
          expect(debt.required).to.not.exist;
          expect(debt.index).to.not.exist;
        });
      });

      describe('items', () => {
        it('should an array of embedded subdocument', () => {
          const { items } = Account.schema.tree.bills[0].tree;
          const { instance } = Account.schema.paths.bills.schema.paths.items;
          const { tree } = Account.schema.tree.bills[0].tree.items[0];

          expect(instance).to.be.equal('Array');
          expect(items).to.exist;
          expect(items[0]).to.be.an('object');
          expect(tree).to.exist;
          expect(tree.name).to.exist;
          expect(tree.quantity).to.exist;
          expect(tree.price).to.exist;
          expect(tree.unit).to.exist;
        });

        describe('item', () => {
          it('should have name field', () => {
            const { name } = Account.schema.tree.bills[0].tree.items[0].tree;
            const {
              instance,
            } = Account.schema.paths.bills.schema.paths.items.schema.paths.name;

            expect(instance).to.be.equal('String');
            expect(name).to.exist;
            expect(name).to.be.an('object');
            expect(name.trim).to.be.true;
            expect(name.required).to.not.exist;
            expect(name.index).to.not.exist;
          });

          it('should have quantity field', () => {
            const {
              quantity,
            } = Account.schema.tree.bills[0].tree.items[0].tree;
            const {
              instance,
            } = Account.schema.paths.bills.schema.paths.items.schema.paths.quantity;

            expect(instance).to.be.equal('Number');
            expect(quantity).to.exist;
            expect(quantity).to.be.an('object');
            expect(quantity.required).to.not.exist;
            expect(quantity.index).to.not.exist;
          });

          it('should have price field', () => {
            const { price } = Account.schema.tree.bills[0].tree.items[0].tree;
            const {
              instance,
            } = Account.schema.paths.bills.schema.paths.items.schema.paths.price;

            expect(instance).to.be.equal('Number');
            expect(price).to.exist;
            expect(price).to.be.an('object');
            expect(price.required).to.not.exist;
            expect(price.index).to.not.exist;
          });

          it('should have unit field', () => {
            const { unit } = Account.schema.tree.bills[0].tree.items[0].tree;
            const {
              instance,
            } = Account.schema.paths.bills.schema.paths.items.schema.paths.unit;

            expect(instance).to.be.equal('String');
            expect(unit).to.exist;
            expect(unit).to.be.an('object');
            expect(unit.trim).to.be.true;
            expect(unit.required).to.not.exist;
            expect(unit.index).to.not.exist;
          });

          it('should have time field', () => {
            const { time } = Account.schema.tree.bills[0].tree.items[0].tree;
            const {
              instance,
            } = Account.schema.paths.bills.schema.paths.items.schema.paths.time;

            expect(instance).to.be.equal('Date');
            expect(time).to.exist;
            expect(time).to.be.an('object');
          });
        });
      });

      it('should have currency field', () => {
        const { currency } = Account.schema.tree.bills[0].tree;
        const { instance } = Account.schema.paths.bills.schema.paths.currency;

        expect(instance).to.be.equal('String');
        expect(currency).to.exist;
        expect(currency).to.be.an('object');
        expect(currency.type).to.be.a('function');
        expect(currency.type.name).to.be.equal('String');
        expect(currency.trim).to.be.true;
        expect(currency.uppercase).to.be.true;
      });

      it('should have notes field', () => {
        const { notes } = Account.schema.tree.bills[0].tree;
        const { instance } = Account.schema.paths.bills.schema.paths.notes;

        expect(instance).to.be.equal('String');
        expect(notes).to.exist;
        expect(notes).to.be.an('object');
        expect(notes.type).to.be.a('function');
        expect(notes.type.name).to.be.equal('String');
        expect(notes.trim).to.be.true;
      });
    });
  });

  it('should have fetchedAt field', () => {
    const fetchedAt = Account.schema.path('fetchedAt');

    expect(fetchedAt).to.exist;
    expect(fetchedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(fetchedAt.instance).to.be.equal('Date');
    expect(fetchedAt).to.be.an('object');
    expect(fetchedAt.options.type).to.be.a('function');
    expect(fetchedAt.options.type.name).to.be.equal('Date');
    expect(fetchedAt.options.index).to.be.true;
    expect(fetchedAt.options.hide).to.be.true;
    expect(fetchedAt.options.fake).to.exist;
  });
});
