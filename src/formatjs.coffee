###
* format.js
* https://github.com/nowamasa/format.js
*
* Copyright (c) 2012 nowamasa
* Licensed under the MIT license.
###

formattingTokens           = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|LT|LL?L?L?)/g;
parseTokenOneOrTwoDigits   = /\d\d?/                                             # 0 - 99
parseTokenOneToThreeDigits = /\d{1,3}/                                           # 0 - 999
parseTokenThreeDigits      = /\d{3}/                                             # 000 - 999
parseTokenFourDigits       = /\d{4}/                                             # 0000 - 9999
parseTokenWord             = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i # any word characters or numbers
parseTokenTimezone         = /Z|[\+\-]\d\d:?\d\d/i                               # +00:00 -00:00 +0000 -0000 or Z
parseTokenT                = /T/i                                                # T (ISO seperator)

getParseRegexForToken = (token)->
    switch token
        when 'DDDD'                                                              then return parseTokenThreeDigits
        when 'YYYY'                                                              then return parseTokenFourDigits
        when 'S','SS','SSS','DDD'                                                then return parseTokenOneToThreeDigits
        when 'MMM','MMMM','ddd','dddd','a','A'                                   then return parseTokenWord
        when 'Z','ZZ'                                                            then return parseTokenTimezone
        when 'T'                                                                 then return parseTokenT
        when 'MM','DD','dd','YY','HH','hh','mm','ss','M','D','d','H','h','m','s' then return parseTokenOneOrTwoDigits
        else                                                                          return new RegExp(token.replace('\\', ''))

isArray = (obj)-> toString.call(obj) is '[object Array]'

isString = (obj)-> toString.call(obj) is '[object String]'

isValidStringParam = (string)-> string and isString(string)

isValidFormatParam = (format)->
    return isValidStringParam(format) if isString(format)
    return format.length if isArray(format)
    false

singleTest = (string, format)->
    for token in format.match(formattingTokens)
        parsedInput = (getParseRegexForToken(token).exec(string) or [])[0]
        string      = string.replace(getParseRegexForToken(token), '')
        format      = format.replace(token, '')
        return false if parsedInput is undefined
    string is format

test = (string, format)->
    return false unless isValidStringParam(string) and isValidFormatParam(format)
    return singleTest(string, format) if isString(format)
    return true for formatItem in format when singleTest(string, formatItem)
    false

module.exports.formatjs = { test }   if typeof module isnt 'undefined'             # CommonJS module
window.formatjs = { test }           if typeof window isnt 'undefined'             # browser window
define("formatjs", [], -> { test } ) if typeof define is "function" and define.amd # AMD module