'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { mock, spy } = require('sinon');
const {
  randomPoint,
  randomPolygon,
  TYPE_POINT
} = require('mongoose-geojson-schemas');
const { Jurisdiction } = require('majifix-jurisdiction');


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
          mock(Jurisdiction)
            .expects('getById')
            .yields(null, jurisdiction);
        ensureLocation =
          spy(account, 'ensureLocation');
      });

      afterEach(function () {
        ensureLocation.restore();
        getById.restore();
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