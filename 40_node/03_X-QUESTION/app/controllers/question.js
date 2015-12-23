'use strict';
var quesController = {},
	quesDao = require('../dao/question'),
	quesModel = require('../models/index').question;

quesController.list = function (req, res, next) {
	/*quesDao.list(function (err, data) {
		res.json(data);
	});*/
	/*quesModel.find({}, function (err, data) {
		res.send(data);
	})*/

	/*var ques = new quesModel({
		examRecordItems: {
			questInfo: {
				inspectPoint: "����"
			}
		}
	});
	ques.save(function (data) {
		res.send('add.' + data);
	});*/

	res.send('respond with a resource');
}

quesController.get = function (req, res, next) {
    var result = [];
	quesDao.get(req.params.query, function (err, dataList) {
		if( !err ) {
            if(dataList.length > 0) {
                for( var idx=0; idx<dataList.length; idx++) {
                    var item = {};
                    item.question = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].content;
	                item.options = [];
	                // item.options = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].optionInfoList;
                    // dataList[idx].examRecordItems[0].question.questInfoDetailList[0].answer
                    var ansIndex = parseInt(dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].answer,10);
                    item.result = item.options[ansIndex].content;
                    result.push(item);
                }
            }

		}
        res.json(result);
		//res.send(data);
	});
}

quesController.add = function (req, res, next) {
	/*var user = new quesModel({
		username: 'Jarrick' + Math.random() * 1000, name: 'Jarrick', gender: '0', phone: '12345678901',
		address: {city: 'dalian', 'street': 'xigang', test: 'test'}
	});
	user.save(function (data) {
		res.send('add.' + data);
	});*/
}

quesController.delete = function (req, res, next) {
	res.send('delete');
}

quesController.update = function (req, res, next) {
	res.send('update');
}

module.exports = quesController;