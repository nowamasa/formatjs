var FormatJS = require('../dist/formatjs');
var formatjs = new FormatJS();

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['utils'] = {

    '_isArray':function (test) {
        test.expect(11);

        test.equal(formatjs._isArray(), false);
        test.equal(formatjs._isArray(null), false);
        test.equal(formatjs._isArray(false), false);
        test.equal(formatjs._isArray({}), false);
        test.equal(formatjs._isArray(''), false);
        test.equal(formatjs._isArray(1), false);
        test.equal(formatjs._isArray('abc'), false);

        test.equal(formatjs._isArray([]), true);
        test.equal(formatjs._isArray(['a']), true);
        test.equal(formatjs._isArray(new Array()), true);
        test.equal(formatjs._isArray(new Array(3)), true);

        test.done();
    },

    '_isString':function (test) {
        test.expect(9);

        test.equal(formatjs._isString(), false);
        test.equal(formatjs._isString({}), false);
        test.equal(formatjs._isString(false), false);
        test.equal(formatjs._isString(1), false);
        test.equal(formatjs._isString([]), false);
        test.equal(formatjs._isString(['a']), false);

        test.equal(formatjs._isString(''), true);
        test.equal(formatjs._isString(' '), true);
        test.equal(formatjs._isString('a'), true);

        test.done();
    },

    '_isValidStringParam':function (test) {
        test.expect(8);

        test.equal(formatjs._isValidStringParam(1), false);
        test.equal(formatjs._isValidStringParam([]), false);
        test.equal(formatjs._isValidStringParam({}), false);
        test.equal(formatjs._isValidStringParam(''), false);
        test.equal(formatjs._isValidStringParam(true), false);

        test.equal(formatjs._isValidStringParam('abc'), true);
        test.equal(formatjs._isValidStringParam(' '), true);
        test.equal(formatjs._isValidStringParam('a b'), true);

        test.done();
    },

    '_isValidFormatParam':function (test) {
        test.expect(7);

        test.equal(formatjs._isValidFormatParam(1), false);
        test.equal(formatjs._isValidFormatParam({}), false);
        test.equal(formatjs._isValidFormatParam(false), false);
        test.equal(formatjs._isValidFormatParam(''), false);
        test.equal(formatjs._isValidFormatParam([]), false);

        test.equal(formatjs._isValidFormatParam([1]), true);
        test.equal(formatjs._isValidFormatParam('a'), true);

        test.done();
    }

};

