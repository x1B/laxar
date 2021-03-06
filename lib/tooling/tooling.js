/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/**
 * Accepts and keeps laxarjs application data from various laxarjs services, and makes it available to
 * development tools.
 *
 * This module has an internal API (the `collectors`-service), and an external API (the `providers` service).
 * The collectors service is fed data by the other laxarjs services, while the provider allows external
 * listeners to subscribe to that data's changes, or to retrieve snapshots of it.
 */

import { createProvider as createPagesProvider, createCollector as createPagesCollector } from './pages';


// eslint-disable-next-line valid-jsdoc
/** Collects inspection data from laxarjs services */
export function createCollectors( configuration, log ) {
   return {
      pages: createPagesCollector( configuration, log )
   };
}

// eslint-disable-next-line valid-jsdoc
/** Exposes inspection data from laxarjs services to development tools */
export function createProviders( collectors ) {
   return {
      pages: createPagesProvider( collectors.pages )
   };
}
