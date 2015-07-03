document.addEventListener("deviceready", init, false);
// our file to download
var url = "http://www.phonegaptutorial.com/wp-content/uploads/examples/phonegap-logo.png";
 
var store = cordova.file.dataDirectory;



function init()
{
	console.log("in Init");
	window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);

}

function downloadAsset(fs)
{
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	fs.root.getDirectory('downloads', { create: true });
	console.log("download folder created");
	var filePath = fs.root.fullPath + '/downloads/' + url.split('/').pop();
	console.log("filePath="+ filePath);

}

function appStart()
{
	console.log("Errorrrrrrrrrrrrrrrrrrrrrrrrrr");
}