exports['tokens'] = {

    '_getParseRegexForToken':function (test) {
        test.expect(29);
        test.strictEqual(formatjs._getParseRegexForToken('M').toString(), formatjs._parseTokenNumber1_12.toString());
        test.strictEqual(formatjs._getParseRegexForToken('Mo').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('MM').toString(), formatjs._parseTokenNumber01_12.toString());
        test.strictEqual(formatjs._getParseRegexForToken('MMM').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('MMMM').toString(), formatjs._parseTokenWord.toString());

        test.strictEqual(formatjs._getParseRegexForToken('D').toString(), /^([1-9]|[12][0-9]|3[01])$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('Do').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('DD').toString(), /^(0[1-9]|[12][0-9]|3[01])$/.toString());

        test.strictEqual(formatjs._getParseRegexForToken('DDD').toString(), /^([1-9]|[1-9][0-9]|[1-3][0-6][0-6])$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('DDDo').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('DDDD').toString(), /^(00[1-9]|0[1-9][0-9]|[1-3][0-6][0-6])$/.toString());

        test.strictEqual(formatjs._getParseRegexForToken('d').toString(), /^([0-6])$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('do').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('ddd').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('dddd').toString(), formatjs._parseTokenWord.toString());

        test.strictEqual(formatjs._getParseRegexForToken('w').toString(), /^([1-9]|[1-4][0-9]|5[0-3])$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('wo').toString(), formatjs._parseTokenWord.toString());
        test.strictEqual(formatjs._getParseRegexForToken('ww').toString(), /^(0[1-9]|[1-4][0-9]|5[0-3])$/.toString());

        test.strictEqual(formatjs._getParseRegexForToken('YY').toString(), /^(\d{2})$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('YYYY').toString(), /^(\d{4})$/.toString());

        test.strictEqual(formatjs._getParseRegexForToken('H').toString(), /^([0-9]|[12][0-3])$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('HH').toString(), /^(0[0-9]|[12][0-3])$/.toString());
        test.strictEqual(formatjs._getParseRegexForToken('h').toString(), formatjs._parseTokenNumber1_12.toString());
        test.strictEqual(formatjs._getParseRegexForToken('hh').toString(), formatjs._parseTokenNumber01_12.toString());

        test.strictEqual(formatjs._getParseRegexForToken('m').toString(), formatjs._parseTokenNumber0_59.toString());
        test.strictEqual(formatjs._getParseRegexForToken('mm').toString(), formatjs._parseTokenNumber00_59.toString());

        test.strictEqual(formatjs._getParseRegexForToken('s').toString(), formatjs._parseTokenNumber0_59.toString());
        test.strictEqual(formatjs._getParseRegexForToken('ss').toString(), formatjs._parseTokenNumber00_59.toString());

        test.strictEqual(formatjs._getParseRegexForToken('xxx').toString(), new RegExp('xxx'.replace('\\', '')).toString());
        test.done();
    },

    '_getTokens':function (test) {
        test.expect(5);
        test.deepEqual(formatjs._getTokens(''), null);
        test.deepEqual(formatjs._getTokens('a'), null);
        test.deepEqual(formatjs._getTokens('YY YY YYYY'), ['YY','YY','YYYY']);
        test.deepEqual(formatjs._getTokens('YY DD MM'), ['YY','DD','MM']);
        test.deepEqual(formatjs._getTokens('dddd, MMMM Do YYYY, h:mm:ss a'), ['dddd','MMMM','Do','YYYY','h','mm','ss']);
        test.done();
    },

    '_getTokenAffix':function (test) {
        test.expect(3);
        test.deepEqual(formatjs._getTokenAffix('YY/DD/MM', ['YY','DD','MM']), [
            { token : 'YY', suffix : '/', prefix : null },
            { token : 'DD', suffix : '/', prefix : '/' },
            { token : 'MM', suffix : null, prefix : '/' }
        ]);

        test.deepEqual(formatjs._getTokenAffix('*YY**DD***MM****', ['YY','DD','MM']), [
            { token : 'YY', suffix : '**', prefix : '*' },
            { token : 'DD', suffix : '***', prefix : '**' },
            { token : 'MM', suffix : '****', prefix : '***' }
        ]);

        test.deepEqual(formatjs._getTokenAffix('*YY**DD***MM****', ['DD','MM']), [
            { token : 'DD', suffix : '***', prefix : '*YY**' },
            { token : 'MM', suffix : '****', prefix : '***' }
        ]);

        test.done();
    }

};

exports['test'] = {

    'one format':function (test) {
        test.expect(11);

        test.equal(formatjs.test('2012-04', 'YYYY-MM-DD'), false);
        test.equal(formatjs.test('2012-04-12', 'YYYY-MM-DD'), true);

        test.equal(formatjs.test('2012&04', 'YYYY&MM-DD'), false);
        test.equal(formatjs.test('2012&04-12', 'YYYY&MM-DD'), true);

        test.equal(formatjs.test('12/04', 'YYYY/MM'), false);
        test.equal(formatjs.test('2012/04', 'YYYY/MM'), true);

        test.equal(formatjs.test('2012/04', 'YYYY/MM'), true);
        test.equal(formatjs.test('2012 04', 'YYYY/MM'), false);

        test.equal(formatjs.test('2012/04/1', 'YYYY/MM/D'), true);
        test.equal(formatjs.test('2012/04/01', 'YYYY/MM/D'), false);

        test.equal(formatjs.test('2012/04/32', 'YYYY/MM/DD'), false);

        test.done();
    },

    'many format':function (test) {
        test.expect(4);

        test.equal(formatjs.test('12/04', ['YYYY/MM', 'YY', 'Do']), false);
        test.equal(formatjs.test('12', ['YYYY/MM', 'YY', 'Do']), true);

        test.equal(formatjs.test('2012/04/1', ['YYYY/MM', 'YYYY/MM/D']), true);
        test.equal(formatjs.test('2012/04/01', ['YYYY/MM', 'YYYY/MM/D']), false);

        test.done();
    },

    'token xxx':function (test) {
        test.expect(4);

        test.equal(formatjs.test('abv', 'xx'), false);
        test.equal(formatjs.test('45', 'aaaaaaaa'), false);
        test.equal(formatjs.test('45', '123'), false);
        test.equal(formatjs.test('45', 'rrrrrrr'), false);

        test.done();
    }
};

