var base64_quickreply = "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";
var base64_expand = "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";
var base64_expandwait = "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";
var base64_minus = "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";
var base64_report = "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";

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

function checkQuickReplyBoxSubmitted(qrbid) {
	var qrb = document.getElementById(qrbid);
	var qrb_iframe = qrb.getElementsByTagName("iframe")[0];
	if (qrb_iframe.src.search("Updating page.") != -1) {
		closeQuickReplyBox(qrbid)
	} else {
		setTimeout(checkQuickReplyBoxSubmitted, 200, qrbid);
	}
}

function closeQuickReplyBox(qrbid) {
	var qrb = document.getElementById(qrbid);
	qrb.parentNode.removeChild(qrb);
}

function quickReplyBox(resto, atElement) {
	var quickReplyBox = document.createElement("div");
	var qrbid = "qr" + Math.floor(Math.random()*1000)
	quickReplyBox.id = qrbid;
	quickReplyBox.style.borderTop = "0px none";
	quickReplyBox.style.borderBottom = "1px solid #CCCCCC";
	quickReplyBox.style.borderLeft = "1px solid #CCCCCC";
	quickReplyBox.style.borderRight = "1px solid #CCCCCC";
	quickReplyBox.innerHTML = '<span style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" onclick="javascript:var qr=document.getElementById(\'' + qrbid + '\');qr.parentNode.removeChild(qr);return false;">&nbsp;X&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 10px;" class="postblock">Quick Reply (#' + resto + ')</div>' + postarea;
	if (enable_quickreplyiframe) {
		quickReplyBox.innerHTML += '<iframe id="' + qrbid + 'iframe" src="about:blank" style="display: none;min-width:100px;height:50px;margin:0px;padding:0px;"></iframe>';
	}
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
			items3[j].parentNode.removeChild(items3[j]);
		}
	}
	var items3 = quickReplyBox.getElementsByTagName("div");
	for (var j=0; j < items3.length; j++) {
		if ((items3[j].className != "postblock") && (items3[j].id != "recaptcha_area") && (items3[j].id != "recaptcha_image") && (items3[j].innerHTML.indexOf("recaptcha") == -1)) {
			items3[j].parentNode.removeChild(items3[j]);
		}
	}
	var items3 = quickReplyBox.getElementsByTagName("tr");
	for (var j=0; j < items3.length; j++) {
		if (items3[j].innerHTML == "<td></td><td colspan=\"2\">\n</td>") {
			items3[j].parentNode.removeChild(items3[j]);
		}
	}
	if (enable_quickreplyiframe) {
		quickReplyBox.getElementsByTagName("form")[0].id = qrbid + "form";
		if (quickReplyBox.getElementsByTagName("form")[0].action.search("#") != -1) {
			quickReplyBox.getElementsByTagName("form")[0].action = quickReplyBox.getElementsByTagName("form")[0].action.split("#")[0];
		}
		var items3 = quickReplyBox.getElementsByTagName("input");
		for (var j=0; j < items3.length; j++) {
			if (items3[j].value == "Submit") {
				items3[j].setAttribute("submitted", "false");
				items3[j].setAttribute("qrbid", qrbid);
				items3[j].addEventListener("click", function() {
					document.getElementById(this.getAttribute("qrbid") + "iframe").style.display = "block";
					document.getElementById(this.getAttribute("qrbid") + "form").submit();
					/*if (this.getAttribute("submitted") == "false") {
						setTimeout(checkQuickReplyBoxSubmitted, 200, qrbid);
						this.setAttribute("submitted", "true");
					}*/
				}, false);
			}
		}
		quickReplyBox.getElementsByTagName("form")[0].setAttribute("target", qrbid + "iframe");
	}
	insertAfter(quickReplyBox, atElement);
	
	// Set resto
	firstinput = quickReplyBox.getElementsByTagName("input")[0];
	var resto_input = document.createElement("input");
	resto_input.name = "resto";
	resto_input.value = resto;
	resto_input.type = "hidden";
	insertAfter(resto_input, firstinput);
	
	autoFillPostBox(quickReplyBox);
	
	return quickReplyBox;
}

