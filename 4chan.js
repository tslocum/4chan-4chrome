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

var items = document.getElementsByTagName('div');
for(var i=0; i < items.length; i++) {
	if (items[i].className == "postarea") {
		var postarea = items[i].innerHTML;
	}
}

var items = document.getElementsByTagName('a');
for (var i=0; i < items.length; i++) {
	if (items[i].innerHTML == "Reply") {
		var m = items[i].href.match(/.*\/([0-9]+)\.html/i);
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
						// Create and show quick reply box
						var quickReplyBox = document.createElement("div");
						quickReplyBox.id = "qr" + this.getAttribute("threadID")
						quickReplyBox.innerHTML = '<span style="float: right;cursor: pointer;" onclick="javascript:var qr=document.getElementById(\'qr' + this.getAttribute("threadID") + '\');qr.parentNode.removeChild(qr);return false;">&nbsp;X&nbsp;</span><div style="text-align: center;" class="postblock">Quick Reply (#' + this.getAttribute("threadID") + ')</div>' + postarea;
						quickReplyBox.className = "reply";
						quickReplyBox.style.position = "absolute";
						quickReplyBox.style.left = items2[i].offsetLeft;
						quickReplyBox.style.top = items2[i].offsetTop;
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
						insertAfter(quickReplyBox, items2[i]);
						
						// Set resto
						firstinput = quickReplyBox.getElementsByTagName("input")[0];
						var resto = document.createElement("input");
						resto.name = "resto";
						resto.value = this.getAttribute("threadID");
						resto.type = "hidden";
						insertAfter(resto, firstinput);
					}
				}
			}, false);
			var quickReplyText = document.createTextNode("Quick Reply");
			quickReply.appendChild(quickReplyText);
			insertAfter(quickReply, comma);
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
	}
	
	if (node.className && node.className.toLowerCase() == "omittedposts") {
		node.setAttribute("threadID", threadID);
		
		var expand = document.createElement("a");
		expand.href = "#";
		expand.setAttribute("onclick", 'return false;');
		expand.setAttribute("threadID", threadID);
		expand.addEventListener("click", function() {
			var client = new XMLHttpRequest();
			client.open("GET", "res/" + this.getAttribute("threadID") + ".html", true);
			client.send();
			client.threadID = this.getAttribute("threadID");
			client.onreadystatechange = function() {
				if (client.readyState == 4) {
					var replies = document.createElement("span");
					var replies_temp = document.createElement("span");
					replies_temp.innerHTML = client.responseText;
					var delform = replies_temp.getElementsByTagName("form")[1];
					var items2 = delform.getElementsByTagName("table");
					for (var i=0; i < items2.length; i++) {
						if (items2[i].width != "100%" && items2[i].cellpadding != "0" && items2[i].align != "right") {
							var items3 = items2[i].getElementsByTagName("a");
							for (var j=0; j < items3.length; j++) {
								m = items3[j].href.match(/([0-9]+)\.html.*/)
								if (m != null) {
									items3[j].href = "#" + m[1];
								}
							}
							replies.innerHTML += "<table>" + items2[i].innerHTML + "</table>"
						}
					}
					replies_temp.style.display = "none";
					
					var items2 = document.getElementsByTagName("table");
					for (var i=0; i < items2.length; i++) {
						if (items2[i].getAttribute("ThreadID") == this.threadID) {
							items2[i].style.display = "none";
						}
					}
					
					var items2 = document.getElementsByTagName("span");
					for (var i=0; i < items2.length; i++) {
						if (items2[i].getAttribute("ThreadID") == this.threadID) {
							items2[i].innerHTML = "";
							items2[i].insertBefore(replies);
						}
					}
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
