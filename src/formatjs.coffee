###
* formatjs
* https://github.com/nowamasa/formatjs
*
* Copyright (c) 2012 nowamasa
* Licensed under the MIT license.
###

class FormatJS
    constructor: ->
        @_parseTokenWord        = /^([0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)$/i # any word characters or numbers
        @_parseTokenNumber1_12  = /^([1-9]|1[0-2])$/                                      # 1 2   ... 11 12
        @_parseTokenNumber01_12 = /^(0[1-9]|1[0-2])$/                                     # 01 02 ... 11 12
        @_parseTokenNumber0_59  = /^([0-9]|[1-5][0-9])$/                                  # 0 1   ... 58 59
        @_parseTokenNumber00_59 = /^(0[0-9]|[1-5][0-9])$/                                 # 00 01 ... 58 59

    _isArray:(obj)->
        Object.prototype.toString.call(obj) is '[object Array]'

    _isString: (obj)->
        Object.prototype.toString.call(obj) is '[object String]'

    _isValidStringParam: (string)->
        string and @_isString(string)

    _isValidFormatParam: (format)->
        return @_isValidStringParam(format) if @_isString(format)
        return format.length if @_isArray(format)
        false

    _getParseRegexForToken: (token)->
        switch token
            # Month
            when 'M'    then return @_parseTokenNumber1_12  # 1 2              ... 11 12
            when 'Mo'   then return @_parseTokenWord        # 1st 2nd          ... 11th 12th
            when 'MM'   then return @_parseTokenNumber01_12 # 01 02            ... 11 12
            when 'MMM'  then return @_parseTokenWord        # Jan Feb          ... Nov Dec
            when 'MMMM' then return @_parseTokenWord        # January February ... November December
            # Day of Month
            when 'D'    then return /^([1-9]|[12][0-9]|3[01])$/  # 1 2     ... 30 31
            when 'Do'   then return @_parseTokenWord         # 1st 2nd ... 30th 31st
            when 'DD'   then return /^(0[1-9]|[12][0-9]|3[01])$/ # 01 02   ... 30 31
            # Day of Year
            when 'DDD'  then return /^([1-9]|[1-9][0-9]|[1-3][0-6][0-6])$/    # 1 2     ... 364 366
            when 'DDDo' then return @_parseTokenWord                      # 1st 2nd ... 364th 365th
            when 'DDDD' then return /^(00[1-9]|0[1-9][0-9]|[1-3][0-6][0-6])$/ # 001 002 ... 364 365
            # Day of Week
            when 'd'    then return /^([0-6])$/          # 0 1             ... 5 6
            when 'do'   then return @_parseTokenWord # 0th 1st       ... 5th 6th
            when 'ddd'  then return @_parseTokenWord # Sun Mon       ... Fri Sat
            when 'dddd' then return @_parseTokenWord # Sunday Monday ... Friday Saturday
            # Week of Year
            when 'w'    then return /^([1-9]|[1-4][0-9]|5[0-3])$/  # 1 2     ... 52 53
            when 'wo'   then return @_parseTokenWord           # 1st 2nd ... 52nd 53rd
            when 'ww'   then return /^(0[1-9]|[1-4][0-9]|5[0-3])$/ # 01 02   ... 52 53
            # Year
            when 'YY'   then return /^(\d{2})$/ # 70 71     ... 29 30
            when 'YYYY' then return /^(\d{4})$/ # 1970 1971 ... 2029 2030
            # Hour
            when 'H'    then return /^([0-9]|[12][0-3])$/       # 0 1   ... 22 23
            when 'HH'   then return /^(0[0-9]|[12][0-3])$/      # 00 01 ... 22 23
            when 'h'    then return @_parseTokenNumber1_12  # 1 2   ... 11 12
            when 'hh'   then return @_parseTokenNumber01_12 # 01 02 ... 11 12
            # Minute
            when 'm'    then return @_parseTokenNumber0_59  # 0 1   ... 58 59
            when 'mm'   then return @_parseTokenNumber00_59 # 00 01 ... 58 59
            # Second
            when 's'    then return @_parseTokenNumber0_59  # 0 1   ... 58 59
            when 'ss'   then return @_parseTokenNumber00_59 # 00 01 ... 58 59
            # default
            else             return new RegExp(token.replace('\\', ''))

    _getTokens: (format)->
        format.match(/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|hh?|HH?|mm?|ss?)/g)

    _getTokenAffix: (format, tokens)->
        out = []
        for token, i in tokens
            start  = format.indexOf(token)
            end    = start + token.length
            prefix = if start is 0 then null else format.slice(0, start)
            out.push({ token, prefix })
            format = format.slice(end, format.length)
            out[i - 1]['suffix'] = prefix if i isnt 0
            out[i]['suffix'] = if format is '' then null else format if i is tokens.length - 1
        out

    _test: (string, format)->

        testPrefix = (prefix)->
            return true unless prefix
            result = string.slice(0, prefix.length) is prefix
            string = string.slice(prefix.length, string.length)
            result

        testToken = (token, suffix, isLast)=>
            position = if suffix then string.indexOf(suffix) else string.length
            tokenStr = string.slice(0, position)
            result   = Boolean (tokenStr.match(@_getParseRegexForToken(token)) or []).length
            return false unless result
            string = string.slice(position, string.length)
            if isLast and string then string is (suffix or '') else true

        affixes = @_getTokenAffix(format, @_getTokens(format) or [])
        return string is format unless affixes.length
        for affix, i in affixes
            return false unless testPrefix(affix.prefix)
            return false unless testToken(affix.token, affix.suffix, i is affixes.length - 1)
        true

    # PUBLIC ----------------------------------------------------------------------------
    test: (string, format)->
        return false unless @_isValidStringParam(string) and @_isValidFormatParam(format)
        return @_test(string, format) if @_isString(format)
        return true for formatItem in format when @_test(string, formatItem)
        false

module.exports  = FormatJS           if typeof module isnt 'undefined'             # CommonJS module
window.FormatJS = FormatJS           if typeof window isnt 'undefined'             # browser window
define("FormatJS", [], -> FormatJS ) if typeof define is "function" and define.amd # AMD module