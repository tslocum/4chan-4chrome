function insertAfter(newElement, targetElement) {
	targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
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
			alert(chrome.i18n.getMessage("thread_already_watched", threadarray[1]));
		} else {
			watchedthreads.push(threadarray);
			storeWatchedThreads();
			alert(chrome.i18n.getMessage("thread_now_watched", threadarray[1]));
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
	var m = full_url.match(/.*\.org\/([0-9a-zA-Z]+)\/.*/i);
	if (m != null) {
		var thisboard = m[1];
		watchboxtable = document.getElementById('watchboxtable');
		watchboxtable.innerHTML = '<tr><td class="postblock" style="border-right: 0px none;">No.</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">' + chrome.i18n.getMessage("subject") + '</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">' + chrome.i18n.getMessage("author") + '</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">' + chrome.i18n.getMessage("note") + '</td><td class="postblock" style="border-left: 0px none;">&nbsp;</td></tr>';

		var watchedthreads_thisboard = [];
		for (var i = 0; i < watchedthreads.length; i++) {
			if (watchedthreads[i][0] == thisboard) {
				watchedthreads_thisboard.push(watchedthreads[i]);
			}
		}

		if (watchedthreads_thisboard.length == 0) {
			var wbrow = document.createElement('tr');
			wbrow.innerHTML = '<td colspan="5" align="center">' + chrome.i18n.getMessage("no_watched_threads") + '</td>';
			watchboxtable.appendChild(wbrow);
		} else {
			for (var i = 0; i < watchedthreads_thisboard.length; i++) {
				var wbrow = document.createElement('tr');
				wbrow.innerHTML = '<td style="padding-left: 3px;padding-right: 3px;">' + watchedthreads_thisboard[i][1] + '</td><td class="filetitle" style="padding-left: 3px;padding-right: 3px;">' + watchedthreads_thisboard[i][2] + '</td><td class="postername" style="padding-left: 3px;padding-right: 3px;">' + watchedthreads_thisboard[i][3] + '</td><td style="padding-left: 3px;padding-right: 3px;"><input type="text" placeholder="' + chrome.i18n.getMessage("enter_a_note") + '" size="12" value="' + watchedthreads_thisboard[i][4] + '" id="note' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1] + '"></td><td style="padding-left: 3px;padding-right: 3px;"><small>[<a href="/' + watchedthreads_thisboard[i][0] + '/res/' + watchedthreads_thisboard[i][1] + '">' + chrome.i18n.getMessage("view") + '</a>] [<a href="#" id="delete' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1] + '">' + chrome.i18n.getMessage("delete") + '</a>]</small></td>';
				watchboxtable.appendChild(wbrow);

				var note = document.getElementById('note' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1]);
				note.setAttribute('board', watchedthreads_thisboard[i][0]);
				note.setAttribute('threadid', watchedthreads_thisboard[i][1]);
				note.onchange = function(event) {
					updateWatchedThreadNote(this.value, $(this).attr('board'), $(this).attr('threadid'));
				};
				note.onkeyup = function(event) {
					updateWatchedThreadNote(this.value, $(this).attr('board'), $(this).attr('threadid'));
				};

				var deletethread = document.getElementById('delete' + watchedthreads_thisboard[i][0] + watchedthreads_thisboard[i][1]);
				deletethread.setAttribute('board', watchedthreads_thisboard[i][0]);
				deletethread.setAttribute('threadid', watchedthreads_thisboard[i][1]);
				deletethread.addEventListener('click', function() {
					var confirm = window.confirm(chrome.i18n.getMessage("stop_watching_thread", $(this).attr('threadid')));
					if (confirm) {
						unwatchThread($(this).attr('board'), $(this).attr('threadid'));
					}
				}, false);
			}
		}
	}
}

