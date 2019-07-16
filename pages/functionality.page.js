let functionalityPage = function () {

    this.zoeken = element(by.css('input[id="g-search_query"]'));
    this.navBar = element(by.css('nav[class="main-nav"]'));
    this.searchForm = element(by.id('g-search_form'));
    this.errorTitle = element(by.css('h3[class="error-title"]'));
    this.inloggen = element(by.className('login-button__text js-gigya-socialize-text'));
    this.loginEmail = element(by.id('emailInput'));
    this.loginPassword = element.all(by.className('gigya-input-password')).first();
    this.inloggenSubmit = element.all(by.className('btn btn-primary btn-block gigya-input-submit')).first();

};

module.exports = functionalityPage;