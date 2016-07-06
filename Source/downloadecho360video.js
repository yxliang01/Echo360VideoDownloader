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
         return;

    coursename
        = $('#course-info').text();

    //Start looking for download URL

    var downloadurls = [];
    var count_video = 1;
    var curr_selector = '';
    var downloadurl = '';
    var UUID = '';
    var tmp;
    var folderId;
    var yetAnotherId;

    console.log("start downloading...");
    $('*[id^="li-"] > div.echo-li-left-wrapper > div.echo-thumbnail > div > img').each(downloadARecording);

}


function downloadARecording(idx, val) {
    if ((matching = $(val).attr('src').match('(?:https:\/\/download.lecture.unimelb.edu.au\/\/)([A-Za-z0-9\-\/]+)(?:\/synopsis\/low\/[0-9]+.jpg)')) === null) {
        alert('Error occured when trying to download the video!');
        return;
    } else {

        var partURL = matching[1];

        chrome.runtime.sendMessage({
            url: 'https://download.lecture.unimelb.edu.au//' + partURL + '/audio-vga.m4v',
            filename: coursename + '/Recording' + count_video + '.m4v',
            conflictAction: "overwrite"
        });

    }
}
