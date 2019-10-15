require('chromedriver');
const {
  Builder, By, Key, until,
} = require('selenium-webdriver');
const { assert } = require('chai');

describe('Yndex.Mail', () => {
  const driver = new Builder().forBrowser('chrome').build();
  const loginInput = By.id('passp-field-login');
  const btnSubmit = By.css('button[type="submit"]');
  const passwdInput = By.id('passp-field-passwd');
  const enterInput = By.css('div[name=\'to\']');

  before(() => {
    driver.get('https://mail.yandex.by/');
    driver.manage().setTimeouts({ pageLoad: 25000 });
  });

  it('should be button', async () => {
    const btnEnter = By.css('a.HeadBanner-Button-Enter');
    const btn = await driver.findElement(btnEnter);
    assert.isOk(btn, 'button');
    await btn.click();
  });

  it('should don`t be user return error', async () => {
    const error = By.css('div.passp-form-field__error');
    await driver.wait(until.elementLocated(loginInput), 2000);

    await driver.findElement(loginInput).sendKeys('te786st');
    await driver.findElement(btnSubmit).click();
    await driver.wait(until.elementLocated(error), 2000);
    const errorColor = await driver.findElement(error).getCssValue('color');

    assert.equal(errorColor, 'rgba(223, 75, 65, 1)');
  });

  it('should return name login', async () => {
    const input = await driver.findElement(loginInput);

    await input.clear();
    await input.sendKeys('test1ng7');
    await driver.findElement(btnSubmit).click();

    await driver.wait(until.elementLocated(passwdInput), 2000);
    await driver.findElement(passwdInput).sendKeys('123456789a');
    await driver.findElement(btnSubmit).click();
    await driver.wait(until.elementLocated(By.className('mail-User-Name')), 5000);

    const userName = await driver.findElement(By.className('mail-User-Name')).getText();
    assert.equal(userName, 'test1ng7');
  });

  it('should return button "write off"', async () => {
    const btn = await driver.findElement(By.css('a[href="#compose"]'));
    const btnName = await btn.getTagName();

    assert.equal(btnName, 'a');
    await btn.click();
  });

  it('should return error adress', async () => {
    const error = By.className('ns-view-compose-field-to-error');
    const dropdownMenu = By.css('.b-mail-dropdown__item__content.js-bubble-remove');
    const btnLabel = By.css('.js-contact-bubble.mail-Bubble-Contact.js-bubble.mail-Bubble');
    await driver.wait(until.elementLocated(enterInput), 2000);

    await driver.findElement(enterInput).sendKeys('test');
    await driver.findElement(btnSubmit).click();

    await driver.wait(until.elementLocated(error), 2000);

    const errorColor = await driver.findElement(error).getCssValue('background-color');

    assert.equal(errorColor, 'rgba(230, 21, 21, 0.1)');

    await driver.findElement(btnLabel).click();
    await driver.wait(until.elementLocated(dropdownMenu), 2000);
    await driver.findElement(dropdownMenu).click();
  });

  it('should return sent to name', async () => {
    const div = await driver.findElement(enterInput);
    const name = By.className('mail-Bubble-Block_text');

    await div.sendKeys(
      'test1ng7@yandex.ru',
      Key.TAB,
      'Hi, my name is Test',
      Key.TAB,
      'The letter for you, my frind',
    );

    const nameTo = await driver.findElement(name).getText();

    assert.equal(nameTo, 'test1ng7');
    await driver.findElement(btnSubmit).click();
  });

  it('should return text "Письмо отправленно"', async () => {
    const messege = By.className('js-title-info');
    const btnRefresh = By.css('.mail-ComposeButton-Refresh.js-main-action-refresh.ns-action');
    await driver.wait(until.elementLocated(messege), 2000);

    assert.equal(await driver.findElement(messege).getText(), 'Письмо отправлено.');
    await driver.findElement(btnRefresh).click();
    await driver.wait(until.elementLocated(By.className('mail-MessageSnippet-Content')), 2000);
  });

  it('incoming mail', async () => {
    const btnMessage = By.className('mail-MessageSnippet-Content');
    const el = await driver.findElement(btnMessage);
    el.click();
    assert.isOk(el);
  });

  after(async () => driver.quit());
});
