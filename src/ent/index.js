'use strict';

const { isArray, isUndefined, noop, partial } = require('lodash');
const { testSomething, testValue, ifThen, notResult, isString } = require( '../bool' );
const { jsonDecode } = require( '../str' );
const { filterBy, extractPath } = require( '../collect' );
const { identity, lazy } = require( '../util' );


const get = function( path, ent, def=null ){
	let result = testValue( notResult(isUndefined), pureProp( path, ent ), lazy( getByPath, [path, ent] ) );
	return testSomething( result, def );
};


const splitPath = function( path, delimeter = '.' ){
	return isString( path )? path.split( delimeter ) : [] ;
}


const getByPath = function( path, ent, def=null ){
	let result = resolvePath( path ).reduce( ( res, part ) => {
		return ( res )? getByProp( part, res ) : res ;
	}, ent );
	return testSomething( result, def );
}


const getByProp = function( prop, ent, def=null )
{
	let handler = ifThen( pureProp( prop, ent ), identity, null );
	if( !handler ){
		handler = filterBy;
		if( isString( prop ) )
		{
			prop = testSomething( jsonDecode( prop ), prop );
			handler = isString( prop )? extractPath : filterBy ;
		}
	}
	console.log(handler);
	return handler( prop, ent );
}


const resolvePath = function( path ){
	return testValue( isArray, path, lazy( splitPath, [path] ) );
}


const pureProp = function( prop, ent )
{
	let result = noop;
	try{
		result = ent[prop];
	} catch (e) {};

	return result;
}


module.exports = {
	get: get,
	getByPath: getByPath,
	getByProp: getByProp,
}