# formatjs

JavaScript date format tester.

[![Build Status](https://secure.travis-ci.org/nowamasa/formatjs.png?branch=master)](http://travis-ci.org/nowamasa/formatjs)

Very [light](https://raw.github.com/nowamasa/formatjs/master/dist/formatjs.min.js) (~2KB after minification) utility function for testing if the string matches the date format.
It has only one public function `test` which takes 2 parameters (`string` and `format`|`formats`) and returns `true` if string matches or `false` if it doesn't.

See the example below:
```javascript
test('12/04', 'YYYY/MM');   // false, doesn't match
test('2012/04', 'YYYY/MM'); // true, match
```
You can pass multiple formats at once:
```javascript
test('12/04', ['YYYY/MM', 'YYYY/MM/DD']);   // false, doesn't match
test('2012/04', ['YYYY/MM', 'YYYY/MM/DD']); // true, match
```

## Available format tokens
<pre>
                Token

Month           M           1 2 ... 11 12
                Mo	        1st 2nd ... 11th 12th
                MM	        01 02 ... 11 12
                MMM	        Jan Feb ... Nov Dec
                MMMM	    January February ... November December
Day of Month    D	        1 2 ... 30 30
                Do	        1st 2nd ... 30th 31st
                DD	        01 02 ... 30 31
Day of Year     DDD	        1 2 ... 364 365
                DDDo	    1st 2nd ... 364th 365th
                DDDD	    001 002 ... 364 365
Day of Week     d	        0 1 ... 5 6
                do	        0th 1st ... 5th 6th
                ddd	        Sun Mon ... Fri Sat
                dddd	    Sunday Monday ... Friday Saturday
Week of Year    w	        1 2 ... 52 53
                wo	        1st 2nd ... 52nd 53rd
                ww	        01 02 ... 52 53
Year            YY	        70 71 ... 29 30
                YYYY	    1970 1971 ... 2029 2030
AM/PM           A	        AM PM
                a	        am pm
Hour            H	        0 1 ... 22 23
                HH	        00 01 ... 22 23
                h	        1 2 ... 11 12
                hh	        01 02 ... 11 12
Minute          m	        0 1 ... 58 59
                mm	        00 01 ... 58 59
Second          s	        0 1 ... 58 59
                ss	        00 01 ... 58 59
Timezone        z or zz	    EST CST ... MST PST
                Z	        -07:00 -06:00 ... +06:00 +07:00
                ZZ	        -0700 -0600 ... +0600 +0700
</pre>


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
Install [Node.js](http://nodejs.org/).<br>
Install [CoffeeScript](http://coffeescript.org/) with: `npm install -g coffee-script`.<br>
Install dependencies with: `npm install`.<br>

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 nowamasa  
Licensed under the MIT license.
