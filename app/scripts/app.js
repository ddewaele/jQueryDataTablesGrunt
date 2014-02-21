// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'routes/router',
  'datatablesBootstrap3',
], function($, _, Backbone, Router,i18n){

    var initialize = function(){
		Router.initialize();
	}

  	return {
    	initialize: initialize
  	};
});
