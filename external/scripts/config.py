# -*- coding: UTF-8 -*-
import MySQLdb
import time
import os
import stat
import subprocess
import sys 
import json
import random
import threading
import thread
import log
import types
import socket

log.set_logger(level='DEBUG:DEBUG', filename='service.log', when='D', limit=1)

return_state = 0

#database
host = "cp01-yf-db-02.epc.baidu.com"
dbname = "db_yuqing"
port = 3306
user = "reader"
password = "yuanfang"


def exec_sql(sql,balanceTime=0):

    results = ''

    sql_cmd = []
    if type(sql) is types.ListType:
        sql_cmd = sql
    else:
        sql_cmd.append(sql)
    '''
    for cmd in sql.split(';'):
        if cmd.strip() != '':
            sql_cmd.append(cmd)
    '''

    if balanceTime > 0:
        results = threading.Thread(target=do_exec_sql,args=(sql_cmd,balanceTime,)).start()
    else:
        results = do_exec_sql(sql_cmd)
    return results


#db = MySQLdb.connect(host=host,user=user,passwd=password,db=dbname,port=port,charset="utf8")

def do_exec_sql(sql,balanceTime=0):
    time.sleep(random.random()*balanceTime)
    results = ''

    db = None
    cursor = None

    try:
        db = MySQLdb.connect(host=host,user=user,passwd=password,db=dbname,port=port,charset="utf8",connect_timeout=20)
        db.autocommit(True)
        cursor = db.cursor()

        for cmd in sql:
            results = cursor.execute(cmd)
            #print sql
            if cmd.startswith('select'):
                results = cursor.fetchall()
            elif cmd.startswith('insert'):
                results = cursor.lastrowid

        db.commit()
    except:
        log.error((sql,sys.exc_info()[0],sys.exc_info()[1]))
        if db is not None:
            db.rollback()
        return
    finally:
        if cursor is not None:
            cursor.close()
        if db is not None:
            db.close
    
    return results

def exec_hql(hql):
    results = ''
    cmd = "cd %s;./hive -e '%s'"%(hive_home,hql)
    p = subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    results,stderr =  p.communicate()
    return results

def md5(input):
    md5sign = hashlib.md5()
    md5sign.update(input)
    str = md5sign.digest()
    data = struct.unpack("IIII", str)
    md5value = data[0] << 96 | data[1] << 64 | data[2] << 32 | data[3]
    return md5value

def get_id_value_dict(tablename, id, value, sqladd = ''):
    value_dict = {}
    sql = "select %s,%s from %s %s"%(id, value, tablename, sqladd)
    for item in exec_sql(sql):
        try:    
            temp_id = str(item[0].encode('utf-8'))
        except: 
            temp_id = str(item[0])
        try:    
            temp_value = str(item[1].encode('utf-8'))
        except: 
            temp_value = str(item[1])
        value_dict[temp_id] = str(temp_value)
    return value_dict

def exec_qe(hql):
    results = ''
    cmd = "%s -e '%s'"%(queryengine,hql)
    #print cmd
    p = subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    results,stderr =  p.communicate()
    return results

