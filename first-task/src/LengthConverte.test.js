const { assert } = require('chai');
const { type } = require('./utils');
const {
  convertToMiles,
  convertToMeters,
  converToInches,
  converToCentimeters,
  converToSeaMiles,
  converToFoots,
} = require('./LengthConverte');

const CONTAINED_IN_MILE = [
  { unit: 'cm', value: 160934.4 },
  { unit: 'm', value: 1609.344 },
  { unit: 'miles', value: 1 },
  { unit: 'sea miles', value: 0.8688097306689835 },
  { unit: 'inches', value: 63360 },
  { unit: 'foot', value: 5280 },
];

const CONTAINED_IN_METER = [
  { unit: 'cm', value: 100 },
  { unit: 'm', value: 1 },
  { unit: 'miles', value: 0.0006213711922373339 },
  { unit: 'sea miles', value: 0.0005399568034557236 },
  { unit: 'inches', value: 39.37 },
  { unit: 'foot', value: 3.281 },
];

const CONTAINED_IN_INCHES = [
  { unit: 'cm', value: 2.54 },
  { unit: 'm', value: 0.0254 },
  { unit: 'miles', value: 0.000015782828282828283 },
  { unit: 'sea miles', value: 0.000013714902775191375 },
  { unit: 'inches', value: 1 },
  { unit: 'foot', value: 0.08333333333333333 },
];

const CONTAINED_IN_CENTIMETERS = [
  { unit: 'cm', value: 1 },
  { unit: 'm', value: 0.01 },
  { unit: 'miles', value: 0.00000621371192237334 },
  { unit: 'sea miles', value: 0.000005399568034557236 },
  { unit: 'inches', value: 0.39370078740157477 },
  { unit: 'foot', value: 0.03280839895013123 },
];

const CONTAINED_IN_SEA_MILES = [
  { unit: 'cm', value: 185200 },
  { unit: 'm', value: 1852 },
  { unit: 'miles', value: 1.151 },
  { unit: 'sea miles', value: 1 },
  { unit: 'inches', value: 72913.386 },
  { unit: 'foot', value: 6076.115 },
];

const CONTAINED_IN_FOOTS = [
  { unit: 'cm', value: 30.48 },
  { unit: 'm', value: 0.3048 },
  { unit: 'miles', value: 0.0001893939393939394 },
  { unit: 'sea miles', value: 0.00016457884684539383 },
  { unit: 'inches', value: 12 },
  { unit: 'foot', value: 1 },
];

const blockTest = (func, obj, name) => {
  describe(name, () => {
    const OPTIONS_FIRST_PARAM = ['1', false, null, undefined, -1];
    const OPTIONS_SECOND_PARAM = ['not permissible value', 1, false, null, undefined, ''];

    obj.forEach((item) => {
      it(`should return 1 when the value ${item.value} and unit of measurement ${
        item.unit
      }`, () => {
        assert.equal(func(item.value, item.unit), 1);
      });
    });

    obj.forEach((item) => {
      it(`should return 0 when the value 0 and unit of measurement ${item.unit}`, () => {
        assert.equal(func(0, item.unit), 0);
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

blockTest(convertToMiles, CONTAINED_IN_MILE, 'convert to miles');

blockTest(convertToMeters, CONTAINED_IN_METER, 'convert to meters');

blockTest(converToInches, CONTAINED_IN_INCHES, 'convert to inches');

blockTest(converToCentimeters, CONTAINED_IN_CENTIMETERS, 'convert to centimeters');

blockTest(converToSeaMiles, CONTAINED_IN_SEA_MILES, 'convert to sea miles');

blockTest(converToFoots, CONTAINED_IN_FOOTS, 'convert to foot');
