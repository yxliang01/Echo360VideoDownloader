var coursename;


//Execution Part
downloadVideos();

//Functions

function checkWhetherLoaded() {
    if ($('#echoes-list').length != 0) {
        console.info(window.location.href + '      has lecture info!!!');
        return true;
    } else {
        return false;
    }

}


function downloadVideos() {

    if (typeof $ === 'undefined')
        return false;

    coursename
        = $('#course-info').text();

    //Start looking for download URL

    console.log("start downloading...");
    var elements = $('*[id^="li-"] > div.echo-li-left-wrapper > div.echo-thumbnail > div > img');

    if (elements.length === 0)
        return false;
    else {
        elements.each(downloadARecording);
        return true;
    }

}


function downloadARecording(idx, val) {
    if ((matching = $(val).attr('src').match('(?:https:\/\/download.lecture.unimelb.edu.au\/\/)([A-Za-z0-9\-\/]+)(?:\/synopsis\/low\/[0-9]+.jpg)')) === null) {
        alert('Error occured when trying to download the video!');
        return;
    } else {

        var partURL = matching[1];
        var name_selector = "#li-" + (idx+1) + " > div.echo-li-left-wrapper > div.title-wrapper > div.echo-meta-wrapper > div.echo-date";
        var name_recording = $(name_selector).text();

        name_recording = name_recording.replace(':', '.');

        chrome.runtime.sendMessage({
            url: 'https://download.lecture.unimelb.edu.au//' + partURL + '/audio-vga.m4v',
            filename: coursename + '/' + name_recording + '.m4v',
            conflictAction: "overwrite"
        });

    }
}
