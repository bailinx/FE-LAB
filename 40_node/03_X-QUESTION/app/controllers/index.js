'use strict';
var indexController = {},
	logger = require('../utils/log').logger;

indexController.index = function (req, res, next) {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
    logger.log('来访ip :' + ip);
	res.render('index', {title: '每日一答 ▪ 查询'});
}

module.exports = indexController;