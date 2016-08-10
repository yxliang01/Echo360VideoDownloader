'use strict';

var coursename;


//Execution Part
downloadVideos();

//Functions

// function checkWhetherLoaded() {

//     if ($('#echoes-list').length !== 0) {
//         console.info(window.location.href + '      has lecture info!!!');
//         return true;
//     } else {
//         return false;
//     }

// }


function downloadVideos() {

    if (typeof $ === 'undefined') {
        return false;
    }

    coursename = $('#course-info').text();

    //Start looking for download URL

    // console.log("start downloading...");
    var elements = $('*[id^="li-"] > div.echo-li-left-wrapper > div.echo-thumbnail > div > img');

    if (elements.length === 0) {
        return false;
    } else {
        var str_num_results = $("#echoes-header-toolbar-right").text();
        var matchings = str_num_results.match("([0-9]+) of ([0-9]+) Results");

        if (matchings.length === 0) {
            return "This page hasn't completely loaded yet";
        } else if (matchings[1] !== matchings[2]) {
            return "Please scroll down the recording selection list in order to download";
        } else {
            elements.each(downloadARecording);
            return elements.length;
        }

    }

}


function downloadARecording(idx, val) {

    var matching;

    if ((matching = $(val).attr('src').match('(https:\/\/(?:download\.lecture\.unimelb\.edu\.au\/|mulo-media\.lib\.monash\.edu)\/[A-Za-z0-9\-\/]+)(?:\/synopsis\/low\/[0-9]+\.jpg)')) === null){
        alert('Error occured when trying to download the video!');
        return;
    } else {

        var part1URL = matching[1];
        var name_selector = "#li-" + (idx + 1) + " > div.echo-li-left-wrapper > div.title-wrapper > div.echo-meta-wrapper > div.echo-date";
        var name_recording = $(name_selector).text();

        name_recording = name_recording.replace(':', '.');

        chrome.runtime.sendMessage({
            url: part1URL + '/audio-vga.m4v',
            filename: coursename + '/' + name_recording + '.m4v',
            conflictAction: "overwrite"
        });

    }
}
