var lastTabId = null;
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.reqtype == "get-options") {
		if (!(localStorage.getItem("showicon") == "true")) {
			chrome.pageAction.show(sender.tab.id);
		}
		
		sendResponse({"quickreply": !(localStorage.getItem("quickreply") == "true"),
		"quickreplyiframe": localStorage.getItem("quickreplyiframe") == "true",
		"expand": !(localStorage.getItem("expand") == "true"),
		"expandimages": !(localStorage.getItem("expandimages") == "true"),
		"preview": !(localStorage.getItem("preview") == "true"),
		"fetchreplies": !(localStorage.getItem("fetchreplies") == "true"),
		"autonoko": !(localStorage.getItem("autonoko") == "true"),
		"sage": !(localStorage.getItem("sage") == "true"),
		"report": localStorage.getItem("report") == "true",
		"threadwatcher": !(localStorage.getItem("threadwatcher") == "true"),
		"hidethreads": !(localStorage.getItem("hidethreads") == "true"),
		"menu": !(localStorage.getItem("menu") == "true"),
		"watchedthreads": (localStorage.getItem("watchedthreads") != null) ? JSON.parse(localStorage.getItem("watchedthreads")) : [],
		"hiddenthreads": (localStorage.getItem("hiddenthreads") != null) ? JSON.parse(localStorage.getItem("hiddenthreads")) : [],
		"returntotop": !(localStorage.getItem("returntotop") == "true"),
		"quickbrowse": !(localStorage.getItem("quickbrowse") == "true"),
		"default_name": (localStorage.getItem("defaultname") != null) ? localStorage.getItem("defaultname") : "",
		"default_email": (localStorage.getItem("defaultemail") != null) ? localStorage.getItem("defaultemail") : "",
		"default_subject": (localStorage.getItem("defaultsubject") != null) ? localStorage.getItem("defaultsubject") : "",
		"default_comment": (localStorage.getItem("defaultcomment") != null) ? localStorage.getItem("defaultcomment") : "",
		"default_password": ""});
	} else if (request.reqtype == "get-watchedthreads") {
		sendResponse((localStorage.getItem("watchedthreads") != null) ? JSON.parse(localStorage.getItem("watchedthreads")) : []);
	} else if (request.reqtype == "get-hiddenthreads") {
		sendResponse((localStorage.getItem("hiddenthreads") != null) ? JSON.parse(localStorage.getItem("hiddenthreads")) : []);
	} else if (request.reqtype == "set-watchedthreads") {
		localStorage.setItem("watchedthreads", JSON.stringify(request.watchedthreads));
	} else if (request.reqtype == "set-hiddenthreads") {
		localStorage.setItem("hiddenthreads", JSON.stringify(request.hiddenthreads));
	} else if (request.reqtype == "get-tabid") {
		chrome.tabs.getSelected(null, function(tab) {
			sendResponse(tab.id);
		});
	}
});
