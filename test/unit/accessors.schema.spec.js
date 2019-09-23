import { expect } from '@lykmapipo/mongoose-test-helpers';
import { SchemaTypes } from '@lykmapipo/mongoose-common';
import Account from '../../src/account.model';

describe('Account Accessor Schema', () => {
  it('should be an array of embedded subdocuments', () => {
    const accessors = Account.path('accessors');

    expect(accessors).to.exist;
    expect(accessors).to.be.instanceof(SchemaTypes.Array);
  });

  it('should have name field', () => {
    const name = Account.path('accessors.name');

    expect(name).to.exist;
    expect(name).to.be.an.instanceof(SchemaTypes.String);
    expect(name.instance).to.be.equal('String');
    expect(name).to.be.an('object');
    expect(name.options.type).to.be.a('function');
    expect(name.options.type.name).to.be.equal('String');
    expect(name.options.trim).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.fake).to.exist;
  });

  it('should have phone field', () => {
    const phone = Account.path('accessors.phone');

    expect(phone).to.exist;
    expect(phone).to.be.an.instanceof(SchemaTypes.String);
    expect(phone.instance).to.be.equal('String');
    expect(phone).to.be.an('object');
    expect(phone.options.type).to.be.a('function');
    expect(phone.options.type.name).to.be.equal('String');
    expect(phone.options.trim).to.be.true;
    expect(phone.options.index).to.be.true;
    expect(phone.options.fake).to.exist;
  });

  it('should have email field', () => {
    const email = Account.path('accessors.email');

    expect(email).to.exist;
    expect(email).to.be.an.instanceof(SchemaTypes.String);
    expect(email.instance).to.be.equal('String');
    expect(email).to.be.an('object');
    expect(email.options.type).to.be.a('function');
    expect(email.options.type.name).to.be.equal('String');
    expect(email.options.trim).to.be.true;
    expect(email.options.index).to.be.true;
    expect(email.options.lowercase).to.be.true;
    expect(email.options.fake).to.exist;
  });

  it('should have locale field', () => {
    const locale = Account.path('accessors.locale');

    expect(locale).to.exist;
    expect(locale).to.be.an.instanceof(SchemaTypes.String);
    expect(locale.instance).to.be.equal('String');
    expect(locale).to.be.an('object');
    expect(locale.options.type).to.be.a('function');
    expect(locale.options.type.name).to.be.equal('String');
    expect(locale.options.trim).to.be.true;
    expect(locale.options.index).to.be.true;
    expect(locale.options.enum).to.exist;
    expect(locale.options.default).to.exist;
    expect(locale.options.fake).to.exist;
  });

  it('should have verifiedAt field', () => {
    const verifiedAt = Account.path('accessors.verifiedAt');

    expect(verifiedAt).to.exist;
    expect(verifiedAt).to.be.an.instanceof(SchemaTypes.Date);
    expect(verifiedAt).to.be.an('object');
    expect(verifiedAt.options.type).to.be.a('function');
    expect(verifiedAt.options.type.name).to.be.equal('Date');
    expect(verifiedAt.options.index).to.be.true;
    expect(verifiedAt.options.fake).to.exist;
  });
});
