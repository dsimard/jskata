# jskata.timezone

## standard time, daylight saving time in time zones

**standardTime()** alias `st`

The standard time offset of the timezone in seconds. 

    jsk.tz.standardTime() // for North America/Eastern Time
    => -300
    
**daylightSavingTime()** alias `dst`

The daylight saving time offset of the timezone in seconds. 

    jsk.tz.daylightSavingTime() // for North America/Eastern Time
    => -240

**hasDaylightSavingTime()** alias `hasDst`, `hasDaylightSaving`

If the timezone has daylight saving time.

    jsk.tz.hasDaylightSavingTime()
    => true

**standardTimeToString([timeSeparator])** alias `stToString`

The standard time offset of the timezone in hour.

    jsk.tz.standardTimeToString() // for North America/Eastern Time
    => -0500
    jsk.tz.stToString()
    => -05:00
    
**daylightSavingTimeToString([timeSeparator])** alias `dstToString`, `daylightSavingToString`

The daylight saving time offset of the timezone in hour.

    jsk.tz.dstToString() // for North America/Eastern Time
    => -0400

**timeSeparator**

Set the default time separator
    
    jsk.tz.timeSeparator = ':';
    jsk.tz.stToString() // for North America/Eastern Time
    => -05:00
