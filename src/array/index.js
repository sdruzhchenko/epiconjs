'use strict';

const { isArray, ...lo } = require('lodash');
const { testValue, ...bool } = require('../bool');

const toArray = function( value ) {
	return testValue( isArray, value, [value] );
}

module.exports = {
	toArray: toArray,
}

