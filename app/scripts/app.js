// Filename: app.js
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
