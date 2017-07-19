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


function DownloadTask(num_files) {
    this.num_files = num_files;
    this.num_completed = 0;
}

// Icon Changing feature

var anu_icon = 
{
    conditions : [
    new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: "anu"}
    })
    ],
    actions    : [ new chrome.declarativeContent.SetIcon({
        path : {"128": "./icon128_anu.png"}
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
        path : {"128" : "./icon128_monash.png"}
    }) ]
};

var rmit_icon = 
{
    conditions : [
    new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: "rmit"}
    })
    ],
    actions    : [ new chrome.declarativeContent.SetIcon({path : {"128" : "./icon128_rmit.png"} }) ] 
};

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // Change the icon according to the domain name
        chrome.declarativeContent.onPageChanged.addRules([anu_icon, monash_icon, rmit_icon]);
    });
});