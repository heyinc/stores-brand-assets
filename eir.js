/**
* EIR Javascript v1.3.2
* DATE: 2020-04-07
*/

var eirCode = '0910';
var uniCodeEir = '20210101';
var uniCodeQir = '20210101';
var uniCodeBr = '20210101';
var language = 'jp';
const isUnifiedDrawingScriptMode = true;

var eirLevel = '';
var demoLocation = /customer[0-9]*\.pronexus|eol\-test\.com|aspdev|localhost/;
// ロケーションで判定
if (location.protocol == 'file:' || demoLocation.test(location.hostname)) {
	eirLevel = 'demo';
} else {
	eirLevel = 'public';
}
if(location.href.match("#public") || location.href.match("level=public")){
	eirLevel = 'public';
}
var eirUrl = ('https:' == document.location.protocol ? 'https://ssl4' : 'http://v4') + '.eir-parts.net';
if( (document.location.protocol == 'https:' || document.location.protocol == 'http:') && !/aspdev/.test(window.location.host)){
	var eirPass = eirUrl + '/Custom/' + eirLevel + '/v5parts/' + eirCode + '/' + language + '/' + uniCodeEir + '/';
	var qirPass = eirUrl + '/Custom/' + eirLevel + '/qir/' + eirCode + '/' + language + '/' + uniCodeQir +'/';
}else{
	var eirPass = '/v5parts/' + eirCode + '/' + language + '/' + uniCodeEir + '/';
    var qirPass = '/v4qir/' + eirCode + '/' + language + '/' + uniCodeQir + '/';
}
var eirPassCore = eirPass + 'core/';
var eirPassApp = eirPass + 'app/';
var eirPassMaterial = eirUrl + '/Custom/public/material/parts/';

/**
* JSファイルを直列にロードする
*
* @class scriptLoader
*/
var scriptLoader = {
	// scriptタグのsrcを保持する
	sources: [],

	elmHead: document.getElementsByTagName('head')[0],
	
    /**
    * ロードするJSファイルのパスを追加する
    * 追加した順番にロードされる
    *
    * @method setSrc
    * @param {String} src
    */
	setSrc: function(src){
		this.sources.push(src);
	},

    /**
    * JSファイルのロード処理を実行する
    * 第一引数は全てのファイルが正常に読み込めた場合に実行される
    * 第二引数は全てのファイルが正常に読み込無かった場合に実行される
    * 一度実行されると、このオブジェクトに追加されたJSへのパスは全て破棄される
    *
    * @method load
    * @param {Function} doSuccess
    * @param {Function} doError
    */
	load: function(doSuccess, doError){
		if(this.sources.length === 0){
			if(doSuccess){
				doSuccess();
			}
			return; // 再帰の離脱
		}
		var elmScript = document.createElement('script');
		elmScript.charset = 'utf-8';
		elmScript.src = this.sources.shift();
		this.elmHead.appendChild(elmScript);
		var _self = this;
		elmScript.onload = function(){
			_self.load(doSuccess, doError);
		}

		// エラー時
		elmScript.onerror = doError;
	}
}

setLibrary();
if(bowser.msie && bowser.version <= 8){
	showUnSupportedBrowserMessage();
}

if(!/[0-9]{4}/.test(eirCode)){
	console.warn('証券コードが設定されていません');
}

