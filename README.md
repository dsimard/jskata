# jsKata - independent javascript library

## jsKata.timezone

__Returns standard and daylight saving time zones based on the user's browser__



## Namespaces

There are 4 different namespaces to access __jsKata__

- `JavascriptKataDotCom`
- `jsKata`
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

