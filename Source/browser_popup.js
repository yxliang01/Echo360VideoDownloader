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
        $("#status").text("Download failed");
        $("#status").invalid();
    }
}
