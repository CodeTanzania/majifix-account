'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const {
  randomPoint
} = require('mongoose-geojson-schemas');
const today = moment(new Date());
const periods = _.range(1, 4);

function sample() {
  return {
    number: faker.random.number(99999, 999999),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    neighborhood: faker.address.city(),
    address: faker.address.streetAddress(),
    locale: 'en',
    location: randomPoint(),
    bills: _.map(periods, function (period) {
      return {
        number: faker.random.number(99999, 999999),
        items: [{
            name: 'Previous Readings',
            quantity: faker.random.number(888, 999),
            unit: 'cbm'
          },
          {
            name: 'Current Readings',
            quantity: faker.random.number(555, 777),
            unit: 'cbm'
          },
          {
            name: 'Unit Consumed',
            quantity: faker.random.number(111, 333),
            unit: 'cbm'
          }
        ],
        period: {
          billedAt: today.clone().subtract(period, 'months').toDate(),
          startedAt: today.clone().subtract(period + 1, 'months').toDate(),
          endedAt: today.clone().subtract(period, 'months').toDate(),
          duedAt: today.clone().add(1 - period, 'months').toDate()
        },
        balance: {
          outstand: faker.random.number(9999, 99999),
          open: faker.random.number(111, 222),
          charges: faker.random.number(222, 333),
          debt: faker.random.number(333, 444),
          close: faker.random.number(555, 666)
        },
        notes: faker.lorem.sentence()
      };
    }),
    active: true
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};