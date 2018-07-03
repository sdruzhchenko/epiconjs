'use strict';

const {startsWith, partial, isTrue, ...lo} = require('lodash');
//const { testValue, ...bool } = require('../bool');
const { toArray } = require('../array');



const isJsonStr = function( str )
{
	return str.startsWith( '{' ) && str.endsWith( '}' ) || str.startsWith( '[' ) && str.endsWith( ']' );
}


const jsonEncode = function( obj )
{
	var result = null;
	try{ result = JSON.stringify( obj ); } catch (e) {}
	return result;
}


const jsonDecode = function( str )
{
	var result = null;
	if( isJsonStr( str ) ){
		try{ result = JSON.parse( str ); } catch (e) {}
	}
	return result;
}






module.exports = {
	isJsonStr: isJsonStr,
	jsonEncode: jsonEncode,
	jsonDecode: jsonDecode,
}