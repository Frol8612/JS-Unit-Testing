require('chromedriver');
const {
  Builder, By, Key, until,
} = require('selenium-webdriver');
const { assert } = require('chai');

describe('Yndex.Mail', () => {
  let driver;
  let randomSubject;
  const USER_NAME = 'test1ng7';
  const loginInput = By.id('passp-field-login');
  const btnSubmit = By.css('button[type="submit"]');
  const passwdInput = By.id('passp-field-passwd');
  const enterInput = By.css('div[name="to"]');
  const focused = By.className('passp-form-field_focused');
  const btnRefresh = By.css('.mail-ComposeButton-Refresh.js-main-action-refresh.ns-action');

  const message = title => By.css(`span[title='${title}']`);
  const removeMessage = async () => {
    const check = By.css('._nb-checkbox-flag._nb-checkbox-normal-flag');
    const remove = By.className('js-toolbar-item-delete');

    await driver.wait(until.elementLocated(check), 5000).click();
    await driver.wait(async () => {
      const color = await driver.findElement(
        By.css('.js-toolbar-item-delete .svgicon-mail--MainToolbar-Delete'),
      ).getCssValue('color');
      return color === 'rgba(230, 80, 80, 1)';
    }, 5000);
    await driver.findElement(remove).click();
  };

  before(() => {
    driver = new Builder().forBrowser('chrome').build();
    driver.get('https://mail.yandex.by/');
    driver.manage().setTimeouts({ pageLoad: 25000 });
    randomSubject = Math.random().toString(36).slice(2);
  });

  it('should be button', async () => {
    const btnEnter = By.css('a.HeadBanner-Button-Enter');
    const btn = await driver.wait(until.elementLocated(btnEnter));
    assert.isOk(btn, 'button');
    await btn.click();
  });

  it('should don`t be user return error', async () => {
    const error = By.css('div.passp-form-field__error');

    await driver.wait(
      until.elementLocated(focused),
      5000,
    );

    await driver.findElement(loginInput).sendKeys('te786st');
    await driver.findElement(btnSubmit).click();

    const errorColor = await driver.wait(
      until.elementLocated(error),
      5000,
    ).getCssValue('color');
    assert.equal(errorColor, 'rgba(223, 75, 65, 1)');
  });

  it('should return name login', async () => {
    const input = await driver.findElement(loginInput);
    await input.clear();
    await input.sendKeys(USER_NAME);
    await driver.findElement(btnSubmit).click();

    await driver.wait(
      until.elementLocated(focused),
      5000,
    );

    await driver.findElement(passwdInput).sendKeys('123456789a');
    await driver.findElement(btnSubmit).click();

    const user = By.className('mail-User-Name');
    const userName = await driver.wait(
      until.elementLocated(user),
      5000,
    ).getText();
    assert.equal(userName, USER_NAME);
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

    await driver.wait(
      until.elementLocated(enterInput),
      5000,
    ).sendKeys('test');
    await driver.findElement(btnSubmit).click();

    const errorColor = await driver.wait(
      until.elementLocated(error),
      5000,
    ).getCssValue('background-color');

    assert.equal(errorColor, 'rgba(230, 21, 21, 0.1)');

    await driver.findElement(btnLabel).click();
    await driver.wait(
      until.elementLocated(dropdownMenu),
      5000,
    ).click();
  });

  it('should return sent to name', async () => {
    const div = await driver.findElement(enterInput);

    await div.sendKeys(
      `${USER_NAME}@yandex.ru`,
      Key.TAB,
      randomSubject,
      Key.TAB,
      'The letter for you, my frind',
      Key.TAB,
    );

    const name = By.css(`span[data-yabble-name="${USER_NAME}"]`);
    const nameTo = await driver.wait(
      until.elementLocated(name),
      5000,
    ).getText();

    assert.equal(nameTo.match(new RegExp(USER_NAME, 'g'))[0], USER_NAME);
    await driver.findElement(btnSubmit).click();
  });

  it('should be done', async () => {
    const messege = By.className('js-title-info');

    const done = await driver.wait(
      until.elementLocated(messege),
      5000,
    ).getAttribute('class');

    assert.equal(done.match(/(D|d)one/g)[0], 'Done');
    await driver.findElement(btnRefresh).click();
  });

  it('inbox mail', async () => {
    const inbox = By.css('a[href="#inbox"].mail-NestedList-Item_current');
    const btnInboxColor = await driver.wait(
      until.elementLocated(inbox),
      5000,
    ).getCssValue('background-color');

    assert.equal(await btnInboxColor, 'rgba(107, 135, 175, 0.2)');
  });

  const waitMessage = time => driver.wait(
    until.elementLocated(message(randomSubject)),
    time,
  ).getText();

  it('should have an incoming message', async () => {
    let messageSubject;

    try {
      messageSubject = await waitMessage(3000);
    } catch (err) {
      await driver.findElement(btnRefresh).click();
      messageSubject = await waitMessage(5000);
    }

    assert.equal(messageSubject, randomSubject);
    await removeMessage();
    await driver.findElement(By.css('a[href="#sent"]')).click();
  });

  it('should be sent message', async () => {
    await driver.wait(async () => {
      const sent = By.css('a[href="#sent"]');
      const bgColor = await driver.findElement(sent)
        .getCssValue('background-color');
      return bgColor === 'rgba(107, 135, 175, 0.2)';
    }, 5000);

    const messageSubject = await waitMessage(5000);

    assert.equal(messageSubject, randomSubject);
    await removeMessage();
  });

  after(async () => {
    await driver.quit();
  });
});