// specific tokens

exports['Month'] = {

    'token M':function (test) {
        test.expect(6);

        test.equal(formatjs.test('1', 'M'), true);
        test.equal(formatjs.test('6', 'M'), true);
        test.equal(formatjs.test('12', 'M'), true);
        test.equal(formatjs.test('a', 'M'), false);
        test.equal(formatjs.test('01', 'M'), false);
        test.equal(formatjs.test('13', 'M'), false);

        test.done();
    },

    'token Mo':function (test) {
        test.expect(6);

        test.equal(formatjs.test('1st', 'Mo'), true);
        test.equal(formatjs.test('6s', 'Mo'), true);
        test.equal(formatjs.test('12abc', 'Mo'), true);
        test.equal(formatjs.test('01', 'Mo'), true);
        test.equal(formatjs.test('01st', 'Mo'), true);
        test.equal(formatjs.test('13 st', 'Mo'), false);

        test.done();
    },

    'token MM':function (test) {
        test.expect(6);

        test.equal(formatjs.test('01', 'MM'), true);
        test.equal(formatjs.test('10', 'MM'), true);
        test.equal(formatjs.test('12', 'MM'), true);
        test.equal(formatjs.test('1', 'MM'), false);
        test.equal(formatjs.test('13', 'MM'), false);
        test.equal(formatjs.test('a', 'MM'), false);

        test.done();
    },

    'token MMM':function (test) {
        test.expect(6);

        test.equal(formatjs.test('Jan', 'MMM'), true);
        test.equal(formatjs.test('feb', 'MMM'), true);
        test.equal(formatjs.test('abc', 'MMM'), true);
        test.equal(formatjs.test('Jann', 'MMM'), true);
        test.equal(formatjs.test('123', 'MMM'), true);
        test.equal(formatjs.test('Ja gf', 'MMM'), false);

        test.done();
    },

    'token MMMM':function (test) {
        test.expect(6);

        test.equal(formatjs.test('Jan', 'MMMM'), true);
        test.equal(formatjs.test('feb', 'MMMM'), true);
        test.equal(formatjs.test('abcdef', 'MMMM'), true);
        test.equal(formatjs.test('123', 'MMMM'), true);
        test.equal(formatjs.test('dfg', 'MMMM'), true);
        test.equal(formatjs.test('abc def', 'MMMM'), false);

        test.done();
    }
};

exports['Day of Month'] = {

    'token D':function (test) {
        test.expect(9);

        test.equal(formatjs.test('1', 'D'), true);
        test.equal(formatjs.test('10', 'D'), true);
        test.equal(formatjs.test('20', 'D'), true);
        test.equal(formatjs.test('29', 'D'), true);
        test.equal(formatjs.test('30', 'D'), true);
        test.equal(formatjs.test('31', 'D'), true);
        test.equal(formatjs.test('0', 'D'), false);
        test.equal(formatjs.test('01', 'D'), false);
        test.equal(formatjs.test('32', 'D'), false);

        test.done();
    },

    'token Do':function (test) {
        test.expect(6);

        test.equal(formatjs.test('a', 'Do'), true);
        test.equal(formatjs.test('10', 'Do'), true);
        test.equal(formatjs.test('avc', 'Do'), true);
        test.equal(formatjs.test('av-c', 'Do'), false);
        test.equal(formatjs.test('234', 'Do'), true);
        test.equal(formatjs.test('an de', 'Do'), false);

        test.done();
    },

    'token DD':function (test) {
        test.expect(9);

        test.equal(formatjs.test('1', 'DD'), false);
        test.equal(formatjs.test('10', 'DD'), true);
        test.equal(formatjs.test('20', 'DD'), true);
        test.equal(formatjs.test('29', 'DD'), true);
        test.equal(formatjs.test('30', 'DD'), true);
        test.equal(formatjs.test('31', 'DD'), true);
        test.equal(formatjs.test('0', 'DD'), false);
        test.equal(formatjs.test('01', 'DD'), true);
        test.equal(formatjs.test('32', 'DD'), false);

        test.done();
    }

};

