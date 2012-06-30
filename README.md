# formatjs

JavaScript date format tester.

[![Build Status](https://secure.travis-ci.org/nowamasa/formatjs.png?branch=master)](http://travis-ci.org/nowamasa/formatjs)

## Getting Started
### On the server
Install the module with: `npm install formatjs`

```javascript
var formatjs = require('formatjs');
formatjs.test('12/04', 'YYYY/MM');   // false
formatjs.test('2012/04', 'YYYY/MM'); // true
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/nowamasa/formatjs/master/dist/formatjs.min.js
[max]: https://raw.github.com/nowamasa/formatjs/master/dist/formatjs.js

In your web page:

```html
<script src="dist/formatjs.min.js"></script>
<script>
formatjs.test('12/04', 'YYYY/MM');   // false
formatjs.test('2012/04', 'YYYY/MM'); // true
</script>
```

In your web page using AMD loader:

```html
<script>
require(['formatjs'], function(formatjs) {
    formatjs.test('12/04', 'YYYY/MM');   // false
    formatjs.test('2012/04', 'YYYY/MM'); // true
});
</script>
```

## Contributing
Install [nodejs](http://nodejs.org/).<br>
Install [coffee-script](http://coffeescript.org/) with: `npm install -g coffee-script`.<br>
Install dependencies with: `npm install`.<br>

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 nowamasa  
Licensed under the MIT license.
