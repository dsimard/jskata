# jskata.timezone

##standard and daylight saving time zones

**st()**

The standard time offset of the timezone in seconds. 

    jsk.tz.st() // for North America/Eastern Time
    => -300
    
**dst()**

The daylight saving time offset of the timezone in seconds. 

    jsk.tz.dst() // for North America/Eastern Time
    => -240

**hasDst()**

If the timezone has daylight saving time.

    jsk.tz.hasDst()
    => true

**stToString([timeSeparator])**

The standard time offset of the timezone in hour.

    jsk.tz.stToString() // for North America/Eastern Time
    => -0500
    jsk.tz.stToString()
    => -05:00
    
**dstToString([timeSeparator])**

The daylight saving time offset of the timezone in hour.

    jsk.tz.stToString() // for North America/Eastern Time
    => -0400

**timeSeparator**

Set the default time separator
    
    jsk.tz.timeSeparator = ':';
    jsk.tz.stToString() // for North America/Eastern Time
    => -05:00
