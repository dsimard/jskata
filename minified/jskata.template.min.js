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
