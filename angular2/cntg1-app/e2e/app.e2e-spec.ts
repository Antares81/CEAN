import { Cntg1AppPage } from './app.po';

describe('cntg1-app App', () => {
  let page: Cntg1AppPage;

  beforeEach(() => {
    page = new Cntg1AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
