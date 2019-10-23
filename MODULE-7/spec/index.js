require('chromedriver');

const { assert } = require('chai');
const Browser = require('../src/browser');
const LoginPage = require('../src/page/loginPage');
const NavigationPage = require('../src/page/navigationPage');
const MailPage = require('../src/page/mailPage');
const { randomSubject } = require('../src/utils');
const {
  USER_NAME,
  PASSWORD,
  URL,
  WRONG_NAME,
  TINE_WAIT_PAGE,
  WAIT,
  COLOR,
  COLOR_ERROR,
  BGC_ERROR,
  DONE,
  DONE_REG,
} = require('../src/constants');

describe('Yndex.Mail', () => {
  let subject;

  before(() => {
    Browser.getUrl(URL, TINE_WAIT_PAGE);
    subject = randomSubject();
  });

  it('should don`t be user return error', async () => {
    await LoginPage.enterButton();
    await LoginPage.enterLogin(WRONG_NAME, WAIT);
    await LoginPage.submit();

    const errorColor = await LoginPage.getCssValueError(COLOR);
    assert.equal(errorColor, COLOR_ERROR);
  });

  it('should return name login', async () => {
    await LoginPage.enterLogin(USER_NAME);
    await LoginPage.submit();
    await LoginPage.waitFieldFocuse();

    await LoginPage.enterPassword(PASSWORD);
    await LoginPage.submit();

    const userName = await LoginPage.getUserName();
    assert.equal(userName, USER_NAME);
  });

  it('should return error adress', async () => {
    await NavigationPage.clickWriteLetter();
    await MailPage.writeLetter();

    await LoginPage.submit();

    const errorColor = await MailPage.getCssValueError();

    assert.equal(errorColor, BGC_ERROR);

    await MailPage.removeNameWhome();
  });

  it('should return sent to name', async () => {
    await MailPage.writeLetter(subject);

    const nameTo = await MailPage.getName();

    assert.equal(nameTo.match(new RegExp(USER_NAME, 'g'))[0], USER_NAME);
    await LoginPage.submit();
  });

  it('should be done', async () => {
    const done = await MailPage.getDone();

    assert.equal(done.match(DONE_REG)[0], DONE);
    await NavigationPage.refresh();
  });

  it('should have an incoming message', async () => {
    let messageSubject;

    try {
      messageSubject = await MailPage.waitMessage(subject);
    } catch (err) {
      await NavigationPage.refresh();
      messageSubject = await MailPage.waitMessage(subject);
    }

    assert.equal(messageSubject, subject);
    await MailPage.removeMessage();
  });

  it('should be sent message', async () => {
    await NavigationPage.clickSent();
    await NavigationPage.waitSent();

    const messageSubject = await MailPage.waitMessage(subject);

    assert.equal(messageSubject, subject);
    await MailPage.removeMessage();
  });

  after(async () => {
    Browser.closeBrowser();
  });
});
