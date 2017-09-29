import { Cntg2AppPage } from './app.po';

describe('cntg2-app App', () => {
  let page: Cntg2AppPage;

  beforeEach(() => {
    page = new Cntg2AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cntg2 works!');
  });
});
