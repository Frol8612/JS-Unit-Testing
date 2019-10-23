const { until, By } = require('selenium-webdriver');
const { driver } = require('./browser');
const { normalizeBy } = require('./utils');
const { UNTIL } = require('./constants');

class BasePage {
  by(loc, selector) {
    return By[loc](selector);
  }

  find(el, way) {
    if (way === UNTIL) {
      return until.elementLocated(normalizeBy(el, this.by));
    }

    return driver.findElement(normalizeBy(el, this.by));
  }

  waitElement(arg, ms) {
    if (typeof arg === 'function') {
      return driver.wait(arg, ms);
    }
    return driver.wait(this.find(arg, UNTIL), ms);
  }
}

module.exports = BasePage;
