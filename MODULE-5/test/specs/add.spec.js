const chai = require('chai');
const spies = require('chai-spies');
const { expect } = require('chai');
const Calculator = require('../../app/calculator.js');

chai.use(spies);

describe('add', () => {
  let calculator;
  let spy;

  beforeEach(() => {
    calculator = new Calculator();
    spy = chai.spy.on(calculator, 'add');
  });

  afterEach(() => {
    calculator = null;
  });

  it('should return 6 when called with number 3 plus 3', () => {
    expect(calculator.add(3, 3)).to.be.equal(6);
  });

  it('should return 1 when called with number -1 plus 2', () => {
    expect(calculator.add(-1, 2)).to.be.equal(1);
  });

  it('should return 5 when called with number 5 plus 0', () => {
    expect(calculator.add(5, 0)).to.be.equal(5);
  });

  it('should throw an error if provided with undefined', () => {
    const callWithError = () => calculator.add(undefined, 1);

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });

  it('should throw an error if provided with string', () => {
    const callWithError = () => calculator.add(1, '1');

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });

  it('should throw an error if provided with null', () => {
    const callWithError = () => calculator.add(null, 1);

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });

  it('should throw an error if provided with booleon', () => {
    const callWithError = () => calculator.add(5, false);

    expect(spy).to.be.a.spy;
    expect(callWithError).to.throw('Not a number!');
  });
});
