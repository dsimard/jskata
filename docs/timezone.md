# jskata.timezone

## standard time, daylight saving time in time zones

**standardTime()** alias `st`

The standard time offset of the timezone in seconds. 

    jsk.tz.standardTime() // for North America/Eastern Time
    => -300
    
**isStandardTime([date])** alias `isSt`

If a date is at standard time (`now` is used if no `date` is specified)

    jsk.tz.isStandardTime(new Date(2012, 1, 1)) // for North America/Eastern Time
    => true
    
**daylightSavingTime()** alias `dst`

The daylight saving time offset of the timezone in seconds. 

    jsk.tz.daylightSavingTime() // for North America/Eastern Time
    => -240

**hasDaylightSavingTime()** alias `hasDst`, `hasDaylightSaving`

If the timezone has daylight saving time.

    jsk.tz.hasDaylightSavingTime()
    => true
    
**isDaylightSavingTime([date])** alias `isSt`

If a date is at daylight saving time (`now` is used if no `date` is specified)

    jsk.tz.isStandardTime(new Date(2012, 1, 1)) // for North America/Eastern Time
    => false

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
