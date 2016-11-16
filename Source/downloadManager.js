'use strict';

var currentDT = null;

/* jshint unused:vars */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url && message.filename) {
        console.log("Start downloading 1 video.");
        chrome.downloads.download(message, whenDownloadStatusChanged);
    } else {
        console.log("Invalid message received.");
    }
});

function whenDownloadStatusChanged(downloadId) {
    if (downloadId === undefined) {
        var NotificationOptions = {
            title: "One file's download failed.",
            message: "You may wish to download it again.",
            isClickable: false,
            requireInteraction: true,
            type: "basic",
            iconUrl: "icon128_unimelb.png"
        };

        chrome.notifications.create("One download failed.", NotificationOptions);
    } else {
        chrome.downloads.search({
            id: downloadId
        }, function CheckDownload(DIs) {
            if (DIs.State === "complete") {

                currentDT.num_completed++;
                if (currentDT.num_completed == currentDT.num_files) {
                    var NotificationOptions = {
                        title: "All recordings are completely downloaded.",
                        message: "Click here to open the downloads folder.",
                        isClickable: true,
                        requireInteraction: true,
                        type: "basic",
                        iconUrl: "icon128.png"
                    };

                    chrome.notifications.create("Download accomplished.", NotificationOptions);
                }
            }
        });
    }

}

/*
function DownloadTask(num_files, url) {
    this.num_files = num_files;
    this.num_completed = 0;
    this.url = url;
    this.size = "loading";
    $.ajax({
        type: "HEAD",
        async: true,
        url: url
    }).done(function whenFileSizeLoaded(data, status, xhr) {
        //TODO: dunno how to make a constructor function
        xhr.getResponseHeader('Content-Length');
    });
}
*/