// metatrailer for plex
// copyright dev@conceptualspace.net
// absolutely no warranty is expressed or implied

'use strict';

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
    console.log(reason);
    if (reason === "install") {
        const url = browser.runtime.getURL("updated.html");
        browser.tabs.create({ url });
    } else {
        browser.runtime.setUninstallURL("");
        browser.management.uninstallSelf();
    }
});