function quickReplyQuote(resto, postid, atElement) {
	qrb = quickReplyBox(resto, atElement);
	var items = qrb.getElementsByTagName("textarea");
	for (var i=0; i < items.length; i++) {
		if (items[i].value != "") {
			items[i].value = ">>" + postid + "\n\n" + items[i].value;
		} else { 
			items[i].value = ">>" + postid + "\n";
		}
	}
}

function replaceRefLinksWithQuickReply(searchElement, resto_override) {
	if (enable_quickreply || enable_report || enable_sage) {
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
				if (items[i].innerText.search("X") != -1) {
					items[i].innerText = postid;
				}
			} else if (items[i].className == "quotejs") {
				var m = items[i].href.match(/[.*]?res\/([0-9]+)(?:\.html)?\#q([0-9]+)/i);
				if (m != null) {
					resto = m[1];
					postid = m[2];
					if (items[i].innerText.search("X") != -1) {
						items[i].innerText = postid;
					}
				}
			}
			if (enable_quickreply && postid && resto && items[i].href != "javascript:return false;") {
				items[i].setAttribute("postID", postid);
				items[i].setAttribute("threadID", resto);
				items[i].setAttribute("thisElement", items[i]);
				items[i].setAttribute("isQuickReply", "true");
				if (enable_quickreply) {
					items[i].addEventListener("click", function() {
						quickReplyQuote(this.getAttribute("threadID"), this.getAttribute("postID"), this.parentNode);
					}, false);
				}
				items[i].href = "javascript:false;"
			}
			if (enable_report && postid && items[i].getAttribute("processed") == null) {
				var m2 = document.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
				if (m2) {
					var report = document.createElement("a");
					report.href = "javascript:reppop('http://sys.4chan.org/" + m2[1] + "/imgboard.php?mode=report&no=" + postid + "');return false;";
					report.style.textDecoration = "none";
					report.innerHTML = ' <img border="0" src="data:image/png;base64,' + base64_report + '" title="Report Post">';
					insertAfter(report, items[i]);
				}
				items[i].setAttribute("processed", "true");
			}
			if (enable_sage && items[i].href.toLowerCase() == "mailto:sage" && items[i].getAttribute("processed") == null) {
				items[i].innerHTML = "&nbsp;" + items[i].innerHTML + "&nbsp;";
				items[i].style.textDecoration = "none";
				items[i].style.background = "url('" + chrome.extension.getURL("sage.png") + "')";
				items[i].style.backgroundRepeat = "repeat";
				items[i].setAttribute("processed", "true");
			}
		}
	}
}

function setExpandImageAttributes(a) {
	if (enable_expandimages) {
		var m = a.href.match(/.*images\.4chan\.org\/.*\/src\/(.*)/i);
		if (m == null) {
			m = a.href.match(/.*4chanarchive\.org\/images\/(.*)/i);
		}
		if (m == null) {
			m = a.href.match(/.*inb4\.im\/.*\/src\/(.*)/i);
		}
		if (m) {
			if (a.innerHTML.substring(0, 4) == "<img") {
				if (a.getAttribute("expanded") == null) {
					a.setAttribute("expanded", "false");
					a.setAttribute("expandImage", expandImage);
					a.setAttribute("expandOriginalHTML", a.innerHTML);
					a.setAttribute("onClick", "javascript:return false;");
					img = a.getElementsByTagName("img")[0];
					a.setAttribute("thumbSRC", img.getAttribute("src"));
					a.setAttribute("thumbWidth", img.getAttribute("width"));
					a.setAttribute("thumbHeight", img.getAttribute("height"));
					a.target = "_self";
					a.addEventListener("click", function(e) {;
						if (e.which == 2) {
							window.open(this.getAttribute("expandImage"), '_blank');
						} else if (e.which == 1) {
							if (this.getAttribute("expanded") != "true") {
								this.innerHTML = '<img style=border: 1px dashed black;min-width: ' + this.getAttribute("thumbWidth") + 'px;min-height: ' + this.getAttribute("thumbHeight") + 'px;" src="' + this.getAttribute("expandImage") + '" border="0" align="left" hspace="20">';
								this.setAttribute("expanded", "true");
							} else {
								this.innerHTML = this.getAttribute("expandOriginalHTML")
								this.setAttribute("expanded", "false");
							}
						}
					}, false);
					
					if (expand_all_thumbs) {
						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						a.dispatchEvent(evt);
					}
				}
			} else {
				expandImage = a.href;
			}
		}
	}
}

