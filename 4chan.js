var h=true,i=null,m=false;function n(b,d){var a=d.parentNode;a.f==d?a.appendChild(b):a.insertBefore(b,d.nextSibling)}function o(b,d){for(var a=[],c=document.getElementsByTagName("*"),e=0;e<c.length;e+=1)c[e].hasAttribute(b)&&c[e].getAttribute(b)==d&&a.push(c[e]);return a}
function aa(b){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(d){p=d;d=m;for(var a=0;a<p.length;a++)if(p[a][0]==b[0]&&p[a][1]==b[1])d=h;if(d)alert(chrome.i18n.getMessage("thread_already_watched",b[1]));else{p.push(b);q();alert(chrome.i18n.getMessage("thread_now_watched",b[1]))}r()})}function ba(b,d){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(a){p=a;for(a=0;a<p.length;a++)p[a][0]==b&&p[a][1]==d&&p.splice(a,1);q();r()})}
function q(){chrome.extension.sendRequest({reqtype:"set-watchedthreads",watchedthreads:p})}function s(b,d,a){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(c){p=c;for(c=0;c<p.length;c++)if(p[c][0]==d&&p[c][1]==a)p[c][4]=b.replace('"',"").replace("<","").replace(">","");q()})}function ca(){chrome.extension.sendRequest({reqtype:"get-watchedthreads"},function(b){p=b;r()})}
function r(){var b=window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(b!=i){var d=b[1];watchboxtable=document.getElementById("watchboxtable");watchboxtable.innerHTML='<tr><td class="postblock" style="border-right: 0px none;">No.</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">'+chrome.i18n.getMessage("subject")+'</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">'+chrome.i18n.getMessage("author")+'</td><td class="postblock" style="border-left: 0px none;border-right: 0px none;">'+
chrome.i18n.getMessage("note")+'</td><td class="postblock" style="border-left: 0px none;">&nbsp;</td></tr>';b=[];for(var a=0;a<p.length;a++)p[a][0]==d&&b.push(p[a]);if(b.length==0){d=document.createElement("tr");d.innerHTML='<td colspan="5" align="center">'+chrome.i18n.getMessage("no_watched_threads")+"</td>";watchboxtable.appendChild(d)}else for(a=0;a<b.length;a++){d=document.createElement("tr");d.innerHTML='<td style="padding-left: 3px;padding-right: 3px;">'+b[a][1]+'</td><td class="filetitle" style="padding-left: 3px;padding-right: 3px;">'+
b[a][2]+'</td><td class="postername" style="padding-left: 3px;padding-right: 3px;">'+b[a][3]+'</td><td style="padding-left: 3px;padding-right: 3px;"><input type="text" placeholder="'+chrome.i18n.getMessage("enter_a_note")+'" size="12" value="'+b[a][4]+'" id="note'+b[a][0]+b[a][1]+'"></td><td style="padding-left: 3px;padding-right: 3px;"><small>[<a href="/'+b[a][0]+"/res/"+b[a][1]+'">'+chrome.i18n.getMessage("view")+'</a>] [<a href="#" id="delete'+b[a][0]+b[a][1]+'">'+chrome.i18n.getMessage("delete")+
"</a>]</small></td>";watchboxtable.appendChild(d);d=document.getElementById("note"+b[a][0]+b[a][1]);d.setAttribute("board",b[a][0]);d.setAttribute("threadid",b[a][1]);d.onchange=function(){s(this.value,this.getAttribute("board"),this.getAttribute("threadid"))};d.onkeyup=function(){s(this.value,this.getAttribute("board"),this.getAttribute("threadid"))};d=document.getElementById("delete"+b[a][0]+b[a][1]);d.setAttribute("board",b[a][0]);d.setAttribute("threadid",b[a][1]);d.addEventListener("click",function(){window.confirm(chrome.i18n.getMessage("stop_watching_thread",
this.getAttribute("threadid")))&&ba(this.getAttribute("board"),this.getAttribute("threadid"))},m)}}}function da(b){chrome.extension.sendRequest({reqtype:"get-hiddenthreads"},function(d){u=d;d=window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(d!=i){for(var a=m,c=0;c<u.length;c++)if(u[c][0]==d[1]&&u[c][1]==b)a=h;if(!a){u.push([d[1],b]);v()}}})}
function ea(b){chrome.extension.sendRequest({reqtype:"get-hiddenthreads"},function(d){u=d;d=window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(d!=i){for(var a=0;a<u.length;a++)u[a][0]==d[1]&&u[a][1]==b&&u.splice(a,1);v()}})}function v(){chrome.extension.sendRequest({reqtype:"set-hiddenthreads",hiddenthreads:u})}
function w(b,d){var a=document.createElement("div"),c="qr"+Math.floor(Math.random()*1E3);a.id=c;a.style.borderTop="0px none";a.style.borderBottom="1px solid #CCCCCC";a.style.borderLeft="1px solid #CCCCCC";a.style.borderRight="1px solid #CCCCCC";a.innerHTML='<span title="'+chrome.i18n.getMessage("close")+'" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" onclick="javascript:var qr=document.getElementById(\''+c+'\');qr.parentNode.removeChild(qr);return false;">&nbsp;X&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 10px;" class="postblock">'+
chrome.i18n.getMessage("quick_reply")+" (#"+b+")</div>"+x;if(y)a.innerHTML+='<iframe id="'+c+'iframe" src="about:blank" style="display: none;min-width:100px;height:50px;margin:0px;padding:0px;"></iframe>';a.className="reply";a.style.margin="0";a.style.padding="0";a.style.position="absolute";for(var e=d.offsetLeft,f=d.offsetTop,g=d;g.offsetParent;)if(g==document.getElementsByTagName("body")[0])break;else{e+=g.offsetParent.offsetLeft;f+=g.offsetParent.offsetTop;g=g.offsetParent}a.style.left=e;a.style.top=
f;e=a.getElementsByTagName("table");for(f=0;f<e.length;f++)e[f].width=="100%"&&e[f].parentNode.removeChild(e[f]);e=a.getElementsByTagName("div");for(f=0;f<e.length;f++)e[f].className!="postblock"&&e[f].id!="recaptcha_area"&&e[f].id!="recaptcha_image"&&e[f].innerHTML.indexOf("recaptcha")==-1&&e[f].parentNode.removeChild(e[f]);e=a.getElementsByTagName("tr");for(f=0;f<e.length;f++)e[f].innerHTML=='<td></td><td colspan="2">\n</td>'&&e[f].parentNode.removeChild(e[f]);if(y){a.getElementsByTagName("form")[0].id=
c+"form";if(a.getElementsByTagName("form")[0].action.search("#")!=-1)a.getElementsByTagName("form")[0].action=a.getElementsByTagName("form")[0].action.split("#")[0];e=a.getElementsByTagName("input");for(f=0;f<e.length;f++)if(e[f].value=="Submit"){e[f].setAttribute("submitted","false");e[f].setAttribute("qrbid",c);e[f].addEventListener("click",function(){document.getElementById(this.getAttribute("qrbid")+"iframe").style.display="block";document.getElementById(this.getAttribute("qrbid")+"form").submit()},
m)}a.getElementsByTagName("form")[0].setAttribute("target",c+"iframe")}n(a,d);firstinput=a.getElementsByTagName("input")[0];c=document.createElement("input");c.name="resto";c.value=b;c.type="hidden";n(c,firstinput);z(a);return a}
function A(b,d){if(B||C||D){b||(b=document);for(var a=b.getElementsByTagName("a"),c=0;c<a.length;c++){var e=i,f=d,g=a[c].href.match(/.*quote\(\'([0-9]+)\'\)/i);if(g!=i){e=g[1];if(!f){g=window.location.href.match(/.*\/res\/([0-9]+).*/i);if(g!=i)f=g[1]}if(a[c].textContent.search("X")!=-1)a[c].textContent=e}else if(a[c].className=="quotejs"){g=a[c].href.match(/[.*]?res\/([0-9]+)(?:\.html)?\#q([0-9]+)/i);if(g!=i){f=g[1];e=g[2];if(a[c].textContent.search("X")!=-1)a[c].textContent=e}}if(B&&e&&f&&a[c].href!=
"javascript:return false;"){a[c].setAttribute("postID",e);a[c].setAttribute("threadID",f);a[c].setAttribute("thisElement",a[c]);a[c].setAttribute("isQuickReply","true");B&&a[c].addEventListener("click",function(){var k=this.getAttribute("threadID"),l=this.getAttribute("postID");qrb=w(k,this.parentNode);k=qrb.getElementsByTagName("textarea");for(var j=0;j<k.length;j++)k[j].value=k[j].value!=""?">>"+l+"\n\n"+k[j].value:">>"+l+"\n"},m);a[c].href="javascript:false;"}if(C&&e&&a[c].getAttribute("processed")==
i){if(f=document.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i)){g=document.createElement("a");g.href="javascript:reppop('http://sys.4chan.org/"+f[1]+"/imgboard.php?mode=report&no="+e+"');return false;";g.style.textDecoration="none";g.innerHTML=' <img border="0" src="'+chrome.extension.getURL("button_report.png")+'" title="'+chrome.i18n.getMessage("report_post")+'">';n(g,a[c])}a[c].setAttribute("processed","true")}if(D&&a[c].href.toLowerCase()=="mailto:sage"&&a[c].getAttribute("processed")==
i){a[c].innerHTML="&nbsp;"+a[c].innerHTML+"&nbsp;";a[c].style.textDecoration="none";a[c].style.background="url('"+chrome.extension.getURL("sage.png")+"')";a[c].style.backgroundRepeat="repeat";a[c].setAttribute("processed","true")}}}}
function E(b){if(F){var d=b.href.match(/.*images\.4chan\.org\/.*\/src\/(.*)/i);if(d==i)d=b.href.match(/.*4chanarchive\.org\/images\/(.*)/i);if(d==i)d=b.href.match(/.*inb4\.im\/.*\/src\/(.*)/i);if(d)if(b.innerHTML.substring(0,4)=="<img"){if(b.getAttribute("expanded")==i){b.setAttribute("expanded","false");b.setAttribute("expandImage",expandImage);b.setAttribute("expandOriginalHTML",b.innerHTML);b.setAttribute("onClick","javascript:return false;");img=b.getElementsByTagName("img")[0];b.setAttribute("thumbSRC",
img.getAttribute("src"));b.setAttribute("thumbWidth",img.getAttribute("width"));b.setAttribute("thumbHeight",img.getAttribute("height"));b.target="_self";b.addEventListener("click",function(a){if(a.which==2)window.open(this.getAttribute("expandImage"),"_blank");else if(a.which==1)if(this.getAttribute("expanded")!="true"){this.innerHTML='<img style="border: 1px dashed black;min-width: '+this.getAttribute("thumbWidth")+"px;min-height: "+this.getAttribute("thumbHeight")+'px;" src="'+this.getAttribute("expandImage")+
'" border="0" align="left" hspace="20">';this.setAttribute("expanded","true")}else{this.innerHTML=this.getAttribute("expandOriginalHTML");this.setAttribute("expanded","false")}},m);if(G){d=document.createEvent("MouseEvents");d.initMouseEvent("click",h,h,window,0,0,0,0,0,m,m,m,m,0,i);b.dispatchEvent(d)}}}else expandImage=b.href}}
function H(b,d){for(var a=b.getElementsByTagName("a"),c=0;c<a.length;c++){var e=a[c].href.match(/.*\/[0-9]+(?:\.html)?#([0-9]+)/i);if(e==i)e=a[c].href.match(/\#([0-9]+)/i);if(e!=i)if(a[c].innerHTML=="No."){b.setAttribute("postID",e[1]);b.className="4c4c_reply"}else{if(I&&a[c].getAttribute("refID")==i)if(a[c].innerHTML.match(/^\&gt\;\&gt\;[0-9]+/i)!=i){a[c].setAttribute("refID",e[1]);a[c].addEventListener("mousemove",function(f){var g=document.getElementById("ref"+this.getAttribute("refID"));if(!g){g=
document.createElement("div");g.id="ref"+this.getAttribute("refID");g.className="reply";g.style.margin="0";g.style.padding="0";g.style.position="absolute";for(var k=window.location.href.search("4chan.org")==-1?document.getElementsByTagName("table"):document.getElementsByClassName("4c4c_reply"),l=0;l<k.length;l++){var j=k[l].getAttribute("postID");if(j&&j==this.getAttribute("refID")){g.innerHTML=k[l].innerHTML;if(k[l].getAttribute("op")=="true"){g.className="postblock";g.innerHTML='<div style="position: absolute;right: 0px;top: 0px;font-size: 1.5em;margin: 0px;padding: 1px;" class="unkfunc">OP</div>'+
g.innerHTML}}}n(g,this)}g.style.left=f.clientX+document.body.scrollLeft+document.documentElement.scrollLeft+25;g.style.top=f.clientY+document.body.scrollTop+document.documentElement.scrollTop+10},m);a[c].addEventListener("mouseout",function(){var f=document.getElementById("ref"+this.getAttribute("refID"));f&&f.parentNode.removeChild(f)},m)}}else d&&E(a[c])}}
function fa(b,d,a,c,e,f,g){g||(g=[]);if(f&&f.length>0){var k=f.shift();if(k.width!="100%"&&k.e!="0"&&k.align!="right")b.innerHTML+="<table>"+k.innerHTML+"</table>"}if(f&&f.length>0)setTimeout(fa,1,b,d,a,c,e,f,g);else{d.style.display="none";d=document.getElementsByClassName("4c4c_reply");for(f=0;f<d.length;f++)if(d[f].getAttribute("threadID")==a)d[f].style.display="none";d=b.getElementsByTagName("table");for(f=0;f<d.length;f++)H(d[f],h);A(b,a);d=document.getElementsByTagName("span");for(f=0;f<d.length;f++)d[f].id==
"omittedposts"+a&&n(b,d[f]);c.innerHTML='<img border="0" src="'+chrome.extension.getURL("button_retract.png")+'" title="'+chrome.i18n.getMessage("retract")+'">&nbsp;';e.innerHTML=chrome.i18n.getMessage("thread_expanded",a)}}
function z(b){b||(b=document);for(var d=b.getElementsByTagName("input"),a=0;a<d.length;a++)if(d[a].name=="name"){if(J!="")d[a].value=J}else if(d[a].name=="email"){if(K!="")d[a].value=K}else if(d[a].name=="sub"){if(L!="")d[a].value=L}else if(d[a].name=="pwd")if(M!="")d[a].value=M;d=b.getElementsByTagName("textarea");for(a=0;a<d.length;a++)if(d[a].name=="com")if(d[a].value==""&&N!="")d[a].value=N}
function ga(b,d){var a=m;if(b&&b.length>0){a=b.shift();if(a.getAttribute("special")!=i||a.getAttribute("postID")>Q.getAttribute("postID")){A(a);n(a,Q);Q=a;R=Q.getAttribute("postID")}}if(b&&b.length>0)setTimeout(ga,10,b,d);else S=d}
function ka(){var b=m,d=window.location.href.match(/.*\/res\/([0-9]+).*/i);if(d!=i)b=d[1];if(b){var a=new XMLHttpRequest;a.open("HEAD",b,h);a.send();a.a=b;a.onreadystatechange=function(){if(a.readyState==4)if(S&&(a.status==404||a.getResponseHeader("Last-Modified")!=S)){var c=new XMLHttpRequest;c.open("GET",a.a,h);c.send();c.a=a.a;c.onreadystatechange=function(){var e=[];e.length=0;if(c.status==404){if(document.forms[1].getAttribute("has404d")=="false"){document.forms[1].setAttribute("has404d","true");
var f=document.createElement("span");f.setAttribute("special","true");f.innerHTML=chrome.i18n.getMessage("thread_404");f.style.color="red";f.style.fontSize="2.0em";e.push(f)}}else if(c.status==200){f=document.createElement("span");f.innerHTML=c.responseText;f=f.getElementsByTagName("table");for(var g=0;g<f.length;g++){H(f[g],h);f[g].getAttribute("postID")!=i&&f[g].getAttribute("postID")>R&&e.push(f[g])}}if(e.length>0){S=m;f=c.getResponseHeader("Last-Modified");if(!Q){g=document.forms[1].getElementsByClassName("4c4c_reply");
for(var k=0;k<g.length;k++)if(g[k].getAttribute("postID")!=i&&g[k].getAttribute("op")==i){Q=g[k];R=Q.getAttribute("postID")}}Q||(Q=document.forms[1].getElementsByTagName("blockquote")[0]);ga(e,f)}}}};document.forms[1].getAttribute("has404d")=="false"&&setTimeout(ka,1E4)}}var x,T=i,Q=m,R=0,S=document.lastModified,la=m,G=m,B=i,y=i,ma=i,F=i,I=i,U=i,na=i,oa=i,D=i,C=i,V=i,W=i,p=i,u=i,J=i,K=i,L=i,N=i,M=i;
function pa(b){if(document.forms.length>0){var d=m;if(!b){b=document;d=h;if(V&&window.location.href.search("4chan.org")!=-1){var a=document.createElement("div");a.id="threadwatcher";a.style.borderTop="0px none";a.style.borderBottom="1px solid #CCCCCC";a.style.borderLeft="1px solid #CCCCCC";a.style.borderRight="1px solid #CCCCCC";a.innerHTML='<span title="'+chrome.i18n.getMessage("refresh")+'" style="float: right;cursor: pointer;font-weight: bold;font-size: 1.1em;padding: 1px;" id="refreshthreadwatcher">&nbsp;R&nbsp;</span><div style="text-align: center;cursor: move;padding: 1px;margin-bottom: 0px;" class="postblock">'+
chrome.i18n.getMessage("watched_threads")+'</div><table cellpadding="1" cellspacing="0" id="watchboxtable" style="margin: 3px;"></table>';a.className="reply";a.style.margin="0";a.style.padding="0";a.style.position="absolute";a.style.left="10";a.style.top="25";n(a,document.getElementsByTagName("table")[0]);r();document.getElementById("refreshthreadwatcher").addEventListener("click",function(){ca()},m)}}var c=b.getElementsByTagName("a");for(a=0;a<c.length;a++)if(c[a].innerHTML=="Reply"&&B){var e=c[a].href.match(/.*\/([0-9]+)(?:\.html)?/i);
if(e!=i){e=e[1];var f=document.createElement("a");f.href="#";f.innerHTML='<img border="0" src="'+chrome.extension.getURL("button_quickreply.png")+'" title="'+chrome.i18n.getMessage("quick_reply")+'">';f.setAttribute("onclick","return false;");f.setAttribute("threadID",e);f.addEventListener("click",function(){for(var l=b.getElementsByTagName("input"),j=0;j<l.length;j++)l[j].name.search(this.getAttribute("threadID"))!=-1&&w(this.getAttribute("threadID"),l[j])},m);c[a].parentNode.innerHTML+='<span id="spacer'+
e+'">&nbsp;</span>';var g=b.getElementById("spacer"+e);n(f,g)}}else if(c[a].innerHTML=="No."){e=c[a].href.match(/.*\/([0-9]+)(?:\.html)?\#([0-9]+)/i);if(e!=i)if(e[1]==e[2])c[a].name=e[1]}else E(c[a]);T=document.forms.delform?document.forms[1]:document.body;if(d&&T){if(na){e=window.location.href.match(/(^.*)\/res\/[0-9]+.*/i);if(e==i)e=window.location.href.match(/(^.*)\//i);if(e!=i)document.forms[0].action+="#return="+encodeURI(e[1])}c=document.getElementsByTagName("div");for(a=0;a<c.length;a++)if(c[a].className==
"postarea"){x=c[a].innerHTML;z(document)}d=T.childNodes;f="thread"+Math.floor(Math.random()*1E3);var k=i;if(V)k=document.createElement("a");Q=e=lastnode=i;for(a=0;a<d.length;a++){node=d[a];if(node.nodeName.toLowerCase()!="hr"){if(!node.setAttribute){c=document.createElement("span");n(c,node);c.appendChild(node);node=c}node.setAttribute("hidethread",f)}if(!e&&node.nodeName.toLowerCase()=="input"&&node.type=="checkbox"){e=node.name;if(W){c=document.createElement("a");c.id="threadhider"+e;c.style.textDecoration=
"none";c.innerHTML='<img border="0" src="'+chrome.extension.getURL("button_retract.png")+'" title="'+chrome.i18n.getMessage("hide_thread")+'"> ';c.href="#";c.setAttribute("onClick","javascript:return false;");c.setAttribute("threadID",e);c.setAttribute("hidethreadID",f);c.addEventListener("click",function(){da(this.getAttribute("threadID"));for(var l=o("hidethread",this.getAttribute("hidethreadID"),m),j=0;j<l.length;j++)l[j].style.display="none";document.getElementById("unhide"+this.getAttribute("hidethreadID")).style.display=
"block"},m);n(c,node)}if(V){k.id="watch"+e;k.style.textDecoration="none";k.innerHTML='<img border="0" src="'+chrome.extension.getURL("button_watch.png")+'" title="'+chrome.i18n.getMessage("watch_thread")+'"> ';k.href="#";k.setAttribute("onClick","javascript:return false;");k.setAttribute("threadID",e);k.addEventListener("click",function(){var l=window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(l!=i){var j=this.getAttribute("postsubject");if(j=="")j="&nbsp;";var t=this.getAttribute("postname");
if(t=="")t="&nbsp;";l=[l[1],this.getAttribute("threadID"),j,t,""];aa(l)}},m);n(k,node)}}if(V&&node.className)if(node.className.toLowerCase()=="filetitle")k.setAttribute("postsubject",node.textContent);else node.className.toLowerCase()=="postername"&&k.setAttribute("postname",node.textContent);if(node.nodeName.toLowerCase()=="table"&&!node.getAttribute("align")){if(window.location.href.search("4chan.org")==-1){c=node.getElementsByTagName("input");for(g=0;g<c.length;g++)c[g].type=="checkbox"&&node.setAttribute("postID",
c[g].name)}node.setAttribute("threadID",e);A(node,e);H(node);Q=node;R=node.getAttribute("postID")}if(node.className&&node.className.toLowerCase()=="omittedposts"&&ma){c=document.createElement("a");c.style.textDecoration="none";c.innerHTML='<img border="0" src="'+chrome.extension.getURL("button_expand.png")+'" title="'+chrome.i18n.getMessage("expand_thread")+'">&nbsp;';c.href="#";c.setAttribute("onClick","javascript:return false;");c.setAttribute("threadID",e);node.innerHTML='<span id="spacer2'+e+
'"></span><span id="omittedposts'+e+'">'+node.innerHTML+"</span>";g=document.getElementById("spacer2"+e);g.insertBefore(c);node.setAttribute("threadID",e);g.setAttribute("threadID",e);g.setAttribute("expanded","false");g.addEventListener("click",function(){var l=document.getElementById("omittedposts"+this.getAttribute("threadID"));if(this.getAttribute("expanded")=="true"){document.getElementById("replies"+this.getAttribute("threadID")).parentNode.removeChild(document.getElementById("replies"+this.getAttribute("threadID")));
this.innerHTML=this.getAttribute("retracthtml");l.innerHTML=chrome.i18n.getMessage("thread_retracted",this.getAttribute("threadID"))+'<br clear="left">';this.setAttribute("expanded","false")}else{this.setAttribute("retracthtml",this.innerHTML);l.innerHTML=chrome.i18n.getMessage("thread_expanding",this.getAttribute("threadID"));this.style.textDecoration="none";this.style.color="#000000";this.style.fontWeight="bold";this.innerHTML='<img border="0" src="'+chrome.extension.getURL("button_expandwait.png")+
'">&nbsp;';var j=new XMLHttpRequest;j.open("GET","res/"+this.getAttribute("threadID"),h);j.send();j.a=this.getAttribute("threadID");j.c=this;j.b=l;j.onreadystatechange=function(){if(j.readyState==4)if(j.status==200){this.c.setAttribute("expanded","true");var t=document.createElement("span"),O=document.createElement("span");O.innerHTML=j.responseText;for(var ha=this.a,ta=this.c,ua=this.b,ia=O.getElementsByTagName("form")[1].getElementsByTagName("table"),ja=[],P=0;P<ia.length;P++)ja.push(ia[P]);t.id=
"replies"+ha;fa(t,O,ha,ta,ua,ja)}else if(j.status==404)this.b.innerHTML=chrome.i18n.getMessage("thread_404")}}},m)}if(node.nodeName.toLowerCase()=="hr"&&lastnode&&lastnode.nodeName.toLowerCase()=="br"){if(W){c=document.createElement("span");c.innerHTML='<a href="#" id="triggerunhide'+f+'"><img border="0" src="'+chrome.extension.getURL("button_expand.png")+'" title="'+chrome.i18n.getMessage("unhide_thread")+'"></a> '+chrome.i18n.getMessage("thread_is_hidden",e);c.id="unhide"+f;c.style.display="none";
n(c,lastnode.previousSibling);c=document.getElementById("triggerunhide"+f);c.setAttribute("onClick","javascript:return false;");c.setAttribute("threadID",e);c.setAttribute("hidethreadID",f);c.addEventListener("click",function(){ea(this.getAttribute("threadID"));for(var l=o("hidethread",this.getAttribute("hidethreadID"),m),j=0;j<l.length;j++)l[j].style.display="block";document.getElementById("unhide"+this.getAttribute("hidethreadID")).style.display="none"},m)}e=i;f="thread"+Math.floor(Math.random()*
1E3);k=document.createElement("a")}lastnode=node}c=T.innerHTML.split('<br clear="left"><hr>');if(!la){for(a=0;a<c.length;a++){e=c[a].match(/.*\<input type\=\"checkbox\" name\=\"([0-9]+)\".*/i);if(e!=i){d=document.createElement("table");d.innerHTML=c[a].split("</blockquote>")[0]+"</blockquote>";f=d.innerHTML.split("<hr>");if(f.length>0)d.innerHTML=f.pop();d.className="4c4c_reply";d.setAttribute("postID",e[1]);d.setAttribute("op","true");d.style.display="none";T.appendChild(d)}}la=h}if(U){e=window.location.href.match(/.*\/res\/[0-9]+.*/i);
if(e!=i)if(T.getAttribute("has404d")==i){T.setAttribute("has404d","false");setTimeout(ka,1E4)}U=m}A(b,i);if(W){e=window.location.href.match(/.*\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);if(e!=i)for(a=0;a<u.length;a++)if(u[a][0]==e[1])if(c=document.getElementById("threadhider"+u[a][1])){d=document.createEvent("MouseEvents");d.initMouseEvent("click",h,h,window,0,0,0,0,0,m,m,m,m,0,i);c.dispatchEvent(d)}}if(oa){e=window.location.href.match(/.*\/res\/[0-9]+.*/i);if(window.location.href.search("4chan.org")!=-1&&
e&&Q){a=document.createElement("table");a.className="reply";a.style.marginTop="1em";a.innerHTML='<tr onclick="self.scrollTo(0,0);" style="cursor: hand;"><td align="left" style="font-size: 2em;">&#x25B2;</td><td align="center" width="100%" style="font-size: 2em;">'+chrome.i18n.getMessage("return_to_top")+'</td><td align="right" style="font-size: 2em;">&#x25B2;</td></tr>';n(a,Q)}}}}}var X=m,qa,ra,Y;function sa(b){if(X){Y.style.left=tx+b.clientX-qa;Y.style.top=ty+b.clientY-ra;return m}}
document.onmousedown=function(b){for(var d=b.target;d.tagName.toLowerCase()!="html"&&!(d.className=="postblock"&&d.style.textAlign=="center");)d=d.parentNode;if(d.className=="postblock"&&d.style.textAlign=="center"){X=h;Y=d.parentNode;tx=parseInt(Y.style.left+0,10);ty=parseInt(Y.style.top+0,10);qa=b.clientX;ra=b.clientY;document.onmousemove=sa;return m}};document.onmouseup=function(){X=m};
if(document.forms.length==0){var Z=window.location.href.match(/http\:\/\/.*\.4chan\.org\/.*\#return\=(.*)/i);if(Z!=i)if(document.body.innerHTML.search("<!-- thread:")>-1&&document.body.innerHTML.search("<!-- thread:")<500){var $=document.body.innerHTML.match(/\.*<\!-- thread\:([0-9]+),no\:([0-9]+) --\>.*/i);if($!=i){if($[1]==0)$[1]=$[2];window.location=decodeURI(Z[1])+"/res/"+$[1]+"#"+$[2]}}}var va=m;Z=window.location.href.match(/.*\/\/([0-9a-zA-Z]+)\.4chan\.org\/([0-9a-zA-Z]+)\/.*/i);
if(Z!=i)if(Z[1]=="sys"||Z[1]=="dis"||Z[2]=="f")va=h;
if(!va){chrome.extension.sendRequest({reqtype:"get-options"},function(b){B=b.quickreply;y=b.quickreplyiframe;ma=b.expand;F=b.expandimages;I=b.preview;U=b.fetchreplies;na=b.autonoko;D=b.sage;C=b.report;V=b.threadwatcher;W=b.hidethreads;oa=b.returntotop;p=b.watchedthreads;u=b.hiddenthreads;J=b.default_name;K=b.default_email;L=b.default_subject;N=b.default_comment;M=b.default_password;pa()});chrome.extension.onRequest.addListener(function(b){if(b.reqtype=="expandall"){G=h;b=document.getElementsByTagName("a");
for(var d=0;d<b.length;d++)if(b[d].getAttribute("expanded")!=i)if(b[d].getAttribute("expanded")=="false"){var a=document.createEvent("MouseEvents");a.initMouseEvent("click",h,h,window,0,0,0,0,0,m,m,m,m,0,i);b[d].dispatchEvent(a)}}else if(b.d=="visiturl")window.location.href=b.url})};
