
/*
* format.js
* https://github.com/nowamasa/format.js
*
* Copyright (c) 2012 nowamasa
* Licensed under the MIT license.
*/


(function() {
  var formattingTokens, getParseRegexForToken, isArray, isString, isValidFormatParam, isValidStringParam, parseTokenFourDigits, parseTokenOneOrTwoDigits, parseTokenOneToThreeDigits, parseTokenT, parseTokenThreeDigits, parseTokenTimezone, parseTokenWord, singleTest, test;

  formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|LT|LL?L?L?)/g;

  parseTokenOneOrTwoDigits = /\d\d?/;

  parseTokenOneToThreeDigits = /\d{1,3}/;

  parseTokenThreeDigits = /\d{3}/;

  parseTokenFourDigits = /\d{4}/;

  parseTokenWord = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i;

  parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i;

  parseTokenT = /T/i;

  getParseRegexForToken = function(token) {
    switch (token) {
      case 'DDDD':
        return parseTokenThreeDigits;
      case 'YYYY':
        return parseTokenFourDigits;
      case 'S':
      case 'SS':
      case 'SSS':
      case 'DDD':
        return parseTokenOneToThreeDigits;
      case 'MMM':
      case 'MMMM':
      case 'ddd':
      case 'dddd':
      case 'a':
      case 'A':
        return parseTokenWord;
      case 'Z':
      case 'ZZ':
        return parseTokenTimezone;
      case 'T':
        return parseTokenT;
      case 'MM':
      case 'DD':
      case 'dd':
      case 'YY':
      case 'HH':
      case 'hh':
      case 'mm':
      case 'ss':
      case 'M':
      case 'D':
      case 'd':
      case 'H':
      case 'h':
      case 'm':
      case 's':
        return parseTokenOneOrTwoDigits;
      default:
        return new RegExp(token.replace('\\', ''));
    }
  };

  isArray = function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  isString = function(obj) {
    return toString.call(obj) === '[object String]';
  };

  isValidStringParam = function(string) {
    return string && isString(string);
  };

  isValidFormatParam = function(format) {
    if (isString(format)) {
      return isValidStringParam(format);
    }
    if (isArray(format)) {
      return format.length;
    }
    return false;
  };

  singleTest = function(string, format) {
    var parsedInput, token, _i, _len, _ref;
    _ref = format.match(formattingTokens);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      token = _ref[_i];
      parsedInput = (getParseRegexForToken(token).exec(string) || [])[0];
      string = string.replace(getParseRegexForToken(token), '');
      format = format.replace(token, '');
      if (parsedInput === void 0) {
        return false;
      }
    }
    return string === format;
  };

  test = function(string, format) {
    var formatItem, _i, _len;
    if (!(isValidStringParam(string) && isValidFormatParam(format))) {
      return false;
    }
    if (isString(format)) {
      return singleTest(string, format);
    }
    for (_i = 0, _len = format.length; _i < _len; _i++) {
      formatItem = format[_i];
      if (singleTest(string, formatItem)) {
        return true;
      }
    }
    return false;
  };

  if (typeof module !== 'undefined') {
    module.exports.formatjs = {
      test: test
    };
  }

  if (typeof window !== 'undefined') {
    window.formatjs = {
      test: test
    };
  }

  if (typeof define === "function" && define.amd) {
    define("formatjs", [], function() {
      return {
        test: test
      };
    });
  }

}).call(this);
