let searchResultsPage = function () {

    this.firstVideoResult = element.all(by.css('span[class="c-play-icon icon icon-play small"]')).first();
    this.videoPlayer = element(by.css('div[class="video-player-container"]'));
    this.noResultsContainer = element(by.css('div[class="no-results-container"]'));

};

module.exports = searchResultsPage;