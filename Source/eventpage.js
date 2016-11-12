var currentDT = null;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url && message.filename) {
        console.log("Starts downloading 1 video");
        donwloadVideo(message);
    } else {
        console.log("Invalid message received");
    }
});


function donwloadVideo(message) {
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
            iconUrl: "icon128.png"
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


function DownloadTask(num_files) {
    this.num_files = num_files;
    this.num_completed = 0;
}

// Icon Changing feature

var anu_icon = 
{
    conditions : [
    new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: "anu.edu.au"}
    })
    ],
    actions    : [ new chrome.declarativeContent.SetIcon({
        path : {"128" : "icon128anu.png"}
    })] 
};

var monash_icon = 
{
    conditions : [
    new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: "monash"}
    })
    ],
    actions    : [ new chrome.declarativeContent.SetIcon({
        path : {"128" : "icon128monash.png"}
    }) ]
};

var rmit_icon = 
{
    conditions : [
    new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: "rmit"}
    })
    ],
    actions    : [ new chrome.declarativeContent.SetIcon({
        path : {"128" : "icon128rmit.png"}
    }) ]
};


chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Change the icon according to the domain name
    chrome.declarativeContent.onPageChanged.addRules([anu_icon, monash_icon, rmit_icon]);

});