// ネットワークの関係などで、EIRをうまく表示出来ていないことを示すメッセージ
function showMaintenanceMessage(){
	var message = '<div><img src="data:image/gif;base64,R0lGODlhzAE0AIAAAP///wAAACH5BAEHAAAALAAAAADMATQAAAL/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/nAgA6wy7v4PEUe+D/h+BnwCe4AIhYeKBIiMLY8Pho+JYoErhYl6lQeHmYqPjZiSnBJ+r5eejpEHpq2ij5MNg4KrtJuGdrywirObtZOXmXEAnBi8U6WStssbuIGhyLYTwKnSE57UubjUwKWIdIC/wtfvscXOoNDo1+CVrJOSwY6jfvSoab/f3KQddcvMxsgjFs8UhBKtgLVL4ItfBp8perGjxDpdYdBLgNoUaM/2ocJpxVcVUziPoiVhvHrZeqhanKsarHixjCkC7trap5S9uwdHu4BXrXUxfMjUQlctxJ0AvNhydRqqMGsqVRqUcz/lJ50aTWm1RVLl3K8JpOaqYUCoQIFipSb/E8OnWlLI3bflsDsoxZtajXrFy76q2L9eO5eWH7PTN8GBOnlMXQNg28T60omS2TSoE1l6/dbWzz0u17cmQ0zY8BfyZbkPI/yQYhx63Z6TRUeqSZloaMu9zVLJjz4b0wMaHqc6DJdkadV+1t5b5CTqQLPdO0QZ3xmb1I8uP13E3j9pZ3vOvrKTGDg4CLejHH4W8txvrtd7dWdBqpj8WO1Trg5shZT/9dncxfwRl21HjkMeaMJaqFV5J8EllGGyQ2JbjSHTbZE8lAackjnTrKuOMhO7GZ09wu5CDFoW6/mAjWhZblAWOMMs5IY4023ohjjjr68Jl5uWR3W1IQwvNikWydSBB7HlSUJHN9bPCiMOwA+Nde8cEE5A+n9fjKUKn5KOBWEDoJHolNgkSYf6aVtiB3g70DW5bOPKVYfAv9VOF+YuFUJUtERVkCiW3hBiKd7fXkoXLbofjSnNX1l1uivmkmIjkbunaiQPzZZhwykka0aGj7PYaKfr6lWRSqrgWxWDuBfTebTvRYyhCkAHl0pldI6tWmndo9yad3vm46KZtxLuemeZf/DkTlXTrwBExDKxIYpKxiSrglmY7SamE7T3HZYoFe+rkpNrFZ2x1XPSL2k1uitsUgs8ukNN2ExY4aA6Jl5uQQXJn2+yq+ukU3mmDk6hIgp9mWGd6GsLp7q6T0ChpVBXuGFq5IdGK41oU5MczrDvbJ5Gpkdcaa3rXdSseyvAZHeqSVCzdIKEaFUgUxzqmlWhzDZZGm3kZifXXsx8wtuKwLzMrCLncf3kuTbHdey7ST9byLsDY511yZYxUTW3C091bbmqIl/qzyzsSBHeqq9c0L6GZ8fQfm12z/qXI6tm1t9Y8xCzYZpYYeHLVV2kZVdX4gJ4e32kEV/O6ACdcmJ0WDpbq5ZDRDW9634kwt2muHn+vKYKRrzzyOscShbXPFUh+cn6n9USuw2+WenNxzMw2rZLJux22xp9vi2d60I85pHLYaT3lf2a3s6zCG0rcojjvJ864i8RMvO+E1x+nbLXxGf++gS7XxKSDwO67Pfvvuvw9//PLPT3/99t+Pf/76789///7/D8AACnCABCygAQ+IwAQqcIEMbKADHwjBCEpwghSsYBYKAAA7" width="460" height="52"></div>';
	var area = document.getElementsByClassName('eir');
	for(var i=0, len=area.length; i<len; i++){area[i].innerHTML = message}
}

// ブラウザが未対応（IE8など）であることを示すメッセージ
function showUnSupportedBrowserMessage(){
	var text = 'このメッセージが表示された場合、お使いのブラウザが対応していないためページが正常に表示されていない可能性があります。<br>最新バージョンのブラウザで閲覧くださいますようお願いいたします。';
	var allElements = document.getElementsByTagName('*');
	var elm;
	for(var i=0, len=allElements.length; i<len; i++){
		elm = allElements[i];
		if(elm.className === 'eir'){
			elm.innerHTML = text;
			elm.style.color = 'red';
			elm.className += ' unSupportedBrowser';
		}
	}
}

