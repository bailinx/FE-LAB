'use strict';
var indexController = {};

indexController.index = function (req, res, next) {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	console.log('ip :' + ip);
	res.render('index', {title: '每日一答 ▪ 查询'});
}

module.exports = indexController;