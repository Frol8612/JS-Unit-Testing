const BasePage = require('../basePage');
const {
  TIME_WAIT,
  BGC,
  BGC_CHOSE_SENT,
} = require('./../constants');

class NavigationPage extends BasePage {
  clickNavigation(css) {
    return super.highlightWithJS({ css });
  }

  getCssValueWidth(css) {
    return super.waitElement({ css }, TIME_WAIT).getCssValue('width');
  }

  waitSent(css) {
    return super.waitElement(async () => {
      const bgColor = await super.find({ css })
        .getCssValue(BGC);
      return bgColor === BGC_CHOSE_SENT;
    }, TIME_WAIT);
  }
}

module.exports = new NavigationPage();
