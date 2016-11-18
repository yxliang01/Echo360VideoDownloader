'use strict';

/* Set font color red */
$.fn.invalid = function status_invalid() {
    this.removeClass('successful');
    this.addClass('invalid');
};

/* Set font color green */
$.fn.successful = function status_successful() {
    this.removeClass('invalid');
    this.addClass('successful');
};

$(document).ready(function() {
    $("button#btn_download").click(function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, checkEligibility);
    });
});

function onNamingOptionChanged(context) {
    var $this = $(context);
    if ($this.val() == "Custom") {
        $('#popup_options_naming_Custom').modal('show');
    }
}

/* After the button is clicked, check whether the page is eligible (matched), and start fetch process */
function checkEligibility(tabs) {
    if (tabs.length > 1) {
        $("#status").text("Unknown error occured. Please close all other Chrome tabs and try again.");
        $("#status").invalid();
        return;
    }

    if (tabs[0].status != "complete") {
        $("#status").text("This page is still loading. Please click the download button later.");
        $("#status").invalid();
        return;
    }

    var current_url = tabs[0].url;
    var isMatched = false;
    $.getJSON('patterns.json', function startMatching(data) {
        $.each(data, function matching(idx, uni) {
            if (current_url.indexOf(uni.url) !== -1) {
                $("#status").text("Start downloading");
                $("#status").successful();
                injectFetchScript(uni.fetchScript);
                isMatched = true;
                return;
            }
        });

        if (!isMatched) {
            $("#status").html("This page is not supported now. Please contact the author (yux6@student.unimelb.edu.au)");
            $("#status").invalid();
        }
    });
}

function injectFetchScript(fetchScript) {
    chrome.tabs.executeScript(null, {
        file: "jquery.min.js",
        allFrames: true,
        runAt: "document_end"
    }, function () {
        chrome.tabs.executeScript(null, {
            code: "var filename_option = " + $("[name='r']")[1].checked + ";",
            allFrames: true,
            runAt: "document_end"
        }, function() {
            chrome.tabs.executeScript(null, {
                file: fetchScript,
                allFrames: true,
                runAt: "document_end"
            }, doneExecutingDownloadingScript);
        })
    });
}

function doneExecutingDownloadingScript(results) {
    /* jshint unused:vars */
    var arr_num_videos = results.filter(function key(ele, idx, arr) {
        return isNumber(ele);
    });

    if (arr_num_videos.length !== 0) {
        $("#status").html(arr_num_videos[0] + " videos' downloading started");
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