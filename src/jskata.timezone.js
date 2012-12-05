// ## Standard time, daylight saving time in time zones
(function() {
  var jsk = {

    breakingMonth : 0,
    testMonth0Offset : null,
    testMonth6Offset : null,
    /*
     * ### timeSeparator
     *
     * Set the default time separator
     *
     *      jsk.tz.timeSeparator = ':';
     *      jsk.tz.stToString()
     *      => -05:00
    */
    timeSepator : "",
    
    /*
     * ### standardTime()
     * alias `st`
     *
     * The standard time offset of the timezone in seconds. 
     *
     *      jsk.tz.standardTime() // for North America/Eastern Time
     *      => -300
    */
    st : function st() {
      return 0-jsk.invertedSt();
    },
    /*
     * ### isStandardTime([date])
     * alias `isSt`
     *
     * If a date is at standard time (`now` is used if no `date` is specified)
     *
     *      jsk.tz.isStandardTime(new Date(2012, 1, 1)) // for North America/Eastern Time
     *      => true
    */
    isSt : function isSt(date, testOffset) {
      date = date || new Date();
      var offset = testOffset || date.getTimezoneOffset();
      return offset == jsk.invertedSt();
    },
    /*
     * ### standardTimeToString([timeSeparator])
     * alias `stToString`
     *
     * The standard time offset of the timezone in hour (ex : -0500)
     *
     *      jsk.tz.standardTimeToString() // for North America/Eastern Time
     *      => -0500
     *      jsk.tz.stToString(':')
     *      => -05:00
    */
    stToString : function(timeSeparator) {
      return jsk.offsetToString(jsk.st(), timeSeparator);
    },
    /*
     * ### daylightSavingTime()
     * alias `dst`
     *
     * The daylight saving time offset of the timezone in seconds. 
     *
     *      jsk.tz.daylightSavingTime() // for North America/Eastern Time
     *      => -240
    */
    dst : function dst() {
      return 0-jsk.invertedDst();
    },
    
    /*
     * ### hasDaylightSavingTime()
     * alias `hasDst`, `hasDaylightSaving`
     *
     * If the timezone has daylight saving time.
     *
     *      jsk.tz.hasDaylightSavingTime()
     *      => true
    */
    hasDst : function() {
      return jsk.st() != jsk.dst();
    },
    /*
     * ### isDaylightSavingTime([date])
     * alias `isDst`
     *
     * If a date is at daylight saving time (`now` is used if no `date` is specified)
     *
     *      jsk.tz.isStandardTime(new Date(2012, 1, 1)) // for North America/Eastern Time
     *      => false
    */
    isDst : function isSt(date, testOffset) {
      date = date || new Date();
      var offset = testOffset || date.getTimezoneOffset();
      return jsk.hasDst() && offset == jsk.invertedDst();
    },
    /*
     * ### daylightSavingTimeToString([timeSeparator])
     * alias `dstToString`, `daylightSavingToString`
     *
     * The daylight saving time offset of the timezone in hour.
     *
     *      jsk.tz.dstToString() // for North America/Eastern Time
     *      => -0400
    */
    dstToString : function(timeSeparator) {
      return jsk.offsetToString(jsk.dst(), timeSeparator);
    },
    /******************************************/
    // Returns the standard time offset (inverted)
    invertedSt : function invertedSt() {
      return Math.max(jsk.getMonth0Offset(), jsk.getMonth6Offset());
    },
    // Returns the daylight saving time offset (inverted)
    invertedDst : function invertedDst() {
      return Math.min(jsk.getMonth0Offset(), jsk.getMonth6Offset());
    },
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
    // Force some test offsets
    testOffset : function testOffset(month0Offset, month6Offset) {
      jsk.testMonth0Offset = month0Offset;
      jsk.testMonth6Offset = month6Offset;
    }
  };
  
  // Assign aliases
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

/* http://upload.wikimedia.org/wikipedia/commons/0/01/2007-02-20_time_zones.svg */
/* 
  In the northern emisphere, january is in winter and july is in summer.
  In the southern emisphere, january is in summer and july is in winter.
  A daylight saving time offset is always -1, so standard time is always 
  the greatest of two offsets.
*/
