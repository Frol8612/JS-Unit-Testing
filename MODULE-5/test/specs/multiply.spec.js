const chai = require('chai');
const spies = require('chai-spies');
const { expect } = require('chai');
const Calculator = require('../../app/calculator.js');

chai.use(spies);

describe('multiply', () => {
  let calculator;
  let spy;

  beforeEach(() => {
    calculator = new Calculator();
    spy = chai.spy.on(calculator, 'multiply');
  });

  afterEach(() => {
    calculator = null;
  });

  it('should return 9 when called with number 3 multiply 3', () => {
    expect(calculator.multiply(3, 3)).to.be.equal(9);
  });

  it('should return -2 when called with number -1 multiply 2', () => {
    expect(calculator.multiply(-1, 2)).to.be.equal(-2);
  });

  it('should return 0 when called with number 5 multiply 0', () => {
    expect(calculator.multiply(5, 0)).to.be.equal(0);
  });

  it('should throw an error if provided with undefined', () => {
    const callWithError = () => calculator.multiply(undefined, 1);

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });

  it('should throw an error if provided with string', () => {
    const callWithError = () => calculator.multiply(1, '1');

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });

  it('should throw an error if provided with null', () => {
    const callWithError = () => calculator.multiply(null, 1);

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });

  it('should throw an error if provided with booleon', () => {
    const callWithError = () => calculator.multiply(5, false);

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });
});
