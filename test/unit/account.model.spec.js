'use strict';


/* dependencies */
const path = require('path');
const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');

/* declarations */
const Model = mongoose.Model;
const Account =
  require(path.join(__dirname, '..', '..', 'lib', 'account.model'));


describe('Account', function () {

  describe('Model', function () {

    it('should be an instance of mongoose model', function () {
      expect(Account).to.not.be.null;
      expect(Account.prototype).to.be.an.instanceof(Model);
    });

    it('should have accounts as collection name', function () {
      expect(Account.collection.name).to.be.equal('accounts');
      expect(Account.collection.collectionName)
        .to.be.equal('accounts');
    });

    describe('fake', function () {

      it('should exists', function () {
        expect(Account.fake).to.exist;
        expect(Account.fake).to.be.a('function');
      });

      it('should generate a fake account', function () {
        const account = Account.fake();
        expect(account).to.exist;
        expect(account.number).to.exist;
        expect(account.name).to.exist;
        expect(account.phone).to.exist;
        expect(account.email).to.exist;
        expect(account.neighborhood).to.exist;
        expect(account.address).to.exist;
        expect(account.bills).to.exist;
      });

    });

    describe('post', function () {

      const _id = new mongoose.Types.ObjectId();
      const model = {
        number: faker.random.uuid()
      };

      let post;

      beforeEach(function () {
        post = sinon.mock(Account)
          .expects('post')
          .yields(null, {
            _id: _id,
            number: model.number
          });
      });

      afterEach(function () {
        post.restore();
      });

      it('should be able to create a new account', function (done) {

        expect(Account.post).to.exist;
        expect(Account.post).to.be.a('function');

        Account
          .post(model, function (error, created) {
            expect(post).to.have.been.called;
            expect(post).to.have.been.calledOnce;
            expect(post).to.have.been.calledWith(model);
            expect(created._id).to.exist;
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
          .yields(null, {
            data: [{
              _id: _id
            }]
          });
      });

      afterEach(function () {
        get.restore();
      });

      it('should be able get accounts', function (done) {

        expect(Account.get).to.exist;
        expect(Account.get).to.be.a('function');

        Account
          .get(function (error, found) {
            expect(get).to.have.been.called;
            expect(get).to.have.been.calledOnce;
            expect(found).to.exist;
            expect(found).to.be.an('object');
            expect(found.data).to.exist;
            expect(found.data).to.have.length(1);
            expect(found.data[0]._id).to.be.eql(_id);
            done(error, found);
          });

      });


      it('should be able filter accounts by criteria',
        function (done) {

          const criteria = {
            filter: {
              number: {
                $eq: faker.random.uuid()
              }
            }
          };

          Account
            .get(criteria, function (error, found) {
              expect(get).to.have.been.called;
              expect(get).to.have.been.calledOnce;
              expect(get).to.have.been.calledWith(criteria);
              expect(found).to.be.an('object');
              expect(found.data).to.exist;
              expect(found.data).to.have.length(1);
              expect(found.data[0]._id).to.be.eql(_id);
              done(error, found);
            });

        });


      it(
        'should be able filter accounts by criteria and projection',
        function (done) {

          const criteria = {
            filter: {
              number: {
                $eq: faker.random.uuid()
              }
            },
            select: 'name number'
          };

          Account
            .get(criteria, function (error, found) {
              expect(get).to.have.been.called;
              expect(get).to.have.been.calledOnce;
              expect(get).to.have.been.calledWith(criteria);
              expect(found).to.be.an('object');
              expect(found.data).to.exist;
              expect(found.data).to.have.length(1);
              expect(found.data[0]._id).to.be.eql(_id);
              done(error, found);
            });

        }
      );

    });

    describe('getById', function () {

      const _id = new mongoose.Types.ObjectId();

      let getById;

      beforeEach(function () {
        getById = sinon.mock(Account)
          .expects('getById')
          .yields(null, {
            _id: _id
          });
      });

      afterEach(function () {
        getById.restore();
      });

      it('should be able get account', function (done) {

        expect(Account.getById).to.exist;
        expect(Account.getById).to.be.a('function');

        Account
          .getById(_id, function (error, found) {
            expect(getById).to.have.been.called;
            expect(getById).to.have.been.calledOnce;
            expect(getById).to.have.been.calledWith(_id);
            expect(found._id).to.be.eql(_id);
            done(error, found);
          });

      });

      it('should be able get account with options', function (done) {

        expect(Account.getById).to.exist;
        expect(Account.getById).to.be.a('function');

        const criteria = {
          _id: _id,
          select: 'number name'
        };

        Account
          .getById(criteria, function (error, found) {
            expect(getById).to.have.been.called;
            expect(getById).to.have.been.calledOnce;
            expect(getById).to.have.been.calledWith(criteria);
            expect(found._id).to.be.eql(_id);
            done(error, found);
          });

      });


    });

    describe('patch', function () {

      const _id = new mongoose.Types.ObjectId();
      const patches = {
        number: faker.random.uuid()
      };

      let patch;

      beforeEach(function () {
        patch = sinon.mock(Account)
          .expects('patch')
          .yields(null, {
            _id: _id,
            number: patches.number
          });
      });

      afterEach(function () {
        patch.restore();
      });

      it('should be able to patch an account', function (done) {

        expect(Account.patch).to.exist;
        expect(Account.patch).to.be.a('function');

        Account
          .patch(_id, patches, function (error, patched) {
            expect(patch).to.have.been.called;
            expect(patch).to.have.been.calledOnce;
            expect(patch)
              .to.have.been.calledWith(_id, patches);
            expect(patched._id).to.be.eql(_id);
            expect(patched.number).to.be.equal(patches.number);
            done(error, patched);
          });

      });

    });

    describe('del', function () {

      const _id = new mongoose.Types.ObjectId();

      let del;

      beforeEach(function () {
        del = sinon.mock(Account)
          .expects('del')
          .yields(null, {
            _id: _id
          });
      });

      afterEach(function () {
        del.restore();
      });

      it('should be able to delete an account', function (done) {

        expect(Account.del).to.exist;
        expect(Account.del).to.be.a('function');

        Account
          .del(_id, function (error, deleted) {
            expect(del).to.have.been.called;
            expect(del).to.have.been.calledOnce;
            expect(del)
              .to.have.been.calledWith(_id);
            expect(deleted._id).to.be.eql(_id);
            done(error, deleted);
          });

      });

    });

  });

});