/* jskata.nofreeze.js */
(function(){var j={sleepFor:1,chunkSize:10,stops:[],forLoop:function(b,e,d,c,a){var f,g=c&&c.sleepFor?c.sleepFor:this.sleepFor,k=c&&c.chunkSize?c.chunkSize:this.chunkSize,h=function(){a&&a();clearTimeout(f)},i=function(){h&&h();h=null};this.stops.push(i);(function l(){for(var m=0;b()&&m++<k;){d();e&&e()}if(b())f=setTimeout(l,g);else i()})();return{stop:i}},forCount:function(b,e,d,c){var a=d&&d.beginAt||0;return this.forloop(function(){return a<=b},function(){a++},function(){e(a)},d,c)},infinite:function(b,
e,d){return this.forloop(function(){return true},null,b,e,d)},each:function(b,e,d,c){var a=0;if(Object.prototype.toString.call(b)=="[object Array]"){a=0;return this.forloop(function(){return a<b.length},function(){a++},function(){e.call(b[a],a,b[a])},d,c)}else{var f=[],g;for(g in b)f.push(g);a=0;return this.forloop(function(){return a<f.length},function(){a++},function(){e.call(b[f[a]],f[a],b[f[a]])},d,c)}},stop:function(){for(var b=0;b<this.stops.length;b++)this.stops[b]();this.onStop&&this.onStop()}};
j.forloop=j.forLoop;if(window.javascriptKataDotCom===undefined)window.javascriptKataDotCom={};if(window.jsKata===undefined)window.jsKata=window.javascriptKataDotCom;if(window.jsk===undefined)window.jsk=window.javascriptKataDotCom;if(window._===undefined)window._=window.javascriptKataDotCom;window.javascriptKataDotCom.nofreeze=j;window.javascriptKataDotCom.nf=window.javascriptKataDotCom.nofreeze})();

/* jskata.template.js */
(function() {
  var jsk, _ref, _ref2, _ref3, _ref4;
  var __hasProp = Object.prototype.hasOwnProperty;
  jsk = function(tmpl, data, domParent) {
    var element, key, value, _results;
    console.log("JSK : ", tmpl, data, domParent);
    _results = [];
    for (key in tmpl) {
      if (!__hasProp.call(tmpl, key)) continue;
      value = tmpl[key];
      element = $(key);
      console.log("IF : ", value, typeof value);
      if (typeof value === "string") {
        element.text(value);
      } else {
        jsk(value, tmpl[key], element);
      }
      console.log("parent", element.parent(), domParent);
      _results.push(element.parent().length === 0 ? domParent.append(element) : void 0);
    }
    return _results;
  };
  if ((_ref = window.javascriptKataDotCom) == null) {
    window.javascriptKataDotCom = {};
  }
  if ((_ref2 = window.jsKata) == null) {
    window.jsKata = window.javascriptKataDotCom;
  }
  if ((_ref3 = window.jsk) == null) {
    window.jsk = window.javascriptKataDotCom;
  }
  if ((_ref4 = window._) == null) {
    window._ = window.javascriptKataDotCom;
  }
  window.javascriptKataDotCom.template = jsk;
  window.javascriptKataDotCom.t = window.javascriptKataDotCom.template;
}).call(this);

/* jskata.timezone.js */
(function(){var a={breakingMonth:0,testMonth0Offset:null,testMonth6Offset:null,timeSepator:"",getDateOffset:function(b){return(new Date((new Date).getFullYear(),b,0)).getTimezoneOffset()},getMonth0Offset:function(){return a.testMonth0Offset!==null?a.testMonth0Offset:a.getDateOffset(a.breakingMonth)},getMonth6Offset:function(){return a.testMonth6Offset!==null?a.testMonth6Offset:a.getDateOffset(a.breakingMonth+6)},offsetToString:function(b,d){d=d||a.timeSeparator||"";var e=[],c=b/60;e.push(c>=0?"+":
"-");var f=Math.floor(Math.abs(c));e.push((f<=9?"0":"")+f);e.push(d);c=Math.abs(c%1)*60;e.push((c<=9?"0":"")+c);return e.join("")},testOffset:function(b,d){a.testMonth0Offset=b;a.testMonth6Offset=d},hasDst:function(){return a.st()!=a.dst()},invertedSt:function(){return Math.max(a.getMonth0Offset(),a.getMonth6Offset())},invertedDst:function(){return Math.min(a.getMonth0Offset(),a.getMonth6Offset())},st:function(){return 0-a.invertedSt()},stToString:function(b){return a.offsetToString(a.st(),b)},dst:function(){return 0-
a.invertedDst()},dstToString:function(b){return a.offsetToString(a.dst(),b)},iHateTheLastComma:true};if(window.javascriptKataDotCom===undefined)window.javascriptKataDotCom={};if(window.jsKata===undefined)window.jsKata=window.javascriptKataDotCom;if(window.jsk===undefined)window.jsk=window.javascriptKataDotCom;if(window._===undefined)window._=window.javascriptKataDotCom;window.javascriptKataDotCom.timezone=a;window.javascriptKataDotCom.tz=a})();

/* jskata.undo.js */
(function(){var d={dids:[],undids:[],canUndo:function(){return this.dids.length>0},canRedo:function(){return this.undids.length>0},push:function(a){this.execute(null,a)},execute:function(a,c,b){var e;if(b===undefined||b===null)b={};if(this.isFct(a)&&b.async!==true)e=a();if(d.isInAsyncRedo!==true)this.undids=[];d.isInAsyncRedo=false;if(b.data)e=b.data;this.dids.push({redo:a,undo:c,wrappedUndo:function(){c(e)},options:b});this.fireEvents();return e},undo:function(){var a=this.dids&&this.dids.length>
0?this.dids.pop():null;if(this.isFct(a.wrappedUndo)){a.wrappedUndo();this.isFct(a.redo)&&this.undids.push({redo:a.redo,undo:a.undo,options:a.options})}this.fireEvents()},redo:function(){var a=this.undids&&this.undids.length>0?this.undids.pop():null;if(this.isFct(a.redo)){d.isInAsyncRedo=a.options.async;var c=a.redo();if(a.options.data)c=a.options.data;var b=function(){a.undo(c)};a.options.async!==true&&this.dids.push({redo:a.redo,undo:a.undo,wrappedUndo:b,options:a.options})}this.fireEvents()},onChange:function(){return false},
onEmpty:function(){return false},fireEvents:function(){this.onChange&&this.onChange();this.dids.length===0&&this.undids.length===0&&this.onEmpty()},isFct:function(a){return a&&typeof a=="function"}};if(window.javascriptKataDotCom===undefined)window.javascriptKataDotCom={};if(window.jsKata===undefined)window.jsKata=window.javascriptKataDotCom;if(window.jsk===undefined)window.jsk=window.javascriptKataDotCom;if(window._===undefined)window._=window.javascriptKataDotCom;window.javascriptKataDotCom.undo=
d;window.javascriptKataDotCom.u=d;window.jskataUndo=window.javascriptKataDotCom.undo})();
