/*
 * Copyright 2016 Telefónica Investigación y Desarrollo, S.A.U
 *
 * This file is part of the FIWARE Device Simulator tool
 *
 * The FIWARE Device Simulator tool is free software: you can redistribute it
 * and/or modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * The FIWARE Device Simulator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with the FIWARE Device Simulator.
 * If not, see http://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with: [german.torodelvalle@telefonica.com]
 */

'use strict';

var should = require('should');

var ROOT_PATH = require('app-root-path');
var fdsErrors = require(ROOT_PATH + '/lib/errors/fdsErrors');
var multilinePositionInterpolator = require(ROOT_PATH + '/lib/interpolators/multilinePositionInterpolator');

/**
 * Returns the decimal date associated to certain date
 * @param  {date}   date The date
 * @return {Number}      The time in decimal format
 */
function toDecimalHours(date) {
  return date.getHours() + (date.getMinutes() / 60) + (date.getSeconds() / 3600);
}

describe('multilinePositionInterpolator tests', function() {
  var multilinePositionInterpolatorFunction;

  it('should throw an error if a number is passed instead of a valid interpolation array', function(done) {
    try {
      multilinePositionInterpolatorFunction = multilinePositionInterpolator(666);
      done(new Error('It should throw an InvalidInterpolationSpec error'));
    } catch(exception) {
      should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
      done();
    }
  });

  it('should throw an error if a number is passed instead of a valid interpolation array as a string specification',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator('666');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if a one level hierarchy array is passed instead of a valid interpolation array',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator([1, 2, 3]);
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if a one level hierarchy array is passed instead of a valid interpolation array ' +
     'as a string specification',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator('[1, 2, 3]');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if a 2 level hierarchy array with one cardinality is passed instead of a ' +
     'valid interpolation array as a string specification', function(done) {
    try {
      multilinePositionInterpolatorFunction = multilinePositionInterpolator('[[1], [2], [3]]');
      done(new Error('It should throw an InvalidInterpolationSpec error'));
    } catch(exception) {
      should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
      done();
    }
  });

  it('should throw an error if a 2 level hierarchy array with one cardinality is passed instead of a ' +
     'valid interpolation array', function(done) {
    try {
      multilinePositionInterpolatorFunction = multilinePositionInterpolator([[1], [2], [3]]);
      done(new Error('It should throw an InvalidInterpolationSpec error'));
    } catch(exception) {
      should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
      done();
    }
  });

  it('should throw an error if an invalid array is passed instead of a ' +
     'valid interpolation array as a string specification', function(done) {
    try {
      multilinePositionInterpolatorFunction = multilinePositionInterpolator('[[1], [2], [3]');
      done(new Error('It should throw an InvalidInterpolationSpec error'));
    } catch(exception) {
      should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
      done();
    }
  });

  it('should throw an error if no coordinates is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            speed: {value: 30, units: 'km/h'},
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if no coordinates is passed in the specification as a string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"speed\": {\"value\": 30, \"units": "km/h"}, \"time\": {\"from\": 10, \"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if no speed is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1,2], [2,3], [4,5]],
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if no speed is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1,2], [2,3], [4,5]], \"time\": {\"from\": 10, \"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if no time is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1,2], [2,3], [4,5]],
            speed: {value: 30, units: 'km/h'}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if no time is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1,2], [2,3], [4,5]], \"speed\": {\"value\": 30, \"units\": \"km/h\"}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid coordinates is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [1, 2, 3],
            speed: {value: 30, units: 'km/h'},
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid coordinates is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [1, 2, 3], \"speed\": {\"value\": 30, \"units\": \"km/h\"}, ' +
            '\"time\": {\"from\": 10, \"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid coordinates is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1], [2], [3]],
            speed: {value: 30, units: 'km/h'},
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid coordinates is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1], [2], [3], \"speed\": {\"value\": 30, \"units\": \"km/h\"}, ' +
            '\"time\": {\"from\": 10, \"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid speed is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {units: 'km/h'},
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid speed is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates: [[1, 2], [3, 4], [5, 6]], \"speed\": {\"units\": \"km/h\"}, ' +
            '\"time\": {\"from\": 10, to: 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid speed is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {value: 30},
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid speed is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1, 2], [3, 4], [5, 6]], \"speed\": {\"value\": 30}, ' +
            '\"time\": {\"from\": 10, \"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid speed is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {value: 30, units: 'invalid-units'},
            time: {from: 10, to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid speed is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1, 2], [3, 4], [5, 6]], \"speed\": {\"value\": 30, \"units\": \"invalid-units\"}, ' +
            '\"time\": {\"from\": 10, \"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid time is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {value: 30, units: 'km/h'},
            time: {to: 22}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid time is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1, 2], [3, 4], [5, 6]], \"speed\": {\"value\": 30, \"units\": \"km/h\"}, ' +
            '\"time\": {\"to\": 22}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid time is passed in the specification as an object',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {value: 30, units: 'km/h'},
            time: {from: 10}
          }
        );
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should throw an error if invalid time is passed in the specification as an string',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          '{\"coordinates\": [[1, 2], [3, 4], [5, 6]], \"speed\": {\"value\": 30, \"units\": \"km/h\"}, ' +
            '\"time\": {\"from\": 10}}');
        done(new Error('It should throw an InvalidInterpolationSpec error'));
      } catch(exception) {
        should(exception).be.an.instanceof(fdsErrors.InvalidInterpolationSpec);
        done();
      }
    }
  );

  it('should interpolate as GeoJSON point geometry if a valid specification object is passed',
    function(done) {
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {value: 30, units: 'km/h'},
            time: {from: 10, to: 22}
          }
        );
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 5)))).containEql(
          {type: 'Point'});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 5)))).containEql(
          {coordinates: [1, 2]});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 7)))).containEql(
          {type: 'Point'});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 7)))).containEql(
          {coordinates: [1, 2]});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 8)))).containEql(
          {type: 'Point'});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 8)))).containEql(
          {coordinates: [1, 2]});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 10)))).containEql(
          {type: 'Point'});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 10)))).containEql(
          {coordinates: [1, 2]});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 17)))).containEql(
          {type: 'Point'});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 17)))).containEql(
          {coordinates: [2.3351126503586808, 3.3363745940384257]});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 20)))).containEql(
          {type: 'Point'});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 20)))).containEql(
          {coordinates: [2.9083307610874596, 3.90859448519012]});
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22)))).containEql(
          {type: 'Point'});
        should(parseFloat(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22))).
          coordinates[0].toFixed(14))).equal(3.28983941389133);
        should(parseFloat(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22))).
          coordinates[1].toFixed(14))).equal(4.29091997098259);
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22)))).containEql(
          {type: 'Point'});
        should(parseFloat(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22, 30))).
          coordinates[0].toFixed(14))).equal(3.28983941389133);
        should(parseFloat(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22, 30))).
          coordinates[1].toFixed(14))).equal(4.29091997098259);
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 23)))).containEql(
          {type: 'Point'});
        should(parseFloat(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 23))).
          coordinates[0].toFixed(14))).equal(3.28983941389133);
        should(parseFloat(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 23))).
          coordinates[1].toFixed(14))).equal(4.29091997098259);
        done();
      } catch(exception) {
        done(exception);
      }
    }
  );

  it('should interpolate as geo:point if a valid specification object is passed',
    function(done) {
      var auxGeoPoint;
      try {
        multilinePositionInterpolatorFunction = multilinePositionInterpolator(
          {
            coordinates: [[1, 2], [3, 4], [5, 6]],
            speed: {value: 30, units: 'km/h'},
            time: {from: 10, to: 22},
            return: 'geo:point'
          }
        );
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 5)))).equal('string');
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 5)))).equal(
          [1, 2].toString());
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 7)))).equal('string');
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 7)))).equal(
          [1, 2].toString());
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 8)))).equal('string');
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 8)))).equal(
          [1, 2].toString());
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 10)))).equal('string');
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 10)))).equal(
          [1, 2].toString());
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 17)))).equal('string');
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 17)))).equal(
          [2.3351126503586808, 3.3363745940384257].toString());
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 20)))).equal('string');
        should(multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 20)))).equal(
          [2.9083307610874596, 3.90859448519012].toString());
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22)))).equal('string');
        auxGeoPoint = multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22))).split(',');
        should(parseFloat(auxGeoPoint[0]).toFixed(14)).equal('3.28983941389133');
        should(parseFloat(auxGeoPoint[1]).toFixed(14)).equal('4.29091997098259');
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22, 30)))).equal(
          'string');
        auxGeoPoint = multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 22, 30))).split(',');
        should(parseFloat(auxGeoPoint[0]).toFixed(14)).equal('3.28983941389133');
        should(parseFloat(auxGeoPoint[1]).toFixed(14)).equal('4.29091997098259');
        should(typeof multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 23)))).equal('string');
        auxGeoPoint = multilinePositionInterpolatorFunction(toDecimalHours(new Date(2016, 9, 21, 23))).split(',');
        should(parseFloat(auxGeoPoint[0]).toFixed(14)).equal('3.28983941389133');
        should(parseFloat(auxGeoPoint[1]).toFixed(14)).equal('4.29091997098259');
        done();
      } catch(exception) {
        done(exception);
      }
    }
  );
});
