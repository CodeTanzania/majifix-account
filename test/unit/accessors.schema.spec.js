import { expect } from '@lykmapipo/mongoose-test-helpers';
import Account from '../../src/account.model';

describe('Account', () => {
  describe('Accessors', () => {
    describe('Schema', () => {
      it('should be an array of embedded subdocuments', () => {
        const { accessors } = Account.schema.tree;
        const { instance } = Account.schema.paths.accessors;
        const { tree } = Account.schema.tree.accessors[0];

        expect(instance).to.be.equal('Array');
        expect(accessors).to.exist;
        expect(tree).to.exist;
        expect(tree.name).to.exist;
        expect(tree.phone).to.exist;
        expect(tree.email).to.exist;
        expect(tree.locale).to.exist;
        expect(tree.verifiedAt).to.exist;
      });

      it('should have name field', () => {
        const { name } = Account.schema.tree.accessors[0].tree;
        const { instance } = Account.schema.paths.accessors.schema.paths.name;

        expect(instance).to.be.equal('String');
        expect(name).to.exist;
        expect(name).to.be.an('object');
        expect(name.type).to.be.a('function');
        expect(name.type.name).to.be.equal('String');
        expect(name.trim).to.be.true;
        expect(name.index).to.be.true;
        expect(name.fake).to.exist;
      });

      it('should have phone field', () => {
        const { phone } = Account.schema.tree.accessors[0].tree;
        const { instance } = Account.schema.paths.accessors.schema.paths.phone;

        expect(instance).to.be.equal('String');
        expect(phone).to.exist;
        expect(phone).to.be.an('object');
        expect(phone.type).to.be.a('function');
        expect(phone.type.name).to.be.equal('String');
        expect(phone.trim).to.be.true;
        expect(phone.index).to.be.true;
        expect(phone.fake).to.exist;
      });

      it('should have email field', () => {
        const { email } = Account.schema.tree.accessors[0].tree;
        const { instance } = Account.schema.paths.accessors.schema.paths.email;

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

      it('should have locale field', () => {
        const { locale } = Account.schema.tree.accessors[0].tree;
        const { instance } = Account.schema.paths.accessors.schema.paths.locale;

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

      it('should have verifiedAt field', () => {
        const { verifiedAt } = Account.schema.tree.accessors[0].tree;
        const {
          instance,
        } = Account.schema.paths.accessors.schema.paths.verifiedAt;

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
