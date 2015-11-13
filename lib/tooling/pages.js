/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
define( [
], function() {
   'use strict';

   var current = {
      name: null,
      page: null
   };

   var listeners = [];

   return {
      addListener: function( listener ) {
         listeners.push( listener );
      },
      removeListener: function( listener ) {
         listeners = listeners.filter( function( _ ) {
            return _ !== listener;
         } );
      },
      setPage: function( name, page ) {
         current = {
            name: name,
            page: page
         };
         listeners.forEach( function( listener ) {
            listener( current );
         } );
      },
      current: function() {
         return current;
      }
   };

} );
