// Load the json file
// currently just copy and paste the contents
var unis = [{
        "abbr": "Unimelb",
        "url": "lms.unimelb.edu.au",
        "icon_128": "icon128_unimelb.png"
    }, {
        "abbr": "Monash",
        "url": "monash.edu",
        "icon_128": "icon128_monash.png"
    }, {
        "abbr": "ANU",
        "url": "anu.edu.au",
        "icon_128": "icon128_anu.png"
    }, {
        "abbr": "UNSW",
        "url": "unsw.edu.au",
        "icon_128": "icon128_unsw.png"
    }, {
        "abbr": "RMIT",
        "url": "rmit.edu.au",
        "icon_128": "icon128_rmit.png"
    }
]

// Create an array to store the rules about when to change the icons
var uniIconRules = [];

parseUniversities(unis);

// Main thread
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Change the icon according to the domain name
        chrome.declarativeContent.onPageChanged.addRules(uniIconRules);
    })
});

// // Create a list of JSON objects to represent the rules
// function generateIconRules() {
//     // parse the json and create rules for each univerisity
//     var unis = getUniData();
//     var rules = [];
//     rules = parseUniversities(unis);
//     return rules;
// }

// The function below uses synchronous XMLHttpRequest to get the contents of university.json
// However synchronous XMLHttpRequest was deprecated
// Get and parse the contents of univerisity.json file
function getUniData() {
    // var unis;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            // request finished, now parsing
            unis = JSON.parse(xhr.responseText);
            chrome.runtime.sendMessage();
        }
    };
    xhr.open("GET", chrome.extension.getURL('./university.json'), false);
    xhr.send();

    return unis;
}

/* The function below is used for loading the university.json file, however it is unused because it's asynchronized */
function getUniData2() {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile("university.json", {}, function(fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    window.unis = JSON.parse(this.result);
                    chrome.runtime.sendMessage();
                };
                reader.readAsText(file);
            });
        });
    });
}

// Create rules for each univerisity
function parseUniversities(unis) {
    // var rules = [];

    // add the rules to change icons according to the university abbreviations
    for (var index in unis) {
        // console.log(unis[index].icon_128);
        // Assume the abbreviation matches with their url
        // and use those abbreviations as the conditions

        console.dir( new chrome.declarativeContent.SetIcon({
                                path : {"128": unis[index].icon_128}
                        }));
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

    // return rules;
}
