function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;

	//if the parents lastchild is the targetElement...
	if (parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
	} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function getElementsByAttribute(attrN, attrV) {
    var nodes = [];
    var elems = document.getElementsByTagName('*');

    for (var i = 0; i < elems.length; i += 1) {
        if (elems[i].hasAttribute(attrN) && elems[i].getAttribute(attrN) == attrV) {
            nodes.push(elems[i]);
        }
    }
    return nodes;
}

function watchThread(threadarray) {
	chrome.extension.sendRequest({'reqtype': 'get-watchedthreads'}, function(response) {
		watchedthreads = response;

		var alreadyexists = false;
		for (var i = 0; i < watchedthreads.length; i++) {
			if (watchedthreads[i][0] == threadarray[0] && watchedthreads[i][1] == threadarray[1]) {
				alreadyexists = true;
			}
		}

		if (alreadyexists) {
			alert('Thread No.' + threadarray[1] + ' is already being watched.');
		} else {
			watchedthreads.push(threadarray);
			storeWatchedThreads();
			alert('Added thread No.' + threadarray[1] + ' to watch list.');
		}

		refreshThreadWatcher();
	});
}

/**
 * Remove a thread from the watched threads list
 * @param {string} board Directory of the current board e.g. b, gif, g.
 * @param {number} threadid ID of the thread to remove.
 */
function unwatchThread(board, threadid) {
	chrome.extension.sendRequest({'reqtype': 'get-watchedthreads'}, function(response) {
		watchedthreads = response;

		for (var i = 0; i < watchedthreads.length; i++) {
			if (watchedthreads[i][0] == board && watchedthreads[i][1] == threadid) {
				watchedthreads.splice(i, 1);
			}
		}

		storeWatchedThreads();
		refreshThreadWatcher();
	});
}

function storeWatchedThreads() {
	chrome.extension.sendRequest({'reqtype': 'set-watchedthreads', 'watchedthreads': watchedthreads});
}

/**
 * Change user note for a watched thread
 * @param {string} note User note.
 * @param {string} board Directory of the current board e.g. b, gif, g.
 * @param {number} threadid ID of the thread to remove.
 */
function updateWatchedThreadNote(note, board, threadid) {
	chrome.extension.sendRequest({'reqtype': 'get-watchedthreads'}, function(response) {
		watchedthreads = response;

		var alreadyexists = false;
		for (var i = 0; i < watchedthreads.length; i++) {
			if (watchedthreads[i][0] == board && watchedthreads[i][1] == threadid) {
				watchedthreads[i][4] = note.replace('"', '').replace('<', '').replace('>', '');
			}
		}

		storeWatchedThreads();
	});
}

function refreshThreadWatcherCache() {
	chrome.extension.sendRequest({'reqtype': 'get-watchedthreads'}, function(response) {
		watchedthreads = response;
		refreshThreadWatcher();
	});
}

function refreshThreadWatcher() {
	var m = window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
	if (m != null) {
		var thisboard = m[1];
		watchboxtable = document.getElementById('watchboxtable');
		watchboxtable.innerHTML = '<tr><td class="postblock" style="border-right: 0px none;">No.</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">Subject</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">Author</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">Note</td><td class="postblock" style="border-left: 0px none;">&nbsp;</td></tr>';

		var watchedthreads_thisboard = [];
		for (var i = 0; i < watchedthreads.length; i++) {
			if (watchedthreads[i][0] == thisboard) {
				watchedthreads_thisboard.push(watchedthreads[i]);
			}
		}

		if (watchedthreads_thisboard.length == 0) {
			var wbrow = document.createElement('tr');
			wbrow.innerHTML = '<td colspan="5" align="center">No watched threads.</td>';
			watchboxtable.appendChild(wbrow);
		} else {
			for (var i = 0; i < watchedthreads_thisboard.length; i++) {
				var wbrow = document.createElement('tr');
				wbrow.innerHTML = '<td style="padding-left: 3px;padding-right: 3px;">' + watchedthreads_thisboard[i][1] + '</td><td class="filetitle" style="padding-left: 3px;padding-right: 3px;">' + watchedthreads_thisboard[i][2] + '</td><td class="postername" style="padding-left: 3px;padding-right: 3px;">' + watchedthreads_thisboard[i][3] + '</td><td style="padding-left: 3px;padding-right: 3px;"><input type="text" placeholder="Enter a note" size="12" value="' + watchedthreads_thisboard[i][4] + '" id="note' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1] + '"></td><td style="padding-left: 3px;padding-right: 3px;"><small>[<a href="/' + watchedthreads_thisboard[i][0] + '/res/' + watchedthreads_thisboard[i][1] + '">view</a>] [<a href="#" id="delete' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1] + '">delete</a>]</small></td>';
				watchboxtable.appendChild(wbrow);

				var note = document.getElementById('note' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1]);
				note.setAttribute('board', watchedthreads_thisboard[i][0]);
				note.setAttribute('threadid', watchedthreads_thisboard[i][1]);
				note.onchange = function(event) {
					updateWatchedThreadNote(this.value, this.getAttribute('board'), this.getAttribute('threadid'));
				};
				note.onkeyup = function(event) {
					updateWatchedThreadNote(this.value, this.getAttribute('board'), this.getAttribute('threadid'));
				};

				var deletethread = document.getElementById('delete' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1]);
				deletethread.setAttribute('board', watchedthreads_thisboard[i][0]);
				deletethread.setAttribute('threadid', watchedthreads_thisboard[i][1]);
				deletethread.addEventListener('click', function() {
					var confirm = window.confirm('Stop watching thread No.' + this.getAttribute('threadid') + '?');
					if (confirm) {
						unwatchThread(this.getAttribute('board'), this.getAttribute('threadid'));
					}
				}, false);
			}
		}
	}
}

