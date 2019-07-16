let locatorsPage = function (){
    this.cookiesConsent = element(by.css('button[class="button button--primary"]'))
    this.loopIcon = element(by.css('span[class="icon-search"]'));
    this.logo = element(by.className('b-logo__link'));
    this.zoeken = element(by.css('input[id="g-search_query"]'));
    this.navBar = element(by.css('nav[class="main-nav"]'));
    this.searchForm = element(by.id('g-search_form'));

    this.inloggen = element(by.className('login-button__text js-gigya-socialize-text'));
    this.loginEmail = element(by.id('emailInput'));
    this.loginPassword = element.all(by.className('gigya-input-password')).first();
    this.inloggenSubmit = element.all(by.className('btn btn-primary btn-block gigya-input-submit')).first();

    this.firstVideoResult = element.all(by.css('span[class="c-play-icon icon icon-play small"]')).first();
    this.videoPlayer = element(by.css('div[class="video-player-container"]'));
    
    this.noResultsContainer = element(by.css('div[class="no-results-container"]'));


};

module.exports = locatorsPage;