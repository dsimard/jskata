/* http://upload.wikimedia.org/wikipedia/commons/0/01/2007-02-20_time_zones.svg */
/* 
  In the northern emisphere, january is in winter and july is in summer.
  In the southern emisphere, january is in summer and july is in winter.
  A daylight saving time offset is always -1, so standard time is always 
  the greatest of two offsets.
*/
(function() {
  var jsk = {
    /******* PROPERTIES *******/
    breakingMonth : 0,
    testMonth0Offset : null,
    testMonth6Offset : null,
    timeSepator : "",
    /******* PRIVATE *******/
    getDateOffset : function getDate(month) {
      return new Date((new Date()).getFullYear(), month, 0).getTimezoneOffset();
    },
    getMonth0Offset : function() {
      return jsk.testMonth0Offset !== null ?
        jsk.testMonth0Offset :
        jsk.getDateOffset(jsk.breakingMonth);
    },
    getMonth6Offset : function() {
      return jsk.testMonth6Offset !== null ?
        jsk.testMonth6Offset :
        jsk.getDateOffset(jsk.breakingMonth+6);
    },
    offsetToString : function(offset, timeSeparator) {
      timeSeparator = timeSeparator || jsk.timeSeparator || "";

      var parts = [];
      
      var st = offset/60.0;
      parts.push(st >= 0 ? "+" : "-");

      var hour = Math.floor(Math.abs(st)); 
      parts.push((hour <= 9 ? "0" : "") + hour);
      
      parts.push(timeSeparator);
      
      var min = Math.abs(st%1.0)*60;
      parts.push((min <= 9 ? "0" : "") + min);
      
      return parts.join("");
    },
    /******* PUBLIC *******/
    // Force some test offsets
    testOffset : function testOffset(month0Offset, month6Offset) {
      jsk.testMonth0Offset = month0Offset;
      jsk.testMonth6Offset = month6Offset;
    },
    // the timezone has daylight saving
    hasDst : function() {
      return jsk.st() != jsk.dst();
    },
    // Returns the standard time offset (inverted)
    invertedSt : function invertedSt() {
      return Math.max(jsk.getMonth0Offset(), jsk.getMonth6Offset());
    },
    // Returns the daylight saving time offset (inverted)
    invertedDst : function invertedDst() {
      return Math.min(jsk.getMonth0Offset(), jsk.getMonth6Offset());
    },
    // Returns the standard time offset
    st : function st() {
      return 0-jsk.invertedSt();
    },
    // Returns standard to string
    stToString : function(timeSeparator) {
      return jsk.offsetToString(jsk.st(), timeSeparator);
    },
    // Returns the daylight saving time offset
    dst : function dst() {
      return 0-jsk.invertedDst();
    },
    // Returns daylight saving to string
    dstToString : function(timeSeparator) {
      return jsk.offsetToString(jsk.dst(), timeSeparator);
    },
    // If a date is in standard time (default date is now)
    isSt : function isSt(date) {
      date = date || new Date();
      return date.getTimezoneOffset() == jsk.invertedSt();
    },
    // If a date is in daylight saving time (default date is now)
    isDst : function isSt(date) {
      date = date || new Date();
      return jsk.hasDst() && date.getTimezoneOffset() == jsk.invertedDst();
    }
  };
  
  // Aliases
  jsk.hasDaylightSavingTime = jsk.hasDst;
  jsk.hasDaylightSaving = jsk.hasDst;
  jsk.standardTime = jsk.st;
  jsk.standardTimeToString = jsk.stToString;
  jsk.daylightSaving = jsk.dst;
  jsk.daylightSavingTime = jsk.dst;
  jsk.daylightSavingToString = jsk.dstToString;
  jsk.daylightSavingTimeToString = jsk.dstToString;
  jsk.isStandardTime = jsk.isSt;
  jsk.isDaylightSavingTime = jsk.isDst;
  
  // Creates the base namespaces
  if (typeof window !== 'undefined') {
    if (window.javascriptKataDotCom === undefined) { window.javascriptKataDotCom = {}; }
    if (window.jsKata === undefined) { window.jsKata = window.javascriptKataDotCom; }
    if (window.jskata === undefined) { window.jskata = window.javascriptKataDotCom; }
    if (window.jsk === undefined) { window.jsk = window.javascriptKataDotCom; }
    if (window._  === undefined) { window._ = window.javascriptKataDotCom; }
    
    window.javascriptKataDotCom.timezone = jsk; 
    window.javascriptKataDotCom.tz = jsk;
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jsk;
  }
})();
