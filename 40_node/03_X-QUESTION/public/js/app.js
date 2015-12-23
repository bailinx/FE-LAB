'use strict';
require.config({
	paths: {
		angular: "/libs/angular/angular",
		angularRoute: "/libs/angular-route/angular-route",
		domReady: "/libs/requirejs-domready/domReady",
		jquery: "/libs/jquery/dist/jquery"
	},
	shim: {
		'angular': {'exports': 'angular'},
		'angularRoute': ['angular']
	}
});

require(['domReady!', 'jquery'], function (doc, $) {
	$(function () {
		$("#btnSearch").click(function() {
			var query =  $("#iptQuery").val();
			if(query.length < 5) {
				alert('至少5个关键字.');
			} else {
				$.get('/question/' + query, function (data) {
					if(data.length == 0) {
						alert('无数据');
					} else {
                        $(".pre-rst").fadeIn();
                        $(".pre-rst").html("");
                        for( var idx=0; idx < data.length; idx++) {
                            $(".pre-rst").append(data[idx].question + ":" + data[idx].result + "<br>");
                        }
					}

				});
			}
		});
	});

});