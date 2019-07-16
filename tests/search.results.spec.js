let designFormPage = require('../pages/design.form.page');
let basePage = require('../pages/base.final');
let cookiesPage = require('../pages/cookies.page');
let functionalityPage = require('../pages/functionality.page');
let searchResultsPage = require('../pages/search.results.page');

describe('Search results verification', function () {
    let base = new basePage();
    let design = new designFormPage();
    let cookies = new cookiesPage();
    let functionality = new functionalityPage();
    let results = new searchResultsPage();

    // //to be included if this suite is supposed to run independently
    //  beforeAll(async function(){
    //      await browser.get(browser.baseUrl);
    //      await base.waitForElementToBeDisplayed(cookies.cookiesConsent);
    //      await cookies.cookiesConsent.click();
    //      await base.waitForElementToBeDisplayed(design.logo);
    //  });

    beforeEach(async function () {
        await browser.get(browser.baseUrl);
        await browser.sleep(2000);
    });

    beforeEach(async function () {
        await browser.get(browser.baseUrl);
        await base.waitForElementToBeDisplayed(design.logo);
    });

    it('Verify that search result that is containing video is leading to the video related page', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('honden');
        await functionality.zoeken.sendKeys(protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        await results.firstVideoResult.click();
        await browser.sleep(5000);
        expect(await results.videoPlayer.isDisplayed()).toBe(true);
    });

    it('Verify that seaching of meaningless keywords is not providing search results', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('jhfosidjf', protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        expect(await results.noResultsContainer.isDisplayed()).toBe(true);
    });

});