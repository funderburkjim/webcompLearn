
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

## lit-element custom elements for Sanskrit Lexicon

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
* [lit-getword02_v0](https://funderburkjim.github.io/webcompLearn/lit-getword02_v0/index.html) A `my-app` element, which combines elements `csl-citation` and `csl-getword`.
  * The csl-citation element is built on the HTML 'input' element.
    When the *Enter key* is pressed, the 'new-citation' custom event is created
    with the appname.
  * csl-citation also has an 'appname' attribute.  
  * The my-app element has an event listener for the 'new-citation' event.
    Each new my-app element constructs csl-citation with a new 'appname'
  * When there are multiple instances of the 'my-app' element,  the
    appname serves to coordinate the events.
  *  [lit-getword02_v0 2 =](https://funderburkjim.github.io/webcompLearn/lit-getword02_v0/index2.html)  shows two instances of 'my-app'.
  *  [lit-getword02_v0 3 =](https://funderburkjim.github.io/webcompLearn/lit-getword02_v0/index3.html)  shows three instances of 'my-app'.
  * The my-app element requires a 'dict' attribute.
  * When a my-app element detects a new citation, it uses `csl-getword`
    element to fetch the data and render the html result from server.
* [lit-getword02](https://funderburkjim.github.io/webcompLearn/lit-getword02/index.html) Almost identical to lit-getword02_v0. 
  * modules csl-getword02, and getword_styles are same
    in lit-getword02 and lit-getword02_v0.
  * module csl-citation is different only in how the 'new-citation' event
    is dispatched.  
    * in lit-getword02_v0, *dispatchEvent(new_event)
    * in lit-getword02, *this.dispatchEvent(new_event)*
  * module my-app differs in how the 'new-citation' event handler is done
    * in lit-getword02_v0, in constructor 
      *addEventListener('new-citation',(e) => {...})*
    * in lit-getword02, declaratively
      `<csl-citation @new-citation="${(e) => {...}}">`
  * It is unknown why the difference dispatchEvent is required.
* [lit-getword03](https://funderburkjim.github.io/webcompLearn/lit-getword03/index.html) Adds a dictionary selection element, `csl-dict`, to the `csl-citation` and `csl-getword` elements of lit-getword02.  The `my-app` element combines
these three elements. Both csl-dict and csl-citation generate events when
the user changes either. And my-app listens for such changes and is
rendered.  The rendering of my-app causes a rendering of <csl-getword>, which
fetches html from the server and renders it.
  * my-app has an appname attribute; the constructor gives each instance a
    new appname.
  * It was felt that this needed to be passed to the csl-citation child
    element and also be passed back by the csl-citation custom 'new-citation'
    event and used by the my-app event handler for 'new-citation'.
  * lit-getword03.1 does NOT use this appname, and seems to work fine.
    See below.
* [lit-getword03.1/index.html](https://funderburkjim.github.io/webcompLearn/lit-getword03.1/index.html) and
  [lit-getword03.1/index2.html](https://funderburkjim.github.io/webcompLearn/lit-getword03.1/index2.html) Functionally identical to lit-getword03,
  but my-app.js does NOT use the appname attribute.  
  Preferable to lit-getword03 since  slightly simpler.
* [lit-getword03a/index.html](https://funderburkjim.github.io/webcompLearn/lit-getword03a/index.html) and
  [lit-getword03a/index2.html](https://funderburkjim.github.io/webcompLearn/lit-getword03a/index2.html) Functionally similar to lit-getword03. 
  * shorten dictionary names in csl-dict component
  * csl-citation and csl-getword02 components same as in lit-getword02
  * add 'height' attribute to my-app element.
  * add some styling
  * [problem_child.html](https://funderburkjim.github.io/webcompLearn/lit-getword03a/problem_child.html)  Not related to web components.  For testing
  certain features of grid layout.
  * [problem_child1.html](https://funderburkjim.github.io/webcompLearn/lit-getword03a/problem_child1.html)  Test certain features of grid layout.
* [lit-getword03a.1/index.html](https://funderburkjim.github.io/webcompLearn/lit-getword03a.1/index.html) Try to replace the 'height attribute' by
  using the style attribute of 'my-app' instance(s).  For some reason,
  this does NOT work as expected.
* [lit-getword04/index.html](https://funderburkjim.github.io/webcompLearn/lit-getword04/index.html) add csl-input and csl-output custom elements.
  * same as lit-getword03a: csl-dict, csl-citation
  * new csl-input, csl-output
  * csl-getword element has new attributes: input and output
  * my-app has a 'height' attribute
* [lit-getword04/index2.html](https://funderburkjim.github.io/webcompLearn/lit-getword04/index2.html) Two copies of the my-app custom element, with
 different heights.
* [lit-getword05/index.html](https://funderburkjim.github.io/webcompLearn/lit-getword05/index.html) This version is functionally same as lit-getword04
  * csl-dict, csl-getword02, csl-input, csl-output are the same as in lit-getword04
  * my-app has a 'suggest' attribute, which it passes down to csl-citation.
  * csl-citation has a 'suggest' attribute.
    * When suggest attribute has value 'no', the behavior is same as before.
      e.g. a new-citation event is dispatched when return key pressed
      This is the default.
    * When suggest attribute has value 'yes':
      * there need to be 'dict' and 'input' attribute values
      * these are used to make an API call to getsuggest.php.
      * Use a 'datalist' for the UI of csl-citation.  This is not as pretty as
    the JQuery auto-suggestion UI, but functions adequately
  * Web fonts To use web fonts (notably siddhanta.ttf for Devanagari)
    * link to [fonts.css](https://funderburkjim.github.io/webcompLearn/fonts.css).  These have two possible sources for the fonts.
    * [getword_styles.js](https://funderburkjim.github.io/webcompLearn/lit-getword05/getword_styles.js) provides css for the shadow dom of csl-getword02.
      The font-face declarations are commented out, as they are 
      non-functional in the shadow css.
* [lit-getword05/index-suggest.html](https://funderburkjim.github.io/webcompLearn/lit-getword05/index-suggest.html)  This uses "suggest='yes'" in index.html. See above.
* [lit-getword05/index2.html](https://funderburkjim.github.io/webcompLearn/lit-getword05/index2.html) Two independent copies of my-app element, neither
using suggestions
* [lit-getword05/index2-suggest.html](https://funderburkjim.github.io/webcompLearn/lit-getword05/index2-suggest.html) Two independent copies of my-app element, both using suggestions
* [lit-getword05a/index.html](https://funderburkjim.github.io/webcompLearn/lit-getword05a/index.html) my-app1 custom element builds on the elements of getword05.
  * Two instances of 'my-app', one with dictionary 'mw', and one
    with dictionary 'mw72'. Each uses 'suggest' api.
  * Two additional 'global' elements, whose values can filter to both
    my-app instances
    * csl-input:  the spelling method for citations
    * csl-citation:  the citation.  This citation does not use suggestions,
      since there is no dictionary specified.
    * There are no listeners in my-app1. Changes to each of the global
      elements generate updates in both instances of my-app.

