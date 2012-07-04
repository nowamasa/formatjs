
/*
* formatjs
* https://github.com/nowamasa/formatjs
*
* Copyright (c) 2012 nowamasa
* Licensed under the MIT license.
*/


(function() {
  var FormatJS;

  FormatJS = (function() {

    function FormatJS() {
      this._parseTokenWord = /^([0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)$/i;
      this._parseTokenNumber1_12 = /^([1-9]|1[0-2])$/;
      this._parseTokenNumber01_12 = /^(0[1-9]|1[0-2])$/;
      this._parseTokenNumber0_59 = /^([0-9]|[1-5][0-9])$/;
      this._parseTokenNumber00_59 = /^(0[0-9]|[1-5][0-9])$/;
    }

    FormatJS.prototype._isArray = function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    FormatJS.prototype._isString = function(obj) {
      return Object.prototype.toString.call(obj) === '[object String]';
    };

    FormatJS.prototype._isValidStringParam = function(string) {
      return string && this._isString(string);
    };

    FormatJS.prototype._isValidFormatParam = function(format) {
      if (this._isString(format)) {
        return this._isValidStringParam(format);
      }
      if (this._isArray(format)) {
        return format.length;
      }
      return false;
    };

    FormatJS.prototype._getParseRegexForToken = function(token) {
      switch (token) {
        case 'M':
          return this._parseTokenNumber1_12;
        case 'Mo':
          return this._parseTokenWord;
        case 'MM':
          return this._parseTokenNumber01_12;
        case 'MMM':
          return this._parseTokenWord;
        case 'MMMM':
          return this._parseTokenWord;
        case 'D':
          return /^([1-9]|[12][0-9]|3[01])$/;
        case 'Do':
          return this._parseTokenWord;
        case 'DD':
          return /^(0[1-9]|[12][0-9]|3[01])$/;
        case 'DDD':
          return /^([1-9]|[1-9][0-9]|[1-3][0-6][0-6])$/;
        case 'DDDo':
          return this._parseTokenWord;
        case 'DDDD':
          return /^(00[1-9]|0[1-9][0-9]|[1-3][0-6][0-6])$/;
        case 'd':
          return /^([0-6])$/;
        case 'do':
          return this._parseTokenWord;
        case 'ddd':
          return this._parseTokenWord;
        case 'dddd':
          return this._parseTokenWord;
        case 'w':
          return /^([1-9]|[1-4][0-9]|5[0-3])$/;
        case 'wo':
          return this._parseTokenWord;
        case 'ww':
          return /^(0[1-9]|[1-4][0-9]|5[0-3])$/;
        case 'YY':
          return /^(\d{2})$/;
        case 'YYYY':
          return /^(\d{4})$/;
        case 'H':
          return /^([0-9]|[12][0-3])$/;
        case 'HH':
          return /^(0[0-9]|[12][0-3])$/;
        case 'h':
          return this._parseTokenNumber1_12;
        case 'hh':
          return this._parseTokenNumber01_12;
        case 'm':
          return this._parseTokenNumber0_59;
        case 'mm':
          return this._parseTokenNumber00_59;
        case 's':
          return this._parseTokenNumber0_59;
        case 'ss':
          return this._parseTokenNumber00_59;
        default:
          return new RegExp(token.replace('\\', ''));
      }
    };

    FormatJS.prototype._getTokens = function(format) {
      return format.match(/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|hh?|HH?|mm?|ss?)/g);
    };

    FormatJS.prototype._getTokenAffix = function(format, tokens) {
      var end, i, out, prefix, start, token, _i, _len;
      out = [];
      for (i = _i = 0, _len = tokens.length; _i < _len; i = ++_i) {
        token = tokens[i];
        start = format.indexOf(token);
        end = start + token.length;
        prefix = start === 0 ? null : format.slice(0, start);
        out.push({
          token: token,
          prefix: prefix
        });
        format = format.slice(end, format.length);
        if (i !== 0) {
          out[i - 1]['suffix'] = prefix;
        }
        out[i]['suffix'] = format === '' ? null : i === tokens.length - 1 ? format : void 0;
      }
      return out;
    };

    FormatJS.prototype._test = function(string, format) {
      var affix, affixes, i, testPrefix, testToken, _i, _len,
        _this = this;
      testPrefix = function(prefix) {
        var result;
        if (!prefix) {
          return true;
        }
        result = string.slice(0, prefix.length) === prefix;
        string = string.slice(prefix.length, string.length);
        return result;
      };
      testToken = function(token, suffix, isLast) {
        var position, result, tokenStr;
        position = suffix ? string.indexOf(suffix) : string.length;
        tokenStr = string.slice(0, position);
        result = Boolean((tokenStr.match(_this._getParseRegexForToken(token)) || []).length);
        if (!result) {
          return false;
        }
        string = string.slice(position, string.length);
        if (isLast && string) {
          return string === (suffix || '');
        } else {
          return true;
        }
      };
      affixes = this._getTokenAffix(format, this._getTokens(format) || []);
      if (!affixes.length) {
        return string === format;
      }
      for (i = _i = 0, _len = affixes.length; _i < _len; i = ++_i) {
        affix = affixes[i];
        if (!testPrefix(affix.prefix)) {
          return false;
        }
        if (!testToken(affix.token, affix.suffix, i === affixes.length - 1)) {
          return false;
        }
      }
      return true;
    };

    FormatJS.prototype.test = function(string, format) {
      var formatItem, _i, _len;
      if (!(this._isValidStringParam(string) && this._isValidFormatParam(format))) {
        return false;
      }
      if (this._isString(format)) {
        return this._test(string, format);
      }
      for (_i = 0, _len = format.length; _i < _len; _i++) {
        formatItem = format[_i];
        if (this._test(string, formatItem)) {
          return true;
        }
      }
      return false;
    };

    return FormatJS;

  })();

  if (typeof module !== 'undefined') {
    module.exports = FormatJS;
  }

  if (typeof window !== 'undefined') {
    window.FormatJS = FormatJS;
  }

  if (typeof define === "function" && define.amd) {
    define("FormatJS", [], function() {
      return FormatJS;
    });
  }

}).call(this);
