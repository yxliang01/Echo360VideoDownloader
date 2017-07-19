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
//     	//TODO: dunno how to make a constructor function
//         xhr.getResponseHeader('Content-Length');
//     });
// }

// Icon Changing feature

// Create a list of JSON objects to represent the rules
// var rules = [];

// function generateIconRules () {
//     var unis;
    
//     // var xmlhttp = new XMLHttpRequest();

//     // xmlhttp.onreadystatechange = {
//     //   if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
//     //     unis = JSON.parse(xmlhttp.responseText);
//     //   }
//     // };
//     // xmlhttp.open("GET", chrome.extension.getURL('university.json'), true);
//     // xmlhttp.send();

//     // add the rules to change icons according to the university abbreviations
//     unis = JSON.parse('[{"abbr": "Unimelb","url": "https://app.lms.unimelb.edu.au/webapps/blackboard/content/contentWrapper.jsp","icon_128": "icon128_unimelb.png"}, {"abbr": "Monash","url": "https://mulo-portal.lib.monash.edu/ess/portal/section/","icon_128": "icon128_monash.png"}, {"abbr": "ANU","url": "https://wattlecourses.anu.edu.au/blocks/echo360_echocenter/echocenter_frame.php","icon_128": "icon128_anu.png"}]');
//     // var unis = JSON.parse(xhr.responseText);

//     // console.log( chrome.extension.getURL('./university.json'));

//     for (var index in unis) {
//         console.log(unis[index].icon_128);
//         // Use the abbr of the universities since the URL is too specific */
//         var icon_rule = {
//             conditions : [
//             new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: {urlContains: unis[index].abbr.toLowerCase()}
//             })
//             ],
//             actions    : [ 
//             new chrome.declarativeContent.SetIcon({
//                 path : {"128": unis[index].icon_128}
//             })
//         ]};

//         rules.push(icon_rule);
//     }
// }

var anu_icon = 
{
    conditions : [new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: "anu.edu.au"} }) ],
    actions    : [ new chrome.declarativeContent.SetIcon({path : {"128" : "icon128_anu.png"} } ) ] 
};

var monash_icon = 
{
    conditions : [new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: "monash"} }) ], 
    actions    : [ new chrome.declarativeContent.SetIcon({path : {"128" : "icon128monash.png"} }) ]
};

// Change icons according to the URL of the pages
// chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // chrome.declarativeContent.onPageChanged.addRules(generateIconRules());
    chrome.declarativeContent.onPageChanged.addRules([anu_icon, monash_icon]);
// });