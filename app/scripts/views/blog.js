/*global define*/

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
