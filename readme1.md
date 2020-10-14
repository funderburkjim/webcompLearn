
This repository contains many examples of web components.  A few are
implementations of components published elsewhere.  But most are 
components developed to emulate all or part of the displays for the
Cologne Sanskrit Lexicon.

This document is a guide to the applications appearing in the various
subfolders.  The applications are listed in the order they were developed.

* [wc-blink](https://funderburkjim.github.io/webcompLearn/wc-blink/index.html) This uses only ES6 Javascript to create a very simple component.  It is
good to see this once.  But components that need attributes, properties,
and events require a lot more 'boilerplate' complexity.

* search-form :  This is a php application, so does not run on Github.
  It has nothing to do with web components.  It shows a php program with
  a 'search' entry, which references a 'database' of country names.
  As each character is typed, the display shows names whose spelling
  starts with the string thus-far entered. 
* [datalist-with-ajax](https://funderburkjim.github.io/webcompLearn/datalist-with-ajax/) : Similar to search-form.  But uses a Javascript call to read
  a list of elements from a file on some server.  
  This has nothing directly to do with web components.
  * There is a file 'getlang.php' which probably could be used to get
    the list of html elements; of course this would require a php server.
* [lithtml-adam-bar](https://funderburkjim.github.io/webcompLearn/lithtml-adam-bar/)  Implements examples from [Adam Bar's video](https://www.youtube.com/watch?v=eSILtbWYrNc).  The video is a good intro to the lit-html library.
  The code does not deal with web-components. The lit-element
  JS library does facilitate web-component construction, and lit-element
  makes use of lit-html.  Most of the following examples use the
  lit-element and lit-html libraries.
  The code uses lit-html from the unpkg content delivery network.
  * I also referred to this [lit-html getting-started](https://lit-html.polymer-project.org/guide/getting-started) documentation.
* lit-element.  All the subsequent examples use lit-element and lit-html
  libraries.  I found it surprisingly hard to get these libraries on
  my local machine, and ended up using my local copy of 
  * lit-element-2.3.1.js
    I THINK this was from the  https://github.com/webfolderio/lit4browser/
    Somehow, this seems to combine lit-element.js and lit-html.js  
    current clone in '../lit4browser'
    https://github.com/webfolderio/lit4browser/releases
    Download link is: https://github.com/webfolderio/lit4browser/releases/download/2.3.1/lit-element-2.3.1.js

* [lit-datalist01](https://funderburkjim.github.io/webcompLearn/lit-datalist01/)
  is an early example of an input element with an ajax call for auto-suggestion;
  The functionality is much like the search-form example above.
  This also requires a php server, so doesn't run on GitHub.
  Here we use both lit-element and lit-html. 



* lit-element-2.4.js
 10-8-2020  There is now a newer release.

* In the examples
