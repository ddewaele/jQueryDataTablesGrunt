## Introduction

This is a sample project built using the `Yeoman` stack. 

The goal was to setup a project using the following technology stack

- Twitter bootstrap 3
- Backbone
- Datatables
- RequireJS
- GruntJS

## Current issues

-  Not all CSS files are picked up when running `grunt:serve`

[GruntJS CSS handling : How to select CSS files and how to package them](http://stackoverflow.com/questions/21941097/gruntjs-css-handling-how-to-select-css-files-and-how-to-package-them)

- When running the requireJS optimizer, the jQuery Datatables don't work anymore due to a javascript error

![Running grunt serve:dist](https://dl.dropboxusercontent.com/u/13246619/GithubScreenshots/Grunt/grunt-serve-dist.png)

- When running without the requireJS optimizer, the jQuery Datatables work, but no jQuery Datatables CSS elements are added to main.css.

![Running grunt serve:dist](https://dl.dropboxusercontent.com/u/13246619/GithubScreenshots/Grunt/grunt-serve.png) 

## Yo scaffolding

The project was started using yo, the scaffolding tool.

	yo backbone jQueryDataTablesGrunt

The following bower.json is generated as a result of the `yo` command.

	{
	"name": "jquerydatatablesgrunt",
	"version": "0.0.0",
	"dependencies": {
	  "sass-bootstrap": "~3.0.0",
	  "jquery": "~1.9.0",
	  "underscore": "~1.4.3",
	  "backbone": "~1.0.0",
	  "requirejs": "~2.1.5",
	  "requirejs-text": "~2.0.5",
	  "modernizr": "~2.6.2"
	},
	"devDependencies": {}
	}


## Application dependencies

As you can see 'yo' already included libraries such as Twitter Bootstrap (the sass port) and jQuery.

Next thing we need to do is install the datatables dependency. jQuery datatables is available through bower, and we can install the dependency in our app and update the bower.json file at the same time using the command below:

	bower install datatables --save

You should get the following output:

	bower datatables#*              cached git://github.com/DataTables/DataTables.git#1.9.4
	bower datatables#*            validate 1.9.4 against git://github.com/DataTables/DataTables.git#*
	bower jquery#~1.8.0             cached git://github.com/jquery/jquery.git#1.8.3
	bower jquery#~1.8.0           validate 1.8.3 against git://github.com/jquery/jquery.git#~1.8.0
	bower jquery#>= 1.9.0           cached git://github.com/jquery/jquery.git#2.1.0
	bower jquery#>= 1.9.0         validate 2.1.0 against git://github.com/jquery/jquery.git#>= 1.9.0

You will get a jquery conflict that needs to be resolved:

	Unable to find a suitable version for jquery, please choose one:
	      1) jquery#~1.8.0 which resolved to 1.8.3 and has datatables#1.9.4 as dependants
	      2) jquery#~1.9.0 which resolved to 1.9.1 and has jquerydatatablesgrunt as dependants
	      3) jquery#>= 1.9.0 which resolved to 2.1.0 and has sass-bootstrap#3.0.2 as dependants

	Prefix the choice with ! to persist it to bower.json

	  [?] Answer: 2
	  bower datatables#~1.9.4        install datatables#1.9.4

	  datatables#1.9.4 app/bower_components/datatables
	  └── jquery#1.9.1

After all of this, your bower.json will look like this:

	{
	"name": "jquerydatatablesgrunt",
	"version": "0.0.0",
	"dependencies": {
	  "sass-bootstrap": "~3.0.0",
	  "jquery": "~1.9.0",
	  "underscore": "~1.4.3",
	  "backbone": "~1.0.0",
	  "requirejs": "~2.1.5",
	  "requirejs-text": "~2.0.5",
	  "modernizr": "~2.6.2",
	  "datatables": "~1.9.4"
	},
	"devDependencies": {}
	}


Another dependency we need is the datatables bootstrap3 extension. This is a modified version of jQuery Datatables that plays nice with Twitter Bootstrap 3.

For that we need to have the following dependency declred in our dependencies section:

	"datatables-bootstrap3": "git@github.com:Jowin/Datatables-Bootstrap3.git",

