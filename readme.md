## Introduction

This is my seed repository for any HTML 5 project I start.
This file descripes some of the core features of the stack and should give you everything you need to know to start coding.

Besides the core project structure, I added a couple of pages that all implement a simple a+b=c functionality in a number of different ways.
This should give you a first hands-on example on core AngularJS concepts.

If you are new to AngularJS, you might want to clone https://github.com/AGoliath/webstack/tree/0.1
This is the basic version of the stack

The current master branch adds an example on how to interact with REST services, and uses some more advanced topics.

## Prerequisites

### Required
You will need npm, the node.js package manager. 
If you haven´t installed it already, grab it from http://nodejs.org

###  Optional

* a decent IDE (I prefeer IntelliJ IDEA or PHPStorm)
* a good language file editor if you´d like to go into translating your app into multiple languages. I use www.poedit.net

## Getting Started

1. Clone the repository
2. Edit the package.json file and fill in the "name" at the very top of the file (the other "tbd"s are optional)
   Note: This is the name of your app and might end in file paths, urls, and so on, so don´t use whitespace or characters invalid in urls.
3. Open a elevated / sudo'ed terminal, go to the directory where this readme file lives (we´ll call it the "project dir" from now on), and run
   
```
npm install && npm install -g grunt-cli
```
Note: You´ll only need the elevated terminal if grunt-cli is not already installed. Otherwise, a non-priviledged terminal will do.

and all dependencies will be installed.

4. From a terminal at the project dir, run

```
grunt generateIndex deploy
```
If everything is set up correctly, the grunt job will run without errors and you´re now all set to start coding!

## A few tips on where to go on from here...

For development, you can go ahead and make your changes within the app/ folder.
There is no need to run any grunt targets while working within app/, except for the index.html and translations.js files.

To update your translations.js, see the Translations section below.

**Never edit the app/index.html file directly.** Please make your changes to index.template.html and run grunt generateIndex.
That makes sure you don´t miss out on any JS includes. You only need to run grunt generateIndex if you need to include JS files you freshly created

**Never** edit any files within dist/. These files are auto-generated by grunt deploy.

For debugging purpose it is recommend to have your IDE spawn a webserver and browser instance.
However if you want to fire up a simple HTTP server run "grunt start".
You may also open the app/index.html directly from your filesystem in your browser (via file:///yourpath/app/index.html) but this won´t work in all browsers,
so just use grunt start instead.


## grunt Tasks

Run grunt (without parameters) in the project folder to see a list of all relevant grunt tasks and a short description.

You can daisychain targets, e.g.

'''
grunt generateIndex deploy test e2etest start
'''

### grunt deploy magic

The grunt deploy task creates a dist version out of your source files within the app folder.
Here is a short overview of what it does exactly (check the gruntfile for details)

Please note: By design it does not execute the grunt generateIndex task.
I expect the dist version to behave exactly like the app version, I don´t want any other stuff to be added when I deploy (except for language file updates)
On the other hand: if you do not run grunt generateIndex at least once before grunt deploy, you might end up without an dist/index.html file...

* clean (as in: delete!) the .tmp and dist folder
* re-compile the language files
* compiles your LESS to CSS and changes the references in your code accordingly
* Removes the dependency on less.js
* uses ngmin to make your AngularJS Dependency Injections minify-safe
  (You can use the shortcut notification function($scope,$route) in your app sources,
  ngmin will convert it to the safe ["$scope","$route",function($scope,$route)] version for you
* concats all JS and CSS files to one (using the marker comments in the index.html)
* uglifies and minifies your JS and CSS
* create a source map for the minified JS

## Files and Folders

Core Source development happens in app/
Translation files live in po/ 
Testcases can be found in test/

Below app/ there are

* app/js where your JS files live. app/js/libs contain all third-party code.
* app/partials contain all HTML partials (sub-pages as well as directives) of your app
* app/css contains your LESS source files (both, your custom files directly under app/css as well as a subfolder for bootstraps LESS)
* app/img and app/fonts should be self-explanatory
* app/index.template.html that contains the template for grunt generateIndex
* app/index.html - once again - never edit it by hand! make your changes to the template and then run grunt generateIndex

after grunt deploy, there are also

* dist/ containing a self-contained, ready-to-distribute version of the app (css and js minified, LESS compiled to CSS, etc...)
* dist_maps/ contains the source map files for the uglifiyed JS and CSS
* node_modules/ where npm installs it´s dependencies
* .tmp/ just ignore, intermediate files generated during grunt deploy (e.g. combined-but-not-jet-minified CSS and JS files)

### Files you shoud never edit by hand

* app/index.html - edit app/index.template.html, then run grunt generateIndex to update index.html
* app/js/translations.js - use grunt lang to update this file based on your translations in po/ (see section 'Translations' below)
* everything within dist/ and dist_map


## Testing

The stack supports unit tests as well as end-to-end tests.
For examples see the test/ folder.

All test cases use the Jasmine framework (http://jasmine.github.io/2.0/introduction.html)
Unit tests use "vanilla" Jasmine, while e2e tests make use of the WebDriver and Protractor extensions for Jasmine (https://github.com/angular/protractor/blob/master/docs/api.md)

### Unittests

Currently, all unittests run on the **dist** folder only.

Run unit tests via grunt test (one time) or grunt watchTests (spawns a browser to constantly monitor your tests as you code them)
Unit test configuration is done by test/karma.conf.js


Unittests do not test (or rely on) browser renderings, that´s what end-to-end tests are for.

### End-to-End (e2e) Tests

Run end-to-end tests via grunt e2etest.
This will spawn a webserver (by default at http://127.0.0.1:18181/) for your **app** folder, and executes the testcases against that base URL.
E2e test configuration is done by test/protractor.conf.js

### Test Browsers
Karma is currently configured to run tests in Chrome, Firefox and IE.
For this to work you need to set a corresponding ENV variable for every browser binary,
please see http://karma-runner.github.io/0.8/config/browsers.html for details.

If you want to remove a specific browser (e.g. on Linux without IE), adapt the browsers array in test/karma.conf.js

Protractor currently uses Chrome only (simply because I haven´t configured other browsers yet)

## Translations

After running grunt lang, there will be a file po/template.pot you can use to create new and update existing translation (*.po) files.
The name of the translation file must match the parameter in the setLanguage() API, e.g. a  <span ng-click="setLanguage('en')"> in partials/header.html requires an en.po file compiled via grunt lang.
As stated before, I use www.poedit.net to generate my translations.


## Currently included Frameworks/Tools
(see package.json for used versions; angularjs and boostrap versions can be found in their source trees below app/js/lib/)

* Grunt as Buildtool
* AngularJS as MVC Framework (based on full jQuery, not jQLite)
* Bootstrap (full versoin, not angular-ui.bootstrap) as UI Framework
* LESS as CSS precompiler
* Karma as Unit-Testcase runner
* Protractor as End-to-End Testcase runner (based on WebDriver and Selenium)
* Language Support via ng-gettext
* A number of grunt plugins for creating the 'dist' version, see gruntfile for details


