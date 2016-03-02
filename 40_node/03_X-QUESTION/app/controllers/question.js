'use strict';
var quesController = {},
	quesDao = require('../dao/question'),
	quesModel = require('../models/index').question,
	json2csv = require('json2csv');

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
				inspectPoint: "的说法是否"
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
                    var item = {}, answer = "";
                    item.question = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].content;

	                // item.options = [];
					var options = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].optionInfoList;
                    // dataList[idx].examRecordItems[0].question.questInfoDetailList[0].answer
                    var ansList = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].answer.split(',');
					if(ansList.length > 1) {
						for( var temp=0; temp< ansList.length; temp++ ) {
							answer += (temp+1) + ":" + options[temp].content + " ";
						}
					} else {
                        // 选择题
						if(!options.length) {
                            if("1" === ansList[0]) {
                                answer = "√";
                            } else {
                                answer = "×"
                            }

                        } else {
                            answer = options[ansList[0]].content;
                        }

					}
					//var ansIndex = parseInt(dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].answer,10);
                    //item.result = item.options[ansIndex].content;
					item.result = answer;
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

quesController.export = function (req, res, next) {
	var result = [],
		fields = ['question', 'result'],
		fieldNames = ['问题(请拖动单元格宽度)', '参考'];
	quesModel.find({}, function (err, dataList) {
		if( !err ) {
			if(dataList.length > 0) {
				for( var idx=0; idx<dataList.length; idx++) {
					var item = {}, answer = "";
					item.question = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].content;

					// item.options = [];
					var options = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].optionInfoList;
					// dataList[idx].examRecordItems[0].question.questInfoDetailList[0].answer
					var ansList = dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].answer.split(',');
					if(ansList.length > 1) {
						for( var temp=0; temp< ansList.length; temp++ ) {
							answer += (temp+1) + ":" + options[temp].content + " ";
						}
					} else {
						// 选择题
						if(!options.length) {
							if("1" === ansList[0]) {
								answer = "√";
							} else {
								answer = "×"
							}

						} else {
							answer = options[ansList[0]].content;
						}

					}
					//var ansIndex = parseInt(dataList[idx].examRecordItems[0].questInfo.questInfoDetailList[0].answer,10);
					//item.result = item.options[ansIndex].content;
					item.result = answer;
					result.push(item);
				}
			}

		}
		json2csv({ data: result, fields: fields, fieldNames: fieldNames}, function(err, csv) {
			if (err) console.log(err);
			// 设置 header 使浏览器下载文件
			res.setHeader('Content-Description', 'File Transfer');
			res.setHeader('Content-Type', 'application/csv; charset=utf-8');
			res.setHeader('Content-Disposition', 'attachment; filename=Question.csv');
			res.setHeader('Expires', '0');
			res.setHeader('Cache-Control', 'must-revalidate');
			res.send('\uFEFF' + csv);
		});

	});
}
module.exports = quesController;