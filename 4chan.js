var f=null;function i(b,c){var a=c.parentNode;a.f==c?a.appendChild(b):a.insertBefore(b,c.nextSibling)}function aa(b){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(c){j=c;for(var c=!1,a=0;a<j.length;a++)j[a][0]==b[0]&&j[a][1]==b[1]&&(c=!0);c?alert(chrome.i18n.getMessage("thread_already_watched",b[1])):(j.push(b),k(),alert(chrome.i18n.getMessage("thread_now_watched",b[1])));l()})}
function ba(b,c){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(a){j=a;for(a=0;a<j.length;a++)j[a][0]==b&&j[a][1]==c&&j.splice(a,1);k();l()})}function k(){chrome.extension.sendRequest({reqtype:"set-watchedthreads",watchedthreads:j})}function m(b,c,a){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(g){j=g;for(g=0;g<j.length;g++)j[g][0]==c&&j[g][1]==a&&(j[g][4]=b.replace('"',"").replace("<","").replace(">",""));k()})}
function ca(){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(b){j=b;l()})}
function l(){var b=n.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(b!=f){var c=b[1];watchboxtable=document.getElementById("watchboxtable");watchboxtable.innerHTML='<tr><td class="postblock" style="border-right: 0px none;">No.</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">'+chrome.i18n.getMessage("subject")+'</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">'+chrome.i18n.getMessage("author")+'</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">'+
chrome.i18n.getMessage("note")+'</td><td class="postblock" style="border-left: 0px none;">&nbsp;</td></tr>';for(var b=[],a=0;a<j.length;a++)j[a][0]==c&&b.push(j[a]);if(b.length==0)c=document.createElement("tr"),c.innerHTML='<td colspan="5" align="center">'+chrome.i18n.getMessage("no_watched_threads")+"</td>",watchboxtable.appendChild(c);else for(a=0;a<b.length;a++)c=document.createElement("tr"),c.innerHTML='<td style="padding-left: 3px;padding-right: 3px;">'+b[a][1]+'</td><td class="filetitle" style="padding-left: 3px;padding-right: 3px;">'+
b[a][2]+'</td><td class="postername" style="padding-left: 3px;padding-right: 3px;">'+b[a][3]+'</td><td style="padding-left: 3px;padding-right: 3px;"><input type="text" placeholder="'+chrome.i18n.getMessage("enter_a_note")+'" size="12" value="'+b[a][4]+'" id="note'+b[a][0]+b[a][1]+'"></td><td style="padding-left: 3px;padding-right: 3px;"><small>[<a href="/'+b[a][0]+"/res/"+b[a][1]+'">'+chrome.i18n.getMessage("view")+'</a>] [<a href="#" id="delete'+b[a][0]+b[a][1]+'">'+chrome.i18n.getMessage("delete")+
"</a>]</small></td>",watchboxtable.appendChild(c),c=document.getElementById("note"+b[a][0]+b[a][1]),c.setAttribute("board",b[a][0]),c.setAttribute("threadid",b[a][1]),c.onchange=function(){m(this.value,$(this).attr("board"),$(this).attr("threadid"))},c.onkeyup=function(){m(this.value,$(this).attr("board"),$(this).attr("threadid"))},c=document.getElementById("delete"+b[a][0]+b[a][1]),c.setAttribute("board",b[a][0]),c.setAttribute("threadid",b[a][1]),c.addEventListener("click",function(){window.confirm(chrome.i18n.getMessage("stop_watching_thread",
$(this).attr("threadid")))&&ba($(this).attr("board"),$(this).attr("threadid"))},!1)}}function da(b){chrome.extension.sendRequest({reqtype:"get-hiddenthreads"},function(c){o=c;c=n.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(c!=f){for(var a=!1,g=0;g<o.length;g++)o[g][0]==c[1]&&o[g][1]==b&&(a=!0);a||(o.push([c[1],b]),p())}})}
function ea(b){chrome.extension.sendRequest({reqtype:"get-hiddenthreads"},function(c){o=c;c=n.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(c!=f){for(var a=0;a<o.length;a++)o[a][0]==c[1]&&o[a][1]==b&&o.splice(a,1);p()}})}function p(){chrome.extension.sendRequest({reqtype:"set-hiddenthreads",hiddenthreads:o})}
function q(b,c){var a=document.createElement("div"),g="qr"+Math.floor(Math.random()*1E3);a.id=g;a.style.borderTop="0px none";a.style.borderBottom="1px solid #CCCCCC";a.style.borderLeft="1px solid #CCCCCC";a.style.borderRight="1px solid #CCCCCC";a.innerHTML='<span title="'+chrome.i18n.getMessage("close")+'" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" id="close'+g+'">&nbsp;X&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 10px;" class="postblock">'+
chrome.i18n.getMessage("quick_reply")+" (#"+b+")</div>"+r;s&&(a.innerHTML+='<iframe id="'+g+'iframe" src="about:blank" style="display: none;min-width:100px;height:50px;margin:0px;padding:0px;"></iframe>');a.className="reply";a.style.margin="0";a.style.padding="0";a.style.position="absolute";for(var d=c.offsetLeft,e=c.offsetTop,h=c;h.offsetParent;)if(h==document.getElementsByTagName("body")[0])break;else d+=h.offsetParent.offsetLeft,e+=h.offsetParent.offsetTop,h=h.offsetParent;a.style.left=d;a.style.top=
e;d=a.getElementsByTagName("table");for(e=0;e<d.length;e++)d[e].width=="100%"&&d[e].parentNode.removeChild(d[e]);d=a.getElementsByTagName("div");for(e=0;e<d.length;e++)d[e].className!="postblock"&&d[e].id!="recaptcha_area"&&d[e].id!="recaptcha_image"&&d[e].innerHTML.indexOf("recaptcha")==-1&&d[e].parentNode.removeChild(d[e]);d=a.getElementsByTagName("tr");for(e=0;e<d.length;e++)d[e].innerHTML=='<td></td><td colspan="2">\n</td>'&&d[e].parentNode.removeChild(d[e]);if(s){a.getElementsByTagName("form")[0].id=
g+"form";if(a.getElementsByTagName("form")[0].action.search("#")!=-1)a.getElementsByTagName("form")[0].action=a.getElementsByTagName("form")[0].action.split("#")[0];d=a.getElementsByTagName("input");for(e=0;e<d.length;e++)d[e].value=="Submit"&&(d[e].setAttribute("submitted","false"),d[e].setAttribute("qrbid",g),d[e].addEventListener("click",function(){document.getElementById($(this).attr("qrbid")+"iframe").css("display","block");document.getElementById($(this).attr("qrbid")+"form").submit()},!1));
a.getElementsByTagName("form")[0].setAttribute("target",g+"iframe")}i(a,c);firstinput=a.getElementsByTagName("input")[0];d=document.createElement("input");d.name="resto";d.value=b;d.type="hidden";i(d,firstinput);t(a);qrbclose=document.getElementById("close"+g);qrbclose.setAttribute("qrbid",g);qrbclose.addEventListener("click",function(){var a=$(this).attr("qrbid"),a=document.getElementById(a);a.parentNode.removeChild(a)},!1);return a}
function v(b,c){if(w||x||y)b||(b=document),$("a",b).each(function(){var a=f,b=c,d=f;$(this).attr("href")&&(d=$(this).attr("href").match(/.*quote\(\'([0-9]+)\'\)/i));d!=f?(a=d[1],b||(d=n.match(/.*\/res\/([0-9]+).*/i),d!=f&&(b=d[1])),$(this).text().search("X")!=-1&&$(this).text(a)):$(this).hasClass("quotejs")&&(d=$(this).attr("href").match(/[.*]?res\/([0-9]+)(?:\.html)?\#q([0-9]+)/i),d!=f&&(b=d[1],a=d[2],$(this).text().search("X")!=-1&&$(this).text(a)));w&&a&&b&&$(this).attr("href")!="javascript:return false;"&&
($(this).attr("postID",a).attr("threadID",b).attr("thisElement",this),w&&$(this).attr("isQuickReply")!="true"&&($(this).attr("isQuickReply","true"),$(this).click(function(){var a=$(this).attr("threadID"),b=$(this).attr("postID");qrb=q(a,this.parentNode);for(var a=qrb.getElementsByTagName("textarea"),c=0;c<a.length;c++)a[c].value=a[c].value!=""?">>"+b+"\n\n"+a[c].value:">>"+b+"\n";return!1})));if(x&&a&&$(this).attr("processed")==f){if(b=document.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i))d=
document.createElement("a"),d.href="javascript:void(reppop('http://sys.4chan.org/"+b[1]+"/imgboard.php?mode=report&no="+a+"'));",d.style.textDecoration="none",d.innerHTML=' <img border="0" src="'+chrome.extension.getURL("images/button_report.png")+'" title="'+chrome.i18n.getMessage("report_post")+'">',i(d,$(this));$(this).attr("processed","true")}y&&$(this).attr("href")&&$(this).attr("href").toLowerCase()=="mailto:sage"&&$(this).attr("processed")==f&&$(this).html("&nbsp;"+$(this).html()+"&nbsp;").css("textDecoration",
"none").css("background-image","url('"+chrome.extension.getURL("images/sage.png")+"')").css("backgroundRepeat","repeat").attr("processed","true")})}
function z(b){if(A){var c=b.href.match(/.*images\.4chan\.org\/.*\/src\/(.*)/i);c==f&&(c=b.href.match(/.*4chanarchive\.org\/images\/(.*)/i));c==f&&(c=b.href.match(/.*inb4\.im\/.*\/src\/(.*)/i));if(c)b.innerHTML.substring(0,4)=="<img"?$(b).attr("expanded")==void 0&&(img=$("img",b).first(),$(b).attr("expanded","false").attr("expandImage",expandImage).attr("expandOriginalHTML",$(b).html()).attr("thumbSRC",img.attr("src")).attr("thumbWidth",img.attr("width")).attr("thumbHeight",img.attr("height")),$(b).click(function(a){if(a.which==
2)window.open($(this).attr("expandImage"),"_blank");else if(a.which==1||a.which==void 0)$(this).attr("expanded")!="true"?($(this).html('<img style="border: 0px none;min-width: '+$(this).attr("thumbWidth")+"px;min-height: "+$(this).attr("thumbHeight")+'px;" src="'+$(this).attr("expandImage")+'" border="0" align="left" hspace="20">'),$(this).attr("expanded","true")):($(this).html($(this).attr("expandOriginalHTML")),$(this).attr("expanded","false"));return!1}),B&&$(b).click()):expandImage=b.href}}
function C(b,c){$("a",b).each(function(){var a=f;$(this).attr("href")&&(a=$(this).attr("href").match(/.*\/[0-9]+(?:\.html)?#([0-9]+)/i));a==f&&$(this).attr("href")&&(a=$(this).attr("href").match(/\#([0-9]+)/i));a!=f?$(this).html()=="No."?$(b).attr("postID",a[1]).addClass("4c4c_reply"):D&&$(this).attr("refID")==void 0&&$(this).html().match(/^\&gt\;\&gt\;[0-9]+/i)!=f&&($(this).attr("refID",a[1]),$(this).bind("mousemove",function(a){var b=document.getElementById("ref"+$(this).attr("refID"));if(!b){b=
document.createElement("div");b.id="ref"+$(this).attr("refID");b.className="reply";b.style.margin="0";b.style.padding="0";b.style.position="absolute";var c=n.search("4chan.org")==-1?"table":".4c4c_reply";if(c=$(c+'[postID="'+$(this).attr("refID")+'"]').first())$(b).html(c.html()),c.attr("op")=="true"&&($(b).addClass("postblock"),$(b).html('<div style="position: absolute;right: 0px;top: 0px;font-size: 1.5em;margin: 0px;padding: 1px;" class="unkfunc">OP</div>'+$(b).html()));i(b,this)}$(b).css("left",
a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft+25).css("top",a.clientY+document.body.scrollTop+document.documentElement.scrollTop+10)}),$(this).bind("mouseout",function(){$("#ref"+$(this).attr("refID")).remove()})):c&&z(this)})}function E(b,c,a,g,d,e,h){h||(h=[]);if(e&&e.length>0){var u=e.shift();u.width!="100%"&&u.d!="0"&&u.align!="right"&&(b.innerHTML+="<table>"+u.innerHTML+"</table>")}e&&e.length>0?setTimeout(E,1,b,c,a,g,d,e,h):fa(b,c,a,g,d)}
function fa(b,c,a,g,d){c.style.display="none";$('.4c4c_reply[threadID="'+a+'"]').hide();$("table",b).each(function(){C(this,!0)});v(b,a);$('span[id^="omittedposts"]').each(function(){this.id=="omittedposts"+a&&i(b,this)});$(g).html('<img border="0" src="'+chrome.extension.getURL("images/button_retract.png")+'" title="'+chrome.i18n.getMessage("retract")+'">&nbsp;');$(d).html(chrome.i18n.getMessage("thread_expanded",a))}
function ga(b,c,a,g,d){var e=[];$("table",$(c.getElementsByTagName("form")[1])).each(function(){e.push(this)});b.id="replies"+a;E(b,c,a,g,d,e)}
function t(b){b||(b=doc);for(var c=b.getElementsByTagName("input"),a=0;a<c.length;a++)if(c[a].name=="name"){if(F!="")c[a].value=F}else if(c[a].name=="email"){if(G!="")c[a].value=G}else if(c[a].name=="sub"){if(H!="")c[a].value=H}else if(c[a].name=="pwd"&&I!="")c[a].value=I;c=b.getElementsByTagName("textarea");for(a=0;a<c.length;a++)if(c[a].name=="com"&&c[a].value==""&&J!="")c[a].value=J}
function K(b){var c=!1;if(b&&b.length>0&&(c=b.shift(),c.getAttribute("special")!=f||c.getAttribute("postID")>L.getAttribute("postID")))v(c),i(c,L),L=c,M=L.getAttribute("postID");b&&b.length>0&&setTimeout(K,10,b)}function N(b){L||$(".4c4c_reply",document.forms[1]).each(function(){$(this).attr("postID")&&$(this).attr("op")==void 0&&(L=this,M=$(this).attr("postID"))});L||(L=$("blockquote",document.forms[1]).first());K(b)}
function O(){var b=!1,c=n.match(/.*\/res\/([0-9]+).*/i);c!=f&&(b=c[1]);b&&($.ajax({url:P+"res/"+b,e:!0,success:function(a){var b=[],c=document.createElement("span");c.innerHTML=a;$("table",c).each(function(){C(this,!0);$(this).attr("postID")>M&&b.push(this)});N(b)},g:{404:function(){if($(document.forms[1]).attr("has404d")=="false"){var a=[];$(document.forms[1]).attr("has404d","true");var b=document.createElement("span");$(b).attr("special","true").css("color","red").css("fontSize","2.0em").html(chrome.i18n.getMessage("thread_404"));
a.push(b);N(a)}}}}),$(document.forms[1]).attr("has404d")=="false"&&setTimeout(O,1E4))}var r,Q=f,L=!1,M=0,n,P,R=!1,B=!1,w=f,s=f,ha=f,A=f,D=f,S=f,ia=f,ja=f,T=f,y=f,x=f,U=f,V=f,j=f,o=f,F=f,G=f,H=f,J=f,I=f;
function ka(){var b;if(document.forms.length>0){var c=!1;if(!b&&(b=document,c=!0,U&&document.location.href.search("4chan.org")!=-1)){var a=document.createElement("div");a.id="threadwatcher";a.style.borderTop="0px none";a.style.borderBottom="1px solid #CCCCCC";a.style.borderLeft="1px solid #CCCCCC";a.style.borderRight="1px solid #CCCCCC";a.innerHTML='<span title="'+chrome.i18n.getMessage("refresh")+'" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" id="refreshthreadwatcher">&nbsp;R&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 0px;" class="postblock">'+
chrome.i18n.getMessage("watched_threads")+'</div><table cellpadding="1" cellspacing="0" id="watchboxtable" style="margin: 3px;"></table>';a.className="reply";a.style.margin="0";a.style.padding="0";a.style.position="absolute";a.style.left="10";a.style.top="25";i(a,document.getElementsByTagName("table")[0]);l();document.getElementById("refreshthreadwatcher").addEventListener("click",function(){ca()},!1)}scrolltotopthread=!1;a=window.location.href.match(/http\:\/\/.*\.4chan\.org\/.*\?browse/i);T&&a!=
f&&(scrolltotopthread=!0);$("a",b).each(function(){if($(this).html()=="Reply"&&w){var a=f;$(this).attr("href")&&(a=$(this).attr("href").match(/.*\/([0-9]+)(?:\.html)?/i));if(a!=f){var a=a[1],c=document.createElement("a");c.href="javascript:false;";c.innerHTML='<img border="0" src="'+chrome.extension.getURL("images/button_quickreply.png")+'" title="'+chrome.i18n.getMessage("quick_reply")+'">';c.setAttribute("onclick","return false;");c.setAttribute("threadID",a);c.addEventListener("click",function(){for(var a=
b.getElementsByTagName("input"),c=0;c<a.length;c++)a[c].name.search($(this).attr("threadID"))!=-1&&q($(this).attr("threadID"),a[c])},!1);this.parentNode.innerHTML+='<span id="spacer'+a+'">&nbsp;</span>';i(c,b.getElementById("spacer"+a))}}else $(this).html()=="No."?(a=f,$(this).attr("href")&&(a=$(this).attr("href").match(/.*\/([0-9]+)(?:\.html)?\#([0-9]+)/i)),a!=f&&a[1]==a[2]&&$(this).attr("name",a[1])):z(this)});Q=document.forms.delform?document.forms[1]:document.body;if(c&&Q){ia&&(a=window.location.href.match(/(^.*)\/res\/[0-9]+.*/i),
a==f&&(a=window.location.href.match(/(^.*)\//i)),a!=f&&(document.forms[0].action+="#return="+encodeURI(a[1])));r=$(".postarea").first().html();t(document);var a=Q.childNodes,g="thread"+Math.floor(Math.random()*1E3),d=f;U&&(d=document.createElement("a"));L=threadID=lastnode=f;topthread=!1;lasthr=f;for(c=0;c<a.length;c++){node=a[c];if(node.nodeName.toLowerCase()!="hr"){if(!node.setAttribute){var e=document.createElement("span");i(e,node);e.appendChild(node);node=e}node.setAttribute("hidethread",g)}topthread||
(topthread=node,scrolltotopthread&&window.scrollTo(0,topthread.offsetTop));if(!threadID&&node.nodeName.toLowerCase()=="input"&&node.type=="checkbox"){threadID=node.name;if(U)d.id="watch"+threadID,d.style.textDecoration="none",d.innerHTML='<img border="0" src="'+chrome.extension.getURL("images/button_watch.png")+'" title="'+chrome.i18n.getMessage("watch_thread")+'"> ',d.href="#",d.setAttribute("onClick","javascript:return false;"),d.setAttribute("threadID",threadID),d.addEventListener("click",function(){var a=
n.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(a!=f){var b=$(this).attr("postsubject");b==""&&(b="&nbsp;");var c=$(this).attr("postname");c==""&&(c="&nbsp;");a=[a[1],$(this).attr("threadID"),b,c,""];aa(a)}},!1),i(d,node);if(V)e=document.createElement("a"),e.id="threadhider"+threadID,e.style.textDecoration="none",e.innerHTML='<img border="0" src="'+chrome.extension.getURL("images/button_retract.png")+'" title="'+chrome.i18n.getMessage("hide_thread")+'"> ',e.href="#",$(e).attr("threadID",threadID).attr("hidethreadID",
g),$(e).click(function(){da($(this).attr("threadID"));$('[hidethread="'+$(this).attr("hidethreadID")+'"]').hide();$("#unhide"+$(this).attr("hidethreadID")).show();return!1}),i(e,node)}U&&node.className&&(node.className.toLowerCase()=="filetitle"?d.setAttribute("postsubject",node.textContent):node.className.toLowerCase()=="postername"&&d.setAttribute("postname",node.textContent));if(node.nodeName.toLowerCase()=="table"&&!node.getAttribute("align")){if(n.search("4chan.org")==-1)for(var e=node.getElementsByTagName("input"),
h=0;h<e.length;h++)e[h].type=="checkbox"&&node.setAttribute("postID",e[h].name);node.setAttribute("threadID",threadID);v(node,threadID);C(node);L=node;M=node.getAttribute("postID")}ha&&node.className&&node.className.toLowerCase()=="omittedposts"&&(e=document.createElement("a"),$(e).attr("href","#").attr("threadID",threadID).attr("expanded","false").css("textDecoration","none"),$(e).html('<img border="0" src="'+chrome.extension.getURL("images/button_expand.png")+'" title="'+chrome.i18n.getMessage("expand_thread")+
'">&nbsp;'),$(node).attr("threadID",threadID).html('<span id="spacer2'+threadID+'"></span><span id="omittedposts'+threadID+'">'+node.innerHTML+"</span>"),h=document.getElementById("spacer2"+threadID),h.parentNode.insertBefore(e,h),$(e).click(function(){var a=$("#omittedposts"+$(this).attr("threadID"));if($(this).attr("expanded")=="true")document.getElementById("replies"+$(this).attr("threadID")).parentNode.removeChild(document.getElementById("replies"+$(this).attr("threadID"))),$(this).html($(this).attr("retracthtml")),
a.html(chrome.i18n.getMessage("thread_retracted",$(this).attr("threadID"))+'<br clear="left">'),$(this).attr("expanded","false");else{$(this).attr("retracthtml",$(this).html());a.html(chrome.i18n.getMessage("thread_expanding",$(this).attr("threadID")));this.style.textDecoration="none";this.style.color="#000000";this.style.fontWeight="bold";$(this).html('<img border="0" src="'+chrome.extension.getURL("images/button_expandwait.png")+'">&nbsp;');var b=new XMLHttpRequest;b.open("GET",P+"res/"+$(this).attr("threadID"),
!0);b.send();b.c=$(this).attr("threadID");b.b=this;b.a=a;b.onreadystatechange=function(){if(b.readyState==4)if(b.status==200){$(this.b).attr("expanded","true");var a=document.createElement("span"),c=document.createElement("span");c.innerHTML=b.responseText;ga(a,c,this.c,this.b,this.a)}else b.status==404&&$(this.a).html(chrome.i18n.getMessage("thread_404"))}}return!1}));if(T&&node.className&&node.className.toLowerCase()=="pages"){e=node.getElementsByTagName("a");for(h=0;h<e.length;h++)e[h].href+="?browse";
e=node.getElementsByTagName("form");for(h=0;h<e.length;h++)e[h].action+="?browse"}if(node.nodeName.toLowerCase()=="hr"&&lastnode&&lastnode.nodeName.toLowerCase()=="br"){if(V)d=document.createElement("span"),d.innerHTML='<a href="#" id="triggerunhide'+g+'"><img border="0" src="'+chrome.extension.getURL("images/button_expand.png")+'" title="'+chrome.i18n.getMessage("unhide_thread")+'"></a> '+chrome.i18n.getMessage("thread_is_hidden",threadID),d.id="unhide"+g,d.style.display="none",i(d,lastnode.previousSibling),
d=document.getElementById("triggerunhide"+g),$(d).attr("threadID",threadID).attr("hidethreadID",g),$(d).click(function(){ea($(this).attr("threadID"));$('[hidethread="'+$(this).attr("hidethreadID")+'"]').show();$("#unhide"+$(this).attr("hidethreadID")).hide();return!1});lasthr=node;threadID=f;g="thread"+Math.floor(Math.random()*1E3);d=document.createElement("a")}lastnode=node}e=Q.innerHTML.split('<br clear="left"><hr>');if(!R){for(c=0;c<e.length;c++)if(a=e[c].match(/.*\<input type\=\"checkbox\" name\=\"([0-9]+)\".*/i),
a!=f){g=document.createElement("table");g.innerHTML=e[c].split("</blockquote>")[0]+"</blockquote>";d=g.innerHTML.split("<hr>");if(d.length>0)g.innerHTML=d.pop();g.className="4c4c_reply";g.setAttribute("postID",a[1]);g.setAttribute("op","true");g.style.display="none";Q.appendChild(g)}R=!0}S&&(a=n.match(/.*\/res\/[0-9]+.*/i),a!=f&&$(Q).attr("has404d")==void 0&&($(Q).attr("has404d","false"),setTimeout(O,1E4)),S=!1);v(b,f);if(V&&(a=n.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i),a!=f))for(c=0;c<o.length;c++)o[c][0]==
a[1]&&$("#threadhider"+o[c][1]).click();if(ja&&(a=n.match(/.*\/res\/[0-9]+.*/i),n.search("4chan.org")!=-1&&a))c=document.createElement("table"),c.className="reply",c.style.clear="both",c.innerHTML='<tr onclick="self.scrollTo(0,0);" style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">'+chrome.i18n.getMessage("return_to_top")+'</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>',i(c,lasthr);if(T&&(a=window.location.href.match(/(^.*)\/res\/[0-9]+.*/i),
a==f))c=document.createElement("table"),c.className="reply",c.style.clear="both",c.innerHTML='<tr style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">'+chrome.i18n.getMessage("browse_new_threads")+'</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>',c.addEventListener("click",function(){var a=window.location.href.match(/http\:\/\/(.*)\.4chan\.org\/(.*)\/.*/i);if(a!=f)window.location="http://"+a[1]+".4chan.org/"+
a[2]+"/?browse"},!1),i(c,lasthr)}}}var W=!1,la,ma,X;function na(b){if(W)return X.style.left=tx+b.clientX-la,X.style.top=ty+b.clientY-ma,!1}
document.addEventListener("mousedown",function(b){for(var c=b.target;c.tagName.toLowerCase()!="html"&&!(c.className=="postblock"&&c.style.textAlign=="center");)c=c.parentNode;if(c.className=="postblock"&&c.style.textAlign=="center")return W=!0,X=c.parentNode,tx=parseInt(X.style.left+0,10),ty=parseInt(X.style.top+0,10),la=b.clientX,ma=b.clientY,document.onmousemove=na,!1},!1);document.addEventListener("mouseup",function(){W=!1},!1);
if(document.forms.length==0){var Y=window.location.href.match(/http\:\/\/.*\.4chan\.org\/.*\#return\=(.*)/i);if(Y!=f&&document.body.innerHTML.search("<\!-- thread:")>-1&&document.body.innerHTML.search("<\!-- thread:")<500){var Z=document.body.innerHTML.match(/\.*<\!-- thread\:([0-9]+),no\:([0-9]+) --\>.*/i);if(Z!=f)Z[1]==0&&(Z[1]=Z[2]),window.location=decodeURI(Y[1])+"/res/"+Z[1]+"#"+Z[2]}}var oa=!1;n=document.location.href;Y=n.match(/.*\/\/([0-9a-zA-Z]+)\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
if(Y!=f){if(Y[1]=="sys"||Y[1]=="dis"||Y[2]=="f")oa=!0;P="http://"+Y[1]+".4chan.org/"+Y[2]+"/"}
oa||(chrome.extension.sendRequest({reqtype:"get-options"},function(b){w=b.quickreply;s=b.quickreplyiframe;ha=b.expand;A=b.expandimages;D=b.preview;S=b.fetchreplies;ia=b.autonoko;y=b.sage;x=b.report;U=b.threadwatcher;V=b.hidethreads;ja=b.returntotop;T=b.quickbrowse;j=b.watchedthreads;o=b.hiddenthreads;F=b.default_name;G=b.default_email;H=b.default_subject;J=b.default_comment;I=b.default_password;ka()}),chrome.extension.onRequest.addListener(function(b){if(b.reqtype=="expandall")B=!0,$('a[expanded="false"]').each(function(){$(this).click()});
else if(b.reqtype=="visiturl")document.location.href=b.url}));