function setLibrary(){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
!function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(t,n):e[t]=n()}(this,"bowser",function(){function t(t){function n(e){var n=t.match(e);return n&&n.length>1&&n[1]||""}function r(e){var n=t.match(e);return n&&n.length>1&&n[2]||""}function N(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return undefined}}var i=n(/(ipod|iphone|ipad)/i).toLowerCase(),s=/like android/i.test(t),o=!s&&/android/i.test(t),u=/nexus\s*[0-6]\s*/i.test(t),a=!u&&/nexus\s*[0-9]+/i.test(t),f=/CrOS/.test(t),l=/silk/i.test(t),c=/sailfish/i.test(t),h=/tizen/i.test(t),p=/(web|hpw)os/i.test(t),d=/windows phone/i.test(t),v=/SamsungBrowser/i.test(t),m=!d&&/windows/i.test(t),g=!i&&!l&&/macintosh/i.test(t),y=!o&&!c&&!h&&!p&&/linux/i.test(t),b=r(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),w=n(/version\/(\d+(\.\d+)?)/i),E=/tablet/i.test(t)&&!/tablet pc/i.test(t),S=!E&&/[^-]mobi/i.test(t),x=/xbox/i.test(t),T;/opera/i.test(t)?T={name:"Opera",opera:e,version:w||n(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}:/opr\/|opios/i.test(t)?T={name:"Opera",opera:e,version:n(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i)||w}:/SamsungBrowser/i.test(t)?T={name:"Samsung Internet for Android",samsungBrowser:e,version:w||n(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)}:/coast/i.test(t)?T={name:"Opera Coast",coast:e,version:w||n(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}:/yabrowser/i.test(t)?T={name:"Yandex Browser",yandexbrowser:e,version:w||n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/ucbrowser/i.test(t)?T={name:"UC Browser",ucbrowser:e,version:n(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/mxios/i.test(t)?T={name:"Maxthon",maxthon:e,version:n(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/epiphany/i.test(t)?T={name:"Epiphany",epiphany:e,version:n(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}:/puffin/i.test(t)?T={name:"Puffin",puffin:e,version:n(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}:/sleipnir/i.test(t)?T={name:"Sleipnir",sleipnir:e,version:n(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}:/k-meleon/i.test(t)?T={name:"K-Meleon",kMeleon:e,version:n(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}:d?(T={name:"Windows Phone",osname:"Windows Phone",windowsphone:e},b?(T.msedge=e,T.version=b):(T.msie=e,T.version=n(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(t)?T={name:"Internet Explorer",msie:e,version:n(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:f?T={name:"Chrome",osname:"Chrome OS",chromeos:e,chromeBook:e,chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/edg([ea]|ios)/i.test(t)?T={name:"Microsoft Edge",msedge:e,version:b}:/vivaldi/i.test(t)?T={name:"Vivaldi",vivaldi:e,version:n(/vivaldi\/(\d+(\.\d+)?)/i)||w}:c?T={name:"Sailfish",osname:"Sailfish OS",sailfish:e,version:n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(t)?T={name:"SeaMonkey",seamonkey:e,version:n(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(t)?(T={name:"Firefox",firefox:e,version:n(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t)&&(T.firefoxos=e,T.osname="Firefox OS")):l?T={name:"Amazon Silk",silk:e,version:n(/silk\/(\d+(\.\d+)?)/i)}:/phantom/i.test(t)?T={name:"PhantomJS",phantom:e,version:n(/phantomjs\/(\d+(\.\d+)?)/i)}:/slimerjs/i.test(t)?T={name:"SlimerJS",slimer:e,version:n(/slimerjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(t)||/rim\stablet/i.test(t)?T={name:"BlackBerry",osname:"BlackBerry OS",blackberry:e,version:w||n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:p?(T={name:"WebOS",osname:"WebOS",webos:e,version:w||n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(t)&&(T.touchpad=e)):/bada/i.test(t)?T={name:"Bada",osname:"Bada",bada:e,version:n(/dolfin\/(\d+(\.\d+)?)/i)}:h?T={name:"Tizen",osname:"Tizen",tizen:e,version:n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||w}:/qupzilla/i.test(t)?T={name:"QupZilla",qupzilla:e,version:n(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||w}:/chromium/i.test(t)?T={name:"Chromium",chromium:e,version:n(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||w}:/chrome|crios|crmo/i.test(t)?T={name:"Chrome",chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:o?T={name:"Android",version:w}:/safari|applewebkit/i.test(t)?(T={name:"Safari",safari:e},w&&(T.version=w)):i?(T={name:i=="iphone"?"iPhone":i=="ipad"?"iPad":"iPod"},w&&(T.version=w)):/googlebot/i.test(t)?T={name:"Googlebot",googlebot:e,version:n(/googlebot\/(\d+(\.\d+))/i)||w}:T={name:n(/^(.*)\/(.*) /),version:r(/^(.*)\/(.*) /)},!T.msedge&&/(apple)?webkit/i.test(t)?(/(apple)?webkit\/537\.36/i.test(t)?(T.name=T.name||"Blink",T.blink=e):(T.name=T.name||"Webkit",T.webkit=e),!T.version&&w&&(T.version=w)):!T.opera&&/gecko\//i.test(t)&&(T.name=T.name||"Gecko",T.gecko=e,T.version=T.version||n(/gecko\/(\d+(\.\d+)?)/i)),!T.windowsphone&&(o||T.silk)?(T.android=e,T.osname="Android"):!T.windowsphone&&i?(T[i]=e,T.ios=e,T.osname="iOS"):g?(T.mac=e,T.osname="macOS"):x?(T.xbox=e,T.osname="Xbox"):m?(T.windows=e,T.osname="Windows"):y&&(T.linux=e,T.osname="Linux");var C="";T.windows?C=N(n(/Windows ((NT|XP)( \d\d?.\d)?)/i)):T.windowsphone?C=n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):T.mac?(C=n(/Mac OS X (\d+([_\.\s]\d+)*)/i),C=C.replace(/[_\s]/g,".")):i?(C=n(/os (\d+([_\s]\d+)*) like mac os x/i),C=C.replace(/[_\s]/g,".")):o?C=n(/android[ \/-](\d+(\.\d+)*)/i):T.webos?C=n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):T.blackberry?C=n(/rim\stablet\sos\s(\d+(\.\d+)*)/i):T.bada?C=n(/bada\/(\d+(\.\d+)*)/i):T.tizen&&(C=n(/tizen[\/\s](\d+(\.\d+)*)/i)),C&&(T.osversion=C);var k=!T.windows&&C.split(".")[0];if(E||a||i=="ipad"||o&&(k==3||k>=4&&!S)||T.silk)T.tablet=e;else if(S||i=="iphone"||i=="ipod"||o||u||T.blackberry||T.webos||T.bada)T.mobile=e;return T.msedge||T.msie&&T.version>=10||T.yandexbrowser&&T.version>=15||T.vivaldi&&T.version>=1||T.chrome&&T.version>=20||T.samsungBrowser&&T.version>=4||T.firefox&&T.version>=20||T.safari&&T.version>=6||T.opera&&T.version>=10||T.ios&&T.osversion&&T.osversion.split(".")[0]>=6||T.blackberry&&T.version>=10.1||T.chromium&&T.version>=20?T.a=e:T.msie&&T.version<10||T.chrome&&T.version<20||T.firefox&&T.version<20||T.safari&&T.version<6||T.opera&&T.version<10||T.ios&&T.osversion&&T.osversion.split(".")[0]<6||T.chromium&&T.version<20?T.c=e:T.x=e,T}function r(e){return e.split(".").length}function i(e,t){var n=[],r;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r++)n.push(t(e[r]));return n}function s(e){var t=Math.max(r(e[0]),r(e[1])),n=i(e,function(e){var n=t-r(e);return e+=(new Array(n+1)).join(".0"),i(e.split("."),function(e){return(new Array(20-e.length)).join("0")+e}).reverse()});while(--t>=0){if(n[0][t]>n[1][t])return 1;if(n[0][t]!==n[1][t])return-1;if(t===0)return 0}}function o(e,r,i){var o=n;typeof r=="string"&&(i=r,r=void 0),r===void 0&&(r=!1),i&&(o=t(i));var u=""+o.version;for(var a in e)if(e.hasOwnProperty(a)&&o[a]){if(typeof e[a]!="string")throw new Error("Browser version in the minVersion map should be a string: "+a+": "+String(e));return s([u,e[a]])<0}return r}function u(e,t,n){return!o(e,t,n)}var e=!0,n=t(typeof navigator!="undefined"?navigator.userAgent||"":"");return n.test=function(e){for(var t=0;t<e.length;++t){var r=e[t];if(typeof r=="string"&&r in n)return!0}return!1},n.isUnsupportedBrowser=o,n.compareVersions=s,n.check=u,n._detect=t,n.detect=t,n})
}