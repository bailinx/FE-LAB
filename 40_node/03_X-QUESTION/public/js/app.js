'use strict';
require.config({
	paths: {
		angular: "/libs/angular/angular",
		angularRoute: "/libs/angular-route/angular-route",
		domReady: "/libs/requirejs-domready/domReady",
		jquery: "/libs/jquery/dist/jquery",
		jqueryCookie: "http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie"
	},
	shim: {
		'angular': {'exports': 'angular'},
		'angularRoute': ['angular'],
		'jqueryCookie': ['jquery']
	}
});

require(['domReady!', 'jquery', 'jqueryCookie'], function (doc, $, jqueryCookie) {
	$(function () {
		if(!!!$.cookie('open')) {
			$(".mask").fadeIn();
			var date = new Date();
			// 一天
			date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
			$.cookie('open', '1', { path: '/', expires: date });
		}
		$("#btnSearch").click(function() {
			var query =  $("#iptQuery").val();
			if(query.length < 5) {
				$(".pre-rst").fadeIn();
				$(".pre-rst").html("至少5个关键字.");
			} else {
				$.get('/question/' + query, function (data) {
					if(data.length == 0) {
						$(".pre-rst").fadeIn();
						$(".pre-rst").html("暂时未找到..");
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
		$(".mask-close").click(function() {
			$(".mask").fadeOut();
		})
	});

});