/* A feature that changes the logo of universities,
 * when the user goes to websites of other supported universities */

// Read the univeristy.json file
var unis = [];
getUniData();

// Load the content of the overlay image, i.e. the floppy disk sign
// var iconsContexts = [];
// createIcon(unis);

// Create an array to store the rules about when to change the icons
var uniIconRules = [];

// Create rules for each univerisity, update the uniIconRules array
createRules(unis);

// Main part
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
// May change to JQuery if background.html is used
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

// TODO: make use of this
/* The function below is used for loading the university.json file,
 * unused because it's asynchronized */
function getUniData2() {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile("university.json", {}, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    unis = JSON.parse(this.result);
                };
                reader.readAsText(file);
            });
        });
    });
}

// Create rules for each univerisity
function createRules(unis) {
    // add the rules to change icons according to the university abbreviations
    for (var index in unis) {
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

// TODO: Next step: dynamically generate the icons using canvas elements, not done yet
// Useful links: https://stackoverflow.com/questions/29056704/google-chrome-extension-canvas-icon
// function createIcon(unis) {
//     const overlay = "icon128_overlay.png";
//     var canvas;
//     var context;
//     for (var index in unis) {
//         canvas = document.createElement('canvas'); // Create the canvas
//         // Set both height and width to 128, however it wil be scaled to 19x19 eventually
//         canvas.width = 128;
//         canvas.height = 128;
//         window["canvas"+index] = canvas;
        
//         context = canvas.getContext('2d');
//         // Get the back ground icon (the logo of unis)
//         var img = loadImage(unis[index].icon_128, context);
//         // context.drawImage(img, 0, 0);
//         debugShowCanvas(canvas);

//         // Draw the overlay above the background
//         // loadImage(overlay);
//         // context.drawImage(overlay, 0, 0);
//         // debugShowCanvas(canvas);

//         iconsContexts.push(context);
//     }   
// }
