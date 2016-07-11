chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url && message.filename) {
        console.log("Starts downloading 1 video");
        donwloadVideo(message);
    } else {
        console.log("Invalid message received");
    }
});


function donwloadVideo(message) {
    // console.info('Message ' + JSON.stringify(message) + '	start downloading');
    chrome.downloads.download(message, whenDownloadStatusChanged);
}

function whenDownloadStatusChanged(downloadId) {

    if (downloadId === undefined) {
        var NotificationOptions = {
            title: "there's recording failed to be downloaded",
            message: "you may want to download it again by using me again",
            isClickable: false,
            requireInteraction: true
        };

        chrome.notifications.create("one download failed", NotificationOptions);
    }

}
