'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('@benmaruchu/faker');
const moment = require('moment');
const {
  randomPoint
} = require('mongoose-geojson-schemas');
const today = moment(new Date());
const periods = _.range(1, 4);
const phones = ['255719818179', '255714095061', '255756995069', '255756995069'];

function sample() {
  return {
    number: faker.random.number(99999, 999999),
    name: faker.name.findName(),
    phone: phones[faker.random.number(0, 3)],
    email: faker.internet.email(),
    neighborhood: faker.address.city(),
    address: faker.address.streetAddress(),
    locale: 'en',
    location: randomPoint(),
    accessors: _.map(phones, function (phone, index) {
      return {
        name: faker.name.findName(),
        phone: phone,
        email: faker.internet.email(),
        verifiedAt: (index > 0 ? new Date() : undefined)
      }
    }),
    bills: _.map(periods, function (period) {
      return {
        number: faker.random.number(99999, 999999),
        items: [{
          name: 'Unit Consumed',
          quantity: faker.random.number(111, 333),
          unit: 'cbm',
          items: [{
              time: today.clone().subtract(period + 1, 'months').toDate(),
              name: 'Previous Readings',
              quantity: faker.random.number(888, 999),
              unit: 'cbm'
            },
            {
              time: today.clone().subtract(period, 'months').toDate(),
              name: 'Current Readings',
              quantity: faker.random.number(555, 777),
              unit: 'cbm'
            }
          ]
        }, {
          name: 'Re-Connection',
          quantity: 1,
          price: faker.random.number(8888, 9999)
        }],
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
        currency: faker.finance.currencyCode(),
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
