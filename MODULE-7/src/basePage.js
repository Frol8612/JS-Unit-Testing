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

  async highlightWithJS(arg) {
    const el = await this.find(arg);
    const bg = await el.getCssValue('backgroundColor');
    await driver.executeScript('arguments[0].style.backgroundColor = "red"', el);
    await driver.sleep(1000);
    await driver.executeScript(`arguments[0].style.backgroundColor = '${bg}'`, el);
    return driver.executeScript('arguments[0].click()', el);
  }
}

module.exports = BasePage;
