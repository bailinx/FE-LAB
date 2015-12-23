'use strict';
var quesModel = require('../models/index').question,
	logger = require('../utils/log').logger;

var quesDao = function (question) {
	this.question = question || {};
};

quesDao.create = function (callback) {
	var userEntity = new quesModel(this.question);
	userEntity.save(function (err, data) {
		if (err) {
			logger.error(err);
		}
		callback(data);
	})
};

quesDao.list = function (callback) {
	quesModel.find({}, function (err, data) {
		if (err) {
			return callback(err, null);
		}
		return callback(null, data);
	})
};

quesDao.get = function (query, callback) {
    var queryObj = {"examRecordItems": {"$elemMatch": {"questInfo.questInfoDetailList": {"$elemMatch": {"content": {$regex: new RegExp("^.*"+query+".*$")}}}}}};
	quesModel.find(queryObj, function (err, data) {
		if (err) {
			return callback(err, null);
		}
		return callback(null, data);
	});
};

module.exports = quesDao;