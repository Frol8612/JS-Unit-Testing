const { Builder } = require('selenium-webdriver');

class Browser {
  constructor() {
    this.driver = new Builder().forBrowser('chrome').build();
  }

  getUrl(url, ms) {
    this.driver.get(url);
    this.driver.manage().setTimeouts({ pageLoad: ms });
  }

  closeBrowser() {
    this.driver.quit();
  }
}

module.exports = new Browser();
