document.addEventListener("deviceready", init, false);

window.appRootDirName = "HellowCordova";

var assetURL = "http://www.tutorialspoint.com/phonegap/phonegap_tutorial.pdf";

function DownloadFile()
{
	
}

function _msg(msg)
{
	$('#status').append("<br>" + msg)
}

function init() {

	_msg("in Init");
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

}

function gotFS(fileSystem) {
	_msg("fileSystem");
		console.log("filesystem got");
		fileSystem.root.getDirectory(window.appRootDirName, {
			create : true,
			exclusive : false
		}, dirReady, fail);
	}

function dirReady(entry) {
	_msg("entry");
		window.appRootDir = entry;
		console.log(JSON.stringify(window.appRootDir));
		_msg(JSON.stringify(window.appRootDir));
		_msg("entry.toURL()=" + entry.toURL());

		var fileTransfer = new FileTransfer();
		_msg("About to start transfer");

		 fileTransfer.onprogress = function(progressEvent) {

                //perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);

                var  _per=parseInt(parseInt(progressEvent.loaded) / parseInt(progressEvent.total) * 100);

                $("#progressbar").html("Loaded <b>" + progressEvent.loaded + '</b> of <b>' + progressEvent.total) + '</b>'; //changed this line
                 $("#progressbar1").html(_per);
                };


		fileTransfer.download(assetURL, entry.toURL()  + "/Phonegap_pdf.pdf", 
		function(entry) {
			_msg("Download Success!");
			cordova.plugins.disusered.open(entry.toURL()  + "/robots.txt");
		}, 
		function(err) {
			_msg("~Download Error");
		});

	}

function fail() {
		_msg("~failed to get filesystem");
	}