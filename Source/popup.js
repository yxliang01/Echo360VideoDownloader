document.addEventListener('DOMContentLoaded', function() {
    var downloadButton = document.getElementById("download");
    downloadButton.addEventListener('click', function() {

        chrome.tabs.query({
            active: true
        }, function(tabs) {

            if (tabs[0].status != "complete") {
                $("#status").text("This page is still loading, please click the download button later.");
            } else {
                $("#status").text("Sending downlaod request to workers");
                DownloadVideos();
            }

        });

    });
});


function DownloadVideos() {

    injectScript();
    $("#status").text("Downlaod request had been sent to workers");
}



function injectScript() {
    chrome.tabs.executeScript(null, {
        file: "node_modules/jquery/dist/jquery.min.js",
        allFrames: false
    });

    chrome.tabs.executeScript(null, {
        file: "downloadecho360video.js",
        allFrames: false
    });
}
