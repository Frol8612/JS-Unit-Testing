const { assert } = require('chai');
const { type } = require('./utils');
const {
  LengthConverter,
  measurmentsCoefToMeterMap,
  MeterCoefToAnyMap,
} = require('./LengthConverte');

const blockTest = (func, name, measurement) => {
  describe(name, () => {
    const OPTIONS_FIRST_PARAM = ['1', false, null, undefined, -1];
    const OPTIONS_SECOND_PARAM = ['not permissible value', 1, false, null, undefined, ''];

    it(`should be cm convert to ${measurement}`, () => {
      assert.equal(func(measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get('cm'), 'cm'), 1);
    });

    it(`should be meters convert to ${measurement}`, () => {
      assert.equal(func(measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get('m'), 'm'), 1);
    });

    it(`should be miles convert to ${measurement}`, () => {
      assert.equal(func(measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get('miles'), 'miles'), 1);
    });

    it(`should be sea miles convert to ${measurement}`, () => {
      assert.equal(func(measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get('sea miles'), 'sea miles'), 1);
    });

    it(`should be inches convert to ${measurement}`, () => {
      assert.equal(func(measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get('inches'), 'inches'), 1);
    });

    it(`should be foot convert to ${measurement}`, () => {
      assert.equal(func(measurmentsCoefToMeterMap.get(measurement) * MeterCoefToAnyMap.get('foot'), 'foot'), 1);
    });

    measurmentsCoefToMeterMap.forEach((value, key) => {
      it(`should return 0 when the value 0 and unit of measurement ${key}`, () => {
        assert.equal(func(0, key), 0);
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
  });
};

blockTest(LengthConverter.convertToMiles, 'convert to miles', 'miles');
blockTest(LengthConverter.convertToMeters, 'convert to meters', 'm');
blockTest(LengthConverter.converToInches, 'convert to inches', 'inches');
blockTest(LengthConverter.converToCentimeters, 'convert to cm', 'cm');
blockTest(LengthConverter.converToSeaMiles, 'convert to sea miles', 'sea miles');
blockTest(LengthConverter.converToFoots, 'convert to foots', 'foot');