exports['Day of Year'] = {

    'token DDD':function (test) {
        test.expect(9);

        test.equal(formatjs.test('1', 'DDD'), true);
        test.equal(formatjs.test('99', 'DDD'), true);
        test.equal(formatjs.test('150', 'DDD'), true);
        test.equal(formatjs.test('300', 'DDD'), true);
        test.equal(formatjs.test('366', 'DDD'), true);
        test.equal(formatjs.test('367', 'DDD'), false);
        test.equal(formatjs.test('400', 'DDD'), false);
        test.equal(formatjs.test('400', 'DDD'), false);
        test.equal(formatjs.test('01', 'DDD'), false);

        test.done();
    },

    'token DDDo':function (test) {
        test.expect(4);

        test.equal(formatjs.test('1', 'DDDo'), true);
        test.equal(formatjs.test('12', 'DDDo'), true);
        test.equal(formatjs.test('av', 'DDDo'), true);
        test.equal(formatjs.test('adbf', 'DDDo'), true);

        test.done();
    },

    'token DDDD':function (test) {
        test.expect(6);

        test.equal(formatjs.test('001', 'DDDD'), true);
        test.equal(formatjs.test('099', 'DDDD'), true);
        test.equal(formatjs.test('300', 'DDDD'), true);
        test.equal(formatjs.test('366', 'DDDD'), true);
        test.equal(formatjs.test('367', 'DDDD'), false);
        test.equal(formatjs.test('7', 'DDDD'), false);

        test.done();
    }

};

exports['Day of Week'] = {

    'token d':function (test) {
        test.expect(4);

        test.equal(formatjs.test('0', 'd'), true);
        test.equal(formatjs.test('1', 'd'), true);
        test.equal(formatjs.test('6', 'd'), true);
        test.equal(formatjs.test('7', 'd'), false);

        test.done();
    },

    'token do':function (test) {
        test.expect(4);

        test.equal(formatjs.test('0', 'do'), true);
        test.equal(formatjs.test('acb', 'do'), true);
        test.equal(formatjs.test('Fri', 'do'), true);
        test.equal(formatjs.test('a', 'do'), true);

        test.done();
    },

    'token ddd':function (test) {
        test.expect(4);

        test.equal(formatjs.test('0', 'ddd'), true);
        test.equal(formatjs.test('acb', 'ddd'), true);
        test.equal(formatjs.test('Fri', 'ddd'), true);
        test.equal(formatjs.test('a', 'ddd'), true);

        test.done();
    },

    'token dddd':function (test) {
        test.expect(4);

        test.equal(formatjs.test('0', 'dddd'), true);
        test.equal(formatjs.test('acb', 'dddd'), true);
        test.equal(formatjs.test('Fri', 'dddd'), true);
        test.equal(formatjs.test('a', 'dddd'), true);

        test.done();
    }

};

exports['Week of Year'] = {

    'token w':function (test) {
        test.expect(6);

        test.equal(formatjs.test('0', 'w'), false);
        test.equal(formatjs.test('1', 'w'), true);
        test.equal(formatjs.test('01', 'w'), false);
        test.equal(formatjs.test('45', 'w'), true);
        test.equal(formatjs.test('53', 'w'), true);
        test.equal(formatjs.test('54', 'w'), false);

        test.done();
    },

    'token wo':function (test) {
        test.expect(4);

        test.equal(formatjs.test('0', 'wo'), true);
        test.equal(formatjs.test('avc', 'wo'), true);
        test.equal(formatjs.test('51rd', 'wo'), true);
        test.equal(formatjs.test('aaa', 'wo'), true);

        test.done();
    },

    'token ww':function (test) {
        test.expect(5);

        test.equal(formatjs.test('01', 'ww'), true);
        test.equal(formatjs.test('11', 'ww'), true);
        test.equal(formatjs.test('53', 'ww'), true);
        test.equal(formatjs.test('54', 'ww'), false);
        test.equal(formatjs.test('4', 'ww'), false);

        test.done();
    }

};

