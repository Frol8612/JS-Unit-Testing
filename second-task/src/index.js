require('chromedriver');
const {
  Builder, By, Key, until,
} = require('selenium-webdriver');
const { assert } = require('chai');

describe('Yndex.Mail', () => {
  let driver;
  let randomSubject;
  let loginInput;
  let btnSubmit;
  let passwdInput;
  let enterInput;
  let check;
  let remove;
  let message;

  before(() => {
    driver = new Builder().forBrowser('chrome').build();
    driver.get('https://mail.yandex.by/');
    driver.manage().setTimeouts({ pageLoad: 25000 });
    randomSubject = Math.random().toString(36).slice(2);
  });

  beforeEach(() => {
    loginInput = By.id('passp-field-login');
    btnSubmit = By.css('button[type="submit"]');
    passwdInput = By.id('passp-field-passwd');
    enterInput = By.css('div[name=\'to\']');
    check = By.css('label.js-skip-click-message-item');
    remove = By.className('js-toolbar-item-delete');
    message = By.className('mail-MessageSnippet-Item_subject');
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
    await driver.wait(until.elementLocated(loginInput), 2000);

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

    await div.sendKeys(
      'test1ng7@yandex.ru',
      Key.TAB,
      randomSubject,
      Key.TAB,
      'The letter for you, my frind',
    );

    const name = By.className('mail-Bubble-Block_text');
    const nameTo = await driver.findElement(name).getText();

    assert.equal(nameTo.match(/test1ng7/g)[0], 'test1ng7');
    await driver.findElement(btnSubmit).click();
  });

  it('should be done', async () => {
    const messege = By.className('js-title-info');
    const btnRefresh = By.css('.mail-ComposeButton-Refresh.js-main-action-refresh.ns-action');
    await driver.wait(until.elementLocated(messege), 2000);
    const done = await driver.findElement(messege).getAttribute('class');

    assert.equal(done.match(/(D|d)one/g)[0], 'Done');
    await driver.findElement(btnRefresh).click();
  });

  it('inbox mail', async () => {
    const inbox = By.css('.mail-FolderList-Item_inbox.mail-NestedList-Item_current');
    await driver.wait(until.elementLocated(inbox), 2000);
    const btnInbox = await driver.findElement(inbox);

    assert.equal(await btnInbox.getCssValue('background-color'), 'rgba(107, 135, 175, 0.2)');
  });

  it('should have an incoming message', async () => {
    await driver.wait(until.elementLocated(message), 2000);

    const messageSubject = await driver.findElement(message).getText();
    assert.equal(messageSubject, randomSubject);
    await driver.findElement(check).click();
    await driver.findElement(remove).click();
  });

  it('should be sent message', async () => {
    const sent = By.css('a[href="#sent"]');
    await driver.findElement(sent).click();

    await driver.wait(until.elementLocated(message));

    const messageSubject = await driver.findElement(message).getText();
    assert.equal(messageSubject, randomSubject);
    await driver.findElement(check).click();
    await driver.findElement(remove).click();
  });

  after(async () => driver.quit());
});
