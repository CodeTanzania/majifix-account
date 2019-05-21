'use strict';


/* dependencies */
const path = require('path');
const faker = require('@benmaruchu/faker');
const { expect } = require('chai');
const sinon = require('sinon');
const { mock, spy } = sinon;
const {
  randomPoint,
  randomPolygon,
  TYPE_POINT
} = require('mongoose-geojson-schemas');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');


/* declarations */
const Account =
  require(path.join(__dirname, '..', '..', 'lib', 'account.model'));


describe('Account', function () {

  describe('Instance', function () {

    it('`ensureLocation` should be a function', function () {
      const account = Account.fake();
      expect(account.ensureLocation).to.exist;
      expect(account.ensureLocation).to.be.a('function');
      expect(account.ensureLocation.length)
        .to.be.equal(0);
      expect(account.ensureLocation.name)
        .to.be.equal('ensureLocation');
    });

    it('should be able to ensure location from jurisdiction boundaries',
      function () {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.boundaries = {
          coordinates: [
            randomPolygon().coordinates,
            randomPolygon().coordinates
          ]
        };

        const account = Account.fake();
        account.jurisdiction = jurisdiction;

        //ensure location
        const location = account.ensureLocation();
        expect(location).to.exist;
        expect(location.type).to.exist;
        expect(location.type).to.be.a('string');
        expect(location.type).to.be.equal(TYPE_POINT);
        expect(location.coordinates).to.exist;
        expect(location.coordinates).to.be.an('array');
        expect(location.coordinates).to.have.length(2);
      });

    it('should be able to ensure location from jurisdiction location',
      function () {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.location = randomPoint();

        const account = Account.fake();
        account.jurisdiction = jurisdiction;

        //ensure location
        const location = account.ensureLocation();
        expect(location).to.exist;
        expect(location.type).to.exist;
        expect(location.type).to.be.a('string');
        expect(location.type).to.be.equal(TYPE_POINT);
        expect(location.coordinates).to.exist;
        expect(location.coordinates).to.be.an('array');
        expect(location.coordinates).to.have.length(2);
      });

    it('`ensureUniqueAccessors` should be a function', function () {
      const account = Account.fake();
      expect(account.ensureUniqueAccessors).to.exist;
      expect(account.ensureUniqueAccessors).to.be.a('function');
      expect(account.ensureUniqueAccessors.length)
        .to.be.equal(0);
      expect(account.ensureUniqueAccessors.name)
        .to.be.equal('ensureUniqueAccessors');
    });

    it('should be able to ensure unique accessors', function () {
      const account = Account.fake();
      const exist = account.accessors.toObject();

      account.accessors.push(undefined);
      account.ensureUniqueAccessors();

      expect(account.accessors).to.exist;
      expect(account.accessors.toObject()).to.eql(exist);

    });

    it('should be able to ensure unique accessors', function () {
      const account = Account.fake();
      const exist = account.accessors.toObject();

      account.accessors.push(account.accessors[0].toObject());
      account.ensureUniqueAccessors();

      expect(account.accessors).to.exist;
      expect(account.accessors.toObject()).to.eql(exist);

    });

    it('`upsertAccessor` should be a function', function () {
      const account = Account.fake();
      expect(account.upsertAccessor).to.exist;
      expect(account.upsertAccessor).to.be.a('function');
      expect(account.upsertAccessor.length)
        .to.be.equal(2);
      expect(account.upsertAccessor.name)
        .to.be.equal('upsertAccessor');
    });

    it('should be able to update existing accessor', function () {
      const account = Account.fake();
      account.accessors = [account.accessors[0]];

      const exist = account.accessors.toObject();

      const accessor = account.accessors[0];
      const updates = {
        phone: faker.phone.phoneNumber(),
        name: faker.name.findName(),
        email: faker.internet.email()
      };
      account.upsertAccessor(accessor.phone, updates);

      expect(account.accessors).to.exist;
      expect(account.accessors.toObject()).to.not.be.eql(exist);

    });

    it('should be able to add new accessor', function () {
      const account = Account.fake();
      const exist = account.accessors.toObject();

      const updates = {
        phone: faker.phone.phoneNumber(),
        name: faker.name.findName(),
        email: faker.internet.email()
      };
      account.upsertAccessor(undefined, updates);
      const current = account.accessors.toObject();

      expect(account.accessors).to.exist;
      expect(exist.length < current.length).to.be.true;
      expect(current).to.not.be.eql(exist);

    });

    it('should be able to add new accessor', function () {
      const account = Account.fake();
      const exist = account.accessors.toObject();

      const updates = {
        phone: faker.phone.phoneNumber(),
        name: faker.name.findName(),
        email: faker.internet.email()
      };
      account.upsertAccessor(updates.phone, updates);
      const current = account.accessors.toObject();

      expect(account.accessors).to.exist;
      expect(exist.length < current.length).to.be.true;
      expect(current).to.not.be.eql(exist);

    });

    it('`removeAccessor` should be a function', function () {
      const account = Account.fake();
      expect(account.removeAccessor).to.exist;
      expect(account.removeAccessor).to.be.a('function');
      expect(account.removeAccessor.length)
        .to.be.equal(1);
      expect(account.removeAccessor.name)
        .to.be.equal('removeAccessor');
    });

    it('should be able to remove existing accessor', function () {
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


  describe('Hooks', function () {

    describe('beforePost', function () {

      let ensureLocation;
      let getById;

      const jurisdiction = Jurisdiction.fake();
      jurisdiction.location = randomPoint();

      const account = Account.fake();
      account.jurisdiction = jurisdiction;

      beforeEach(function () {
        getById =
          mock(Jurisdiction).expects('getById').yields(null,
            jurisdiction);
        ensureLocation = spy(account, 'ensureLocation');
      });

      afterEach(function () {
        sinon.restore();
      });

      it('should be able to ensure location from jurisdiction',
        function (done) {

          account
            .beforePost(function (error, updated) {

              //assert account
              const { location } = updated;
              expect(location).to.exist;
              expect(location.type).to.exist;
              expect(location.type).to.be.a('string');
              expect(location.type).to.be.equal(TYPE_POINT);
              expect(location.coordinates).to.exist;
              expect(location.coordinates).to.be.an('array');
              expect(location.coordinates).to.have.length(2);

              //assert methods call
              expect(ensureLocation).to.have.been.called;
              expect(ensureLocation).to.have.been.calledOnce;

              expect(getById).to.have.been.called;
              expect(getById).to.have.been.calledOnce;
              expect(getById)
                .to.have.been.calledWith(jurisdiction._id);

              done();

            });

        });

    });

  });

  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Account.MODEL_NAME).to.exist;
      expect(Account.MODEL_NAME).to.be.equal('Account');
    });

    it('should expose default locale `en` when not set', function () {
      expect(Account.DEFAULT_LOCALE).to.exist;
      expect(Account.DEFAULT_LOCALE).to.equal('en');
    });

  });

});
