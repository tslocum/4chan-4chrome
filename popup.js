var visiturl;
function expandAll() {
	chrome.extension.sendRequest({reqtype: "get-tabid"}, function(response) {
		chrome.tabs.sendRequest(response, {reqtype: "expandall"});
		window.close();
	});
}
function openNavigation() {
	$.ajax({
		url: 'http://www.4chan.org/',
		success: function(data) {
			var m = data.match(/\<link(.*)\>/ig);
			if (m != null) {
				document.body.innerHTML = data;

				var bd = document.getElementById("bd");
				if (bd) {
					document.body.innerHTML = bd.innerHTML;
					
					var items = document.getElementsByTagName("div");
					for (var i=0; i < items.length; i++) {
						items[i].style.display = "none";
					}
					var boards = document.getElementById("boards");
					bd.style.display = "block";
					boards.style.display = "block";
					var items = boards.getElementsByTagName("div");
					for (var i=0; i < items.length; i++) {
						items[i].style.display = "block";
					}
					
					for (var i=0; i < m.length; i++) {
						document.body.innerHTML += m[i];
					}
					
					
					var items = document.getElementsByTagName('a');
					for(var i=0; i < items.length; i++) {
						items[i].setAttribute("onclick", "javascript:return false;");
						items[i].addEventListener("click", function() {
							visiturl = this.href;
							chrome.extension.sendRequest({reqtype: "get-tabid"}, function(response) {
								chrome.tabs.sendRequest(response, {reqtype: "visiturl", url: visiturl});
								window.close();
							});
						});
					}
				}
			}
		}
	});
}
function openOptions() {
	chrome.tabs.create({url: "options.html"});
	window.close();
}
chrome.extension.sendRequest({reqtype: "get-expandimages"}, function(response) {
	if (response == false) {
		var items = document.getElementsByTagName("button");
		for (var i=0; i < items.length; i++) {
			items[i].disabled = true;
		}
	}
});
function init() {
  document.getElementById("expandall").textContent = chrome.i18n.getMessage("expand_all_thumbnails");
  document.getElementById("navigation").textContent = chrome.i18n.getMessage("4chan_navigation");
  document.getElementById("options").textContent = chrome.i18n.getMessage("4chan_4chrome_options");
}