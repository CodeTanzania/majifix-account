import { expect, faker, sinon } from '@lykmapipo/mongoose-test-helpers';
import {
  randomPoint,
  randomPolygon,
  TYPE_POINT,
} from 'mongoose-geojson-schemas';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import Account from '../../src/account.model';

describe('Account Instance', () => {
  it('`ensureLocation` should be a function', () => {
    const account = Account.fake();
    expect(account.ensureLocation).to.exist;
    expect(account.ensureLocation).to.be.a('function');
    expect(account.ensureLocation.length).to.be.equal(0);
    expect(account.ensureLocation.name).to.be.equal('ensureLocation');
  });

  it('should be able to ensure location from jurisdiction boundaries', () => {
    const jurisdiction = Jurisdiction.fake();
    jurisdiction.boundaries = {
      coordinates: [randomPolygon().coordinates, randomPolygon().coordinates],
    };

    const account = Account.fake();
    account.jurisdiction = jurisdiction;

    // ensure location
    const location = account.ensureLocation();
    expect(location).to.exist;
    expect(location.type).to.exist;
    expect(location.type).to.be.a('string');
    expect(location.type).to.be.equal(TYPE_POINT);
    expect(location.coordinates).to.exist;
    expect(location.coordinates).to.be.an('array');
    expect(location.coordinates).to.have.length(2);
  });

  it('should be able to ensure location from jurisdiction location', () => {
    const jurisdiction = Jurisdiction.fake();
    jurisdiction.location = randomPoint();

    const account = Account.fake();
    account.jurisdiction = jurisdiction;

    // ensure location
    const location = account.ensureLocation();
    expect(location).to.exist;
    expect(location.type).to.exist;
    expect(location.type).to.be.a('string');
    expect(location.type).to.be.equal(TYPE_POINT);
    expect(location.coordinates).to.exist;
    expect(location.coordinates).to.be.an('array');
    expect(location.coordinates).to.have.length(2);
  });

  it('`ensureUniqueAccessors` should be a function', () => {
    const account = Account.fake();
    expect(account.ensureUniqueAccessors).to.exist;
    expect(account.ensureUniqueAccessors).to.be.a('function');
    expect(account.ensureUniqueAccessors.length).to.be.equal(0);
    expect(account.ensureUniqueAccessors.name).to.be.equal(
      'ensureUniqueAccessors'
    );
  });

  it('should be able to ensure unique accessors', () => {
    const account = Account.fake();
    const exist = account.accessors.toObject();

    account.accessors.push(undefined);
    account.ensureUniqueAccessors();

    expect(account.accessors).to.exist;
    expect(account.accessors.toObject()).to.eql(exist);
  });

  it('should be able to ensure unique accessors', () => {
    const account = Account.fake();
    const exist = account.accessors.toObject();

    account.accessors.push(account.accessors[0].toObject());
    account.ensureUniqueAccessors();

    expect(account.accessors).to.exist;
    expect(account.accessors.toObject()).to.eql(exist);
  });

  it('`upsertAccessor` should be a function', () => {
    const account = Account.fake();
    expect(account.upsertAccessor).to.exist;
    expect(account.upsertAccessor).to.be.a('function');
    expect(account.upsertAccessor.length).to.be.equal(2);
    expect(account.upsertAccessor.name).to.be.equal('upsertAccessor');
  });

  it('should be able to update existing accessor', () => {
    const account = Account.fake();
    account.accessors = [account.accessors[0]];

    const exist = account.accessors.toObject();

    const accessor = account.accessors[0];
    const updates = {
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    };
    account.upsertAccessor(accessor.phone, updates);

    expect(account.accessors).to.exist;
    expect(account.accessors.toObject()).to.not.be.eql(exist);
  });

  it('should be able to add new accessor', () => {
    const account = Account.fake();
    const exist = account.accessors.toObject();

    const updates = {
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    };
    account.upsertAccessor(undefined, updates);
    const current = account.accessors.toObject();

    expect(account.accessors).to.exist;
    expect(exist.length < current.length).to.be.true;
    expect(current).to.not.be.eql(exist);
  });

  it('should be able to add new accessor', () => {
    const account = Account.fake();
    const exist = account.accessors.toObject();

    const updates = {
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    };
    account.upsertAccessor(updates.phone, updates);
    const current = account.accessors.toObject();

    expect(account.accessors).to.exist;
    expect(exist.length < current.length).to.be.true;
    expect(current).to.not.be.eql(exist);
  });

  it('`removeAccessor` should be a function', () => {
    const account = Account.fake();
    expect(account.removeAccessor).to.exist;
    expect(account.removeAccessor).to.be.a('function');
    expect(account.removeAccessor.length).to.be.equal(1);
    expect(account.removeAccessor.name).to.be.equal('removeAccessor');
  });

  it('should be able to remove existing accessor', () => {
    const account = Account.fake();
    const exist = account.accessors.toObject();
    const accessor = account.accessors[0];

    account.removeAccessor(accessor.phone);
    const current = account.accessors.toObject();

    expect(account.accessors).to.exist;
    expect(current.length < exist.length).to.true;
    expect(current).to.not.be.eql(exist);
  });
});

describe('Account Hooks', () => {
  describe('beforePost', () => {
    let ensureLocation;

    const jurisdiction = Jurisdiction.fake();
    jurisdiction.location = randomPoint();

    const account = Account.fake();
    account.jurisdiction = jurisdiction;

    beforeEach(() => {
      ensureLocation = sinon.spy(account, 'ensureLocation');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should be able to ensure location from jurisdiction', done => {
      account.beforePost((error, updated) => {
        // assert account
        const { location } = updated;
        expect(location).to.exist;
        expect(location.type).to.exist;
        expect(location.type).to.be.a('string');
        expect(location.type).to.be.equal(TYPE_POINT);
        expect(location.coordinates).to.exist;
        expect(location.coordinates).to.be.an('array');
        expect(location.coordinates).to.have.length(2);

        // assert methods call
        expect(ensureLocation).to.have.been.called;
        expect(ensureLocation).to.have.been.calledOnce;

        done();
      });
    });
  });
});

describe('Account Statics', () => {
  it('should expose model name as constant', () => {
    expect(Account.MODEL_NAME).to.exist;
    expect(Account.MODEL_NAME).to.be.equal('Account');
  });

  it('should expose autopulate as options', () => {
    expect(Account.OPTION_AUTOPOPULATE).to.exist;
    expect(Account.OPTION_AUTOPOPULATE).to.be.eql({
      select: {
        number: 1,
        identity: 1,
        name: 1,
        phone: 1,
        email: 1,
        locale: 1,
      },
      maxDepth: 1,
    });
  });

  it('should expose field select option', () => {
    expect(Account.OPTION_SELECT).to.exist;
    expect(Account.OPTION_SELECT).to.be.eql({
      number: 1,
      identity: 1,
      name: 1,
      phone: 1,
      email: 1,
      locale: 1,
    });
  });
});
