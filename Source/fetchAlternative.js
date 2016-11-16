/* Execution portal */
fetchAlterAndDownload();

function fetchAlterAndDownload() {
	var cells = $("#r1 > table > tbody > tr > td");
	var courseName = $("[role='main'] > section > h2").html();
	for (var i = 0; i < cells.length; i = i + 4) {
		/* Naive date and time processing */
		var dateAndTime = cells[i + 1].innerHTML;
		dateAndTime = dateAndTime.replace('/', '-');
		dateAndTime = dateAndTime.replace('/', '-');
		dateAndTime = dateAndTime.replace(':', '-');

		/* Send the download request to Chrome runtime */
		chrome.runtime.sendMessage({
        	url: cells[i + 3].childNodes[0].href,
			filename: courseName + '/' + dateAndTime + '.m4v',
			conflictAction: "overwrite"
		});
	}
}