/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

/* eslint-disable quotes,max-len */
export default {
   "$schema": "http://json-schema.org/draft-04/schema#",
   "type": "object",
   "properties": {

      "layout": {
         "type": "string",
         "description": "The layout to use. May be omitted if another page in the extension hierarchy defines one."
      },

      "extends": {
         "type": "string",
         "description": "The name of the page to extend."
      },

      "areas": {
         "type": "object",
         "description": "A map from area name to a list of widgets to display within that area.",
         "patternProperties": {
            "^[a-z][\\.a-zA-Z0-9_]*$": {
               "type": "array",
               "items": {
                  "type": "object",
                  "properties": {

                     "widget": {
                        "type": "string",
                        "description": "Path to the widget that should be rendered."
                     },
                     "composition": {
                        "type": "string",
                        "description": "Path to the composition that should be included."
                     },
                     "layout": {
                        "type": "string",
                        "description": "Path to the layout that should be inserted."
                     },
                     "id": {
                        "type": "string",
                        "pattern": "^[a-z][a-zA-Z0-9_]*$",
                        "description": "ID of the widget or composition. Will be generated if missing."
                     },
                     "insertBeforeId": {
                        "type": "string",
                        "description": "The ID of the widget this widget or composition should be inserted before."
                     },
                     "features": {
                        "type": "object",
                        "description": "Configuration of the features defined by the widget or composition."
                     },
                     "enabled": {
                        "type": "boolean",
                        "default": true,
                        "description": "Set to false to omit widgets e.g. for debugging purposes."
                     }

                  },
                  "additionalProperties": false
               }
            }
         },
         "additionalProperties": false
      }

   },
   "additionalProperties": false
};
