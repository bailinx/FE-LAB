'use strict';
var index = require('./index'),
	question = require('./question'),
	config = require('../config/config'),
	express = require('express'),
	route = express.Router(),
	middleware = {};

module.exports = function (app) {
	middleware = require('../middleware/common')(app, middleware);
	// 设置中间件
	app.use(middleware.setPowerBy);
	app.use('/', index);
	app.use('/question', question);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (config.env === 'development') {
		app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
};

