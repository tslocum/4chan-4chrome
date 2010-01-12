function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
 
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
	} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function quickReplyBox(resto, atElement) {
	var quickReplyBox = document.createElement("div");
	quickReplyBox.id = "qr" + resto;
	quickReplyBox.innerHTML = '<span style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" onclick="javascript:var qr=document.getElementById(\'qr' + resto + '\');qr.parentNode.removeChild(qr);return false;">&nbsp;X&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 10px;" class="postblock">Quick Reply (#' + resto + ')</div>' + postarea;
	quickReplyBox.className = "reply";
	quickReplyBox.style.margin = "0";
	quickReplyBox.style.padding = "0";
	quickReplyBox.style.position = "absolute";
	var offsetLeft = atElement.offsetLeft;
	var offsetTop = atElement.offsetTop;
	var obj = atElement;
	while (obj.offsetParent){
		if (obj == document.getElementsByTagName('body')[0]) {
			break;
		} else {
			offsetLeft += obj.offsetParent.offsetLeft;
			offsetTop += obj.offsetParent.offsetTop;
			obj = obj.offsetParent;
		}
	}
	quickReplyBox.style.left = offsetLeft;
	quickReplyBox.style.top = offsetTop;
	var items3 = quickReplyBox.getElementsByTagName("table");
	for (var j=0; j < items3.length; j++) {
		if (items3[j].width == "100%") {
			items3[j].style.display = "none";
		}
	}
	var items3 = quickReplyBox.getElementsByTagName("div");
	for (var j=0; j < items3.length; j++) {
		if (items3[j].className != "postblock") {
			items3[j].style.display = "none";
		}
	}
	insertAfter(quickReplyBox, atElement);
	
	// Set resto
	firstinput = quickReplyBox.getElementsByTagName("input")[0];
	var resto_input = document.createElement("input");
	resto_input.name = "resto";
	resto_input.value = resto;
	resto_input.type = "hidden";
	insertAfter(resto_input, firstinput);
	
	autoNoko(quickReplyBox);
	
	return quickReplyBox;
}

function quickReplyQuote(resto, postid, atElement) {
	qrb = quickReplyBox(resto, atElement);
	var items = qrb.getElementsByTagName("textarea");
	for (var i=0; i < items.length; i++) {
		items[i].value = ">>" + postid
	}
}

