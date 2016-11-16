'use strict';

var course_name;

/* Execution portal */
fetchAndDownload();

function fetchAndDownload() {
    if (typeof $ === 'undefined') {
        return false;
    }

    /* Get course name */
    course_name = $('#course-info').text();
    course_name = course_name.replace(/[\/:*?"<>|]/gi, '-');

    /* Revised selector */
    var elements = $('div.echo-li-left-wrapper > div.echo-thumbnail > div > img');

    /* Fetch out video URLs and start downloading */
    if (elements.length === 0) {
        return false;
    } else {
        /* Get the table header content (on the right corner) */
        var str_num_results = $("#echoes-header-toolbar-right").text();
        var matchings = str_num_results.match("([0-9]+) of ([0-9]+) Results");

        if (matchings.length === 0) {
            return "This page hasn't completely loaded yet";
        } else if (matchings[1] !== matchings[2]) {
            return "Please scroll down the recording selection list in order to download";
        } else {
            elements.each(downloadOneFile);
            return elements.length;
        }
    }

}

function downloadOneFile(idx, val) {
    var matching;
    if ((matching = $(val).attr('src').match('([A-Za-z0-9\-\/\.\:]+)(?:\/synopsis\/low\/[0-9]+\.jpg)')) === null){
        alert('Error occured when trying to download the video!');
        return;
    } else {
        /* Process path and file name */
        var path = matching[1];
        var name_selector = "#li-" + (idx + 1) + " > div.echo-li-left-wrapper > div.title-wrapper > div.echo-meta-wrapper > div.echo-date";
        var date_and_time = $(name_selector).text();
        date_and_time = date_and_time.replace(':', '.');

        /* Send the download request to Chrome runtime */
        chrome.runtime.sendMessage({
            url: path + '/audio-vga.m4v',
            filename: course_name + '/' + date_and_time + '.m4v',
            conflictAction: "overwrite"
        });
    }
}