const { type } = require('./utils');

const measurmentsCoefToMeterMap = new Map([
  ['cm', 0.01],
  ['m', 1],
  ['miles', 1609.34],
  ['sea miles', 1852],
  ['inches', 0.0254],
  ['foot', 0.3048],
]);

const MeterCoefToAnyMap = new Map([
  ['cm', 100],
  ['m', 1],
  ['miles', 0.000621371192],
  ['sea miles', 0.000539957],
  ['inches', 39.3701],
  ['foot', 3.28084],
]);

const resultConvert = (value, convertTo,  measurement) => {
  if (
    type(value) === 'number'
    && value >= 0
    && type(measurement) === 'string'

    && measurmentsCoefToMeterMap.has(measurement)
  ) {
    const result = value * measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get(convertTo);
    return Number(Math.round(result + 'e+5') + 'e-5');
  }

  throw new Error('error');
};

class LengthConverter {
  static convertToMiles(value, measurement) {
    return resultConvert(value , 'miles', measurement);
  }

  static convertToMeters(value, measurement) {

    return resultConvert(value, 'm', measurement);
  }

  static converToInches(value, measurement) {

    return resultConvert(value, 'inches', measurement);
  }

  static converToCentimeters(value, measurement) {

    return resultConvert(value, 'cm', measurement);
  }

  static converToSeaMiles(value, measurement) {

    return resultConvert(value, 'sea miles', measurement);
  }

  static converToFoots(value, measurement) {

    return resultConvert(value, 'foot', measurement);
  }
}

module.exports = {
  LengthConverter,
  measurmentsCoefToMeterMap,
  MeterCoefToAnyMap,
};
