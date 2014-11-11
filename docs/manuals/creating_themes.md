[« return to the manuals](index.md)

Preliminary readings:

* [LaxarJS Core Concepts](../concepts.md)
* [Widgets and Activities](./widgets_and_activities.md)
* [Writing Pages](./writing_pages.md)


# Creating Themes

Sometimes you would like to use the _one widget_ in _two or more applications_.
For this, usually you want the widget to _behave identically_, but _look differently_.
LaxarJS has the concept of _themes_ to help you achieve this.


## Why Themes?

LaxarJS ships with a so-called _default theme_, which is actually just Bootstrap CSS with a few additional classes.


### From Ad-Hoc Styles to Theme Folders… 

Usually, you will need to add some CSS classes of your own.
For example, the vast majority of web application needs some styling for the page background, centering, a special logo or custom header and footer areas.
To include such _ad-hoc styles_, you _could_ simply add a CSS file of your own to the project, and load it from the debug.html and index.html files using the `<link>` tag.
However, it is _recommended_ to add these styles to your main application layout instead, into a sub-folder called `default.theme/css`.

The _benefit_ of using such a _theme folder_ is that

  * your CSS will be _automatically bundled and compressed_ together with the other CSS (no `<link>` tag needed) and that
  * you can support different _themes_ simply by adding more `.theme` folders

Due to the first point, using the theme folders is useful and recommended, even if you only use (and maybe customize) the default theme.
The LaxarJS demo application [MashupDemo](http://laxarjs.org/demos/mashupdemo/) uses this no-fuss approach to customizing Bootstrap.


### …and to Custom Themes

As soon as you use multiple layouts, the previous approach does not really scale anymore.
In these cases, creating your own theme is definitely recommended.
A detailed explanation of [creating a theme](#creating-a-theme) is given below.


### A Note on Compass/SCSS

When using theme folders or entire themes, the runtime will only ever look at `css/` sub-folders.
This means that it is entirely _up to you_ which CSS authoring tools you would like to use.

That being said, we use Compass/SCSS to create themes, and the default-theme is based on the SCSS version of Bootstrap.
Using this approach makes it very easy to create a custom theme just by changing some Bootstrap SCSS variables.
Also, by using SCSS variables defined in the theme, widgets and controls can provide a consistent appearance.


## Creating your own Theme

Let us create our own theme for an existing application, the [LaxarJS ShopDemo](http://laxarjs.org/demos/shopdemo/).
The ShopDemo brings it's own theme `laxar_demo`, which is implemented by augmenting Bootstrap with some custom additions.

![LaxarJS ShopDemo using laxar_demo theme](creating_themes/shop_demo_laxar_demo_50.png)

**_Above:_ The LaxarJS ShopDemo using the _laxar_demo_ theme**

However, the demo also works with just the default theme, provided by LaxarJS UiKit, although admittedly it does not look quite as pretty:

![LaxarJS ShopDemo using default theme](creating_themes/shop_demo_default_50.png)

**_Above:_ The LaxarJS ShopDemo using the _default_ theme**

### Adding a Theme Using Plain CSS 

Now, since all applications seem to offer a "dark" look these days, let us try to achieve this for our shop demo app.
Fortunately, there are several collections of nice bootstrap themes available for free.
On the site [Bootswatch](http://bootswatch.com) for example, you will find the theme _[darkly](http://bootswatch.com/darkly/)_, which looks like it might work for us.

The only thing that is actually _required_ for a theme to work are a configuration entry and a CSS file in the right place.
Put the pre-built [darkly css](http://bootswatch.com/darkly/bootstrap.css) into the right place, which is `includes/themes/darkly.theme/css/theme.css`.
The path prefix `includes/themes/` may be changed using the RequireJS configuration path `laxar-path-themes`.
In the LaxarJS configuration (usually `application/application.js`), change the property `laxar.portal.theme` from _"default"_ to _"darkly"_.
This causes the LaxarJS runtime to use the new theme.

Because the ShopDemo uses font-awesome, we need to add an import to the top of our CSS file for that as well:

```CSS
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
```

Before opening the application in the browser, make sure to restart the development server, so that the new files are picked up.
And _voilà_, we have a dark web shop:

![LaxarJS ShopDemo using vanilla darkly theme](creating_themes/shop_demo_darkly_50.png)

**_Above:_ The all-new ShopDemo using the _darkly_ theme, hopefully not for any shady business**

Of course, there are still some rough spots that need additional work:
For example, the widget headers look much better using the original laxar demo theme.

Let's fix that using _widget-specific styles:_
The widget styles use a _category/name_ directory structure, similar to that of the actual widgets.
Here are some suggestions for a nicer look, to be put under `widgets/shop_demo`:


* _ArticleBrowserWidget_: `article_browser_widget/css/article_browser_widget.css`
  Here we color the icon, the headline to match the logo, and the currently selected article to match the details widget.

```CSS
/** Customize header and icon color: */
.article-browser-widget h3 i {
  color: #F90;
}

.article-browser-widget th {
  background-color: #F90;
  color: #222222;
}

/** Highlight the selected article. */
.article-browser-widget tr.selected td {
  font-weight: bold;
  background: #3498DB;
}
```


* _ArticleTeaserWidget_: `article_teaser_widget/css/article_teaser_widget.css`
  Here we color the icon and the headline to match the button.

```CSS
/** Customize header and icon color: */
.article-teaser-widget h3 i {
   color: #3498DB;
}

.article-teaser-widget h4 {
   background-color: #3498DB;
   padding: 8px;
}
```


* _ShoppingCartWidget_: `shopping_cart_widget/css/shopping_cart_widget.css`
  Again, we color the icon and the headline to match the button.

```CSS
/** Customize header and icon color: */
.shopping-cart-widget h3 i {
   color: #00bc8c;
}

.shopping-cart-widget th {
   background-color: #00bc8c;
}

/** plus/minus buttons */
.shopping-cart-widget .app-increase-quantity {
   text-align: right !important;
}

.shopping-cart-widget .app-increase-buttons {
   padding: 0;
   padding-top: 6px;
   width: 40px;
}

.shopping-cart-widget .app-increase-buttons button {
   padding: 0;
}
```

Now we have four different CSS files.
Of course, we do not want users to download an additional CSS file for each widget that we use.
Instead, we use `grunt dist` to create a merged version, which we may load through the `index.html`.

![LaxarJS ShopDemo using complete darkly theme](creating_themes/shop_demo_darkly_complete_50.png)

**_Above:_ The all-new ShopDemo using the _darkly_ theme with widget styles. Not too shabby, eh? **

Of course, there are several problems with this way of styling widgets.
For example, if we would like to 


### Adding a Theme using Compass/SCSS


## How the Runtime Finds CSS

If you need additional CSS for specific widgets or controls



