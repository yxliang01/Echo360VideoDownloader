chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log("Received message request");
    if (message.url && message.filename) {
        donwloadVideo(message);
    }
});


function donwloadVideo(message) {
    // console.info('Message ' + JSON.stringify(message) + '	start downloading');
    chrome.downloads.download(message);
}