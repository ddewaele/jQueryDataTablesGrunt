/*global define*/

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
