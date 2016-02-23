/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import * as areaHelperModule from '../area_helper';
import * as q from 'q';
import pageData from './data/page_data';

describe( 'AreaHelper', () => {

   describe( 'instance', () => {

      let widgetAdapterRefs;
      let areaHelper;
      let visibilityServiceMock;

      beforeEach( () => {
         visibilityServiceMock =
            jasmine.createSpyObj( 'visibilityServiceMock', [ '_reset', '_updateState', 'isVisible' ] );
         areaHelper = areaHelperModule.create( q, pageData, visibilityServiceMock );

         widgetAdapterRefs = Object.keys( pageData.areas )
            .map( areaName => pageData.areas[ areaName ] )
            .reduce( ( refs, widgets ) => {
               return widgets.reduce( ( refs, { id } ) => {
                  return [ ...refs, {
                     id: id,
                     templatePromise: q.resolve( `<div>${id}</div>` ),
                     adapter: jasmine.createSpyObj( 'adapter', [ 'domAttachTo' ] )
                  } ];
               }, refs );
            }, [] );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'resets the state of the visibility service', () => {
         expect( visibilityServiceMock._reset ).toHaveBeenCalled();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'extracts all areas on creation', () => {
         expect( areaHelper.areasInArea( '' ) ).toEqual( [ 'testArea1', 'testArea2' ] );
         expect( areaHelper.areasInArea( 'testArea1' ) ).toEqual( [ 'id2.content' ] );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'registers widget areas embedded in widgets', () => {
         expect( areaHelper.areasInArea( '' ) ).toEqual( [ 'testArea1', 'testArea2' ] );
         expect( areaHelper.areasInArea( 'testArea1' ) ).toEqual( [ 'id2.content' ] );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'initially has no registered areas with according DOM element', () => {
         expect( areaHelper.exists( 'testArea1' ) ).toBe( false );
         expect( areaHelper.exists( 'testArea2' ) ).toBe( false );
         expect( areaHelper.exists( 'id2.content' ) ).toBe( false );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'throws if a widget area is attached more than once', () => {
         areaHelper.register( 'testArea1', {} );
         expect( () => areaHelper.register( 'testArea1', {} ) )
            .toThrow( new Error( 'The area "testArea1" is defined twice in the current layout.' ) );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'forwards visibility changes to the visibilityServiceMock', () => {
         areaHelper.setVisibility( 'testArea1', true );
         expect( visibilityServiceMock._updateState ).toHaveBeenCalledWith( 'testArea1', true );

         areaHelper.setVisibility( 'testArea1', false );
         expect( visibilityServiceMock._updateState ).toHaveBeenCalledWith( 'testArea1', false );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with registered widget areas and attached widget adapters', () => {

         beforeEach( () => {
            visibilityServiceMock.isVisible.and.returnValue( false );
            areaHelper.register( 'testArea1', {} );
            areaHelper.register( 'testArea2', {} );

            areaHelper.attachWidgets( widgetAdapterRefs );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'asks whether the areas are visible', () => {
            expect( visibilityServiceMock.isVisible ).toHaveBeenCalledWith( 'testArea1' );
            expect( visibilityServiceMock.isVisible ).toHaveBeenCalledWith( 'testArea2' );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'when set to visible', () => {

            beforeEach( done => {
               visibilityServiceMock.isVisible.and.returnValue( true );
               areaHelper.setVisibility( 'testArea1', true );

               q.all( widgetAdapterRefs.map( ref => ref.templatePromise ) ).then( done );
            } );

            //////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'attaches the adapters of that area', () => {
               expect( widgetAdapterRefs[ 0 ].adapter.domAttachTo )
                  .toHaveBeenCalledWith( {}, '<div>id1</div>' );
               expect( widgetAdapterRefs[ 1 ].adapter.domAttachTo )
                  .toHaveBeenCalledWith( {}, '<div>id2</div>' );
               expect( widgetAdapterRefs[ 2 ].adapter.domAttachTo ).not.toHaveBeenCalled();
               expect( widgetAdapterRefs[ 3 ].adapter.domAttachTo ).not.toHaveBeenCalled();
            } );

         } );

      } );

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   describe( 'findWidgetAreas( rootElement )', () => {

      let root;
      let resultAreas;

      beforeEach( () => {
         root = document.createElement( 'div' );
         root.innerHTML = `
            <div ax-widget-area="area1" id="1"></div>
            <div data-ax-widget-area="area2" id="2"></div>
            <div>
               <section ax-widget-area="area3" id="3"></section>
               <section ax-widget-area="area4" id="4"></section>
               <main>
                  <div data-ax-widget-area="area5" id="5"></div>
               </main>
            </div>
         `;
         resultAreas = areaHelperModule.findWidgetAreas( root );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'finds areas without data prefix', () => {
         expect( resultAreas[ 'area1' ] ).toBe( root.querySelector( '[id="1"]' ) );
         expect( resultAreas[ 'area3' ] ).toBe( root.querySelector( '[id="3"]' ) );
         expect( resultAreas[ 'area4' ] ).toBe( root.querySelector( '[id="4"]' ) );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'finds areas with data prefix', () => {
         expect( resultAreas[ 'area2' ] ).toBe( root.querySelector( '[id="2"]' ) );
         expect( resultAreas[ 'area5' ] ).toBe( root.querySelector( '[id="5"]' ) );
      } );

   } );

} );