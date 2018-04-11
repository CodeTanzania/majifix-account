'use strict';



/**
 * @module majifix-account
 * @name GeoPointSchema
 * @description Point GeoJSON Geometry
 * @see  {@link https://docs.mongodb.com/manual/reference/geojson/}
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @see  {@link http://geojson.org/}
 * @see  {@link https://tools.ietf.org/html/rfc7946}
 * @see  {@link https://docs.mongodb.com/manual/geospatial-queries/#geo-overview-location-data}
 * @see  {@link https://gist.github.com/aheckmann/5241574}
 * @see  {@link https://gist.github.com/eastenluis/d4564daf7312c657748fc6a3dc5fceec}
 * @example
 * { type: "Point", coordinates: [ 40, 5 ] }
 * 
 */

//TODO refactor as module
//TODO use https://github.com/craveprogramminginc/GeoJSON-Validation
//TODO use https://github.com/mapbox/geojsonhint
//TODO use http://turfjs.org/
//TODO use https://www.npmjs.com/package/geojson-polygon-center

/*** dependencies */
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/*** local constants */
const GEO_POINT = 'Point';


const GeoPointSchema = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * always Point
   */
  type: {
    type: String,
    trim: true,
    default: GEO_POINT,
    enum: [GEO_POINT]
  },



  /**
   * @name geomentry
   * @description data pair for longitude and latitude. In format [ <x>, <y> ]
   *              or [ <longitude> , <latitude> ]
   * https://docs.mongodb.com/manual/reference/geojson/#point
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * [ 40, 5 ]
   */
  coordinates: {
    type: [Number],
    default: [0, 0],
    validate: function validate(value) {
      return new Promise(function (resolve, reject) {

        //try validate
        try {

          //ensure valid coordinate pair
          const hasCoordinatePair =
            (!_.isEmpty(value) && value.length !== 2);

          if (!hasCoordinatePair) {
            let error = new Error('Invalid Coordinate Pair');
            error.status = 400;
            return reject(error);
          }


          //ensure coordinates are numbers
          value = _.map(value, function toNumber(langOrLat) {
            return Number(langOrLat);
          });


          //ensure valid longidute
          const longitude = value[0];
          const isValidLongitude =
            (_.isNumber(longitude) && _.inRange(longitude, -180, 181));
          if (!isValidLongitude) {
            let error =
              new Error(
                'Invalid Longitude Value. Values are between -180 and 180, both inclusive.'
              );
            error.status = 400;
            return reject(error);
          }


          //ensure valid latitude
          const latitude = value[1];
          const isValidLatitude =
            (_.isNumber(latitude) && _.inRange(latitude, -90, 91));
          if (!isValidLatitude) {
            let error =
              new Error(
                'Invalid Latitude Value. Values are between -90 and 90, both inclusive.'
              );
            error.status = 400;
            return reject(error);
          }


          //coordinate pair are valid
          return resolve(value);

        }

        //catch all error
        catch (error) {
          return reject(error);
        }

      });
    }
  }

}, { _id: false, id: false, timestamps: false });



/**
 * @name GeoPoint
 * @description export geopoint schema
 * @type {Model}
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = GeoPointSchema;