$(document).ready(checkWhetherLoaded);
$(window).on("message", downloadVideos);


function checkWhetherLoaded() {
    if ($('#echoes-list').length != 0) {
        console.info(window.location.href + '      has lecture info!!!');
        return true;
    } else {
        return false;
    }

}


function downloadVideos(e) {
    if (e.originalEvent.data != 'Start downloading') {
        return;
    }

    if (!checkWhetherLoaded()) {
        setTimeout(downloadVideos, 1500);
    }

    var coursename = $('#course-info').text();

    //Start looking for download URL

    var downloadurls = [];
    var count_video = 1;
    var curr_selector = '';
    var downloadurl = '';
    var UUID = '';
    var tmp;
    var folderId;
    var yetAnotherId;

    while (true) {
        curr_selector = '#li-' + count_video + ' > div.echo-li-left-wrapper > div.echo-thumbnail > div > img';
        if ($(curr_selector).length == 0) {
            console.info((count_video - 1) + ' messages had been sent for downloading');
            break;
        } else {
            if ((tmp = $(curr_selector).attr('src').match('.*(?=/synopsis/low/........\.jpg)')[0]) == null) {
                alert('Error occured when trying to download the video!');
                return;
            } else {
                tmp = tmp.split('/');
                UUID = tmp[tmp.length - 1];
                yetAnotherId = tmp[tmp.length - 2];
                folderId = tmp[tmp.length - 3];

                chrome.runtime.sendMessage({
                    url: 'https://download.lecture.unimelb.edu.au//' + folderId + '/' + yetAnotherId + '/' + UUID + '/audio-vga.m4v',
                    filename: coursename + '/Recording' + count_video + '.m4v',
                    conflictAction: "overwrite"
                });



            }

            count_video++;
        }

    }
    
}
