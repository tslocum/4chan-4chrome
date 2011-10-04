		Date.prototype.format = function(format) {
			var returnStr = '';
			var replace = Date.replaceChars;
			for (var i = 0; i < format.length; i++) {
				var curChar = format.charAt(i);
				if (replace[curChar]) {
					returnStr += replace[curChar].call(this);
				} else {
					returnStr += curChar;
				}
			}
			return returnStr;
		};
		Date.replaceChars = {
			shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

			// Day
			d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
			D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
			j: function() { return this.getDate(); },
			l: function() { return Date.replaceChars.longDays[this.getDay()]; },
			N: function() { return this.getDay() + 1; },
			S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
			w: function() { return this.getDay(); },
			z: function() { return "Not Yet Supported"; },
			// Week
			W: function() { return "Not Yet Supported"; },
			// Month
			F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
			m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
			M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
			n: function() { return this.getMonth() + 1; },
			t: function() { return "Not Yet Supported"; },
			// Year
			L: function() { return (((this.getFullYear()%4==0)&&(this.getFullYear()%100 != 0)) || (this.getFullYear()%400==0)) ? '1' : '0'; },
			o: function() { return "Not Supported"; },
			Y: function() { return this.getFullYear(); },
			y: function() { return ('' + this.getFullYear()).substr(2); },
			// Time
			a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
			A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
			B: function() { return "Not Yet Supported"; },
			g: function() { return this.getHours() % 12 || 12; },
			G: function() { return this.getHours(); },
			h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
			H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
			i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
			s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
			// Timezone
			e: function() { return "Not Yet Supported"; },
			I: function() { return "Not Supported"; },
			O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
			P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':' + (Math.abs(this.getTimezoneOffset() % 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() % 60)); },
			T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;},
			Z: function() { return -this.getTimezoneOffset() * 60; },
			// Full Date/Time
			c: function() { return this.format("Y-m-d") + "T" + this.format("H:i:sP"); },
			r: function() { return this.toString(); },
			U: function() { return this.getTime() / 1000; }
		};
	
    document.title = chrome.i18n.getMessage("4chan_4chrome_options");
    document.getElementById("header").title = chrome.i18n.getMessage("visit_4chan_4chrome");
    document.getElementById("enableordisable").textContent = chrome.i18n.getMessage("enable_or_disable");
    document.getElementById("entertextabove").textContent = chrome.i18n.getMessage("enter_text_above");
    document.getElementById("quickreplytext").textContent = chrome.i18n.getMessage("quick_reply");
    document.getElementById("useinlineframe").textContent = chrome.i18n.getMessage("use_inline_frame");
    document.getElementById("threadexpansion").textContent = chrome.i18n.getMessage("thread_expansion");
    document.getElementById("threadexpansiondesc").textContent = chrome.i18n.getMessage("thread_expansion_info");
    document.getElementById("imageexpansion").textContent = chrome.i18n.getMessage("image_expansion");
    document.getElementById("imageexpansiondesc").textContent = chrome.i18n.getMessage("image_expansion_info");
    document.getElementById("postpreview").textContent = chrome.i18n.getMessage("post_preview");
    document.getElementById("postpreviewdesc").textContent = chrome.i18n.getMessage("post_preview_info");
    document.getElementById("fetchnewreplies").textContent = chrome.i18n.getMessage("fetch_new_replies");
    document.getElementById("fetchnewrepliesdesc").textContent = chrome.i18n.getMessage("fetch_new_replies_info");
    document.getElementById("watchthreads").textContent = chrome.i18n.getMessage("watch_threads");
    document.getElementById("watchthreadsdesc").textContent = chrome.i18n.getMessage("watch_threads_info");
    document.getElementById("hidethreadstext").textContent = chrome.i18n.getMessage("hide_threads");
    document.getElementById("hidethreadsdesc").textContent = chrome.i18n.getMessage("hide_threads_info");
    document.getElementById("quickreportpost").textContent = chrome.i18n.getMessage("quick_report_post");
    document.getElementById("quickreportpostdesc").textContent = chrome.i18n.getMessage("quick_report_post_info");
    document.getElementById("highlightsageposts").textContent = chrome.i18n.getMessage("highlight_sage_posts");
    document.getElementById("highlightsagepostsdesc").textContent = chrome.i18n.getMessage("highlight_sage_posts_info");
    document.getElementById("autonokotext").textContent = chrome.i18n.getMessage("auto_noko");
    document.getElementById("autonokodesc").textContent = chrome.i18n.getMessage("auto_noko_info");
    document.getElementById("returntotoptext").textContent = chrome.i18n.getMessage("return_to_top");
    document.getElementById("returntotopdesc").textContent = chrome.i18n.getMessage("return_to_top_info");
    document.getElementById("quickbrowsetext").textContent = chrome.i18n.getMessage("quick_browse");
    document.getElementById("quickbrowsedesc").textContent = chrome.i18n.getMessage("quick_browse_info");
    document.getElementById("showicontext").textContent = chrome.i18n.getMessage("show_icon");
    document.getElementById("showicondesc").textContent = chrome.i18n.getMessage("show_icon_info");
	document.getElementById("menutext").textContent = chrome.i18n.getMessage("show_menu");
    
    document.getElementById("quickreply").checked = localStorage.getItem("quickreply") != "true";
    document.getElementById("quickreplyiframe").checked = localStorage.getItem("quickreplyiframe") == "true";
    document.getElementById("expand").checked = localStorage.getItem("expand") != "true";
    document.getElementById("expandimages").checked = localStorage.getItem("expandimages") != "true";
    document.getElementById("preview").checked = localStorage.getItem("preview") != "true";
    document.getElementById("fetchreplies").checked = localStorage.getItem("fetchreplies") != "true";
    document.getElementById("autonoko").checked = localStorage.getItem("autonoko") != "true";
    document.getElementById("sage").checked = localStorage.getItem("sage") != "true";
    document.getElementById("report").checked = localStorage.getItem("report") == "true";
    document.getElementById("threadwatcher").checked = localStorage.getItem("threadwatcher") != "true";
    document.getElementById("hidethreads").checked = localStorage.getItem("hidethreads") != "true";
    document.getElementById("returntotop").checked = localStorage.getItem("returntotop") != "true";
    document.getElementById("quickbrowse").checked = localStorage.getItem("quickbrowse") != "true";
    document.getElementById("showicon").checked = localStorage.getItem("showicon") != "true";
    document.getElementById("menu").checked = localStorage.getItem("menu") != "true";
    
    document.getElementById("name").value = (localStorage.getItem("defaultname") != null) ? localStorage.getItem("defaultname") : "";
    document.getElementById("email").value = (localStorage.getItem("defaultemail") != null) ? localStorage.getItem("defaultemail") : "";
    document.getElementById("subject").value = (localStorage.getItem("defaultsubject") != null) ? localStorage.getItem("defaultsubject") : "";
    document.getElementById("comment").value = (localStorage.getItem("defaultcomment") != null) ? localStorage.getItem("defaultcomment") : "";
    document.getElementById("password").value = (localStorage.getItem("defaultpassword") != null) ? localStorage.getItem("defaultpassword") : "";
    
    document.getElementById("quickreply").onchange = function(event) { 
      localStorage.setItem("quickreply", !this.checked); 
    };
    document.getElementById("quickreplyiframe").onchange = function(event) { 
      localStorage.setItem("quickreplyiframe", this.checked); 
    };
    document.getElementById("expand").onchange = function(event) { 
      localStorage.setItem("expand", !this.checked); 
    };
    document.getElementById("expandimages").onchange = function(event) { 
      localStorage.setItem("expandimages", !this.checked); 
    };
    document.getElementById("preview").onchange = function(event) { 
      localStorage.setItem("preview", !this.checked); 
    };
    document.getElementById("fetchreplies").onchange = function(event) { 
      localStorage.setItem("fetchreplies", !this.checked); 
    };
    document.getElementById("autonoko").onchange = function(event) { 
      localStorage.setItem("autonoko", !this.checked); 
    };
    document.getElementById("sage").onchange = function(event) { 
      localStorage.setItem("sage", !this.checked); 
    };
    document.getElementById("report").onchange = function(event) { 
      localStorage.setItem("report", this.checked); 
    };
    document.getElementById("threadwatcher").onchange = function(event) { 
      localStorage.setItem("threadwatcher", !this.checked); 
    };
    document.getElementById("hidethreads").onchange = function(event) { 
      localStorage.setItem("hidethreads", !this.checked); 
    };
    document.getElementById("returntotop").onchange = function(event) { 
      localStorage.setItem("returntotop", !this.checked); 
    };
    document.getElementById("quickbrowse").onchange = function(event) { 
      localStorage.setItem("quickbrowse", !this.checked); 
    };
    document.getElementById("showicon").onchange = function(event) { 
      localStorage.setItem("showicon", !this.checked); 
    };
	document.getElementById("menu").onchange = function(event) { 
      localStorage.setItem("menu", !this.checked); 
    };
    
    document.getElementById("name").onchange = function(event) { 
      localStorage.setItem("defaultname", this.value); 
    };
    document.getElementById("email").onchange = function(event) { 
      localStorage.setItem("defaultemail", this.value); 
    };
    document.getElementById("subject").onchange = function(event) { 
      localStorage.setItem("defaultsubject", this.value); 
    };
    document.getElementById("comment").onchange = function(event) { 
      localStorage.setItem("defaultcomment", this.value); 
    };
    document.getElementById("password").onchange = function(event) { 
      localStorage.setItem("defaultpassword", this.value); 
    };
    var date = new Date();
    datespan = document.getElementById("date");
    datespan.innerText = date.format('y/m/d(D)H:i:s');
    spans = document.getElementsByName("stamp");
    for(var i=0; i < spans.length; i++) {
      spans[i].innerText = Math.floor(date.format('U'));
    }