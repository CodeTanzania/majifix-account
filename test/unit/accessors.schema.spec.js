'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const Account =
  require(path.join(__dirname, '..', '..', 'lib', 'account.model'));


describe('Account', function () {

  describe('Accessors', function () {

    describe('Schema', function () {

      it('should be an array of embedded subdocuments', function () {

        const accessors = Account.schema.tree.accessors;
        const instance = Account.schema.paths.accessors.instance;
        const tree = Account.schema.tree.accessors[0].tree;

        expect(instance).to.be.equal('Array');
        expect(accessors).to.exist;
        expect(tree).to.exist;
        expect(tree.name).to.exist;
        expect(tree.phone).to.exist;
        expect(tree.email).to.exist;
        expect(tree.locale).to.exist;
        expect(tree.verifiedAt).to.exist;

      });

      it('should have name field', function () {

        const name = Account.schema.tree.accessors[0].tree.name;
        const instance =
          Account.schema.paths.accessors.schema.paths.name.instance;

        expect(instance).to.be.equal('String');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(name.type).to.be.a('function');
        expect(name.type.name).to.be.equal('String');
        expect(name.trim).to.be.true;
        expect(name.index).to.be.true;
        expect(name.fake).to.exist;

      });

      it('should have phone field', function () {

        const phone = Account.schema.tree.accessors[0].tree.phone;
        const instance =
          Account.schema.paths.accessors.schema.paths.phone.instance;

        expect(instance).to.be.equal('String');
        expect(phone).to.exist;
        expect(phone).to.be.an('object');
        expect(phone.type).to.be.a('function');
        expect(phone.type.name).to.be.equal('String');
        expect(phone.trim).to.be.true;
        expect(phone.index).to.be.true;
        expect(phone.fake).to.exist;

      });

      it('should have email field', function () {

        const email = Account.schema.tree.accessors[0].tree.email;
        const instance =
          Account.schema.paths.accessors.schema.paths.email.instance;

        expect(instance).to.be.equal('String');
        expect(email).to.exist;
        expect(email).to.be.an('object');
        expect(email.type).to.be.a('function');
        expect(email.type.name).to.be.equal('String');
        expect(email.trim).to.be.true;
        expect(email.lowercase).to.be.true;
        expect(email.index).to.be.true;
        expect(email.fake).to.exist;

      });

      it('should have locale field', function () {

        const locale = Account.schema.tree.accessors[0].tree.locale;
        const instance =
          Account.schema.paths.accessors.schema.paths.locale.instance;

        expect(instance).to.be.equal('String');
        expect(locale).to.exist;
        expect(locale).to.be.an('object');
        expect(locale.type).to.be.a('function');
        expect(locale.type.name).to.be.equal('String');
        expect(locale.trim).to.be.true;
        expect(locale.index).to.be.true;
        expect(locale.default).to.exist;
        expect(locale.enum).to.exist;
        expect(locale.fake).to.exist;

      });

      it('should have verifiedAt field', function () {

        const verifiedAt =
          Account.schema.tree.accessors[0].tree.verifiedAt;
        const instance =
          Account.schema.paths.accessors
          .schema.paths.verifiedAt.instance;

        expect(instance).to.be.equal('Date');
        expect(verifiedAt).to.exist;
        expect(verifiedAt).to.be.an('object');
        expect(verifiedAt.type).to.be.a('function');
        expect(verifiedAt.type.name).to.be.equal('Date');
        expect(verifiedAt.index).to.be.true;
        expect(verifiedAt.fake).to.exist;

      });

    });

  });

});
