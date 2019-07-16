let designFormPage = require('../pages/design.form.page');
let basePage = require('../pages/base.final');
let cookiesPage = require('../pages/cookies.page');

describe('Cookies consent verification', function () {
    let base = new basePage();
    let design = new designFormPage();
    let cookies = new cookiesPage();

    it('Accept cookies', async function () {
        await browser.get(browser.baseUrl);
        await base.waitForElementToBeDisplayed(cookies.cookiesConsent);
        await cookies.cookiesConsent.click();
        await base.waitForElementToBeDisplayed(design.logo);
    });

});