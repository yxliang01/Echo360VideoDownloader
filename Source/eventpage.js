chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url) {
        donwloadVideo(message);
    }
});


function donwloadVideo(message) {
    console.info('Message ' + JSON.stringify(message) + '	start downloading');
    chrome.downloads.download(message);
}


chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { urlContains: 'g' },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
