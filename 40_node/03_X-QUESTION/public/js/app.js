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
		console.log('%c 瞅啥乃.', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:2em;');
		$("#iptQuery").focus();
		if(!!!$.cookie('open')) {
			$(".mask").fadeIn();
			var date = new Date();
			// 两个小时
			date.setTime(date.getTime() + (1 * 2 * 60 * 60 * 1000));
			$.cookie('open', '1', { path: '/', expires: date });
		}
		$("#btnSearch").click(function() {
			var query =  $("#iptQuery").val();
			if(query.length < 3) {
				$(".pre-rst").fadeIn();
				$(".pre-rst").html("至少3个关键字.");
			} else {
				$.get('/question/' + query, function (data) {
					if(data.length == 0) {
						$(".pre-rst").fadeIn();
						$(".pre-rst").html("暂时未找到，换个关键字试试..");
					} else {
                        $(".pre-rst").fadeIn();
                        $(".pre-rst").html("");
                        for( var idx=0; idx < data.length; idx++) {
                            $(".pre-rst").append(data[idx].question + " : <span style='color:limegreen'>" + data[idx].result + "</span><br>");
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