function hideThread(threadid) {
	chrome.extension.sendRequest({'reqtype': 'get-hiddenthreads'}, function(response) {
		hiddenthreads = response;

		var m = window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
		if (m != null) {
			var alreadyexists = false;
			for (var i = 0; i < hiddenthreads.length; i++) {
				if (hiddenthreads[i][0] == m[1] && hiddenthreads[i][1] == threadid) {
					alreadyexists = true;
				}
			}

			if (!alreadyexists) {
				hiddenthreads.push([m[1], threadid]);
				storeHiddenThreads();
			}
		}
	});
}

function unhideThread(threadid) {
	chrome.extension.sendRequest({'reqtype': 'get-hiddenthreads'}, function(response) {
		hiddenthreads = response;

		var m = window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
		if (m != null) {
			for (var i = 0; i < hiddenthreads.length; i++) {
				if (hiddenthreads[i][0] == m[1] && hiddenthreads[i][1] == threadid) {
					hiddenthreads.splice(i, 1);
				}
			}

			storeHiddenThreads();
		}
	});
}

function storeHiddenThreads() {
	chrome.extension.sendRequest({'reqtype': 'set-hiddenthreads', 'hiddenthreads': hiddenthreads});
}

function checkQuickReplyBoxSubmitted(qrbid) {
	var qrb = document.getElementById(qrbid);
	var qrb_iframe = qrb.getElementsByTagName('iframe')[0];
	if (qrb_iframe.src.search('Updating page.') != -1) {
		closeQuickReplyBox(qrbid);
	} else {
		setTimeout(checkQuickReplyBoxSubmitted, 200, qrbid);
	}
}

function closeQuickReplyBox(qrbid) {
	var qrb = document.getElementById(qrbid);
	qrb.parentNode.removeChild(qrb);
}

