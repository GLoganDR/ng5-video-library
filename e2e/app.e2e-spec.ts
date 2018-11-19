import { AppPage } from './app.po';

describe('ng5-video-library App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display app name in the toolbar', () => {
        page.navigateTo();
        expect(page.getToolbarText()).toEqual('Angular 5 Video Library');
    });
});
