# jskata - independent javascript library

## jskata.timezone

__Returns standard and daylight saving time zones based on the user's browser__

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


## Namespaces

There are 4 different namespaces to access __jskata__

- `JavascriptKataDotCom`
- `jsKata`
- `jskata`
- `jsk`
- `_` (underscore

The first one (`JavascriptKataDotCom`) is the default. The others are used if they are not assigned.

If you want to access _jsKata_ via another namespace : `window.MyNamespace = window.JavascriptKataDotCom;`

## Manifesto

- **No internal dependencies** : every library can be used independently “as is”.
- **No external dependence** : don’t depend on external libraries.
- **Everything is public** : you know what you’re doing
- **Avoid objects** : use closures
- **No unnecessary validation** : if something goes wrong, an error will pop
- **No error catching** : if an error pop, it goes all the way up
- **No DOM** : jQuery already exists
- **No plugins** : if a developer wants to add something, he will find a way around
- **Write good documentation** : document as I code
- **Promote** : a good library is nothing without users