function quickReplyBox(resto, atElement) {
	var quickReplyBox = document.createElement('div');
	var qrbid = 'qr' + Math.floor(Math.random() * 1000);
	quickReplyBox.id = qrbid;
	quickReplyBox.style.borderTop = '0px none';
	quickReplyBox.style.borderBottom = '1px solid #CCCCCC';
	quickReplyBox.style.borderLeft = '1px solid #CCCCCC';
	quickReplyBox.style.borderRight = '1px solid #CCCCCC';
	quickReplyBox.innerHTML = '<span title="Close" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" onclick="javascript:var qr=document.getElementById(\'' + qrbid + '\');qr.parentNode.removeChild(qr);return false;">&nbsp;X&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 10px;" class="postblock">Quick Reply (#' + resto + ')</div>' + postarea;
	if (enable_quickreplyiframe) {
		quickReplyBox.innerHTML += '<iframe id="' + qrbid + 'iframe" src="about:blank" style="display: none;min-width:100px;height:50px;margin:0px;padding:0px;"></iframe>';
	}
	quickReplyBox.className = 'reply';
	quickReplyBox.style.margin = '0';
	quickReplyBox.style.padding = '0';
	quickReplyBox.style.position = 'absolute';
	var offsetLeft = atElement.offsetLeft;
	var offsetTop = atElement.offsetTop;
	var obj = atElement;
	while (obj.offsetParent) {
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
	var items3 = quickReplyBox.getElementsByTagName('table');
	for (var j = 0; j < items3.length; j++) {
		if (items3[j].width == '100%') {
			items3[j].parentNode.removeChild(items3[j]);
		}
	}
	var items3 = quickReplyBox.getElementsByTagName('div');
	for (var j = 0; j < items3.length; j++) {
		if ((items3[j].className != 'postblock') && (items3[j].id != 'recaptcha_area') && (items3[j].id != 'recaptcha_image') && (items3[j].innerHTML.indexOf('recaptcha') == -1)) {
			items3[j].parentNode.removeChild(items3[j]);
		}
	}
	var items3 = quickReplyBox.getElementsByTagName('tr');
	for (var j = 0; j < items3.length; j++) {
		if (items3[j].innerHTML == '<td></td><td colspan=\"2\">\n</td>') {
			items3[j].parentNode.removeChild(items3[j]);
		}
	}
	if (enable_quickreplyiframe) {
		quickReplyBox.getElementsByTagName('form')[0].id = qrbid + 'form';
		if (quickReplyBox.getElementsByTagName('form')[0].action.search('#') != -1) {
			quickReplyBox.getElementsByTagName('form')[0].action = quickReplyBox.getElementsByTagName('form')[0].action.split('#')[0];
		}
		var items3 = quickReplyBox.getElementsByTagName('input');
		for (var j = 0; j < items3.length; j++) {
			if (items3[j].value == 'Submit') {
				items3[j].setAttribute('submitted', 'false');
				items3[j].setAttribute('qrbid', qrbid);
				items3[j].addEventListener('click', function() {
					document.getElementById(this.getAttribute('qrbid') + 'iframe').style.display = 'block';
					document.getElementById(this.getAttribute('qrbid') + 'form').submit();
					/*if (this.getAttribute("submitted") == "false") {
						setTimeout(checkQuickReplyBoxSubmitted, 200, qrbid);
						this.setAttribute("submitted", "true");
					}*/
				}, false);
			}
		}
		quickReplyBox.getElementsByTagName('form')[0].setAttribute('target', qrbid + 'iframe');
	}
	insertAfter(quickReplyBox, atElement);

	// Set resto
	firstinput = quickReplyBox.getElementsByTagName('input')[0];
	var resto_input = document.createElement('input');
	resto_input.name = 'resto';
	resto_input.value = resto;
	resto_input.type = 'hidden';
	insertAfter(resto_input, firstinput);

	autoFillPostBox(quickReplyBox);

	return quickReplyBox;
}

function quickReplyQuote(resto, postid, atElement) {
	qrb = quickReplyBox(resto, atElement);
	var items = qrb.getElementsByTagName('textarea');
	for (var i = 0; i < items.length; i++) {
		if (items[i].value != '') {
			items[i].value = '>>' + postid + '\n\n' + items[i].value;
		} else {
			items[i].value = '>>' + postid + '\n';
		}
	}
}

function replaceRefLinksWithQuickReply(searchElement, resto_override) {
	if (enable_quickreply || enable_report || enable_sage) {
		if (!searchElement) {
			searchElement = document;
		}
		var items = searchElement.getElementsByTagName('a');
		for (var i = 0; i < items.length; i++) {
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
				if (items[i].textContent.search('X') != -1) {
					items[i].textContent = postid;
				}
			} else if (items[i].className == 'quotejs') {
				var m = items[i].href.match(/[.*]?res\/([0-9]+)(?:\.html)?\#q([0-9]+)/i);
				if (m != null) {
					resto = m[1];
					postid = m[2];
					if (items[i].textContent.search('X') != -1) {
						items[i].textContent = postid;
					}
				}
			}
			if (enable_quickreply && postid && resto && items[i].href != 'javascript:return false;') {
				items[i].setAttribute('postID', postid);
				items[i].setAttribute('threadID', resto);
				items[i].setAttribute('thisElement', items[i]);
				items[i].setAttribute('isQuickReply', 'true');
				if (enable_quickreply) {
					items[i].addEventListener('click', function() {
						quickReplyQuote(this.getAttribute('threadID'), this.getAttribute('postID'), this.parentNode);
					}, false);
				}
				items[i].href = 'javascript:false;';
			}
			if (enable_report && postid && items[i].getAttribute('processed') == null) {
				var m2 = document.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
				if (m2) {
					var report = document.createElement('a');
					report.href = "javascript:reppop('http://sys.4chan.org/" + m2[1] + '/imgboard.php?mode=report&no=' + postid + "');return false;";
					report.style.textDecoration = 'none';
					report.innerHTML = ' <img border="0" src="' + chrome.extension.getURL('button_report.png') + '" title="Report Post">';
					insertAfter(report, items[i]);
				}
				items[i].setAttribute('processed', 'true');
			}
			if (enable_sage && items[i].href.toLowerCase() == 'mailto:sage' && items[i].getAttribute('processed') == null) {
				items[i].innerHTML = '&nbsp;' + items[i].innerHTML + '&nbsp;';
				items[i].style.textDecoration = 'none';
				items[i].style.background = "url('" + chrome.extension.getURL('sage.png') + "')";
				items[i].style.backgroundRepeat = 'repeat';
				items[i].setAttribute('processed', 'true');
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
			if (a.innerHTML.substring(0, 4) == '<img') {
				if (a.getAttribute('expanded') == null) {
					a.setAttribute('expanded', 'false');
					a.setAttribute('expandImage', expandImage);
					a.setAttribute('expandOriginalHTML', a.innerHTML);
					a.setAttribute('onClick', 'javascript:return false;');
					img = a.getElementsByTagName('img')[0];
					a.setAttribute('thumbSRC', img.getAttribute('src'));
					a.setAttribute('thumbWidth', img.getAttribute('width'));
					a.setAttribute('thumbHeight', img.getAttribute('height'));
					a.target = '_self';
					a.addEventListener('click', function(e) {;
						if (e.which == 2) {
							window.open(this.getAttribute('expandImage'), '_blank');
						} else if (e.which == 1) {
							if (this.getAttribute('expanded') != 'true') {
								this.innerHTML = '<img style="border: 1px dashed black;min-width: ' + this.getAttribute('thumbWidth') + 'px;min-height: ' + this.getAttribute('thumbHeight') + 'px;" src="' + this.getAttribute('expandImage') + '" border="0" align="left" hspace="20">';
								this.setAttribute('expanded', 'true');
							} else {
								this.innerHTML = this.getAttribute('expandOriginalHTML');
								this.setAttribute('expanded', 'false');
							}
						}
					}, false);

					if (expand_all_thumbs) {
						var evt = document.createEvent('MouseEvents');
						evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
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
	for (var j = 0; j < items.length; j++) {
		var m = items[j].href.match(/.*\/[0-9]+(?:\.html)?#([0-9]+)/i);
		if (m == null) {
			var m = items[j].href.match(/\#([0-9]+)/i);
		}
		if (m != null) {
			if (items[j].innerHTML == 'No.') {
				element.setAttribute('postID', m[1]);
				element.className = '4c4c_reply';
			} else if (enable_preview && items[j].getAttribute('refID') == null) {
				var m2 = items[j].innerHTML.match(/^\&gt\;\&gt\;[0-9]+/i);
				if (m2 != null) {
					items[j].setAttribute('refID', m[1]);
					items[j].addEventListener('mousemove', function(e) {
						var preview = document.getElementById('ref' + this.getAttribute('refID'));
						if (!preview) {
							var preview = document.createElement('div');
							preview.id = 'ref' + this.getAttribute('refID');
							preview.className = 'reply';
							preview.style.margin = '0';
							preview.style.padding = '0';
							preview.style.position = 'absolute';

							if (window.location.href.search('4chan.org') == -1) {
								var items2 = document.getElementsByTagName('table');
							} else {
								var items2 = document.getElementsByClassName('4c4c_reply');
							}
							for (var i = 0; i < items2.length; i++) {
								var postid = items2[i].getAttribute('postID');
								if (postid && postid == this.getAttribute('refID')) {
									preview.innerHTML = items2[i].innerHTML;
									if (items2[i].getAttribute('op') == 'true') {
										preview.className = 'postblock';
										preview.innerHTML = '<div style="position: absolute;right: 0px;top: 0px;font-size: 1.5em;margin: 0px;padding: 1px;" class="unkfunc">OP</div>' + preview.innerHTML;
									}
								}
							}

							insertAfter(preview, this);
						}
						preview.style.left = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 25;
						preview.style.top = e.clientY + document.body.scrollTop + document.documentElement.scrollTop + 10;
					}, false);
					items[j].addEventListener('mouseout', function() {
						var preview = document.getElementById('ref' + this.getAttribute('refID'));
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
		if (table.width != '100%' && table.cellpadding != '0' && table.align != 'right') {
			replies.innerHTML += '<table>' + table.innerHTML + '</table>';
		}
	}
	if (items && items.length > 0) {
		setTimeout(processExpandTables, 1, replies, replies_temp, threadID, spacer, omittedposts, items, tables);
	} else {
		processExpandTablesFinish(replies, replies_temp, threadID, spacer, omittedposts, tables);
	}
}

function processExpandTablesFinish(replies, replies_temp, threadID, spacer, omittedposts, tables) {
	var delform_temp = replies_temp.getElementsByTagName('form')[1];
	replies_temp.style.display = 'none';

	var items2 = document.getElementsByClassName('4c4c_reply');
	for (var i = 0; i < items2.length; i++) {
		if (items2[i].getAttribute('threadID') == threadID) {
			items2[i].style.display = 'none';
		}
	}

	var items2 = replies.getElementsByTagName('table');
	for (var i = 0; i < items2.length; i++) {
		setPostAttributes(items2[i], true);
	}

	replaceRefLinksWithQuickReply(replies, threadID);

	var items2 = document.getElementsByTagName('span');
	for (var i = 0; i < items2.length; i++) {
		if (items2[i].id == 'omittedposts' + threadID) {
			insertAfter(replies, items2[i]);
		}
	}

	spacer.innerHTML = '<img border="0" src="' + chrome.extension.getURL('button_retract.png') + '" title="Retract">&nbsp;';
	omittedposts.innerHTML = 'Thread No.' + threadID + ' expanded.';
}

function processExpand(replies, replies_temp, threadID, spacer, omittedposts) {
	var delform_expand = replies_temp.getElementsByTagName('form')[1];
	var items = delform_expand.getElementsByTagName('table');
	var tables = [];
	for (var j = 0; j < items.length; j++) {
		tables.push(items[j]);
	}
	replies.id = 'replies' + threadID;
	processExpandTables(replies, replies_temp, threadID, spacer, omittedposts, tables);
}

function autoFillPostBox(element) {
	if (!element) {
		element = document;
	}

	var items3 = element.getElementsByTagName('input');
	for (var j = 0; j < items3.length; j++) {
		if (items3[j].name == 'name') {
			if (default_name != '') {
				items3[j].value = default_name;
			}
		} else if (items3[j].name == 'email') {
			if (default_email != '') {
				items3[j].value = default_email;
			}
		} else if (items3[j].name == 'sub') {
			if (default_subject != '') {
				items3[j].value = default_subject;
			}
		} else if (items3[j].name == 'pwd') {
			if (default_password != '') {
				items3[j].value = default_password;
			}
		}
	}
	var items3 = element.getElementsByTagName('textarea');
	for (var j = 0; j < items3.length; j++) {
		if (items3[j].name == 'com') {
			if (items3[j].value == '' && default_comment != '') {
				items3[j].value = default_comment;
			}
		}
	}
}

function processLatestRepliesLoop(replies, lastmodified) {
	var reply = false;
	if (replies && replies.length > 0) {
		reply = replies.shift();

		if (reply.getAttribute('special') != null || (reply.getAttribute('postID') > lastreply.getAttribute('postID'))) {
			replaceRefLinksWithQuickReply(reply);
			insertAfter(reply, lastreply);
			lastreply = reply;
			lastreplyid = lastreply.getAttribute('postID');
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
		var items2 = document.forms[1].getElementsByClassName('4c4c_reply');
		for (var j = 0; j < items2.length; j++) {
			if (items2[j].getAttribute('postID') != null && items2[j].getAttribute('op') == null) {
				lastreply = items2[j];
				lastreplyid = lastreply.getAttribute('postID');
			}
		}
	}
	if (!lastreply) {
		lastreply = document.forms[1].getElementsByTagName('blockquote')[0];
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
		client.open('HEAD', threadID, true);
		client.send();
		client.threadID = threadID;
		client.onreadystatechange = function() {
			if (client.readyState == 4) {
				if (last_modified && (client.status == 404 || client.getResponseHeader('Last-Modified') != last_modified)) {
					var client2 = new XMLHttpRequest();
					client2.open('GET', client.threadID, true);
					client2.send();
					client2.threadID = client.threadID;
					client2.onreadystatechange = function() {
						var replies = [];
						replies.length = 0;
						if (client2.status == 404) {
							if (document.forms[1].getAttribute('has404d') == 'false') {
								document.forms[1].setAttribute('has404d', 'true');
								var reply_404 = document.createElement('span');
								reply_404.setAttribute('special', 'true');
								reply_404.innerHTML = "This thread has 404'd";
								reply_404.style.color = 'red';
								reply_404.style.fontSize = '2.0em';
								replies.push(reply_404);
							}
						} else if (client2.status == 200) {
							var replies_temp = document.createElement('span');
							replies_temp.innerHTML = client2.responseText;
							var items = replies_temp.getElementsByTagName('table');
							for (var i = 0; i < items.length; i++) {
								setPostAttributes(items[i], true);
								if (items[i].getAttribute('postID') != null) {
									if (items[i].getAttribute('postID') > lastreplyid) {
										replies.push(items[i]);
									}
								}
							}
						}
						if (replies.length > 0) {
							last_modified = false;
							processFetchedReplies(replies, client2.getResponseHeader('Last-Modified'));
						}
					}
				}
			}
		};

		if (document.forms[1].getAttribute('has404d') == 'false') {
			setTimeout(fetchLatestPosts, 10000);
		}
	}
}

var postarea;
var threads = [];
var delform = null;
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
var enable_threadwatcher = null;
var enable_hidethreads = null;
var watchedthreads = null;
var hiddenthreads = null;
var default_name = null;
var default_email = null;
var default_subject = null;
var default_comment = null;
var default_password = null;

function init4chan4chrome(element) {
	if (document.forms.length > 0) {
		var processPage = false;
		if (!element) {
			element = document;
			processPage = true;

			if (enable_threadwatcher && window.location.href.search('4chan.org') != -1) {
				var watchBox = document.createElement('div');
				watchBox.id = 'threadwatcher';
				watchBox.style.borderTop = '0px none';
				watchBox.style.borderBottom = '1px solid #CCCCCC';
				watchBox.style.borderLeft = '1px solid #CCCCCC';
				watchBox.style.borderRight = '1px solid #CCCCCC';
				watchBox.innerHTML = '<span title="Refresh" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" id="refreshthreadwatcher">&nbsp;R&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 0px;" class="postblock">Watched Threads</div><table cellpadding="1" cellspacing="0" id="watchboxtable" style="margin: 3px;"></table>';
				watchBox.className = 'reply';
				watchBox.style.margin = '0';
				watchBox.style.padding = '0';
				watchBox.style.position = 'absolute';
				watchBox.style.left = '10';
				watchBox.style.top = '25';

				insertAfter(watchBox, document.getElementsByTagName('table')[0]);
				refreshThreadWatcher();

				document.getElementById('refreshthreadwatcher').addEventListener('click', function() {
					refreshThreadWatcherCache();
				}, false);
			}
		}
		var items = element.getElementsByTagName('a');
		for (var i = 0; i < items.length; i++) {
			if (items[i].innerHTML == 'Reply' && enable_quickreply) {
				var m = items[i].href.match(/.*\/([0-9]+)(?:\.html)?/i);
				if (m != null) {
					var threadID = m[1];
					var quickReply = document.createElement('a');
					quickReply.href = '#';
					quickReply.innerHTML = '<img border="0" src="' + chrome.extension.getURL('button_quickreply.png') + '" title="Quick Reply">';
					quickReply.setAttribute('onclick', 'return false;');
					quickReply.setAttribute('threadID', threadID);
					quickReply.addEventListener('click', function() {
						var items2 = element.getElementsByTagName('input');
						for (var i = 0; i < items2.length; i++) {
							if (items2[i].name.search(this.getAttribute('threadID')) != -1) {
								quickReplyBox(this.getAttribute('threadID'), items2[i]);
							}
						}
					}, false);

					items[i].parentNode.innerHTML += '<span id="spacer' + threadID + '">&nbsp;</span>';
					var spacer = element.getElementById('spacer' + threadID);
					insertAfter(quickReply, spacer);
				}
			} else if (items[i].innerHTML == 'No.') {
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

		if (document.forms['delform']) {
			delform = document.forms[1];
		} else {
			delform = document.body;
		}
		if (processPage && delform) {
			if (enable_autonoko) {
				var m = window.location.href.match(/(^.*)\/res\/[0-9]+.*/i);
				if (m == null) {
					var m = window.location.href.match(/(^.*)\//i);
				}
				if (m != null) {
					document.forms[0].action += '#return=' + encodeURI(m[1]);
				}
			}

			var items = document.getElementsByTagName('div');
			for (var i = 0; i < items.length; i++) {
				if (items[i].className == 'postarea') {
					postarea = items[i].innerHTML;
					autoFillPostBox(document);
				}
			}

			var nodes = delform.childNodes;
			var hidethreadid = 'thread' + Math.floor(Math.random() * 1000);
			var watch = null;
			if (enable_threadwatcher) {
				watch = document.createElement('a');
			}

			lastnode = null;
			threadID = null;
			lastreply = null;

			for (var i = 0; i < nodes.length; i++) {
				node = nodes[i];
				if (node.nodeName.toLowerCase() != 'hr') {
					if (!node.setAttribute) {
						var newspan = document.createElement('span');
						insertAfter(newspan, node);
						newspan.appendChild(node);
						node = newspan;
					}

					node.setAttribute('hidethread', hidethreadid);
				}

				if (!threadID && node.nodeName.toLowerCase() == 'input' && node.type == 'checkbox') {
					threadID = node.name;

					if (enable_hidethreads) {
						var threadhider = document.createElement('a');
						threadhider.id = 'threadhider' + threadID;
						threadhider.style.textDecoration = 'none';
						threadhider.innerHTML = '<img border="0" src="' + chrome.extension.getURL('button_retract.png') + '" title="Hide Thread"> ';
						threadhider.href = '#';
						threadhider.setAttribute('onClick', 'javascript:return false;');
						threadhider.setAttribute('threadID', threadID);
						threadhider.setAttribute('hidethreadID', hidethreadid);

						threadhider.addEventListener('click', function() {
							hideThread(this.getAttribute('threadID'));
							var items = getElementsByAttribute('hidethread', this.getAttribute('hidethreadID'), false);
							for (var j = 0; j < items.length; j++) {
								items[j].style.display = 'none';
							}
							var unhidethread = document.getElementById('unhide' + this.getAttribute('hidethreadID'));
							unhidethread.style.display = 'block';
						}, false);

						insertAfter(threadhider, node);
					}

					if (enable_threadwatcher) {
						watch.id = 'watch' + threadID;
						watch.style.textDecoration = 'none';
						watch.innerHTML = '<img border="0" src="' + chrome.extension.getURL('button_watch.png') + '" title="Watch Thread"> ';
						watch.href = '#';
						watch.setAttribute('onClick', 'javascript:return false;');
						watch.setAttribute('threadID', threadID);

						watch.addEventListener('click', function() {
							var m = window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
							if (m != null) {
								var threadsubject = this.getAttribute('postsubject');
								if (threadsubject == '') {
									threadsubject = '&nbsp;';
								}
								var threadauthor = this.getAttribute('postname');
								if (threadauthor == '') {
									threadauthor = '&nbsp;';
								}
								var threadarray = [m[1], this.getAttribute('threadID'), threadsubject, threadauthor, ''];
								watchThread(threadarray);
							}
						}, false);

						insertAfter(watch, node);
					}
				}

				if (enable_threadwatcher && node.className) {
					if (node.className.toLowerCase() == 'filetitle') {
						watch.setAttribute('postsubject', node.textContent);
					} else if (node.className.toLowerCase() == 'postername') {
						watch.setAttribute('postname', node.textContent);
					}
				}

				if (node.nodeName.toLowerCase() == 'table' && !node.getAttribute('align')) {
					if (window.location.href.search('4chan.org') == -1) {
						var items = node.getElementsByTagName('input');
						for (var j = 0; j < items.length; j++) {
							if (items[j].type == 'checkbox') {
								node.setAttribute('postID', items[j].name);
							}
						}
					}
					node.setAttribute('threadID', threadID);
					replaceRefLinksWithQuickReply(node, threadID);
					setPostAttributes(node);
					lastreply = node;
					lastreplyid = node.getAttribute('postID');
				}

				if (node.className && node.className.toLowerCase() == 'omittedposts' && enable_expand) {
					var expand = document.createElement('a');
					expand.style.textDecoration = 'none';
					expand.innerHTML = '<img border="0" src="' + chrome.extension.getURL('button_expand.png') + '" title="Expand Thread">&nbsp;';
					expand.href = '#';
					expand.setAttribute('onClick', 'javascript:return false;');
					expand.setAttribute('threadID', threadID);

					node.innerHTML = '<span id="spacer2' + threadID + '"></span><span id="omittedposts' + threadID + '">' + node.innerHTML + '</span>';
					var spacer = document.getElementById('spacer2' + threadID);
					spacer.insertBefore(expand);
					var omittedposts = document.getElementById('omittedposts' + threadID);

					node.setAttribute('threadID', threadID);
					spacer.setAttribute('threadID', threadID);
					spacer.setAttribute('expanded', 'false');

					spacer.addEventListener('click', function() {
						var omittedposts = document.getElementById('omittedposts' + this.getAttribute('threadID'));
						if (this.getAttribute('expanded') == 'true') {
							document.getElementById('replies' + this.getAttribute('threadID')).parentNode.removeChild(document.getElementById('replies' + this.getAttribute('threadID')));
							this.innerHTML = this.getAttribute('retracthtml');
							omittedposts.innerHTML = 'Thread No.' + this.getAttribute('threadID') + ' retracted.<br clear=\"left\">';
							this.setAttribute('expanded', 'false');
						} else {
							this.setAttribute('retracthtml', this.innerHTML);
							omittedposts.innerHTML = 'Thread No.' + this.getAttribute('threadID') + ' expanding...';
							this.style.textDecoration = 'none';
							this.style.color = '#000000';
							this.style.fontWeight = 'bold';
							this.innerHTML = '<img border="0" src="' + chrome.extension.getURL('button_expandwait.png') + '" title="Expanding...">&nbsp;';
							var client = new XMLHttpRequest();
							client.open('GET', 'res/' + this.getAttribute('threadID'), true);
							client.send();
							client.threadID = this.getAttribute('threadID');
							client.spacer = this;
							client.omittedposts = omittedposts;
							client.onreadystatechange = function() {
								if (client.readyState == 4) {
									if (client.status == 200) {
										this.spacer.setAttribute('expanded', 'true');
										var replies = document.createElement('span');
										var replies_temp = document.createElement('span');
										replies_temp.innerHTML = client.responseText;
										processExpand(replies, replies_temp, this.threadID, this.spacer, this.omittedposts);
									} else if (client.status == 404) {
										this.omittedposts.innerHTML = 'Thread No.' + this.threadID + " has 404'd.";
									}
								}
							};
						}
					}, false);
				}

				if (node.nodeName.toLowerCase() == 'hr' && lastnode && lastnode.nodeName.toLowerCase() == 'br') {
					if (enable_hidethreads) {
						var unhide = document.createElement('span');
						unhide.innerHTML = '<a href="#" id="triggerunhide' + hidethreadid + '"><img border="0" src="' + chrome.extension.getURL('button_expand.png') + '" title="Un-hide Thread"></a> Thread No.' + threadID + ' is hidden.';
						unhide.id = 'unhide' + hidethreadid;
						unhide.style.display = 'none';
						insertAfter(unhide, lastnode.previousSibling);

						var triggerunhide = document.getElementById('triggerunhide' + hidethreadid);
						triggerunhide.setAttribute('onClick', 'javascript:return false;');
						triggerunhide.setAttribute('threadID', threadID);
						triggerunhide.setAttribute('hidethreadID', hidethreadid);
						triggerunhide.addEventListener('click', function() {
							unhideThread(this.getAttribute('threadID'));
							var items = getElementsByAttribute('hidethread', this.getAttribute('hidethreadID'), false);
							for (var j = 0; j < items.length; j++) {
								items[j].style.display = 'block';
							}
							var unhidethread = document.getElementById('unhide' + this.getAttribute('hidethreadID'));
							unhidethread.style.display = 'none';
						}, false);
					}

					threadID = null;
					hidethreadid = 'thread' + Math.floor(Math.random() * 1000);
					watch = document.createElement('a');
				}
				lastnode = node;
			}

			var items = delform.innerHTML.split('<br clear="left"><hr>');

			if (!created_op_preview) {
				for (var i = 0; i < items.length; i++) {
					var m = items[i].match(/.*\<input type\=\"checkbox\" name\=\"([0-9]+)\".*/i);
					if (m != null) {
						var table = document.createElement('table');
						table.innerHTML = items[i].split('</blockquote>')[0] + '</blockquote>';
						var hr_split = table.innerHTML.split('<hr>');
						if (hr_split.length > 0) {
							table.innerHTML = hr_split.pop();
						}
						table.className = '4c4c_reply';
						table.setAttribute('postID', m[1]);
						table.setAttribute('op', 'true');
						table.style.display = 'none';
						delform.appendChild(table);
					}
				}
				created_op_preview = true;
			}

			if (enable_fetchreplies) {
				var m = window.location.href.match(/.*\/res\/[0-9]+.*/i);
				if (m != null) {
					if (delform.getAttribute('has404d') == null) {
						delform.setAttribute('has404d', 'false');
						setTimeout(fetchLatestPosts, 10000);
					}
				}
				enable_fetchreplies = false;
			}

			replaceRefLinksWithQuickReply(element, null);

			if (enable_hidethreads) {
				var m = window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
				if (m != null) {
					for (var i = 0; i < hiddenthreads.length; i++) {
						if (hiddenthreads[i][0] == m[1]) {
							var item = document.getElementById('threadhider' + hiddenthreads[i][1]);
							if (item) {
								var evt = document.createEvent('MouseEvents');
								evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
								item.dispatchEvent(evt);
							}
						}
					}
				}
			}
			
			if (enable_returntotop) {
				var m = window.location.href.match(/.*\/res\/[0-9]+.*/i);
				if (window.location.href.search('4chan.org') != -1 && m && lastreply) {
					var returntotop = document.createElement('table');
					returntotop.className = 'reply';
					returntotop.style.marginTop = '1em';
					returntotop.innerHTML = '<tr onclick="self.scrollTo(0,0);" style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">Return to Top</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>';
					insertAfter(returntotop, lastreply);
				}
			}
		}
	}
}

var isdrag = false;
var x, y;
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
	while (fobj.tagName.toLowerCase() != 'html' && !(fobj.className == 'postblock' && fobj.style.textAlign == 'center')) {
		fobj = fobj.parentNode;
	}
	if (fobj.className == 'postblock' && fobj.style.textAlign == 'center') {
		isdrag = true;
		dobj = fobj.parentNode;
		tx = parseInt(dobj.style.left + 0, 10);
		ty = parseInt(dobj.style.top + 0, 10);
		x = e.clientX;
		y = e.clientY;
		document.onmousemove = movemouse;
		return false;
	}
}
document.onmousedown = selectmouse;
document.onmouseup = function() {isdrag = false;};

if (document.forms.length == 0) {
	var m = window.location.href.match(/http\:\/\/.*\.4chan\.org\/.*\#return\=(.*)/i);
	if (m != null) {
		if (document.body.innerHTML.search('<\!-- thread\:') > -1 && document.body.innerHTML.search('<\!-- thread\:') < 500) {
			var m2 = document.body.innerHTML.match(/\.*<\!-- thread\:([0-9]+),no\:([0-9]+) --\>.*/i);
			if (m2 != null) {
				if (m2[1] == 0) {
					m2[1] = m2[2];
				}
				window.location = decodeURI(m[1]) + '/res/' + m2[1] + '#' + m2[2];
			}
		}
	}
}

var disable4c4c = false;
var m = window.location.href.match(/.*\/\/([0-9a-zA-Z]+)\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
if (m != null) {
	if (m[1] == 'sys' || m[1] == 'dis' || m[2] == 'f') {
		disable4c4c = true;
	}

}
if (!disable4c4c) {
	chrome.extension.sendRequest({'reqtype': 'get-options'}, function(response) {
		enable_quickreply = response['quickreply'];
		enable_quickreplyiframe = response['quickreplyiframe'];
		enable_expand = response['expand'];
		enable_expandimages = response['expandimages'];
		enable_preview = response['preview'];
		enable_fetchreplies = response['fetchreplies'];
		enable_autonoko = response['autonoko'];
		enable_sage = response['sage'];
		enable_report = response['report'];
		enable_threadwatcher = response['threadwatcher'];
		enable_hidethreads = response['hidethreads'];
		enable_returntotop = response['returntotop'];
		watchedthreads = response['watchedthreads'];
		hiddenthreads = response['hiddenthreads'];
		default_name = response['default_name'];
		default_email = response['default_email'];
		default_subject = response['default_subject'];
		default_comment = response['default_comment'];
		default_password = response['default_password'];

		init4chan4chrome();
	});
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (request.reqtype == 'expandall') {
			expand_all_thumbs = true;
			var items = document.getElementsByTagName('a');
			for (var i = 0; i < items.length; i++) {
				if (items[i].getAttribute('expanded') != null) {
					if (items[i].getAttribute('expanded') == 'false') {
						var evt = document.createEvent('MouseEvents');
						evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						items[i].dispatchEvent(evt);
					}
				}
			}
		} else if (request.reqtype == 'visiturl') {
			window.location.href = request.url;
		}
	});
}
