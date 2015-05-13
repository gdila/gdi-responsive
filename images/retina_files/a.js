(function(window,document){!function(a,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&typeof define.amd=="object"?define(b):this[a]=b()}("domready",function(a){function m(a){l=1;while(a=b.shift())a()}var b=[],c,d=!1,e=document,f=e.documentElement,g=f.doScroll,h="DOMContentLoaded",i="addEventListener",j="onreadystatechange",k="readyState",l=/^loade|c/.test(e[k]);return e[i]&&e[i](h,c=function(){e.removeEventListener(h,c,d),m()},d),g&&e.attachEvent(j,c=function(){/^c/.test(e[k])&&(e.detachEvent(j,c),m())}),a=g?function(c){self!=top?l?c():b.push(c):function(){try{f.doScroll("left")}catch(b){return setTimeout(function(){a(c)},50)}c()}()}:function(a){l?a():b.push(a)}})
var Mobify=window.Mobify||{}
,analytics=Mobify.analytics=Mobify.analytics||{ga:[]}
,opts={gaid:"UA-993328-121",cookiePrefix:'__mobify_'
}
,findSelf=function(){var scriptRe=/^(.*)\/a\.js(?:#([^#]*))?$/,scripts=document.getElementsByTagName('script'),match;for(var i=0;i<scripts.length;++i){match=scripts[i].src.match(scriptRe);if(match)break;}
if(!match){throw new Error("Mobify.js Analytics: Aborting. Script loaded from wrong location.");}
return{path:match[1],hash:match[2]||''};}
,buildIframeSrc=function(){var self=findSelf()
,oParams={u:encodeURIComponent(location),m:0,a:opts.gaid,r:document.referrer?encodeURIComponent(document.referrer):'',d:document.domain},aParams=[]
,paramRe=/([^&=]*?)=(.*?)(?:$|&)/g
,cookieRe=new RegExp('^'+opts.cookiePrefix+'([\\s\\S]*)$'),cookies=document.cookie.split('; ')
,filteredCookies=[],match; for(var i=3,ii=5;i<=ii;i++){var customVar=Mobify.analytics['c'+i];if(customVar){oParams['c'+i]=customVar;}}
for(var i=0;i<cookies.length;i++){match=cookies[i].match(cookieRe);if(match)filteredCookies.push(match[1]);}
Mobify.config&&(oParams.debug=Mobify.config.isDebug);while(match=paramRe.exec(self.hash)){oParams[match[1]]=match[2];}
oParams.c=filteredCookies.join('; ');for(var key in oParams){aParams.push(key+'='+oParams[key]);}
return self.path+'/a.html#'+aParams.join('&');},addIframe=function(iframe){var insert=function(){var body=document.getElementsByTagName('body')[0];if(body){body.appendChild(iframe);}else{setTimeout(insert,100);}}
if(document.all&&!document.addEventListener){domready(insert);}else{insert();}}
,addAnalyticsIframe=function(src){var inlineStyle='position: absolute; top: -999px; left: -999px; width: 1px; height: 1px; visibility: hidden',iframe=document.createElement('iframe')
iframe.src=src;iframe.id='__mobify_analytics';iframe.setAttribute('style',inlineStyle); if(!iframe.style.position){iframe.style.setAttribute('cssText',inlineStyle,0);}
addIframe(iframe);return iframe;}
,onMessage=function(event){if(event.source!==iframe.contentWindow){return;}
if(event.data=='ready'){var oldQueue=analytics.ga,ga=analytics.ga={push:function(){var argsToArray=[].slice.apply(arguments),message=JSON.stringify({name:'push',value:argsToArray});iframe.contentWindow.postMessage(message,'*');}};if(oldQueue.length){ga.push.apply(ga,oldQueue);}
return;}
var command=JSON.parse(event.data);if(command.name!=='setCookie'){return;}
var cookie=[];command.value.split(/;\s*/).forEach(function(pair,i){if(i!==0&&pair.indexOf('domain')==0){if(!opts.domain)return;pair="domain="+opts.domain;}
cookie.push(pair);});document.cookie=opts.cookiePrefix+cookie.join('; ');},setupAnalytics=function(){ 
iframe=addAnalyticsIframe(buildIframeSrc());if(!window.addEventListener)return;window.addEventListener('message',onMessage,false);};try{var hash=findSelf().hash}catch(err){}
if(/m=1/.test(hash)){setupAnalytics();}})(this,document);