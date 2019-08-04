const { type } = require('./utils');

const resultConvert = (value, measurement, obj) => {
  if (
    type(value) === 'number'
    && value >= 0
    && type(measurement) === 'string'
    && Object.keys(obj).some(a => a === measurement)
  ) {
    if (value === 0) return 0;
    if (measurement === 'sea miles') return value * obj[measurement];

    return value / obj[measurement];
  }

  throw new Error('error');
};

class LengthConverter {
  static convertToMiles(value, measurement) {
    const CONVERT_TO_MILES = {
      cm: 160934.4,
      m: 1609.344,
      miles: 1,
      'sea miles': 1.151,
      inches: 63360,
      foot: 5280,
    };

    return resultConvert(value, measurement, CONVERT_TO_MILES);
  }

  static convertToMeters(value, measurement) {
    const CONVERT_TO_METERS = {
      cm: 100,
      m: 1,
      miles: 1609.344,
      'sea miles': 1852,
      inches: 39.37,
      foot: 3.281,
    };

    return resultConvert(value, measurement, CONVERT_TO_METERS);
  }

  static converToInches(value, measurement) {
    const CONVERT_TO_INCHES = {
      cm: 2.54,
      m: 39.37,
      miles: 63360,
      'sea miles': 72913.386,
      inches: 1,
      foot: 12,
    };

    return resultConvert(value, measurement, CONVERT_TO_INCHES);
  }

  static converToCentimeters(value, measurement) {
    const CONVERT_TO_CENTIMETERS = {
      cm: 1,
      m: 0.01,
      miles: 160934.4,
      'sea miles': 185200,
      inches: 2.54,
      foot: 30.48,
    };

    return resultConvert(value, measurement, CONVERT_TO_CENTIMETERS);
  }

  static converToSeaMiles(value, measurement) {
    const CONVERT_TO_SEA_MILES = {
      cm: 185200,
      m: 1852,
      miles: 1.151,
      'sea miles': 1,
      inches: 72913.386,
      foot: 6076.115,
    };

    return resultConvert(value, measurement, CONVERT_TO_SEA_MILES);
  }

  static converToFoots(value, measurement) {
    const CONVERT_TO_FOOTS = {
      cm: 30.48,
      m: 3.281,
      miles: 5280,
      'sea miles': 6076.115,
      inches: 12,
      foot: 1,
    };

    return resultConvert(value, measurement, CONVERT_TO_FOOTS);
  }
}

module.exports = LengthConverter;
