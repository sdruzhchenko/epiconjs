'use strict';

const {isFunction,...lo} = require('lodash');

const val = function( value ){
	return isFunction( value ) ? value() : value ;
}

const lazy = function( fn, args ){
	return () => fn.apply( fn, args );
}

const identity = function( value ){
	return function(){ return value };
}

module.exports = {
	val: val,
	lazy: lazy,
	identity: identity,
}