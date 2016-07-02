/*$(window).on("message", function(e) {
    var data = e.originalEvent.data;

    if (data != 'Start downloading')
    {
    	console.info('start downloading ' + e.originalEvent.data.url);
        chrome.downloads.download(e.originalEvent.data);
    }

});*/

(function() {
	postDownloadMessageToAllChildFrames(window);
}) ();

function postDownloadMessageToAllChildFrames(curr_window) {
    curr_window.postMessage('Start downloading', '*');

    for (var i = curr_window.frames.length - 1; i >= 0; i--) {
        postDownloadMessageToAllChildFrames(curr_window.frames[i]);
    }

    console.log($($("#echo-tabs-wrapper > div.details-contents-wrapper > div > div > div > div > table > tbody > tr:nth-child(1) > td.info-thumb > div > img")));

}