function setPostAttributes(element, setExpand) {
	var items = element.getElementsByTagName('a');
	var expandImage;
	for(var j=0; j < items.length; j++) {
		var m = items[j].href.match(/.*\/[0-9]+(?:\.html)?#([0-9]+)/i);
		if (m == null) {
			var m = items[j].href.match(/\#([0-9]+)/i);
		}
		if (m != null) {
			if (items[j].innerHTML == "No.") {
				element.setAttribute("postID", m[1]);
				element.className = "4c4c_reply";
			} else if (enable_preview && items[j].getAttribute("refID") == null) {
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
							
							if (window.location.href.search("4chan.org") == -1) {
								var items2 = document.getElementsByTagName("table");
							} else {
								var items2 = document.getElementsByClassName("4c4c_reply");
							}
							for (var i=0; i < items2.length; i++) {
								var postid = items2[i].getAttribute("postID");
								if (postid && postid == this.getAttribute("refID")) {
									preview.innerHTML = items2[i].innerHTML;
									if (items2[i].getAttribute("op") == "true") {
										preview.className = "postblock";
										preview.innerHTML = '<div style="position: absolute;right: 0px;top: 0px;font-size: 1.5em;margin: 0px;padding: 1px;" class="unkfunc">OP</div>' + preview.innerHTML;
									}
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
		} else if (setExpand) {
			setExpandImageAttributes(items[j]);
		}
	}
}

function processExpandTables(replies, replies_temp, threadID, spacer, omittedposts, items, tables) {
	if (!tables) {
		tables = [];
	}
	if (items && items.length > 0) {
		var table = items.shift();
		if (table.width != "100%" && table.cellpadding != "0" && table.align != "right") {
			replies.innerHTML += "<table>" + table.innerHTML + "</table>";
		}
	}
	if (items && items.length > 0) {
		setTimeout(processExpandTables, 1, replies, replies_temp, threadID, spacer, omittedposts, items, tables);
	} else {
		processExpandTablesFinish(replies, replies_temp, threadID, spacer, omittedposts, tables);
	}
}

function processExpandTablesFinish(replies, replies_temp, threadID, spacer, omittedposts, tables) {
	var delform = replies_temp.getElementsByTagName("form")[1];
	replies_temp.style.display = "none";
	
	var items2 = document.getElementsByClassName("4c4c_reply");
	for (var i=0; i < items2.length; i++) {
		if (items2[i].getAttribute("threadID") == threadID) {
			items2[i].style.display = "none";
		}
	}
	
	var items2 = replies.getElementsByTagName("table");
	for (var i=0; i < items2.length; i++) {
		setPostAttributes(items2[i], true);
	}
	
	replaceRefLinksWithQuickReply(replies, threadID);
	
	var items2 = document.getElementsByTagName("span");
	for (var i=0; i < items2.length; i++) {
		if (items2[i].id == "omittedposts" + threadID) {
			insertAfter(replies, items2[i]);
		}
	}
	
	spacer.innerHTML = '<img border="0" src="data:image/png;base64,' + base64_minus + '" title="Retract">&nbsp;';
	omittedposts.innerHTML = "Thread No." + threadID + " expanded.";
}

function processExpand(replies, replies_temp, threadID, spacer, omittedposts) {
	var delform = replies_temp.getElementsByTagName("form")[1];
	var items = delform.getElementsByTagName("table");
	var tables = [];
	for (var j=0; j < items.length; j++) {
		tables.push(items[j]);
	}
	replies.id = "replies" + threadID;
	processExpandTables(replies, replies_temp, threadID, spacer, omittedposts, tables);
}

function autoFillPostBox(element) {
	if (!element) {
		element = document;
	}
	if (default_name == null || default_email == null || default_subject == null || default_comment == null || default_password == null) {
		setTimeout(autoFillPostBox, 10, element);
	} else {
		var items3 = element.getElementsByTagName("input");
		for (var j=0; j < items3.length; j++) {
			if (items3[j].name == "name") {
				if (default_name != "") {
					items3[j].value = default_name;
				}
			} else if (items3[j].name == "email") {
				if (default_email != "") {
					items3[j].value = default_email;
				}
			} else if (items3[j].name == "sub") {
				if (default_subject != "") {
					items3[j].value = default_subject;
				}
			} else if (items3[j].name == "pwd") {
				if (default_password != "") {
					items3[j].value = default_password;
				}
			}
		}
		var items3 = element.getElementsByTagName("textarea");
		for (var j=0; j < items3.length; j++) {
			if (items3[j].name == "com") {
				if (items3[j].value == "" && default_comment != "") {
					items3[j].value = default_comment;
				}
			}
		}
	}
}

function processLatestRepliesLoop(replies, lastmodified) {
	var reply = false;
	if (replies && replies.length > 0) {
		reply = replies.shift();
		
		if (reply.getAttribute("special") != null || (reply.getAttribute("postID") > lastreply.getAttribute("postID"))) {
			replaceRefLinksWithQuickReply(reply);
			insertAfter(reply, lastreply);
			lastreply = reply;
			lastreplyid = lastreply.getAttribute("postID");
		}
	}
	if (replies && replies.length > 0) {
		setTimeout(processLatestRepliesLoop, 10, replies, lastmodified);
	} else {
		last_modified = lastmodified;
	}
}

function processFetchedReplies(replies, lastmodified) {
	if (!lastreply) {
		var items2 = document.forms[1].getElementsByClassName("4c4c_reply");
		for (var j=0; j < items2.length; j++) {
			if (items2[j].getAttribute("postID") != null && items2[j].getAttribute("op") == null) {
				lastreply = items2[j];
				lastreplyid = lastreply.getAttribute("postID");
			}
		}
	}
	if (!lastreply) {
		lastreply = document.forms[1].getElementsByTagName("blockquote")[0];
	}
	
	processLatestRepliesLoop(replies, lastmodified);
}

function fetchLatestPosts() {
	var threadID = false;
	var m = window.location.href.match(/.*\/res\/([0-9]+).*/i);
	if (m != null) {
		threadID = m[1];
	}
	
	if (threadID) {
		var client = new XMLHttpRequest();
		client.open("HEAD", threadID, true);
		client.send();
		client.threadID = threadID;
		client.onreadystatechange = function() {
			if (client.readyState == 4) {
				if (last_modified && (client.status == 404 || client.getResponseHeader("Last-Modified") != last_modified)) {
					var client2 = new XMLHttpRequest();
					client2.open("GET", client.threadID, true);
					client2.send();
					client2.threadID = client.threadID;
					client2.onreadystatechange = function() {
						var replies = [];
						replies.length = 0;
						if (client2.status == 404) {
							if (document.forms[1].getAttribute("has404d") == "false") {
								document.forms[1].setAttribute("has404d", "true");
								var reply_404 = document.createElement("span");
								reply_404.setAttribute("special", "true");
								reply_404.innerHTML = "This thread has 404'd";
								reply_404.style.color = "red";
								reply_404.style.fontSize = "2.0em";
								replies.push(reply_404);
							}
						} else if (client2.status == 200) {
							var replies_temp = document.createElement("span");
							replies_temp.innerHTML = client2.responseText;
							var items = replies_temp.getElementsByTagName("table");
							for (var i=0; i < items.length; i++) {
								setPostAttributes(items[i], true);
								if (items[i].getAttribute("postID") != null) {
									/*var found = false;
									var items2 = document.forms[1].getElementsByClassName("4c4c_reply");
									for (var j=0; j < items2.length; j++) {
										if (items2[j].getAttribute("postID") != null) {
											if (items[i].getAttribute("postID") == items2[j].getAttribute("postID")) {
												found = true;
											}
										}
									}
									if (!found) {
										replies.push(items[i]);
									}*/
									if (items[i].getAttribute("postID") > lastreplyid) {
										replies.push(items[i]);
									}
								}
							}
						}
						if (replies.length > 0) {
							last_modified = false;
							processFetchedReplies(replies, client2.getResponseHeader("Last-Modified"));
						}
					}
				};
			}
		};
		
		if (document.forms[1].getAttribute("has404d") == "false") {
			setTimeout('fetchLatestPosts()', 10000);
		}
	}
}

var postarea;
var threads = [];
var lastreply = false;
var lastreplyid = 0;
var last_modified = document.lastModified;
var created_op_preview = false;
var expand_all_thumbs = false;
var enable_quickreply = null;
var enable_quickreplyiframe = null;
var enable_expand = null;
var enable_expandimages = null;
var enable_preview = null;
var enable_fetchreplies = null;
var enable_autonoko = null;
var enable_returntotop = null;
var enable_sage = null;
var enable_report = null;
var default_name = null;
var default_email = null;
var default_subject = null;
var default_comment = null;
var default_password = null;
chrome.extension.sendRequest({reqtype: "get-quickreply"}, function(response) {
	enable_quickreply = response;
});
chrome.extension.sendRequest({reqtype: "get-quickreplyiframe"}, function(response) {
	enable_quickreplyiframe = response;
});
chrome.extension.sendRequest({reqtype: "get-expand"}, function(response) {
	enable_expand = response;
});
chrome.extension.sendRequest({reqtype: "get-expandimages"}, function(response) {
	enable_expandimages = response;
});
chrome.extension.sendRequest({reqtype: "get-preview"}, function(response) {
	enable_preview = response;
});
chrome.extension.sendRequest({reqtype: "get-fetchreplies"}, function(response) {
	enable_fetchreplies = response;
});
chrome.extension.sendRequest({reqtype: "get-autonoko"}, function(response) {
	enable_autonoko = response;
});
chrome.extension.sendRequest({reqtype: "get-sage"}, function(response) {
	enable_sage = response;
});
chrome.extension.sendRequest({reqtype: "get-report"}, function(response) {
	enable_report = response;
});
chrome.extension.sendRequest({reqtype: "get-returntotop"}, function(response) {
	enable_returntotop = response;
});
chrome.extension.sendRequest({reqtype: "get-default-name"}, function(response) {
	default_name = response;
});
chrome.extension.sendRequest({reqtype: "get-default-email"}, function(response) {
	default_email = response;
});
chrome.extension.sendRequest({reqtype: "get-default-subject"}, function(response) {
	default_subject = response;
});
chrome.extension.sendRequest({reqtype: "get-default-comment"}, function(response) {
	default_comment = response;
});
chrome.extension.sendRequest({reqtype: "get-default-password"}, function(response) {
	default_password = response;
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.reqtype == "expandall") {
		expand_all_thumbs = true;
		var items = document.getElementsByTagName("a");
		for(var i=0; i < items.length; i++) {
			if (items[i].getAttribute("expanded") != null) {
				if (items[i].getAttribute("expanded") == "false") {
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					items[i].dispatchEvent(evt);
				}
			}
		}
	} else if (request.reqtype == "visiturl") {
		window.location.href = request.url;
	}
});

function init4chan4chrome(element) {
	if (enable_quickreply == null || enable_quickreplyiframe == null || enable_expand == null || enable_expandimages == null || enable_preview == null || enable_fetchreplies == null || enable_autonoko == null || enable_sage == null || enable_report == null || enable_returntotop == null) {
		setTimeout('init4chan4chrome()', 10);
	} else if (document.forms.length > 0) {
		var processPage = false;
		if (!element) {
			element = document;
			processPage = true;
		}
		var items = element.getElementsByTagName('a');
		for (var i=0; i < items.length; i++) {
			if (items[i].innerHTML == "Reply" && enable_quickreply) {
				var m = items[i].href.match(/.*\/([0-9]+)(?:\.html)?/i);
				if (m != null) {
					var threadID = m[1];
					var quickReply = document.createElement("a");
					quickReply.href = "#";
					quickReply.innerHTML = '<img border="0" src="data:image/png;base64,' + base64_quickreply + '" title="Quick Reply">';
					quickReply.setAttribute("onclick", 'return false;');
					quickReply.setAttribute("threadID", threadID);
					quickReply.addEventListener("click", function() {
						var items2 = element.getElementsByTagName("input");
						for (var i=0; i < items2.length; i++) {
							if (items2[i].name.search(this.getAttribute("threadID")) != -1) {
								quickReplyBox(this.getAttribute("threadID"), items2[i]);
							}
						}
					}, false);
					
					items[i].parentNode.innerHTML += '<span id="spacer' + threadID + '">&nbsp;</span>';
					var spacer = element.getElementById("spacer" + threadID);
					insertAfter(quickReply, spacer);
				}
			} else if (items[i].innerHTML == "No.") {
				var m = items[i].href.match(/.*\/([0-9]+)(?:\.html)?\#([0-9]+)/i);
				if (m != null) {
					if (m[1] == m[2]) {
						items[i].name = m[1];
					}
				}
			} else {
				setExpandImageAttributes(items[i]);
			}
		}
		
		if (document.forms.delform) {
			var delform = document.forms[1];
		} else {
			var delform = document.body;
		}
		if (processPage && delform) {
			if (enable_autonoko) {
				var m = window.location.href.match(/(^.*)\/res\/[0-9]+.*/i);
				if (m == null) {
					var m = window.location.href.match(/(^.*)\//i);
				}
				if (m != null) {
					document.forms[0].action += "#return=" + encodeURI(m[1]);
				}
			}
			
			var items = document.getElementsByTagName('div');
			for(var i=0; i < items.length; i++) {
				if (items[i].className == "postarea") {
					postarea = items[i].innerHTML;
					autoFillPostBox(document);
				}
			}
		
			var nodes = delform.childNodes;
			
			lastnode = null;
			threadID = null;
			lastreply = null;
			
			for (var i=0; i < nodes.length; i++) {
				node = nodes[i];
				
				if (!threadID && node.nodeName.toLowerCase() == "input" && node.type == "checkbox") {
					threadID = node.name;
				}
				
				if (node.nodeName.toLowerCase() == "table" && !node.getAttribute("align")) {
					if (window.location.href.search("4chan.org") == -1) {
						var items = node.getElementsByTagName("input");
						for(var j=0; j < items.length; j++) {
							if (items[j].type == "checkbox") {
								node.setAttribute("postID", items[j].name);
							}
						}
					}
					node.setAttribute("threadID", threadID);
					replaceRefLinksWithQuickReply(node, threadID);
					setPostAttributes(node);
					lastreply = node;
					lastreplyid = node.getAttribute("postID");
				}
				
				if (node.className && node.className.toLowerCase() == "omittedposts" && enable_expand) {
					var expand = document.createElement("a");
					expand.style.textDecoration = "none";
					expand.innerHTML = '<img border="0" src="data:image/png;base64,' + base64_expand + '" title="Expand Thread">&nbsp;';
					expand.href = "#";
					expand.setAttribute("onClick", 'javascript:return false;');
					expand.setAttribute("threadID", threadID);
					
					node.innerHTML = '<span id="spacer2' + threadID + '"></span><span id="omittedposts' + threadID + '">' + node.innerHTML + '</span>';
					var spacer = document.getElementById("spacer2" + threadID);
					spacer.insertBefore(expand);
					var omittedposts = document.getElementById("omittedposts" + threadID);
					
					node.setAttribute("threadID", threadID);
					spacer.setAttribute("threadID", threadID);
					spacer.setAttribute("expanded", "false");
					
					spacer.addEventListener("click", function() {
						var omittedposts = document.getElementById("omittedposts" + this.getAttribute("threadID"));
						if (this.getAttribute("expanded") == "true") {
							document.getElementById("replies" + this.getAttribute("threadID")).parentNode.removeChild(document.getElementById("replies" + this.getAttribute("threadID")));
							this.innerHTML = this.getAttribute("retracthtml");
							omittedposts.innerHTML = "Thread No." + this.getAttribute("threadID") + " retracted.<br clear=\"left\">";
							this.setAttribute("expanded", "false");
						} else {
							this.setAttribute("retracthtml", this.innerHTML);
							omittedposts.innerHTML = "Thread No." + this.getAttribute("threadID") + " expanding...";
							this.style.textDecoration = "none";
							this.style.color = "#000000";
							this.style.fontWeight = "bold";
							this.innerHTML = '<img border="0" src="data:image/png;base64,' + base64_expandwait + '" title="Expanding...">&nbsp;';
							var client = new XMLHttpRequest();
							client.open("GET", "res/" + this.getAttribute("threadID"), true);
							client.send();
							client.threadID = this.getAttribute("threadID");
							client.spacer = this;
							client.omittedposts = omittedposts;
							client.onreadystatechange = function() {
								if (client.readyState == 4) {
									if (client.status == 200) {
										this.spacer.setAttribute("expanded", "true");
										var replies = document.createElement("span");
										var replies_temp = document.createElement("span");
										replies_temp.innerHTML = client.responseText;
										processExpand(replies, replies_temp, this.threadID, this.spacer, this.omittedposts);
									} else if (client.status == 404) {
										this.omittedposts.innerHTML = "Thread No." + this.threadID + " has 404'd.";
									}
								}
							};
						}
					}, false);
				}
				
				if (node.nodeName.toLowerCase() == "hr" && lastnode && lastnode.nodeName.toLowerCase() == "br") {
					threadID = null;
				}
				lastnode = node;
			}
			
			var items = delform.innerHTML.split('<br clear="left"><hr>');
			
			if (!created_op_preview) {
				for (var i=0; i < items.length; i++) {
					var m = items[i].match(/.*\<input type\=\"checkbox\" name\=\"([0-9]+)\".*/i);
					if (m != null) {
						var table = document.createElement("table");
						table.innerHTML = items[i].split("</blockquote>")[0] + "</blockquote>";
						var hr_split = table.innerHTML.split("<hr>");
						if (hr_split.length > 0) {
							table.innerHTML = hr_split.pop();
						}
						table.className = "4c4c_reply";
						table.setAttribute("postID", m[1]);
						table.setAttribute("op", "true");
						table.style.display = "none";
						delform.appendChild(table);
					}
				}
				created_op_preview = true;
			}
			
			if (enable_fetchreplies) {
				var m = window.location.href.match(/.*\/res\/[0-9]+.*/i);
				if (m != null) {
					if (delform.getAttribute("has404d") == null) {
						delform.setAttribute("has404d", "false");
						setTimeout('fetchLatestPosts()', 10000);
					}
				}
				enable_fetchreplies = false;
			}
			
			replaceRefLinksWithQuickReply(element, null);
			
			if (enable_returntotop) {
				var m = window.location.href.match(/.*\/res\/[0-9]+.*/i);
				if (window.location.href.search("4chan.org") != -1 && m && lastreply) {
					var returntotop = document.createElement("table");
					returntotop.className = "reply";
					returntotop.style.marginTop = "1em";
					returntotop.innerHTML = '<tr onclick="self.scrollTo(0,0);" style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">Return to Top</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>';
					insertAfter(returntotop, lastreply);
				}
			}
		}
	}
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

if (document.forms.length == 0) {
	var m = window.location.href.match(/http\:\/\/.*\.4chan\.org\/.*\#return\=(.*)/i);
	if (m != null) {
		if (document.body.innerHTML.search("<\!-- thread\:") > -1 && document.body.innerHTML.search("<\!-- thread\:") < 500) {
			var m2 = document.body.innerHTML.match(/\.*<\!-- thread\:([0-9]+),no\:([0-9]+) --\>.*/i);
			if (m2 != null) {
				if (m2[1] == 0) {
					m2[1] = m2[2];
				}
				window.location = decodeURI(m[1]) + "/res/" + m2[1] + "#" + m2[2];
			}
		}
	}
}

setTimeout('init4chan4chrome()', 10);