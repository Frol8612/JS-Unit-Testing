require('chromedriver');
const {
  Builder, By, Key, until,
} = require('selenium-webdriver');
const { assert } = require('chai');

describe('Yndex.Mail', () => {
  let driver;
  before(() => {
    driver = new Builder().forBrowser('chrome').build();
    driver.get('https://mail.yandex.by/');
  });

  it('should be button', async () => {
    await driver.wait(until.elementLocated(By.xpath('//a/span[.=\'Войти\']')), 10000);
    const btn = await driver.findElement(By.xpath('//a[.=\'Войти\']'));
    assert.isOk(btn, 'button');
    await btn.click();
  });

  it('should don`t be user return error', async () => {
    await driver.wait(until.elementLocated(By.id('passp-field-login')), 2000);
    const input = await driver.findElement(By.id('passp-field-login'));
    const btn = await driver.findElement(By.className('button2_type_submit'));

    await input.sendKeys('te786st');
    await btn.click();

    await driver.wait(until.elementLocated(By.xpath('//div[.=\'Такого аккаунта нет\']')), 2000);
    const error = await driver.findElement(By.xpath('//div[.=\'Такого аккаунта нет\']')).getText();

    assert.equal(error, 'Такого аккаунта нет');
  });

  it('should return name input login', async () => {
    const input = await driver.findElement(By.id('passp-field-login'));
    const btn = await driver.findElement(By.className('button2_type_submit'));
    const inputTag = await input.getTagName();
    await input.clear();
    await input.sendKeys('test1ng7');

    assert.equal(inputTag, 'input');

    await btn.click();
  });

  it('should return tag input passwd', async () => {
    await driver.wait(until.elementLocated(By.id('passp-field-passwd')), 2000);
    const input = await driver.findElement(By.id('passp-field-passwd'));
    const btn = await driver.findElement(By.className('button2_type_submit'));
    await input.sendKeys('123456789a');
    await btn.click();
    await driver.wait(until.elementLocated(By.className('mail-User-Name')), 5000);
    const userName = await driver.findElement(By.className('mail-User-Name')).getText();
    assert.equal(userName, 'test1ng7');
  });

  it('should return name button Написать', async () => {
    const btn = await driver.findElement(By.xpath('//a[.=\'Написать\']'));
    const btnText = await btn.getText();
    assert.equal(btnText, 'Написать');
    await btn.click();
  });

  it('should return error adress', async () => {
    await driver.wait(until.elementLocated(By.css('div[name=\'to\']')), 2000);

    const div = await driver.findElement(By.css('div[name=\'to\']'));
    const btn = await driver.findElement(By.css('.nb-button._nb-large-action-button._init.js-editor-tabfocus-next.js-send.nb-group-start.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only'));

    await div.sendKeys('test');
    await btn.click();

    await driver.wait(until.elementLocated(By.className('ns-view-compose-field-to-error')), 2000);

    const error = await driver.findElement(By.className('ns-view-compose-field-to-error')).getText();

    assert.equal(error, 'Некорректные адреса: test');

    const label = await driver.findElement(By.css('.js-contact-bubble.mail-Bubble-Contact.js-bubble.mail-Bubble'));
    await label.click();
    await driver.wait(until.elementLocated(By.css('.b-mail-dropdown__item__content.js-bubble-remove')), 2000);
    const remove = await driver.findElement(By.css('.b-mail-dropdown__item__content.js-bubble-remove'));
    await remove.click();
  });

  it('should return name span Себе', async () => {
    const div = await driver.findElement(By.css('div[name=\'to\']'));
    const btn = await driver.findElement(By.css('.nb-button._nb-large-action-button._init.js-editor-tabfocus-next.js-send.nb-group-start.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only'));

    assert.isOk(div);

    await div.sendKeys(
      'test1ng7@yandex.ru',
      Key.TAB,
      'Hi, my name is Test',
      Key.TAB,
      'The letter for you, my frind',
    );
    await btn.click();
  });

  it('should return text "Письмо отправленно"', async () => {
    await driver.wait(until.elementLocated(By.xpath('//div[.=\'Письмо отправлено.\']')), 2000);
    const divText = await driver.findElement(By.xpath('//div[.=\'Письмо отправлено.\']')).getText();
    const btn = await driver.findElement(By.css('.mail-ComposeButton-Refresh.js-main-action-refresh.ns-action'));
    assert.equal(divText, 'Письмо отправлено.');
    await btn.click();
  });

  it('incoming mail', async () => {
    await driver.wait(until.elementLocated(By.className('mail-MessageSnippet-Content')), 2000);
    const el = await driver.findElement(By.className('mail-MessageSnippet-Content'));
    el.click();
    assert.isOk(el);
  });

  after(async () => driver.quit());
});
