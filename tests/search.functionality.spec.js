let designFormPage = require('../pages/design.form.page');
let basePage = require('../pages/base.final');
let cookiesPage = require('../pages/cookies.page');
let functionalityPage = require('../pages/functionality.page');
let searchResultsPage = require('../pages/search.results.page');

describe('Search design and form verification', function () {
    let base = new basePage();
    let design = new designFormPage();
    let cookies = new cookiesPage();
    let functionality = new functionalityPage();
    let results = new searchResultsPage();
    var really_long_string = (new Array(10 * 100)).join("x");

    //to be included if this suite is supposed to run independently
    /*
          beforeAll(async function(){
             await browser.get(browser.baseUrl);
             await base.waitForElementToBeDisplayed(cookies.cookiesConsent);
             await cookies.cookiesConsent.click();
             await base.waitForElementToBeDisplayed(design.logo);
         });
    */

    beforeEach(async function () {
        await browser.get(browser.baseUrl);
        await base.waitForElementToBeDisplayed(design.homepageSubnavigation);
    });

    it('Verify that clicking on loop button is opening search bar', async function () {
        await design.loopIcon.click();
        expect(await functionality.searchForm.getAttribute('class')).toBe('search is-active');
    });

    it('Verify that clicking on loop button while search bar is active is closing the search bar', async function () {
        await design.loopIcon.click();
        await design.loopIcon.click();
        expect(await functionality.searchForm.getAttribute('class')).toBe('search');
    });

    it('Verify that search can not be performed by clicking on loop icon', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test');
        expect(await browser.getCurrentUrl()).toBe('https://www.shownieuws.nl/');
    });

    it('Verify that search can be performed by hitting ENTER on keyboard', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test', protractor.Key.ENTER);
        await base.waitForUrlToContain('search');
        expect(await browser.getCurrentUrl()).toBe('https://www.shownieuws.nl/search/test/');
    });

    it('Verify that search can be performed as a logged in user', async function () {
        await functionality.inloggen.click();
        await base.waitForElementToBeDisplayed(functionality.loginEmail);
        await functionality.loginEmail.sendKeys(browser.params.login.email);
        await functionality.loginPassword.sendKeys(browser.params.login.password);
        await functionality.inloggenSubmit.click();
        await browser.sleep(3000);
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test', protractor.Key.ENTER);
        await base.waitForUrlToContain('search');
        expect(await browser.getCurrentUrl()).toBe('https://www.shownieuws.nl/search/test/');
    });

    it('Verify that user is able to input unlimited characters into the search bar and perform the search', async function () {
        await design.loopIcon.click();
        //await loc.zoeken.sendKeys(Math.pow(4232332, 3424323), protractor.Key.ENTER); // generates string "Infinity" which is not the option for unlimited charcters entered, instead long string will be used
        await functionality.zoeken.sendKeys(really_long_string, protractor.Key.ENTER);
        await browser.sleep(4000);
        expect(await browser.getCurrentUrl()).toContain('search');
    });

    it('Verify that user is able to perform several search operations in a row', async function () {
        await base.waitForElementToBeDisplayed(design.homepageSubnavigation);
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test', protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test1', protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch)
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test2', protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        expect(await browser.getCurrentUrl()).toContain('test2');
    });

    it('Verify that user is unable to perform blank search', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('');
        await functionality.zoeken.sendKeys(protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        expect(await browser.getCurrentUrl()).toBe('https://www.shownieuws.nl/');
    });

    it('Verify that search can be performed with capitalized letters (verification if search bar is case sensitive)', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('KATTEN');
        await functionality.zoeken.sendKeys(protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        expect(await browser.getCurrentUrl()).toBe('https://www.shownieuws.nl/search/KATTEN/');
    });

    it('Verify that performing a search with special characters only is not returning results with articles', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('#$%^#$%^#$');
        await functionality.zoeken.sendKeys(protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        expect(await results.noResultsContainer.isDisplayed()).toBe(true);
    });

    // could be done better since the code is waiting for this element to be displayed twice in two different manners
    it('Verify that Nav bar is returning to its original state after performing the search', async function () {
        await design.loopIcon.click();
        await functionality.zoeken.sendKeys('test', protractor.Key.ENTER);
        await base.waitForElementToBeDisplayed(design.inactiveSearch);
        expect(await functionality.searchForm.getAttribute('class')).toBe('search');
    });
});