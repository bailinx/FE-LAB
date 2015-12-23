'use strict';
var mongoose = require('mongoose'),
	config = require('../config/config'),
	logger = require('../utils/log').logger,
	fs = require('fs');

mongoose.connect(config.connectionString);

var db = mongoose.connection;
db.on('error', function (err) {
	logger.error('connect to %s error : ', config.connectionString, err.message);
	process.exit(0);
});
db.once('open', function () {
	logger.info('%s has been connected.', config.connectionString);
});

var models_path = __dirname + '/mapping';
fs.readdirSync(models_path).forEach(function (file) {

	require(models_path + '/' + file);

	var modelName = file.replace('.js', '');
	exports[modelName] = mongoose.model(modelName);
});