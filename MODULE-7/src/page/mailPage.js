const { Key } = require('selenium-webdriver');
const BasePage = require('./../basePage');
const {
  TIME_WAIT,
  BGC,
  WHOME_NAME,
  TEST,
  WHOME_NAME_ERROR,
  EMAIL,
  BODY_LETTER,
  WHOME_NAME_CLICK,
  WHOME_NAME_REMOVE,
  WHOLE_NAME_VALUE,
  CLASS_NAME,
  TITLE_DONE,
  COLOR,
  DELETE_ICON,
  DELETE_COLOR,
  BTN_DELETE,
  CHECKBOX,
} = require('../constants');
const { subjectLocate } = require('../utils');

class MailPage extends BasePage {
  writeLetter(subject) {
    if (subject) {
      return super.find({ css: WHOME_NAME }).sendKeys(
        EMAIL,
        Key.TAB,
        subject,
        Key.TAB,
        BODY_LETTER,
        Key.TAB,
      );
    }

    return super.waitElement({ css: WHOME_NAME }, TIME_WAIT)
      .sendKeys(TEST);
  }

  getName() {
    return super.waitElement(
      { css: WHOLE_NAME_VALUE },
      TIME_WAIT,
    ).getText();
  }

  getCssValueError() {
    return super.waitElement({ className: WHOME_NAME_ERROR }, TIME_WAIT)
      .getCssValue(BGC);
  }

  async removeNameWhome() {
    await super.find({ css: WHOME_NAME_CLICK }).click();
    return super.waitElement(
      { css: WHOME_NAME_REMOVE },
      TIME_WAIT,
    ).click();
  }

  getDone() {
    return super.waitElement(
      { className: TITLE_DONE },
      TIME_WAIT,
    ).getAttribute(CLASS_NAME);
  }

  waitMessage(subject) {
    return super.waitElement(
      { css: subjectLocate(subject) },
      TIME_WAIT,
    ).getText();
  }

  async removeMessage() {
    await super.waitElement(
      { css: CHECKBOX },
      TIME_WAIT,
    ).click();

    await super.waitElement(async () => {
      const color = await super.find({ css: DELETE_ICON }).getCssValue(COLOR);
      return color === DELETE_COLOR;
    }, TIME_WAIT);

    return super.find({ className: BTN_DELETE }).click();
  }
}

module.exports = new MailPage();
