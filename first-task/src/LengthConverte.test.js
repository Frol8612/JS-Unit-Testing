const { assert } = require('chai');
const { type } = require('./utils');
const {
  LengthConverter,
  measurmentsCoefToMeterMap,
  MeterCoefToAnyMap,
} = require('./LengthConverte');

const blockTestErrorAndZero = (func) => {
  const OPTIONS_FIRST_PARAM = ['1', false, null, undefined, -1];
  const OPTIONS_SECOND_PARAM = ['not permissible value', 1, false, null, undefined, ''];

  measurmentsCoefToMeterMap.forEach((value, key) => {
    it(`should return 0 when the value 0 and unit of measurement ${key}`, () => {
      assert.equal(LengthConverter.convertToMiles(0, key), 0);
    });
  });

  OPTIONS_FIRST_PARAM.forEach((item) => {
    it(`should return error when first parameter ${
      item < 0 ? 'a negative number' : type(item)
    }`, () => {
      assert.throws(() => {
        func(item, 'cm');
      }, 'error');
    });
  });

  OPTIONS_SECOND_PARAM.forEach((item) => {
    it(`should return error when second parameter ${
      item === '' ? 'empty string' : type(item)
    }`, () => {
      assert.throws(() => {
        func(1, item);
      }, 'error');
    });
  });
};

describe('LengthConverte', () => {
  describe('convertToMiles', () => {
    it('should be cm convert to miles', () => {
      assert.equal(LengthConverter.convertToMiles(measurmentsCoefToMeterMap.get('miles') * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it('should be meters convert to miles', () => {
      assert.equal(LengthConverter.convertToMiles(measurmentsCoefToMeterMap.get('miles') * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it('should be miles convert to miles', () => {
      assert.equal(LengthConverter.convertToMiles(measurmentsCoefToMeterMap.get('miles') * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it('should be sea miles convert to miles', () => {
      assert.equal(LengthConverter.convertToMiles(measurmentsCoefToMeterMap.get('miles') * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it('should be inches convert to miles', () => {
      assert.equal(LengthConverter.convertToMiles(measurmentsCoefToMeterMap.get('miles') * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it('should be foot convert to miles', () => {
      assert.equal(LengthConverter.convertToMiles(measurmentsCoefToMeterMap.get('miles') * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    blockTestErrorAndZero(LengthConverter.convertToMiles);
  });

  describe('convertToMeters', () => {
    it('should be cm convert to meters', () => {
      assert.equal(LengthConverter.convertToMeters(measurmentsCoefToMeterMap.get('m') * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it('should be meters convert to meters', () => {
      assert.equal(LengthConverter.convertToMeters(measurmentsCoefToMeterMap.get('m') * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it('should be miles convert to meters', () => {
      assert.equal(LengthConverter.convertToMeters(measurmentsCoefToMeterMap.get('m') * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it('should be sea miles convert to meters', () => {
      assert.equal(LengthConverter.convertToMeters(measurmentsCoefToMeterMap.get('m') * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it('should be inches convert to meters', () => {
      assert.equal(LengthConverter.convertToMeters(measurmentsCoefToMeterMap.get('m') * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it('should be foot convert to meters', () => {
      assert.equal(LengthConverter.convertToMeters(measurmentsCoefToMeterMap.get('m') * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    blockTestErrorAndZero(LengthConverter.convertToMeters);
  });

  describe('converToInches', () => {
    it('should be cm convert to inches', () => {
      assert.equal(LengthConverter.converToInches(measurmentsCoefToMeterMap.get('inches') * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it('should be meters convert to inches', () => {
      assert.equal(LengthConverter.converToInches(measurmentsCoefToMeterMap.get('inches') * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it('should be miles convert to inches', () => {
      assert.equal(LengthConverter.converToInches(measurmentsCoefToMeterMap.get('inches') * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it('should be sea miles convert to inches', () => {
      assert.equal(LengthConverter.converToInches(measurmentsCoefToMeterMap.get('inches') * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it('should be inches convert to inches', () => {
      assert.equal(LengthConverter.converToInches(measurmentsCoefToMeterMap.get('inches') * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it('should be foot convert to inches', () => {
      assert.equal(LengthConverter.converToInches(measurmentsCoefToMeterMap.get('inches') * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    blockTestErrorAndZero(LengthConverter.converToInches);
  });

  describe('converToCentimeters', () => {
    it('should be cm convert to centimeters', () => {
      assert.equal(LengthConverter.converToCentimeters(measurmentsCoefToMeterMap.get('cm') * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it('should be meters convert to centimeters', () => {
      assert.equal(LengthConverter.converToCentimeters(measurmentsCoefToMeterMap.get('cm') * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it('should be miles convert to centimeters', () => {
      assert.equal(LengthConverter.converToCentimeters(measurmentsCoefToMeterMap.get('cm') * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it('should be sea miles convert to centimeters', () => {
      assert.equal(LengthConverter.converToCentimeters(measurmentsCoefToMeterMap.get('cm') * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it('should be inches convert to centimeters', () => {
      assert.equal(LengthConverter.converToCentimeters(measurmentsCoefToMeterMap.get('cm') * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it('should be foot convert to centimeters', () => {
      assert.equal(LengthConverter.converToCentimeters(measurmentsCoefToMeterMap.get('cm') * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    blockTestErrorAndZero(LengthConverter.converToCentimeters);
  });

  describe('converToSeaMiles', () => {
    it('should be cm convert to sea miles', () => {
      assert.equal(LengthConverter.converToSeaMiles(measurmentsCoefToMeterMap.get('sea miles') * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it('should be meters convert to sea miles', () => {
      assert.equal(LengthConverter.converToSeaMiles(measurmentsCoefToMeterMap.get('sea miles') * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it('should be miles convert to sea miles', () => {
      assert.equal(LengthConverter.converToSeaMiles(measurmentsCoefToMeterMap.get('sea miles') * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it('should be sea miles convert to sea miles', () => {
      assert.equal(LengthConverter.converToSeaMiles(measurmentsCoefToMeterMap.get('sea miles') * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it('should be inches convert to sea miles', () => {
      assert.equal(LengthConverter.converToSeaMiles(measurmentsCoefToMeterMap.get('sea miles') * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it('should be foot convert to sea miles', () => {
      assert.equal(LengthConverter.converToSeaMiles(measurmentsCoefToMeterMap.get('sea miles') * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    blockTestErrorAndZero(LengthConverter.converToSeaMiles);
  });

  describe('converToFoots', () => {
    it('should be cm convert to foots', () => {
      assert.equal(LengthConverter.converToFoots(measurmentsCoefToMeterMap.get('foot') * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it('should be meters convert to foots', () => {
      assert.equal(LengthConverter.converToFoots(measurmentsCoefToMeterMap.get('foot') * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it('should be miles convert to foots', () => {
      assert.equal(LengthConverter.converToFoots(measurmentsCoefToMeterMap.get('foot') * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it('should be sea miles convert to foots', () => {
      assert.equal(LengthConverter.converToFoots(measurmentsCoefToMeterMap.get('foot') * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it('should be inches convert to foots', () => {
      assert.equal(LengthConverter.converToFoots(measurmentsCoefToMeterMap.get('foot') * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it('should be foot convert to foots', () => {
      assert.equal(LengthConverter.converToFoots(measurmentsCoefToMeterMap.get('foot') * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    blockTestErrorAndZero(LengthConverter.converToFoots);
  });
});