exports['Year'] = {

    'token YY':function (test) {
        test.expect(5);

        test.equal(formatjs.test('01', 'YY'), true);
        test.equal(formatjs.test('99', 'YY'), true);
        test.equal(formatjs.test('00', 'YY'), true);
        test.equal(formatjs.test('000', 'YY'), false);
        test.equal(formatjs.test('100', 'YY'), false);

        test.done();
    },

    'token YYYY':function (test) {
        test.expect(5);

        test.equal(formatjs.test('0100', 'YYYY'), true);
        test.equal(formatjs.test('2000', 'YYYY'), true);
        test.equal(formatjs.test('9999', 'YYYY'), true);
        test.equal(formatjs.test('10000', 'YYYY'), false);
        test.equal(formatjs.test('00000', 'YYYY'), false);

        test.done();
    }

};

exports['Hour'] = {

    'token H':function (test) {
        test.expect(5);

        test.equal(formatjs.test('0', 'H'), true);
        test.equal(formatjs.test('1', 'H'), true);
        test.equal(formatjs.test('23', 'H'), true);
        test.equal(formatjs.test('24', 'H'), false);
        test.equal(formatjs.test('01', 'H'), false);

        test.done();
    },

    'token HH':function (test) {
        test.expect(5);

        test.equal(formatjs.test('01', 'HH'), true);
        test.equal(formatjs.test('23', 'HH'), true);
        test.equal(formatjs.test('24', 'HH'), false);
        test.equal(formatjs.test('1', 'HH'), false);
        test.equal(formatjs.test('00', 'HH'), true);

        test.done();
    },

    'token h':function (test) {
        test.expect(6);

        test.equal(formatjs.test('1', 'h'), true);
        test.equal(formatjs.test('5', 'h'), true);
        test.equal(formatjs.test('12', 'h'), true);
        test.equal(formatjs.test('0', 'h'), false);
        test.equal(formatjs.test('13', 'h'), false);
        test.equal(formatjs.test('01', 'h'), false);

        test.done();
    },

    'token hh':function (test) {
        test.expect(6);

        test.equal(formatjs.test('01', 'hh'), true);
        test.equal(formatjs.test('11', 'hh'), true);
        test.equal(formatjs.test('12', 'hh'), true);
        test.equal(formatjs.test('1', 'hh'), false);
        test.equal(formatjs.test('00', 'hh'), false);
        test.equal(formatjs.test('13', 'hh'), false);

        test.done();
    }
};

exports['Minute'] = {

    'token m':function (test) {
        test.expect(6);

        test.equal(formatjs.test('0', 'm'), true);
        test.equal(formatjs.test('45', 'm'), true);
        test.equal(formatjs.test('59', 'm'), true);
        test.equal(formatjs.test('60', 'm'), false);
        test.equal(formatjs.test('01', 'm'), false);
        test.equal(formatjs.test('00', 'm'), false);

        test.done();
    },

    'token mm':function (test) {
        test.expect(7);

        test.equal(formatjs.test('00', 'mm'), true);
        test.equal(formatjs.test('01', 'mm'), true);
        test.equal(formatjs.test('45', 'mm'), true);
        test.equal(formatjs.test('59', 'mm'), true);
        test.equal(formatjs.test('60', 'mm'), false);
        test.equal(formatjs.test('0', 'mm'), false);
        test.equal(formatjs.test('1', 'mm'), false);

        test.done();
    }

};

exports['Second'] = {

    'token s':function (test) {
        test.expect(6);

        test.equal(formatjs.test('0', 's'), true);
        test.equal(formatjs.test('45', 's'), true);
        test.equal(formatjs.test('59', 's'), true);
        test.equal(formatjs.test('60', 's'), false);
        test.equal(formatjs.test('01', 's'), false);
        test.equal(formatjs.test('00', 's'), false);

        test.done();
    },

    'token ss':function (test) {
        test.expect(7);

        test.equal(formatjs.test('00', 'ss'), true);
        test.equal(formatjs.test('01', 'ss'), true);
        test.equal(formatjs.test('45', 'ss'), true);
        test.equal(formatjs.test('59', 'ss'), true);
        test.equal(formatjs.test('60', 'ss'), false);
        test.equal(formatjs.test('0', 'ss'), false);
        test.equal(formatjs.test('1', 'ss'), false);

        test.done();
    }

};