
This repository contains many examples of web components.  A few are
implementations of components published elsewhere.  But most are 
components developed to emulate all or part of the displays for the
Cologne Sanskrit Lexicon.

This document is a guide to the applications appearing in the various
subfolders.  The applications are listed in the order they were developed.

## No web components
* [wc-blink](https://funderburkjim.github.io/webcompLearn/wc-blink/index.html) This uses only ES6 Javascript to create a very simple component.  It is
good to see this once.  But components that need attributes, properties,
and events require a lot more 'boilerplate' complexity.
* search-form :  This is a php application, so does not run on Github.
  It has nothing to do with web components.  It shows a php program with
  a 'search' entry, which references a 'database' of country names.
  As each character is typed, the display shows names whose spelling
  starts with the string thus-far entered. 
* [datalist-with-ajax](https://funderburkjim.github.io/webcompLearn/datalist-with-ajax/) : Similar to search-form.  But uses a Javascript call to read
  a list of elements from a file on the server.  
  This has nothing directly to do with web components.
  * There is a file 'getlang.php' which probably could be used to get
    the list of html elements; of course this would require a php server.

## No web components, but lit-html
* [lithtml-adam-bar](https://funderburkjim.github.io/webcompLearn/lithtml-adam-bar/)  Implements examples from [Adam Bar's video](https://www.youtube.com/watch?v=eSILtbWYrNc).  The video is a good intro to the lit-html library.
  The code does not deal with web-components. The lit-element
  JS library does facilitate web-component construction, and lit-element
  makes use of lit-html.  Most of the following examples use the
  lit-element and lit-html libraries.
  The code uses lit-html from the unpkg content delivery network.
  * I also referred to this [lit-html getting-started](https://lit-html.polymer-project.org/guide/getting-started) documentation.
* [lithtml-adam-bar1](https://funderburkjim.github.io/webcompLearn/lithtml-adam-bar1/) Same as above; but uses a local version of lit-html.js from https://github.com/aaronshaf/lit-html-bundle.
  * This code is dated 2017.  How to create using latest stable release of
    lit-html?
## lit-element web components
* lit-element.  All the subsequent examples use lit-element and lit-html
  libraries.  I found it surprisingly hard to get these libraries on
  my local machine, and ended up using my local copy of 
  * lit-element-2.3.1.js
    Thia ia from the  https://github.com/webfolderio/lit4browser/ repository.
    Somehow, this combines lit-element.js and lit-html.js.
    The download links for all versions are in the author's *releases* directory
    https://github.com/webfolderio/lit4browser/releases
  * Download link is: https://github.com/webfolderio/lit4browser/releases/download/2.3.1/lit-element-2.3.1.js
  * There is a newer release lit-element-2.4.js as of 10-8-2020.
  * The (non-minified?) size is about 160k.


* [lit-datalist01](https://funderburkjim.github.io/webcompLearn/lit-datalist01/)
  is an early example of an input element with an ajax call for auto-suggestion;
  The functionality is much like the search-form example above.
  This also requires a php server, so doesn't run on GitHub.
  Here we use both lit-element and lit-html. 
* [lit-datalist01a](https://funderburkjim.github.io/webcompLearn/lit-datalist01a/) : 
  * Use the getsuggtion API at https://sanskrit-lexicon.uni-koeln.de/ to
 get words starting with a certain spelling  (only handles SLP1 spelling).
  * Uses HTML `datalist` element to show the list of suggestions.
  * `<csl-citation>` web component does the work. 
  * Create a custom event `new-key` so the 'parent' of csl-citation can
    know what the user selected (via an 'enter keydown' event.

* [lit-fetch01](https://funderburkjim.github.io/webcompLearn/lit-fetch01/) :
  minimalist my-fetch custom element using fetch and the lit-html 'until' function.
  The data is in a local text file.
* [lit-fetch02](https://funderburkjim.github.io/webcompLearn/lit-fetch02/) :
  stackoverflow example of a web component `fetch-lit` that fetches data, then
  displays the data. Revised to use a local json file for the data.
* [lit-element02](https://funderburkjim.github.io/webcompLearn/lit-element02/) :  Implements example from [polymer project documentation](https://lit-element.polymer-project.org/try/style).  Various things are illustrated:
  * css in the shadow-dom.  
  * default attribute values for custom element.
  * passing attribute value to custom element.
* [lit-element03](https://funderburkjim.github.io/webcompLearn/lit-element03/) :  Shows how one custom element can be composed from one or more other
  custom elements.
* [lit-getword01](https://funderburkjim.github.io/webcompLearn/lit-getword01/) :  Provides a custom element which implements the getword api at
  https://sanskrit-lexicon.uni-koeln.de/ by means of
  attributes to the `<csl-getword>` element.  
  * Uses shadow dom css; originally from 
    [basic.css from apidev](https://github.com/sanskrit-lexicon/csl-apidev/blob/master/css/basic.css).  
  * The css is loaded 'statically'  from the file getword_styles.js.
    This means that the style is the same for all instances of the
    `<csl-citation>` custom elements.
  * getword_styles.js  specifiy custom web fonts for Devanagari.
  * HOWEVER, these fonts are NOT loaded and used.  
* [lit-getword01a](https://funderburkjim.github.io/webcompLearn/lit-getword01a/) : adds additional 'serverID' attribute to the `<csl-getword>` custom element.
 * Default value 'cologne' uses the csl-apidev api at the Cologne server for data and web fonts.
 * value 'xampp' uses a local installation of the csl-apidev API.
 * Other values of serverID may be useful in the future.
 * It is a best practice to have the CSS to be static in the class.
 * Suppose we have two
* WEB FONT comment
  * font-faces are NOT loaded when these are in the shadow dom.
    Thus font-face statements must be in the regular ('light') dom.
  * Ref: https://medium.com/rate-engineering/winning-the-war-of-css-conflicts-through-the-shadow-dom-de6c797b5cba
  * One solution is to load a fonts.css file in the
    head of index.html.  That is is the solution used here.
    This is not ideal because the custom element does not load the
    custom fonts.
* Note regarding web-font uses. This is determined by the
  basicdisplay.php program in csl-apidev at Cologne.
  * siddhanta : devanagari text
  * oldstandard: for normal text in pwg
  * oldstandarditalic : same as above?
  * charterindocapital: for 'ls' text in pwg
    font family for capitalization, only SNP 

