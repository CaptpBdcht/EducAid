import { NgPanelPage } from './app.po';

describe('ng-panel App', () => {
  let page: NgPanelPage;

  beforeEach(() => {
    page = new NgPanelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
