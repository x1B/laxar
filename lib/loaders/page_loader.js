/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import assert from '../utilities/assert';
import { FLAT } from '../tooling/pages';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Creates and returns a new page loader instance.
 *
 * @param {ArtifactProvider} artifactProvider
 *    an ArtifactProvider to load application assets
 * @param {PagesCollector} pagesCollector
 *    a tooling collector to consume page and composition information
 *
 * @return {PageLoader}
 *    a page loader instance
 *
 * @private
 */
export function create( artifactProvider, pagesCollector ) {
   assert( artifactProvider ).isNotNull();
   assert( pagesCollector ).isNotNull();

   return { load };

   /**
    * Loads a pre-assembled page definition. References to compositions, widgets and layouts have been
    * resolved at build-time. Schema-validation for the page itself and for the contained feature
    * configurations has also already been performed.
    *
    * @param {String} pageRef
    *    the page to load. Usually a path relative to the page base path, with the `.json` suffix omitted
    *
    * @return {Promise}
    *    the result promise
    *
    * @private
    */
   function load( pageRef ) {
      const { definition } = artifactProvider.forPage( pageRef );
      return definition().then( pageDefinition => {
         pagesCollector.collectPageDefinition( pageRef, pageDefinition, FLAT );
         return pageDefinition;
      } );
   }
}