function hideThread(threadid) {
	chrome.extension.sendRequest({'reqtype': 'get-hiddenthreads'}, function(response) {
		hiddenthreads = response;

		var m = full_url.match(/.*\.org\/([0-9a-zA-Z]+)\/.*/i);
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

		var m = full_url.match(/.*\.org\/([0-9a-zA-Z]+)\/.*/i);
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
	quickReplyBox.innerHTML = '<span title="' + chrome.i18n.getMessage("close") + '" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" id="close' + qrbid + '">&nbsp;X&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 10px;" class="postblock">' + chrome.i18n.getMessage("quick_reply") + ' (#' + resto + ')</div>' + postarea;
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
					document.getElementById($(this).attr('qrbid') + 'iframe').css('display', 'block');
					document.getElementById($(this).attr('qrbid') + 'form').submit();
					/*if ($(this).attr("submitted") == "false") {
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
	
	qrbclose = document.getElementById("close" + qrbid);
	qrbclose.setAttribute("qrbid", qrbid);
	qrbclose.addEventListener('click', function() {
		closeQuickReplyBox($(this).attr("qrbid"));
	}, false);

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
		
		$('a', searchElement).each(function() {
			var postid = null;
			var resto = resto_override;
			var m = null;
			if ($(this).attr('href')) {
				m = $(this).attr('href').match(/.*quote\(\'([0-9]+)\'\)/i);
			}
			if (m != null) {
				postid = m[1];
				if (!resto) {
					var m = full_url.match(/.*\/res\/([0-9]+).*/i);
					if (m != null) {
						resto = m[1];
					}
				}
				if ($(this).text().search('X') != -1) {
					$(this).text(postid);
				}
			} else if ($(this).hasClass('quotejs')) {
				var m = $(this).attr('href').match(/[.*]?res\/([0-9]+)(?:\.[html|php])?\#q([0-9]+)/i);
				if (m != null) {
					resto = m[1];
					postid = m[2];
					if ($(this).text().search('X') != -1) {
						$(this).text(postid);
					}
				}
			}
			if (enable_quickreply && postid && resto && $(this).attr('href') != 'javascript:return false;') {
				$(this).attr('postID', postid).attr('threadID', resto).attr('thisElement', this);
				if (enable_quickreply && $(this).attr('isQuickReply') != 'true') {
					$(this).attr('isQuickReply', 'true');
					$(this).click(function() {
						quickReplyQuote($(this).attr('threadID'), $(this).attr('postID'), this.parentNode);
						return false;
					});
				}
			}
			if (enable_report && postid && $(this).attr('processed') == null) {
				var m2 = document.location.href.match(/.*\.org\/([0-9a-zA-Z]+)\/.*/i);
				if (m2) {
					var report = document.createElement('a');
					report.href = "javascript:void(reppop('http://sys.4chan.org/" + m2[1] + '/imgboard.php?mode=report&no=' + postid + "'));";
					report.style.textDecoration = 'none';
					report.innerHTML = ' <img border="0" src="' + chrome.extension.getURL('images/button_report.png') + '" title="' + chrome.i18n.getMessage("report_post") + '">';
					insertAfter(report, $(this));
				}
				$(this).attr('processed', 'true');
			}
			if (enable_sage && $(this).attr('href') && $(this).attr('href').toLowerCase() == 'mailto:sage' && $(this).attr('processed') == null) {
				$(this).html('&nbsp;' + $(this).html() + '&nbsp;')
					.css('textDecoration', 'none')
					.css('background-image', "url('" + chrome.extension.getURL('images/sage.png') + "')")
					.css('backgroundRepeat', 'repeat')
					.attr('processed', 'true');
			}
		});
	}
}

