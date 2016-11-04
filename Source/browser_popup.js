'use strict';

$(document).ready(function() {
    $.fn.invalid = function status_invlid() {
        this.removeClass('successful');
        this.addClass('invalid');
    };

    $.fn.successful = function status_successful() {
        this.removeClass('invalid');
        this.addClass('successful');
    };

    changeIcon();

    $("button#btn_download").click(function() {

        chrome.tabs.query({
            active: true
        }, function(tabs) {

            if (tabs[0].url.indexOf("https://app.lms.unimelb.edu.au/webapps/blackboard/content/contentWrapper.jsp") != -1) {

                if (tabs[0].status != "complete") {
                    $("#status").text("This page is still loading, please click the download button later.");
                    $("#status").invalid();
                } else {
                    $("#status").text("Start downloading~");
                    $("#status").successful();
                    DownloadVideos();
                }

            } else {
                $("#status").text("This is not Unimelb recording download page!");
                $("#status").invalid();
            }

        });
    });
});


function DownloadVideos() {

    injectScript();
    $("#status").text("Downloading~");
    $("#status").successful();

}



function injectScript() {
    chrome.tabs.executeScript(null, {
        file: "bower_components/jquery/dist/jquery.min.js",
        allFrames: true,
        runAt: "document_end"
    }, function injectDownloadingScript() {
        chrome.tabs.executeScript(null, {
            file: "downloadecho360video.js",
            allFrames: true,
            runAt: "document_end"

        }, doneExecutingDownloadingScript);
    });

}


function doneExecutingDownloadingScript(results) {
    if (results.indexOf(true) !== -1) {
        $("#status").text("Done starting downloading");
        $("#status").successful();

    } else {
        var arr_err_msg = results.filter(function key(ele, idx, arr) {
            return (ele !== false && ele !== true)
        });
        if (arr_err_msg.length === 0) {
            $("#status").text("Download failed");
        } else {
            $("#status").text(arr_err_msg[0]);
        }
        $("#status").invalid();
    }
}

function changeIcon() {
    console.log("changing icon...");
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // chrome.declarativeContent.onPageChanged.addRules([{
        //     conditions: [
        //         // Match URL for monash university
        //         new chrome.declarativeContent.PageStateMatcher({
        //             pageUrl: {urlContains: "monash"}
        //         })
        //     ],
        //     // Show the page action on this condition
        //     actions: [chrome.browserAction.setIcon("icon128monash.png")]
        // }, {
        //     conditions: [
        //         // Match URL for ANU
        //         new chrome.declarativeContent.PageStateMatcher({
        //             pageUrl: {urlContains: "anu.edu.au"}
        //         })
        //     ],
        //     actions: [chrome.browserAction.setIcon("icon128anu.png")]
        // }, {
        //     conditions: [
        //         // Match URL for RMIT
        //         new chrome.declarativeContent.PageStateMatcher({
        //             pageUrl: {urlContains:"rmit"}
        //         })
        //     ],
        //     actions: [chrome.browserAction.setIcon({path: "icon128rmit.png"})]
        // }

        ]);
    });
}

// Reference To: http://stackoverflow.com/questions/28750081/cant-pass-arguments-to-chrome-declarativecontent-seticon
// Takes a local path to intended 19x19 icon
//   and passes a correct SetIcon action to the callback
function createSetIconAction(path, callback) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image,0,0,128,128);
    var imageData = ctx.getImageData(0,0,128,128);
    var action = new chrome.declarativeContent.SetIcon({imageData: imageData});
    callback(action);
  }
  image.src = chrome.runtime.getURL(path);
}

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  createSetIconAction("images/icons/green.png", function(setIconAction) {
    chrome.declarativeContent.onPageChanged.addRules([
      /* rule1, */
      {
        conditions : [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl : {queryContains : 'q1=green'}
          })
        ],
        actions    : [ setIconAction ]
      }
    ]);        
  });
});