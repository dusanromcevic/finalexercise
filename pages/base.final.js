let basePage = function () {

    var EC = protractor.ExpectedConditions;

    this.waitForElementToBeDisplayed = async function (elm) {
        await browser.wait(EC.visibilityOf(elm), 10000);
    };

    this.waitForTitleToContain = async function (title) {
        await browser.wait(EC.titleContains(title), 10000);
    };

    this.waitForElementToBeClickable = async function (button) {
        await browser.wait(EC.elementToBeClickable(button), 10000);
    };

    this.waitForPresenceOf = async function (elm) {
        await browser.wait((EC.presenceOf(elm), 10000));
    };

    this.waitForUrlToContain = async function (urlPart) {
        await browser.wait(EC.urlContains(urlPart), 10000);
    };

    this.waitForInteractiveElement = async function (elm, elm2) {
        var ElmToBeVisible = await EC.visibilityOf(elm);
        var Elm2ToBeClickable = await EC.elementToBeClickable(elm2);
        await browser.wait(EC.and(elm, elm2), 10000);
    };

    this.waitForEelementToLoadThenClick = async function (elm) {
        await this.waitForElementToBeDisplayed(elm);
        await browser.actions().mouseMove(elm).perform();
        await browser.sleep(4000);
        await elm.click();
    };

};

module.exports = basePage;