import { expect } from '@lykmapipo/mongoose-test-helpers';
import { getString } from '@lykmapipo/env';
import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import Account from '../../src/account.model';

const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');

describe('Account Schema', () => {
  it('should have jurisdiction field', () => {
    const jurisdiction = Account.path('jurisdiction');

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
    const category = Account.path('category');

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
    const number = Account.path('number');

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
    const identity = Account.path('identity');

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
    const name = Account.path('name');

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
    const phone = Account.path('phone');

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
    const email = Account.path('email');

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
    const neighborhood = Account.path('neighborhood');

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
    const address = Account.path('address');

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
    const locale = Account.path('locale');

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
      const location = Account.path('location');
      const type = Account.path('location.type');
      const coordinates = Account.path('location.coordinates');

      expect(location).to.exist;
      expect(type).to.be.instanceof(SchemaTypes.String);
      expect(coordinates).to.be.instanceof(SchemaTypes.Array);
    });

    it('should have GeoJSON type field', () => {
      const location = Account.path('location');
      const type = Account.path('location.type');

      expect(location).to.exist;
      expect(type).to.be.instanceof(SchemaTypes.String);
      expect(type.options).to.exist;
      expect(type.options).to.be.an('object');
      expect(type.options.type).to.exist.and.be.a('function');
      expect(type.options.default).to.exist.and.be.equal('Point');
      expect(type.options.set).to.exist.and.be.a('function');
    });

    it('should have GeoJSON coordinates field', () => {
      const location = Account.path('location');
      const coordinates = Account.path('location.coordinates');

      expect(location).to.exist;
      expect(coordinates).to.be.instanceof(SchemaTypes.Array);
      expect(coordinates.options).to.exist;
      expect(coordinates.options).to.be.an('object');
      expect(coordinates.options.type).to.exist.and.be.a('function');
      expect(coordinates.options.default).to.be.undefined;
    });
  });

  describe('bills', () => {
    it('should be an array of embedded subdocument', () => {
      const bills = Account.path('bills');

      expect(bills).to.exist;
      expect(bills).to.be.instanceof(SchemaTypes.Array);
    });

    it('should have number field', () => {
      const number = Account.path('bills.number');

      expect(number).to.exist;
      expect(number).to.be.instanceof(SchemaTypes.String);
      expect(number.options).to.exist;
      expect(number.options).to.be.an('object');
      expect(number.options.type).to.exist.and.be.a('function');
      expect(number.options.type.name).to.be.equal('String');
      expect(number.options.trim).to.be.true;
      expect(number.options.uppercase).to.be.true;
    });

    describe('period', () => {
      it('should be an embedded subdocument', () => {
        const period = Account.path('bills.period');

        expect(period).to.exist;
        expect(period).to.be.instanceof(SchemaTypes.Embedded);
      });

      it('should have name', () => {
        const name = Account.path('bills.period.name');

        expect(name).to.exist;
        expect(name).to.be.instanceof(SchemaTypes.String);
        expect(name.options).to.exist;
        expect(name.options).to.be.an('object');
        expect(name.options.type).to.exist.and.be.a('function');
        expect(name.options.type.name).to.be.equal('String');
        expect(name.options.trim).to.be.true;
      });

      it('should have bill date', () => {
        const billedAt = Account.path('bills.period.billedAt');

        expect(billedAt).to.exist;
        expect(billedAt).to.be.instanceof(SchemaTypes.Date);
        expect(billedAt.options).to.exist;
        expect(billedAt.options).to.be.an('object');
        expect(billedAt.options.type).to.exist.and.be.a('function');
        expect(billedAt.options.type.name).to.be.equal('Date');
        expect(billedAt.options.fake).to.exist;
      });

      it('should have start date', () => {
        const startedAt = Account.path('bills.period.startedAt');

        expect(startedAt).to.exist;
        expect(startedAt).to.be.instanceof(SchemaTypes.Date);
        expect(startedAt.options).to.exist;
        expect(startedAt.options).to.be.an('object');
        expect(startedAt.options.type).to.exist.and.be.a('function');
        expect(startedAt.options.type.name).to.be.equal('Date');
        expect(startedAt.options.fake).to.exist;
      });

      it('should have end date', () => {
        const endedAt = Account.path('bills.period.endedAt');

        expect(endedAt).to.exist;
        expect(endedAt).to.be.instanceof(SchemaTypes.Date);
        expect(endedAt.options).to.exist;
        expect(endedAt.options).to.be.an('object');
        expect(endedAt.options.type).to.exist.and.be.a('function');
        expect(endedAt.options.type.name).to.be.equal('Date');
        expect(endedAt.options.fake).to.exist;
      });

      it('should have due date', () => {
        const duedAt = Account.path('bills.period.duedAt');

        expect(duedAt).to.exist;
        expect(duedAt).to.be.instanceof(SchemaTypes.Date);
        expect(duedAt.options).to.exist;
        expect(duedAt.options).to.be.an('object');
        expect(duedAt.options.type).to.exist.and.be.a('function');
        expect(duedAt.options.type.name).to.be.equal('Date');
        expect(duedAt.options.fake).to.exist;
      });
    });

    describe('balance', () => {
      it('should be an embedded subdocument', () => {
        const balance = Account.path('bills.balance');

        expect(balance).to.exist;
        expect(balance).to.be.instanceof(SchemaTypes.Embedded);
      });

      it('should have outstand balance', () => {
        const outstand = Account.path('bills.balance.outstand');

        expect(outstand).to.exist;
        expect(outstand).to.be.instanceof(SchemaTypes.Number);
        expect(outstand.options).to.exist;
        expect(outstand.options).to.be.an('object');
        expect(outstand.options.type).to.exist.and.be.a('function');
        expect(outstand.options.type.name).to.be.equal('Number');
        expect(outstand.options.fake).to.exist;
      });

      it('should have open balance', () => {
        const open = Account.path('bills.balance.open');

        expect(open).to.exist;
        expect(open).to.be.instanceof(SchemaTypes.Number);
        expect(open.options).to.exist;
        expect(open.options).to.be.an('object');
        expect(open.options.type).to.exist.and.be.a('function');
        expect(open.options.type.name).to.be.equal('Number');
        expect(open.options.fake).to.exist;
      });

      it('should have period charges', () => {
        const charges = Account.path('bills.balance.charges');

        expect(charges).to.exist;
        expect(charges).to.be.instanceof(SchemaTypes.Number);
        expect(charges.options).to.exist;
        expect(charges.options).to.be.an('object');
        expect(charges.options.type).to.exist.and.be.a('function');
        expect(charges.options.type.name).to.be.equal('Number');
        expect(charges.options.fake).to.exist;
      });

      it('should have close balance', () => {
        const close = Account.path('bills.balance.close');

        expect(close).to.exist;
        expect(close).to.be.instanceof(SchemaTypes.Number);
        expect(close.options).to.exist;
        expect(close.options).to.be.an('object');
        expect(close.options.type).to.exist.and.be.a('function');
        expect(close.options.type.name).to.be.equal('Number');
        expect(close.options.fake).to.exist;
      });

      it('should have debt balance', () => {
        const debt = Account.path('bills.balance.debt');

        expect(debt).to.exist;
        expect(debt).to.be.instanceof(SchemaTypes.Number);
        expect(debt.options).to.exist;
        expect(debt.options).to.be.an('object');
        expect(debt.options.type).to.exist.and.be.a('function');
        expect(debt.options.type.name).to.be.equal('Number');
        expect(debt.options.fake).to.exist;
      });
    });

    describe('items', () => {
      it('should an array of embedded subdocument', () => {
        const items = Account.path('bills.items');

        expect(items).to.exist;
        expect(items).to.be.instanceof(SchemaTypes.Array);
      });

      describe('item', () => {
        it('should have name field', () => {
          const name = Account.path('bills.items.name');

          expect(name).to.exist;
          expect(name).to.be.instanceof(SchemaTypes.String);
          expect(name.options).to.exist;
          expect(name.options).to.be.an('object');
          expect(name.options.type).to.exist.and.be.a('function');
          expect(name.options.type.name).to.be.equal('String');
          expect(name.options.trim).to.be.true;
          expect(name.options.fake).to.exist;
        });

        it('should have quantity field', () => {
          const quantity = Account.path('bills.items.quantity');

          expect(quantity).to.exist;
          expect(quantity).to.be.instanceof(SchemaTypes.Number);
          expect(quantity.options).to.exist;
          expect(quantity.options).to.be.an('object');
          expect(quantity.options.type).to.exist.and.be.a('function');
          expect(quantity.options.type.name).to.be.equal('Number');
          expect(quantity.options.fake).to.exist;
        });

        it('should have price field', () => {
          const price = Account.path('bills.items.price');

          expect(price).to.exist;
          expect(price).to.be.instanceof(SchemaTypes.Number);
          expect(price.options).to.exist;
          expect(price.options).to.be.an('object');
          expect(price.options.type).to.exist.and.be.a('function');
          expect(price.options.type.name).to.be.equal('Number');
          expect(price.options.fake).to.exist;
        });

        it('should have unit field', () => {
          const unit = Account.path('bills.items.unit');

          expect(unit).to.exist;
          expect(unit).to.be.instanceof(SchemaTypes.String);
          expect(unit.options).to.exist;
          expect(unit.options).to.be.an('object');
          expect(unit.options.type).to.exist.and.be.a('function');
          expect(unit.options.type.name).to.be.equal('String');
        });

        it('should have time field', () => {
          const time = Account.path('bills.items.time');

          expect(time).to.exist;
          expect(time).to.be.instanceof(SchemaTypes.Date);
          expect(time.options).to.exist;
          expect(time.options).to.be.an('object');
          expect(time.options.type).to.exist.and.be.a('function');
          expect(time.options.type.name).to.be.equal('Date');
          expect(time.options.fake).to.exist;
        });
      });
    });

    it('should have currency field', () => {
      const currency = Account.path('bills.currency');

      expect(currency).to.exist;
      expect(currency).to.be.instanceof(SchemaTypes.String);
      expect(currency.options).to.exist;
      expect(currency.options).to.be.an('object');
      expect(currency.options.type).to.exist.and.be.a('function');
      expect(currency.options.type.name).to.be.equal('String');
      expect(currency.options.trim).to.be.true;
      expect(currency.options.uppercase).to.be.true;
      expect(currency.options.fake).to.exist;
    });

    it('should have notes field', () => {
      const notes = Account.path('bills.notes');

      expect(notes).to.exist;
      expect(notes).to.be.instanceof(SchemaTypes.String);
      expect(notes.options).to.exist;
      expect(notes.options).to.be.an('object');
      expect(notes.options.type).to.exist.and.be.a('function');
      expect(notes.options.type.name).to.be.equal('String');
      expect(notes.options.trim).to.be.true;
      expect(notes.options.fake).to.exist;
    });
  });

  it('should have fetchedAt field', () => {
    const fetchedAt = Account.path('fetchedAt');

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