function setExpandImageAttributes(a) {
	if (enable_expandimages) {
		var m = a.href.match(/.*images\..*\.org\/.*\/src\/(.*)/i);
		if (m == null) {
			m = a.href.match(/.*4chanarchive\.org\/images\/(.*)/i);
		}
		if (m == null) {
			m = a.href.match(/.*inb4\.im\/.*\/src\/(.*)/i);
		}
		if (m) {
			if (a.innerHTML.substring(0, 4) == '<img') {
				if ($(a).attr('expanded') == undefined) {
					img = $('img', a).first();
					$(a).attr('expanded', 'false')
						.attr('expandImage', expandImage)
						.attr('expandOriginalHTML', $(a).html())
						.attr('thumbSRC', img.attr('src'))
						.attr('thumbWidth', img.attr('width'))
						.attr('thumbHeight', img.attr('height')) ;
					$(a).click(function(e) {
						if (e.which == 2) {
							window.open($(this).attr('expandImage'), '_blank');
						} else if (e.which == 1 || e.which == undefined) {
							if ($(this).attr('expanded') != 'true') {
								$(this).html('<img style="border: 0px none;min-width: ' + $(this).attr('thumbWidth') + 'px;min-height: ' + $(this).attr('thumbHeight') + 'px;" src="' + $(this).attr('expandImage') + '" border="0" align="left" hspace="20">');
								$(this).attr('expanded', 'true');
							} else {
								$(this).html($(this).attr('expandOriginalHTML'));
								$(this).attr('expanded', 'false');
							}
						}
						return false;
					});

					if (expand_all_thumbs) {
						$(a).click();
					}
				}
			} else {
				expandImage = a.href;
			}
		}
	}
}

