Project was started using yo

	yo backbone jQueryDataTablesGrunt

The following bower.json file was generated

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

Next thing we need to do is install the datatables dependency.

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


Another dependency we need is the datatables bootstrap

For that we need to have the following dependency declred in our dependencies section:

	"datatables-bootstrap3": "git@github.com:Jowin/Datatables-Bootstrap3.git",

This can be done by executing

	bower install datatables-bootstrap3=git@github.com:Jowin/Datatables-Bootstrap3.git --save

If all goes well you should see the following output


	bower datatables-bootstrap3#*   cached git@github.com:Jowin/Datatables-Bootstrap3.git#7867c2ac15
	bower datatables-bootstrap3#* validate 7867c2ac15 against git@github.com:Jowin/Datatables-Bootstrap3.git#*
	bower datatables-bootstrap3#*  install datatables-bootstrap3#7867c2ac15

	datatables-bootstrap3#7867c2ac15 app/bower_components/datatables-bootstrap3

And your bower.json file should look like this:

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



#JST Templates

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

