// Load the json file
var unis = [{
        "abbr": "Unimelb",
        "url": "https://app.lms.unimelb.edu.au/webapps/blackboard/content/contentWrapper.jsp",
        "icon_128": "icon128_unimelb.png"
    }, {
        "abbr": "Monash",
        "url": "https://mulo-portal.lib.monash.edu/ess/portal/section/",
        "icon_128": "icon128_monash.png"
    }, {
        "abbr": "ANU",
        "url": "https://wattlecourses.anu.edu.au/blocks/echo360_echocenter/echocenter_frame.php",
        "icon_128": "icon128_anu.png"
    }, {
        "abbr": "RMIT",
        "url": "",
        "icon_128": "icon128_rmit.png"
    }
]

// var unimelb_icon = 
// {
//     conditions : [
//     new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {urlContains: "unimelb"}
//     })
//     ],
//     actions    : [ new chrome.declarativeContent.SetIcon({
//         path : {"128": "icon128_unimelb.png"}
//     })]
// };

// var anu_icon = 
// {
//     conditions : [
//     new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {urlContains: "anu"}
//     })
//     ],
//     actions    : [ new chrome.declarativeContent.SetIcon({
//         path : {"128": "icon128_anu.png"}
//     })]
// };

// var monash_icon = 
// {
//     conditions : [
//     new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {urlContains: "monash"}
//     })
//     ],
//     actions    : [ new chrome.declarativeContent.SetIcon({
//         path : {"128" : "icon128_monash.png"}
//     }) ]
// };

// var rmit_icon = 
// {
//     conditions : [
//     new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {urlContains: "rmit"}
//     })
//     ],
//     actions    : [ new chrome.declarativeContent.SetIcon({path : {"128" : "icon128_rmit.png"} }) ] 
// };

// Create an array to store the rules about when to change the icons
var uniIconRules = [];

parseUniversities(unis);

// Main thread
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Change the icon according to the domain name
        // var unis = getUniData();

        // var rules = parseUniversities(unis);
        // console.log(JSON.stringify(rules[0]));

        // var iconRules = generateIconRules();
        // var iconRules2 = [unimelb_icon, anu_icon, monash_icon, rmit_icon];
        // console.log("Icon rules:");
        // console.dir(iconRules);
        // console.log("Icon rules 2:");
        // console.log(JSON.stringify(iconRules2[0]));

        chrome.declarativeContent.onPageChanged.addRules(uniIconRules);
        console.log("yeah i did it");
    })
});

// Create a list of JSON objects to represent the rules
function generateIconRules() {
    // parse the json and create rules for each univerisity
    var unis = getUniData();
    var rules = [];
    rules = parseUniversities(unis);
    return rules;
}

// The function below uses synchronous XMLHttpRequest to get the contents of university.json
// However synchronous XMLHttpRequest was deprecated
// Get and parse the contents of univerisity.json file
function getUniData(input, output, callback) {
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
                                pageUrl: {urlContains: unis[index].abbr.toLowerCase()}
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
