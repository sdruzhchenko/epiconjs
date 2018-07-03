'use strict';

const {isNil, isUndefined, partial, isFunction, ...lo} = require('lodash');
const { val, identity, lazy } = require('../util');

const notResult = function( fn ){
	return (...args) => !fn.apply( args );
}

const not = function( value ){
	return !value;
}

const and = function( valueA, valueB ){
	return ( valueA && valueB );
}

const or = function( valueA, valueB ){
	return ( valueA || valueB );
}

const testValue = function( testExpr, value, def = null )
{
	return testExpr(value)? value : val( def ) ;
}

const ifThen = function( value, right, left=null )
{
	right = testValue( isFunction, right, lazy( identity, right ) );
	left = testValue( isFunction, left, lazy( identity, left ) );

	return ( !value )? right( value ): left( value );
}

const isNothing = function( value ){
	return isNil( value ) || isUndefined( value );
}

const isSomething = function( value )
{
	return !isNothing( value );
}

const isString = function( value )
{
	return typeof value === "string";
}



const testSomething = partial( testValue, isSomething );

const testNothing = partial( testValue, isNothing );


module.exports = {
	isString: isString,
	isNothing: isNothing,
	isSomething: isSomething,
	testValue: testValue,
	testSomething: testSomething,
	testNothing: testNothing,
	notResult: notResult,
	ifThen: ifThen,
	not: not,
	and: and,
	or: or,
};