function replaceRefLinksWithQuickReply(searchElement, resto_override) {
	if (enable_quickreply) {
		if (!searchElement) {
			searchElement = document;
		}
		var items = searchElement.getElementsByTagName('a');
		for(var i=0; i < items.length; i++) {
			var postid = null;
			var resto = resto_override;
			var m = items[i].href.match(/.*quote\(\'([0-9]+)\'\)/i);
			if (m != null) {
				postid = m[1];
				if (!resto) {
					var m = window.location.href.match(/.*\/res\/([0-9]+).*/i);
					if (m != null) {
						resto = m[1];
					}
				}
			} else if (items[i].className == "quotejs") {
				var m = items[i].href.match(/[.*]?res\/([0-9]+)(?:\.html)?\#q([0-9]+)/i);
				if (m != null) {
					resto = m[1];
					postid = m[2];
				}
			}
			if (postid && resto && items[i].href != "javascript:return false;") {
				items[i].setAttribute("postID", postid);
				items[i].setAttribute("threadID", resto);
				items[i].setAttribute("thisElement", items[i]);
				if (enable_quickreply) {
					items[i].addEventListener("click", function() {
						quickReplyQuote(this.getAttribute("threadID"), this.getAttribute("postID"), this.parentNode);
					}, false);
				}
				items[i].href = "javascript:false;"
			}
		}
	}
}

function setReplyPostID(element) {
	var items = element.getElementsByTagName('a');
	for(var j=0; j < items.length; j++) {
		var m = items[j].href.match(/.*\/[0-9]+(?:\.html)?#([0-9]+)/i);
		if (m == null) {
			var m = items[j].href.match(/\#([0-9]+)/i);
		}
		if (m != null) {
			if (items[j].innerHTML == "No.") {
				element.setAttribute("postID", m[1]);
			} else if (enable_preview) {
				var m2 = items[j].innerHTML.match(/^\&gt\;\&gt\;[0-9]+/i);
				if (m2 != null) {
					items[j].setAttribute("refID", m[1]);
					items[j].addEventListener("mousemove", function(e) {
						var preview = document.getElementById("ref" + this.getAttribute("refID"));
						if (!preview) {
							var preview = document.createElement("div");
							preview.id = "ref" + this.getAttribute("refID");
							preview.className = "reply";
							preview.style.margin = "0";
							preview.style.padding = "0";
							preview.style.position = "absolute";
							
							var items2 = document.getElementsByTagName("table");
							for (var i=0; i < items2.length; i++) {
								var postid = items2[i].getAttribute("postID");
								if (postid && postid == this.getAttribute("refID")) {
									preview.innerHTML = items2[i].innerHTML;
								}
							}
							
							insertAfter(preview, this);
						}
						preview.style.left = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 25;
						preview.style.top = e.clientY + document.body.scrollTop + document.documentElement.scrollTop + 10;
					}, false);
					items[j].addEventListener("mouseout", function() {
						var preview = document.getElementById("ref" + this.getAttribute("refID"));
						if (preview) {
							preview.parentNode.removeChild(preview);
						}
					}, false);
				}
			}
		}
	}
}

function processExpandTables(replies, replies_temp, threadID, items, tables) {
	if (!tables) {
		tables = [];
	}
	if (items && items.length > 0) {
		var table = items.shift();
		if (table.width != "100%" && table.cellpadding != "0" && table.align != "right") {
			for (var j=0; j < tables.length; j++) {
				var items3 = tables[j].getElementsByTagName("a");
				for (var k=0; k < items3.length; k++) {
					m = items3[k].href.match(/\/([0-9]+)(?:\.html)?.*/)
					if (m != null && items3[k].innerHTML == "No.") {
						items3[k].href = "#" + m[1];
					}
				}
			}
			replies.innerHTML += "<table>" + table.innerHTML + "</table>"
		}
	}
	if (items && items.length > 0) {
		setTimeout(processExpandTables, 5, replies, replies_temp, threadID, items, tables);
	} else {
		processExpandTablesFinish(replies, replies_temp, threadID, tables);
	}
}

function processExpandTablesFinish(replies, replies_temp, threadID, tables) {
	var delform = replies_temp.getElementsByTagName("form")[1];
	replies_temp.style.display = "none";
	
	var items2 = replies.getElementsByTagName("table");
	for (var i=0; i < items2.length; i++) {
		setReplyPostID(items2[i]);
	}
	
	replaceRefLinksWithQuickReply(replies, threadID);
	
	var items2 = document.getElementsByTagName("table");
	for (var i=0; i < items2.length; i++) {
		if (items2[i].getAttribute("ThreadID") == threadID) {
			items2[i].style.display = "none";
		}
	}
	
	var items2 = document.getElementsByTagName("span");
	for (var i=0; i < items2.length; i++) {
		if (items2[i].getAttribute("ThreadID") == threadID) {
			items2[i].innerHTML = "";
			items2[i].insertBefore(replies);
		}
	}
}

function processExpand(replies, replies_temp, threadID) {
	var delform = replies_temp.getElementsByTagName("form")[1];
	var items = delform.getElementsByTagName("table");
	var tables = [];
	for (var j=0; j < items.length; j++) {
		tables.push(items[j]);
	}
	processExpandTables(replies, replies_temp, threadID, tables);
}

function autoNoko(element) {
	if (!element) {
		element = document;
	}
	chrome.extension.sendRequest({reqtype: "get-autonoko"}, function(response) {
		if (response == "true") {
			var items3 = element.getElementsByTagName("input");
			for (var j=0; j < items3.length; j++) {
				if (items3[j].name == "email") {
					items3[j].value = "noko"
				}
			}
		}
	});
}

var enable_quickreply = null;
var enable_expand = null;
var enable_preview = null;
chrome.extension.sendRequest({reqtype: "get-quickreply"}, function(response) {
	enable_quickreply = response;
});
chrome.extension.sendRequest({reqtype: "get-expand"}, function(response) {
	enable_expand = response;
});
chrome.extension.sendRequest({reqtype: "get-preview"}, function(response) {
	enable_preview = response;
});

var items = document.getElementsByTagName('div');
for(var i=0; i < items.length; i++) {
	if (items[i].className == "postarea") {
		var postarea = items[i].innerHTML;
		autoNoko(document);
	}
}

function init4chan4chrome() {
	var items = document.getElementsByTagName('a');
	for (var i=0; i < items.length; i++) {
		if (items[i].innerHTML == "Reply" && enable_quickreply) {
			var m = items[i].href.match(/.*\/([0-9]+)(?:\.html)?/i);
			if (m != null) {
				var threadID = m[1];
				
				var comma = document.createElement("span");
				var commaText = document.createTextNode(", ");
				comma.appendChild(commaText);
				insertAfter(comma, items[i]);
				
				var quickReply = document.createElement("a");
				quickReply.href = "#";
				quickReply.setAttribute("onclick", 'return false;');
				quickReply.setAttribute("threadID", threadID);
				quickReply.addEventListener("click", function() {
					var items2 = document.getElementsByTagName("input");
					for (var i=0; i < items2.length; i++) {
						if (items2[i].name.search(this.getAttribute("threadID")) != -1) {
							quickReplyBox(this.getAttribute("threadID"), items2[i]);
						}
					}
				}, false);
				var quickReplyText = document.createTextNode("Quick Reply");
				quickReply.appendChild(quickReplyText);
				insertAfter(quickReply, comma);
			}
		} else if (items[i].innerHTML == "No.") {
			var m = items[i].href.match(/.*\/([0-9]+)(?:\.html)?\#([0-9]+)/i);
			if (m != null) {
				if (m[1] == m[2]) {
					items[i].name = m[1];
				}
			}
		}
	}


	var delform = document.forms[1];
	var nodes = delform.childNodes;
	lastnode = null;
	threadID = null;
	for (var i=0; i < nodes.length; i++) {
		node = nodes[i];
		
		if (!threadID && node.nodeName.toLowerCase() == "input" && node.type == "checkbox") {
			threadID = node.name;
		}
		
		if (node.nodeName.toLowerCase() == "table" && !node.getAttribute("align")) {
			node.setAttribute("threadID", threadID);
			replaceRefLinksWithQuickReply(node, threadID);
			setReplyPostID(node);
		}
		
		if (node.className && node.className.toLowerCase() == "omittedposts" && enable_expand) {
			node.setAttribute("threadID", threadID);
			
			var expand = document.createElement("a");
			expand.href = "#";
			expand.setAttribute("onclick", 'return false;');
			expand.setAttribute("threadID", threadID);
			expand.addEventListener("click", function() {
				this.style.textDecoration = "none";
				this.style.color = "#000000";
				this.style.fontWeight = "bold";
				this.innerHTML = "Expanding...";
				var client = new XMLHttpRequest();
				client.open("GET", "res/" + this.getAttribute("threadID"), true);
				client.send();
				client.threadID = this.getAttribute("threadID");
				client.onreadystatechange = function() {
					if (client.readyState == 4) {
						var replies = document.createElement("span");
						var replies_temp = document.createElement("span");
						replies_temp.innerHTML = client.responseText;
						processExpand(replies, replies_temp, this.threadID);
					}
				};
			}, false);
			var expandText = document.createTextNode("Expand");
			expand.appendChild(expandText);
			var spacer = document.createTextNode(" ");
			node.insertBefore(spacer);
			node.insertBefore(expand);
		}
		
		if (node.nodeName.toLowerCase() == "hr" && lastnode && lastnode.nodeName.toLowerCase() == "br") {
			threadID = null;
		}
		lastnode = node;
	}

	replaceRefLinksWithQuickReply(null, null);
}

// Drag and drop quick reply boxes
var isdrag=false;
var x,y;
var dobj;

function movemouse(e) {
	if (isdrag) {
		dobj.style.left = tx + e.clientX - x;
		dobj.style.top = ty + e.clientY - y;
		return false;
	}
}

function selectmouse(e) {
	var fobj = e.target;
	while (fobj.tagName.toLowerCase() != "html" && !(fobj.className=="postblock" && fobj.style.textAlign == "center")) {
		fobj = fobj.parentNode;
	}
	if (fobj.className=="postblock" && fobj.style.textAlign == "center") {
		isdrag = true;
		dobj = fobj.parentNode;
		tx = parseInt(dobj.style.left+0,10);
		ty = parseInt(dobj.style.top+0,10);
		x = e.clientX;
		y = e.clientY;
		document.onmousemove=movemouse;
		return false;
	}
}
document.onmousedown=selectmouse;
document.onmouseup=new Function("isdrag=false");

setTimeout('init4chan4chrome()', 200);