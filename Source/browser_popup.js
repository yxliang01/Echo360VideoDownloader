'use strict';

$.fn.invalid = function status_invlid() {
    this.removeClass('successful');
    this.addClass('invalid');
};

$.fn.successful = function status_successful() {
    this.removeClass('invalid');
    this.addClass('successful');
};


$(document).ready(function() {

    $("#options_naming > option").popup();
    $(".ui.dropdown").dropdown();
    $("#options_naming").change($.proxy(onNamingOptionChanged));

    $("button#btn_download").click(function() {

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, CheckAndDownloadVideos);
    });

    $('.ui.modal').modal();
});


function onNamingOptionChanged(context) {

    var $this = $(context);
    if ($this.val() == "Custom") {
        $('#popup_options_naming_Custom').modal('show');
    }
}

function CheckAndDownloadVideos(tabs) {

    if (tabs.length > 1) {
        $("#status").text("Unknown error occured, please close all other Chrome tabs and try again!");
        $("#status").invalid();
        return;
    }
    var current_url = tabs[0].url;
    if (current_url.indexOf("https://app.lms.unimelb.edu.au/webapps/blackboard/content/contentWrapper.jsp") != -1 ||
        current_url.indexOf("https://mulo-portal.lib.monash.edu/ess/portal/section/") != -1) {

        if (tabs[0].status != "complete") {
            $("#status").text("This page is still loading, please click the download button later.");
            $("#status").invalid();
        } else {
            $("#status").text("Start downloading~");
            $("#status").successful();
            DownloadVideos();
        }

    } else {
        $("#status").text("This is not Unimelb or Monash recording download page!");
        $("#status").invalid();
    }

}

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
    /* jshint unused:vars */
    var arr_num_videos = results.filter(function key(ele, idx, arr) {
        return isNumber(ele);
    });

    if (arr_num_videos.length !== 0) {


        $("#status").html("Done starting downloading<br />" + arr_num_videos[0] + " videos");
        $("#status").successful();

    } else {
        var arr_err_msg = results.filter(function key(ele, idx, arr) {
            return (ele !== false && ele !== true);
        });

        if (arr_err_msg.length === 0) {
            $("#status").text("Download failed");
        } else {
            $("#status").text(arr_err_msg[0]);
        }
        $("#status").invalid();
    }
}

function isNumber(n) {

    return !isNaN(parseFloat(n)) && isFinite(n);
}
