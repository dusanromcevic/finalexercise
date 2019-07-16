let designFormPage = require('../pages/design.form.page');
let basePage = require('../pages/base.final');
let cookiesPage = require('../pages/cookies.page');
let functionalityPage = require('../pages/functionality.page');

describe('Search design and form verification', function () {
    let base = new basePage();
    let design = new designFormPage();
    let cookies = new cookiesPage();
    let functionality = new functionalityPage();

    // //to be included if this suite is supposed to run independently
    //  beforeAll(async function(){
    //      await browser.get(browser.baseUrl);
    //      await base.waitForElementToBeDisplayed(cookies.cookiesConsent);
    //      await cookies.cookiesConsent.click();
    //      await base.waitForElementToBeDisplayed(design.logo);
    //  });

    it('Verify that loop icon is visible', async function () {
        expect(await design.loopIcon.isDisplayed()).toEqual(true);
    });

    it('Verify that search bar placeholder "Zoeken" is present upon clicking search button', async function () {
        await design.loopIcon.click();
        await base.waitForElementToBeDisplayed(functionality.zoeken);
        await browser.sleep(3000);
        expect(await functionality.zoeken.getAttribute('placeholder')).toBe('Zoeken');
    });
});