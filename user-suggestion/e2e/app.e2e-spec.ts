import { UserSuggestionPage } from './app.po';

describe('user-suggestion App', () => {
  let page: UserSuggestionPage;

  beforeEach(() => {
    page = new UserSuggestionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
