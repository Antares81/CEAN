import { browser, element, by } from 'protractor';

export class Cntg2AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cntg2-root h1')).getText();
  }
}
