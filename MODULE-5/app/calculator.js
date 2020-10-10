class Calculator {
  _error(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Not a number!');
    }
  }

  add(a, b) {
    this._error(a, b);
    return a + b;
  }

  multiply(a, b) {
    this._error(a, b);
    return a * b;
  }
}

module.exports = Calculator;
