const { Key } = require('selenium-webdriver');
const BasePage = require('../basePage');
const {
  TIME_WAIT,
  SUBMIT,
  LOGIN_FIELD,
  PASSWORD_FIELD,
  FOCUSE_FIELD,
  MAIL_USER_NAME,
  MAIN_BUTTON,
  FORM_FIELD_ERROR,
  A,
} = require('../constants');

class LoginPage extends BasePage {
  submit() {
    return super.find({ css: SUBMIT }).click();
  }

  enterButton() {
    return super.waitElement({ css: MAIN_BUTTON }, TIME_WAIT * 2).click();
  }

  enterLogin(name, wait) {
    const login = { id: LOGIN_FIELD };

    if (wait) {
      return super.waitElement(login, TIME_WAIT).sendKeys(name);
    }

    return super.find(login).sendKeys(
      Key.chord(Key.CONTROL, A),
      Key.CLEAR,
      name,
    );
  }

  enterPassword(passwrd) {
    return super.find({ id: PASSWORD_FIELD }).sendKeys(passwrd);
  }

  waitFieldFocuse() {
    return super.waitElement(
      { className: FOCUSE_FIELD },
      TIME_WAIT,
    );
  }

  getUserName() {
    return super.waitElement(
      { className: MAIL_USER_NAME },
      TIME_WAIT,
    ).getText();
  }

  getCssValueError(value) {
    return super.waitElement(
      { css: FORM_FIELD_ERROR },
      TIME_WAIT,
    ).getCssValue(value);
  }
}

module.exports = new LoginPage();
