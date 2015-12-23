'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
    examRecordItems: [{
        questInfo: {
            inspectPoint: String,
            questInfoDetailList: [{
                content: String,
                optionInfoList: [{
                    content: String,
                    sortIndex: Number
                }],
                answer: String
            }]
        }
	}]
});

schema.virtual("answer").set(function () {
    var ans = parseInt(this.examRecordItems[0].questInfo.questInfoDetailList[0].answer,10);
    return this.examRecordItems[0].questInfo.questInfoDetailList[0].optionInfoList[ans];
});

// 第三个参数必须要，不然mongoose会自动在表后面加s
mongoose.model('question', schema, 'question');