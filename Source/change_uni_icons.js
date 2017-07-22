// Load the json file
// currently just copy and paste the contents
// var unis = [{
//         "abbr": "Unimelb",
//         "url": "lms.unimelb.edu.au",
//         "icon_128": "icon128_unimelb.png"
//     }, {
//         "abbr": "Monash",
//         "url": "monash.edu",
//         "icon_128": "icon128_monash.png"
//     }, {
//         "abbr": "ANU",
//         "url": "anu.edu.au",
//         "icon_128": "icon128_anu.png"
//     }, {
//         "abbr": "UNSW",
//         "url": "unsw.edu.au",
//         "icon_128": "icon128_unsw.png"
//     }, {
//         "abbr": "RMIT",
//         "url": "rmit.edu.au",
//         "icon_128": "icon128_rmit.png"
//     }
// ]

// Read from the local file (univeristy.json)
var unis = [];
getUniData();

// Load the content of the overlay image, i.e. the floppy disk sign
// const overlay = loadImage("icon128_overlay.png");

// Create an array to store the rules about when to change the icons
var uniIconRules = [];
var iconsContexts = [];

// createIcon(unis);
parseUniversities(unis);

// Main thread
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Change the icon according to the domain name
        chrome.declarativeContent.onPageChanged.addRules(uniIconRules);
    })
});

// The function below uses synchronous XMLHttpRequest 
// to get the contents of university.json
// However synchronous XMLHttpRequest was deprecated, but still usable
// Get and parse the contents of univerisity.json file
function getUniData() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            // request finished, now parsing
            unis = JSON.parse(xhr.responseText);
            // chrome.runtime.sendMessage();
        }
    };
    xhr.open("GET", chrome.extension.getURL('./university.json'), false);
    xhr.send();
}

/* The function below is used for loading the university.json file,
 * however it is unused because it's asynchronized */
function getUniData2() {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile("university.json", {}, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    unis = JSON.parse(this.result);
                    // chrome.runtime.sendMessage();
                };
                reader.readAsText(file);
            });
        });
    });
}

// Create rules for each univerisity
function parseUniversities(unis) {
    // add the rules to change icons according to the university abbreviations
    for (var index in unis) {
        // console.log(unis[index].icon_128);
        // Assume the abbreviation matches with their url
        // and use those abbreviations as the conditions
        uniIconRules.push({
            conditions : [ new chrome.declarativeContent.PageStateMatcher({
                                pageUrl: {urlContains: unis[index].url}
                        })
            ],
            actions    :[ new chrome.declarativeContent.SetIcon({
                                path : {"128": unis[index].icon_128}
                        })
            ]
        });
    }
}

// Reference: https://stackoverflow.com/questions/29056704/google-chrome-extension-canvas-icon
function createIcon(unis) {
    const overlay = "icon128_overlay.png";
    var canvas;
    var context;
    for (var index in unis) {
        canvas = document.createElement('canvas'); // Create the canvas
        // Set both height and width to 128, however it wil be scaled to 19x19 eventually
        canvas.width = 128;
        canvas.height = 128;
        window["canvas"+index] = canvas;
        
        context = canvas.getContext('2d');
        // Get the back ground icon (the logo of unis)
        var img = loadImage(unis[index].icon_128, context);
        // context.drawImage(img, 0, 0);
        debugShowCanvas(canvas);

        // Draw the overlay above the background
        // loadImage(overlay);
        // context.drawImage(overlay, 0, 0);
        // debugShowCanvas(canvas);

        iconsContexts.push(context);
    }   
}

function loadImage(imgPath, context) {
    var image = new Image(128, 128);
    image.onload = function () {
        context.drawImage(image, 0, 0);
    };
    image.src = imgPath;

    return image;
}

function debugShowCanvas(canvas) {
    var img = canvas.toDataURL("image/png");
    console.log(img);
}