function setPostAttributes(element, setExpand) {
	var expandImage;
	$('a', element).each(function() {
		var m = null;
		if ($(this).attr('href')) {
			m = $(this).attr('href').match(/.*\/[0-9]+(?:\.[html|php])?#([0-9]+)/i);
		}
		if (m == null && $(this).attr('href')) {
			var m = $(this).attr('href').match(/\#([0-9]+)/i);
		}
		if (m != null) {
			if ($(this).html() == 'No.') {
				$(element).attr('postID', m[1]).addClass('4c4c_reply');
			} else if (enable_preview && $(this).attr('refID') == undefined) {
				var m2 = $(this).html().match(/^\&gt\;\&gt\;[0-9]+/i);
				if (m2 != null) {
					$(this).attr('refID', m[1]);
					$(this).bind('mousemove', function(e) {
						var preview = document.getElementById('ref' + $(this).attr('refID'));
						if (!preview) {
							var preview = document.createElement('div');
							preview.id = 'ref' + $(this).attr('refID');
							preview.className = 'reply';
							preview.style.margin = '0';
							preview.style.padding = '0';
							preview.style.position = 'absolute';

							if (is_4chan) {
								var selectorsearch = '.4c4c_reply';
							} else {
								var selectorsearch = 'table';
							}
							var refpost = $(selectorsearch + '[postID="' + $(this).attr('refID') + '"]').first();
							if (refpost) {
								$(preview).html(refpost.html());
								if (refpost.attr('op') == 'true') {
									$(preview).addClass('postblock');
									$(preview).html('<div style="position: absolute;right: 0px;top: 0px;font-size: 1.5em;margin: 0px;padding: 1px;" class="unkfunc">OP</div>' + $(preview).html());
								}
							}

							insertAfter(preview, this);
						}
						$(preview).css('left', e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 25).css('top', e.clientY + document.body.scrollTop + document.documentElement.scrollTop + 10);
					});
					$(this).bind('mouseout', function() {
						$('#ref' + $(this).attr('refID')).remove();
					});
				}
			}
		} else if (setExpand) {
			setExpandImageAttributes(this);
		}
	});
}

function processExpandTables(replies, replies_temp, threadID, items, tables) {
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
		setTimeout(processExpandTables, 1, replies, replies_temp, threadID, items, tables);
	} else {
		processExpandTablesFinish(replies, replies_temp, threadID, tables);
	}
}

function processExpandTablesFinish(replies, replies_temp, threadID, tables) {
	var delform_temp = replies_temp.getElementsByTagName('form')[1];
	replies_temp.style.display = 'none';

	$('.4c4c_reply[threadID="' + threadID + '"]').hide();

	$('table', replies).each(function() {
		setPostAttributes(this, true);
	});

	replaceRefLinksWithQuickReply(replies, threadID);

	$('span[id^="omittedposts"]').each(function() {
		if (this.id == 'omittedposts' + threadID) {
			insertAfter(replies, this);
		}
	});

	$('#expandthread' + threadID).html('<img border="0" src="' + chrome.extension.getURL('images/button_retract.png') + '" title="' + chrome.i18n.getMessage("retract") + '">&nbsp;');
	$('#omittedposts' + threadID).html(chrome.i18n.getMessage("thread_expanded", threadID));
}

function processExpand(replies, replies_temp, threadID) {
	var tables = [];
	$('table', $(replies_temp.getElementsByTagName('form')[1])).each(function() {
		tables.push(this);
	});
	replies.id = 'replies' + threadID;
	processExpandTables(replies, replies_temp, threadID, tables);
}

function autoFillPostBox(element) {
	if (!element) {
		element = doc;
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

function processLatestRepliesLoop(replies) {
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
		setTimeout(processLatestRepliesLoop, 10, replies);
	}
}

function processFetchedReplies(replies) {
	if (!lastreply) {
		$('.4c4c_reply', document.forms[1]).each(function() {
			if ($(this).attr('postID') && $(this).attr('op') == undefined) {
				lastreply = this;
				lastreplyid = $(this).attr('postID');
			}
		});
	}
	if (!lastreply) {
		lastreply = $('blockquote', document.forms[1]).first();
	}

	processLatestRepliesLoop(replies);
}

function fetchLatestPosts() {
	var threadID = false;
	var m = full_url.match(/.*\/res\/([0-9]+).*/i);
	if (m != null) {
		threadID = m[1];
	}

	if (threadID) {
		$.ajax({
			url: base_url + 'res/' + threadID,
			ifModified: true,
			success: function(data) {
				var replies = [];
				var replies_temp = document.createElement('span');
				replies_temp.innerHTML = data;
				$('table', replies_temp).each(function() {
					setPostAttributes(this, true);
					if ($(this).attr('postID') > lastreplyid) {
						replies.push(this);
					}
				});
				processFetchedReplies(replies);
			},
			statusCode: {
				404: function() {
					if ($(document.forms[1]).attr('has404d') == 'false') {
						var replies = [];
						$(document.forms[1]).attr('has404d', 'true');
						var reply_404 = document.createElement('span');
						$(reply_404).attr('special', 'true').css('color', 'red').css('fontSize', '2.0em').html(chrome.i18n.getMessage("thread_404"));
						replies.push(reply_404);
						processFetchedReplies(replies);
					}
				}
			}
		});

		if ($(document.forms[1]).attr('has404d') == 'false') {
			setTimeout(fetchLatestPosts, 10000);
		}
	}
}

var postarea;
var threads = [];
var lastreply = false;
var lastreplyid = 0;
var full_url;
var base_url;
var is_4chan = false;
var last_modified = null;
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
var enable_quickbrowse = null;
var enable_sage = null;
var enable_report = null;
var enable_threadwatcher = null;
var enable_hidethreads = null;
var enable_menu = null;
var watchedthreads = null;
var hiddenthreads = null;
var default_name = null;
var default_email = null;
var default_subject = null;
var default_comment = null;
var default_password = null;
if (document.forms['delform']) {
	var delform = document.forms[1];
} else {
	var delform = document.body;
}

function init4chan4chrome(element) {
	if (document.forms.length > 0) {
		var processPage = false;
		if (!element) {
			element = document;
			processPage = true;

			if (enable_threadwatcher && is_4chan) {
				var watchBox = document.createElement('div');
				watchBox.id = 'threadwatcher';
				watchBox.style.borderTop = '0px none';
				watchBox.style.borderBottom = '1px solid #CCCCCC';
				watchBox.style.borderLeft = '1px solid #CCCCCC';
				watchBox.style.borderRight = '1px solid #CCCCCC';
				watchBox.innerHTML = '<span title="' + chrome.i18n.getMessage("refresh") + '" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" id="refreshthreadwatcher">&nbsp;R&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 0px;" class="postblock">' + chrome.i18n.getMessage("watched_threads") + '</div><table cellpadding="1" cellspacing="0" id="watchboxtable" style="margin: 3px;"></table>';
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
			
			if (enable_menu) {
				$4c4c_menu = $(document.createElement('div'));
				$4c4c_menu.css('position', 'fixed')
					.css('top', '0px')
					.css('right', '0px')
					.css('z-index', '9999')
					.html('<div id="4c4cmenu"></div><div id="menu_loading" style="font-size: 0.75em;text-align: right;">&middot; Loading &middot;&nbsp;</div>')
					.appendTo('body');
				$('#4c4cmenu')
					.css('text-align', 'right')
					.css('border-bottom-left-radius', '7px 7px')
					.css('border-top', '0px none')
					.css('border-right', '0px none')
					.css('padding', '7px')
					.css('padding-top', '0px')
					.css('padding-right', '3px')
					.css('margin', '0px')
					.addClass('postblock')
					.html('<a href="#" title="' + chrome.i18n.getMessage("return_to_top") + '" id="menu_top" class="quotejs">&#x25B2;&nbsp;&nbsp;&nbsp;Top</a><br><a href="#" title="' + chrome.i18n.getMessage("expand_all_thumbnails") + '" id="menu_expand" class="quotejs">Expand</a><br><a href="#" title="' + chrome.i18n.getMessage("browse_new_threads") + '" id="menu_return" class="quotejs">Browse</a>');
					
				$('#menu_top').css('text-decoration', 'none').click(function() {
					$('html, body').animate({ scrollTop: 0 }, 0);
					return false;
				});
				$('#menu_expand').css('text-decoration', 'none').click(function() {
					expand_all_thumbs = true;
					$('a[expandImage][expanded="false"]').each(function() {
						$(this).click();
					});
					return false;
				});
				$('#menu_return').css('text-decoration', 'none').click(function() {
					var m = window.location.href.match(/http\:\/\/(.*)\.(.*)\.org\/([0-9a-zA-Z]+)\/.*/i);
					if (m != null) {
						window.location = "http://" + m[1] + "." + m[2] + ".org/" + m[3] + "/?browse";
					}
					return false;
				});
				$('#menu_loading').hide()
					.bind('ajaxStart', function() {$(this).show();})
					.bind('ajaxStop', function() {$(this).hide();});
			}
		}
		scrolltotopthread = false;
		var m = window.location.href.match(/http\:\/\/.*\.org\/.*\?browse/i);
		if (enable_quickbrowse && m != null) {
			scrolltotopthread = true;
		}
		$('a', element).each(function() {
			if ($(this).html() == 'Reply' && enable_quickreply) {
				var m = null;
				if ($(this).attr('href')) {
					var m = $(this).attr('href').match(/.*\/([0-9]+)(?:\.html)?/i);
				}
				if (m != null) {
					var threadID = m[1];
					var quickReply = document.createElement('a');
					quickReply.href = 'javascript:false;';
					quickReply.innerHTML = '<img border="0" src="' + chrome.extension.getURL('images/button_quickreply.png') + '" title="' + chrome.i18n.getMessage("quick_reply") + '">';
					quickReply.setAttribute('onclick', 'return false;');
					quickReply.setAttribute('threadID', threadID);
					quickReply.addEventListener('click', function() {
						var items2 = element.getElementsByTagName('input');
						for (var i = 0; i < items2.length; i++) {
							if (items2[i].name.search($(this).attr('threadID')) != -1) {
								quickReplyBox($(this).attr('threadID'), items2[i]);
							}
						}
					}, false);

					this.parentNode.innerHTML += '<span id="spacer' + threadID + '">&nbsp;</span>';
					var spacer = element.getElementById('spacer' + threadID);
					insertAfter(quickReply, spacer);
				}
			} else if ($(this).html() == 'No.') {
				var m = null;
				if ($(this).attr('href')) {
					var m = $(this).attr('href').match(/.*\/([0-9]+)(?:\.html)?\#([0-9]+)/i);
				}
				if (m != null) {
					if (m[1] == m[2]) {
						$(this).attr('name', m[1]);
					}
				}
			} else {
				setExpandImageAttributes(this);
			}
		});

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

			postarea = $('.postarea').first().html();
			autoFillPostBox(document);

			var nodes = delform.childNodes;
			var hidethreadid = 'thread' + Math.floor(Math.random() * 1000);
			var watch = null;
			if (enable_threadwatcher) {
				watch = document.createElement('a');
			}

			lastnode = null;
			threadID = null;
			lastreply = null;
			topthread = false;
			lasthr = null;

			for (var i = 0; i < nodes.length; i++) {
				node = nodes[i];
				var $node = $(node);
				if (node.nodeName.toLowerCase() != 'hr') {
					if (!node.setAttribute) {
						var newspan = document.createElement('span');
						insertAfter(newspan, node);
						newspan.appendChild(node);
						node = newspan;
					}

					node.setAttribute('hidethread', hidethreadid);
				}
				
				if (!topthread) {
					topthread = node;
					if (scrolltotopthread) {
						window.scrollTo(0, topthread.offsetTop);
					}
				}

				if (!threadID && node.nodeName.toLowerCase() == 'input' && node.type == 'checkbox') {
					threadID = node.name;

					if (enable_threadwatcher) {
						$(watch).attr('id', 'watch' + threadID)
							.attr('threadID', threadID)
							.attr('href', '#')
							.css('textDecoration', 'none')
							.html('<img border="0" src="' + chrome.extension.getURL('images/button_watch.png') + '" title="' + chrome.i18n.getMessage("watch_thread") + '"> ');

						$(watch).click(function() {
							var m = full_url.match(/.*\.org\/([0-9a-zA-Z]+)\/.*/i);
							if (m != null) {
								var threadsubject = $(this).attr('postsubject');
								if (threadsubject == '') {
									threadsubject = '&nbsp;';
								}
								var threadauthor = $(this).attr('postname');
								if (threadauthor == '') {
									threadauthor = '&nbsp;';
								}
								var threadarray = [m[1], $(this).attr('threadID'), threadsubject, threadauthor, ''];
								watchThread(threadarray);
							}
							return false;
						});

						insertAfter(watch, node);
					}
					
					if (enable_hidethreads) {
						var threadhider = document.createElement('a');
						$(threadhider).attr('id', 'threadhider' + threadID)
							.attr('href', '#')
							.attr('threadID', threadID)
							.attr('hidethreadID', hidethreadid)
							.css('textDecoration', 'none')
							.html('<img border="0" src="' + chrome.extension.getURL('images/button_retract.png') + '" title="' + chrome.i18n.getMessage("hide_thread") + '"> ')
						
						$(threadhider).click(function() {
							hideThread($(this).attr('threadID'));
							$('[hidethread="' + $(this).attr('hidethreadID') + '"]').hide();
							$('#unhide' + $(this).attr('hidethreadID')).show();
							return false;
						});

						insertAfter(threadhider, node);
					}
				}

				if (enable_threadwatcher && $node.hasClass('filetitle')) {
					$(watch).attr('postsubject', $node.text());
				} else if (enable_threadwatcher && $node.hasClass('postername')) {
					$(watch).attr('postname', $node.text());
				}

				if (node.nodeName.toLowerCase() == 'table' && !$node.attr('align')) {
					if (is_4chan) {
						$('input[type=checkbox]', node).each(function() {
							$node.attr('postID', this.name);
						});
					}
					lastreplyid = $node.attr('threadID', threadID).attr('postID');
					replaceRefLinksWithQuickReply(node, threadID);
					setPostAttributes(node);
					lastreply = node;
				}

				if (enable_expand && $node.hasClass('omittedposts')) {
					var expand = document.createElement('a');
					$(expand).attr('id', 'expandthread' + threadID)
						.attr('href', '#')
						.attr('threadID', threadID)
						.attr('expanded', 'false')
						.css('textDecoration', 'none')
						.html('<img border="0" src="' + chrome.extension.getURL('images/button_expand.png') + '" title="' + chrome.i18n.getMessage("expand_thread") + '">&nbsp;');
					$node.attr('threadID', threadID).html('<span id="spacer2' + threadID + '"></span><span id="omittedposts' + threadID + '">' + node.innerHTML + '</span>');
					
					var spacer = document.getElementById('spacer2' + threadID);
					spacer.parentNode.insertBefore(expand, spacer);
					
					$(expand).click(function() {
						var omittedposts = $('#omittedposts' + $(this).attr('threadID'));
						if ($(this).attr('expanded') == 'true') {
							$('#replies' + $(this).attr('threadID')).remove();
							$(this).html($(this).attr('retracthtml'));
							omittedposts.html(chrome.i18n.getMessage("thread_retracted", $(this).attr('threadID')) + '<br clear=\"left\">');
							$(this).attr('expanded', 'false');
						} else {
							$(this).attr('retracthtml', $(this).html());
							omittedposts.html(chrome.i18n.getMessage("thread_expanding", $(this).attr('threadID')));
							this.style.textDecoration = 'none';
							this.style.color = '#000000';
							this.style.fontWeight = 'bold';
							$(this).html('<img border="0" src="' + chrome.extension.getURL('images/button_expandwait.png') + '">&nbsp;');
							
							$.ajax({
								url: base_url + 'res/' + $(this).attr('threadID'),
								cache: false,
								success: function(data) {
									var m = this.url.match(/.*\/res\/([0-9]+).*/i);
									$('#expandthread' + m[1]).attr('expanded', 'true');
									var replies = document.createElement('span');
									var replies_temp = document.createElement('span');
									replies_temp.innerHTML = data;
									processExpand(replies, replies_temp, m[1]);
								},
								statusCode: {
									404: function() {
										this.omittedposts.innerHTML = chrome.i18n.getMessage("thread_404");
									}
								},
								error: function() {
									var m = this.url.match(/.*\/res\/([0-9]+).*/i);
									$('#omittedposts' + m[1]).text(chrome.i18n.getMessage("thread_404"));
								}
							});
						}
						return false;
					});
				}
				
				if (enable_quickbrowse && $node.hasClass('pages')) {
					$('a', node).each(function() {
						this.href += "?browse";
					});
					
					$('form', node).each(function() {
						this.action += "?browse";
					});
				}

				if (node.nodeName.toLowerCase() == 'hr' && lastnode && lastnode.nodeName.toLowerCase() == 'br') {
					if (enable_hidethreads) {
						var unhide = document.createElement('span');
						unhide.innerHTML = '<a href="#" id="triggerunhide' + hidethreadid + '"><img border="0" src="' + chrome.extension.getURL('images/button_expand.png') + '" title="' + chrome.i18n.getMessage("unhide_thread") + '"></a> ' + chrome.i18n.getMessage("thread_is_hidden", threadID);
						unhide.id = 'unhide' + hidethreadid;
						unhide.style.display = 'none';
						insertAfter(unhide, lastnode.previousSibling);

						var triggerunhide = document.getElementById('triggerunhide' + hidethreadid);
						$(triggerunhide).attr('threadID', threadID).attr('hidethreadID', hidethreadid);
						$(triggerunhide).click(function() {
							unhideThread($(this).attr('threadID'));
							$('[hidethread="' + $(this).attr('hidethreadID') + '"]').show();
							$('#unhide' + $(this).attr('hidethreadID')).hide();
							return false;
						});
					}

					lasthr = node;
					threadID = null;
					hidethreadid = 'thread' + Math.floor(Math.random() * 1000);
					watch = document.createElement('a');
				}
				lastnode = node;
			}

			if (!created_op_preview) {
				var items = delform.innerHTML.split('<br clear="left"><hr>');
				for (var i = 0; i < items.length; i++) {
					var m = items[i].match(/.*\<input type\=\"checkbox\" name\=\"([0-9]+)\".*/i);
					if (m != null) {
						var table = document.createElement('table');
						$(table).html(items[i].split('</blockquote>')[0] + '</blockquote>')
							.attr('postID', m[1])
							.attr('op', 'true')
							.addClass('4c4c_reply')
							.css('display', 'none')
							.appendTo(delform);
						
						var hr_split = $(table).html().split('<hr>');
						if (hr_split.length > 0) {
							$(table).html(hr_split.pop());
						}
					}
				}
				created_op_preview = true;
			}

			if (enable_fetchreplies) {
				var m = full_url.match(/.*\/res\/[0-9]+.*/i);
				if (m != null && $(delform).attr('has404d') == undefined) {
					$(delform).attr('has404d', 'false');
					setTimeout(fetchLatestPosts, 10000);
				}
				enable_fetchreplies = false;
			}

			replaceRefLinksWithQuickReply(element, null);

			if (enable_hidethreads) {
				var m = full_url.match(/.*\.org\/([0-9a-zA-Z]+)\/.*/i);
				if (m != null) {
					for (var i = 0; i < hiddenthreads.length; i++) {
						if (hiddenthreads[i][0] == m[1]) {
							$('#threadhider' + hiddenthreads[i][1]).click();
						}
					}
				}
			}
			
			if (enable_returntotop && is_4chan) {
				var m = full_url.match(/.*\/res\/[0-9]+.*/i);
				if (m && lasthr) {
					var returntotop = document.createElement('table');
					returntotop.className = 'reply';
					returntotop.style.clear = 'both';
					returntotop.innerHTML = '<tr onclick="self.scrollTo(0,0);" style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">' + chrome.i18n.getMessage("return_to_top") + '</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>';
					insertAfter(returntotop, lasthr);
				}
			}
			
			if (enable_quickbrowse && is_4chan) {
				var m = window.location.href.match(/(^.*)\/res\/[0-9]+.*/i);
				if (m == null) {
					var quickbrowse = document.createElement('table');
					quickbrowse.className = 'reply';
					quickbrowse.style.clear = 'both';
					quickbrowse.innerHTML = '<tr style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">' + chrome.i18n.getMessage("browse_new_threads") + '</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>';
					quickbrowse.addEventListener('click', function() {
						var m2 = window.location.href.match(/http\:\/\/(.*)\.(.*)\.org\/(.*)\/.*/i);
						if (m2 != null) {
							window.location = "http://" + m2[1] + "." + m2[2] + ".org/" + m2[3] + "/?browse";
						}
					}, false);
					insertAfter(quickbrowse, lasthr);
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

document.addEventListener("mousedown", selectmouse, false);
document.addEventListener("mouseup", function() {isdrag = false;}, false);
last_modified = document.lastModified;

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
full_url = document.location.href;
var m = full_url.match(/.*\/\/([0-9a-zA-Z]+)\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
if (m != null) {
	is_4chan = true;
	if (m[1] == 'sys' || m[1] == 'dis' || m[2] == 'f') {
		disable4c4c = true;
	}
	base_url = "http://" + m[1] + ".4chan.org/" + m[2] + "/";
} else {
	m = full_url.match(/.*\.420chan\.org\/([0-9a-zA-Z]+)\/.*/i);
	if (m != null) {
		is_4chan = true;
		base_url = "http://boards.420chan.org/" + m[1] + "/";
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
		enable_menu = response['menu'];
		enable_returntotop = response['returntotop'];
		enable_quickbrowse = response['quickbrowse'];
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
		if (request["reqtype"] == 'expandall') {
			expand_all_thumbs = true;
			$('a[expandImage][expanded="false"]').each(function() {
				$(this).click();
			});
		} else if (request["reqtype"] == 'visiturl') {
			document.location.href = request.url;
		}
	});
}
