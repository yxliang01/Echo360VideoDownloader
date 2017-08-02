'use strict';

var currentDT = null;

/* jshint unused:vars */
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
            title: "There's recording failed to be downloaded",
            message: "You may want to download it again by using me again",
            isClickable: false,
            requireInteraction: true,
            type: "basic",
            iconUrl: "icon128_unimelb.png"
        };

        chrome.notifications.create("one download failed", NotificationOptions);

    } else {
        chrome.downloads.search({
            id: downloadId
        }, function CheckDownlaod(DIs) {
            if (DIs.State === "complete") {

                currentDT.num_completed++;
                if (currentDT.num_completed == currentDT.num_files) {
                    var NotificationOptions = {
                        title: "All recordings are completely downloaded",
                        message: "Click here to open the download folder",
                        isClickable: true,
                        requireInteraction: true,
                        type: "basic",
                        iconUrl: "icon128.png"
                    };

                    chrome.notifications.create("download complete", NotificationOptions);
                }
            }
        });
    }

}


// function DownloadTask(num_files, url) {

//     this.num_files = num_files;
//     this.num_completed = 0;
//     this.url = url;
//     this.size = "loading";
//     $.ajax({
//         type: "HEAD",
//         async: true,
//         url: url
//     }).done(function whenFileSizeLoaded(data, status, xhr) {
//         //TODO: dunno how to make a constructor function
//         xhr.getResponseHeader('Content-Length');
//     });
// }
