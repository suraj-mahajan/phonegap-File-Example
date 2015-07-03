document.addEventListener("deviceready", init, false);


var store;

//Used for status updates
var $status;

//URL of our asset
var assetURL = "http://www.google.com/robots.txt";

//File name of our important data file we didn't ship with the app
var fileName = "robots.txt";

function DownloadFile()
{
	
}


function _msg(msg)
{
	$('#status').append("<br>" + msg)
}



function init() {
	
	//console.log("device is ready init");

	_msg("in Init");

	//$status = document.querySelector("#status");

	//$status.innerHTML = "Checking for data file.";

	//store = cordova.file.dataDirectory;

	//Check for the file. 
	//window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);

}

function downloadAsset() {
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("assetURL=" + assetURL);
			console.log("store=" + store + fileName);
			console.log("store=" + store + fileName);
			console.log("store=" + store + fileName);
			console.log("Success!");
			appStart();
		}, 
		function(err) {
			console.log("Error");
			console.dir(err);
		});
}

//I'm only called when the file exists or has been downloaded.
function appStart() {
	//$status.innerHTML = "App ready!";
	console.log("appStart");
	console.log("LocalFileSystem.PERSISTENT=" + LocalFileSystem.PERSISTENT);
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}


function gotFS(fileSystem) {
		console.log("gotFS");
        fileSystem.root.getFile(store + fileName, null, gotFileEntry, fail);
    }

function gotFileEntry(fileEntry) {
		console.log("gotFileEntry");
        fileEntry.file(gotFile, fail);
    }

function gotFile(file){
		console.log("gotFile");
       // readDataUrl(file);
        readAsText(file);
    }

 function readAsText(file) {
 		console.log("readAsText");
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(evt.target.result);
            $status.innerHTML =evt.target.result;
        };
        reader.readAsText(file);
    }




function fail(e) {
	console.log("FileSystem Error");
	console.log(e.message);
	console.log(e.code);
}