This can be done by executing

	bower install datatables-bootstrap3=git@github.com:Jowin/Datatables-Bootstrap3.git --save


After that command the  datatables bootstrap3 extension will be added to your bower.json file and it should look like this:

	{
	  "name": "jquerydatatablesgrunt",
	  "version": "0.0.0",
	  "dependencies": {
	    "sass-bootstrap": "~3.0.0",
	    "jquery": "~1.9.0",
	    "underscore": "~1.4.3",
	    "backbone": "~1.0.0",
	    "requirejs": "~2.1.5",
	    "requirejs-text": "~2.0.5",
	    "modernizr": "~2.6.2",
	    "datatables": "~1.9.4",
	    "datatables-bootstrap3": "git@github.com:Jowin/Datatables-Bootstrap3.git"
	  },
	  "devDependencies": {}
	}

Notice how the datatables-bootstrap3 was added with the github url

## RequireJS configuration

Now that we have all of our libraries downloaded and install, we can configure them in RequireJS (our main.js)

We'll need to include a shim config for the datatables-bootstrap3 library so that RequireJS knows it depends on the datatables library.

	require.config({
	    shim: {
	        datatablesBootstrap3: {
	            deps: ['datatables']
	        }        
	    },
	    paths: {
	        datatables: '../bower_components/datatables/media/js/jquery.datatables',
	        datatablesBootstrap3: '../bower_components/datatables-bootstrap3/BS3/assets/js/datatables',
	    }
	});

## RequireJS bootstrap

Our `main.js` requires `app.js` to be loaded. It then proceeds to initialize our application.

	require([
	    'app'
	], function (App) {
	    App.initialize();
	});


## Bootstrap application

Our application, `app.js` simply prepares a Router object that is initialized upon app initialization.

	define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'routes/router',
	  'datatablesBootstrap3',
	], function($, _, Backbone, Router,i18n,DatatablesBootstrap3){

	    var initialize = function(){
			Router.initialize();
		}

	  	return {
	    	initialize: initialize
	  	};
	});

## Bootstrap router

Our bootstrap router defines the actual router, and allows it to be initialized. In this simple router, we expose a single route callled `blogs`. This means when we target our browser to http://localhost:9000/#blogs, the `blogListView.render();` will be executed.


	define([
	    'jquery',
	    'backbone',
	    'views/blog',
	], function ($, Backbone,BlogListView) {
	    'use strict';

	    var BlogRouter = Backbone.Router.extend({
	        routes: {
	        	 "blogs" : "viewBlogs"
	        }
	    });

	    var blogListView = new BlogListView();
		
	    var initialize = function(){

	    	var router = new BlogRouter;
	    
		    router.on('route:viewBlogs', function(){
		    	blogListView.render();
		    });

	        console.log("Router intialized")
		    Backbone.history.start();

		    return router;
		};

	  	return {
	    	initialize: initialize
	  	};
	});

So we have a main -> app -> router dependency chain.

## Bootstrap view

The Bootstrap view is very simple and renders 100 blog objects into a table.
Here we're using the jQuery DataTables extenson to set some properties on the table.

	define([
	    'jquery',
	    'underscore',
	    'backbone',
	    'templates'
	], function ($, _, Backbone, JST) {
	    'use strict';

	    var BlogListView = Backbone.View.extend({
	        template: JST['app/scripts/templates/blogs.html'],

			el: $('.page'),

	        render: function(){

	            var blogs = [];
	            for (var i=1 ; i<=100 ; i++) {
	                blogs.push({title:"title " + i,content:"content" + i});
	            }

	            this.$el.html(this.template({ blogs: blogs }));

	            var table = $('#blog-list-datatable').dataTable( {
	                "bLengthChange":false,
	                "aoColumns": [
	                    null,
	                    null
	                ]
	                    
	            } );

	            if (table.length>0) {
	                table.fnSort( [ [0,'asc'] ] );
	            }            
	        }

	    });



	    return BlogListView;
	});


##JST Templates

We're going to store our HTML templates (underscore templates) in the `<%= yeoman.app %>/scripts/templates` folder, so update the `Gruntfile.js` accordingly.

            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/**/*.html'
                ],
                tasks: ['jst']
            }

and

        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/**/*.html']
                }
            }
        }            

#References

https://datatables.net/