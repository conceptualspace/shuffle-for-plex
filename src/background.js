// migration to enhance-o-tron

'use strict';

// simple polyfill for ff/chrome
window.browser = (function () {
    return window.browser || window.chrome;
})();


//browser.runtime.onInstalled.addListener(handleInstalled);

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
    //if (temporary) return; // skip during development
    browser.runtime.setUninstallURL("https://addons.mozilla.org/en-US/firefox/addon/enhance-o-tron-for-plex/");
    const url = browser.runtime.getURL("updated.html");
    browser.tabs.create({ url });
});

// Check if enhanceotron has been installed by checking if a
// resource is available (publicly visible through `web_accessible_resources`)
// thanks @Rob--W
var url = 'chrome-extension://fhbelblobiabomlogejpabonapkencph/img/icon219.svg';

function failed() {
    // Clear console after 20 failed requests.
    if (++_failCount % 20 === 0) {
        console.clear();
    }
}

function checkIfUpgraded(callback) {
    var x = new XMLHttpRequest();
    x.open('GET', url);
    x.timeout = 1000;
    x.onload = function() {
        callback(true);
    };
    x.onerror = function() {
        failed();
        callback(false);
    };
    x.send();
}

// Light-weight checks if extension has been upgraded
var _poller = 0;

var _bgPoller = 0;
var _bgPollDelayMS = 60*1000;

function checkIfViewerShouldBeDeactivated() {
    checkIfUpgraded(function(isUpgraded) {
        if (isUpgraded) {
            unwatchUpdateStatus();
            clearInterval(_bgPoller);
            // enhanceotron extension is present; nuke thyself
            browser.runtime.setUninstallURL("");
            browser.management.uninstallSelf();
        }
    });
}

function unwatchUpdateStatus() {
    clearInterval(_poller);
    _poller = 0;
}
_bgPoller = setInterval(checkIfViewerShouldBeDeactivated, _bgPollDelayMS);
