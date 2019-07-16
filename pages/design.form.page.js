let designFormPage = function () {

    this.homepageSubnavigation = element(by.css('ul[id="menu-homepage-subnavigation"]'));
    this.loopIcon = element(by.css('span[class="icon-search"]'));
    this.logo = element(by.className('b-logo__link'));
    this.inactiveSearch = element(by.css('form[class="search"]')); //this element will be used for purposes of waiting for pages with search results to load 

};

module.exports = designFormPage;