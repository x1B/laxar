/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
define( [
], function() {
   'use strict';

   var currentPageInfo = {
      pageRef: null,
      pageDefinitions: {},
      widgetDescriptors: {}
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
      setWidgetDescriptor: function( ref, descriptor ) {
         currentPageInfo.widgetDescriptors[ ref ] = descriptor;
      },
      setPageDefinition: function( ref, page ) {
         currentPageInfo.pageDefinitions[ ref ] = page;
      },
      setCurrentPage: function( ref ) {
         currentPageInfo.pageRef = ref;
         // :TODO: determine which page definitions and widget descriptors
         //        are no longer needed and delete them
         listeners.forEach( function( listener ) {
            listener( currentPageInfo );
         } );
      },
      current: function() {
         return currentPageInfo;
      }
   };

} );
