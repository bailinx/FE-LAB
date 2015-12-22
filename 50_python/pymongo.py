#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2015-12-22 14:58:37
# @Author  : radishj<423261989@qq.com>
# @Link    : https://github.com/radishj
# @Version : $Id$
import sys, urllib, urllib2, json, time
from pymongo import MongoClient

def get(url):
  req = urllib2.Request(url)
  req.add_header("User-Agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1")
  req.add_header("Cookie", "session")
  resp = urllib2.urlopen(req)
  return resp.read().decode('utf8')
def insert(data):
    conn = MongoClient("127.0.0.1",27017)
    db = conn.questions
    # json数组
    title = data['examRecordItems'][0]['questInfo']['questInfoDetailList'][0]['content']
    #db.question.find({"examRecordItems": {"$elemMatch": {"questInfo.questInfoDetailList": {"$elemMatch": {"content": "3、4级系统的故障通报要求，以下错误的是"}}}}})
    result = db.question.find({"examRecordItems": {"$elemMatch": {"questInfo.questInfoDetailList": {"$elemMatch": {"content": title}}}}})
    if not result or result.count() == 0:
        db.question.save(data)

    # for x in result:
    #     print x['id']

def main():
    reload(sys)
    sys.setdefaultencoding('utf-8')
    file_object = open('result.txt', 'w+')
    loop = 90200
    for i in range(90100, loop):
        url = '#'
        result = get(url)
        print result
        if result != 'ERROR' :
            insert(json.loads(result))
        time.sleep(1)
    file_object.close()

if __name__ == '__main__':
    main()
