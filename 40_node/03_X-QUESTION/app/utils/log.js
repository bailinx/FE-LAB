'use strict';
var log4js = require('log4js'),
	config = require('../config/config');

log4js.configure({
	appenders: [
		{
			// 控制台输出
			type: 'console',
			category: 'console'
		},
		{
			// 日期文件格式
			type: 'file',
			filename: '../logs/log.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 20480,
			backups: 3,
			category: 'dateFileLog'
		}
	],
	replaceConsole: true,
	levels: {
		dateFileLog: 'debug',
		console: 'debug'
	}
});

var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');
// 模式选择
if (config.env === 'development') {
	exports.logger = consoleLog;
} else {
	exports.logger = dateFileLog;
}

exports.use = function (app) {
	app.use(log4js.connectLogger(consoleLog, {level: 'INFO', format: ':method :url'}));
}