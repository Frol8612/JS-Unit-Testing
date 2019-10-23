const BasePage = require('../basePage');
const {
  WRITE_LETTER,
  REFRESH,
  SENT,
  TIME_WAIT,
  BGC,
  BGC_CHOSE_SENT,
} = require('./../constants');

class NavigationPage extends BasePage {
  clickWriteLetter() {
    return super.find({ css: WRITE_LETTER }).click();
  }

  refresh() {
    return super.find({ css: REFRESH }).click();
  }

  clickSent() {
    return super.find({ css: SENT }).click();
  }

  waitSent() {
    return super.waitElement(async () => {
      const bgColor = await super.find({ css: SENT })
        .getCssValue(BGC);
      return bgColor === BGC_CHOSE_SENT;
    }, TIME_WAIT);
  }
}

module.exports = new NavigationPage();
