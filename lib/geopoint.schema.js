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

/* dependencies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/* local constants */
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
    default: undefined
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