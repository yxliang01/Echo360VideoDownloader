chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url) {
        donwloadVideo(message);
    }
});


function donwloadVideo(message) {
    console.info('Message ' + JSON.stringify(message) + '	start downloading');
    chrome.downloads.download(message);
}