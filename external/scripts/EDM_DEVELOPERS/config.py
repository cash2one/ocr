# -*- coding: UTF-8 -*-
"""
config
"""
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
import hashlib

log.set_logger(level='DEBUG:DEBUG', filename='service.log', when='D', limit=1)

return_state = 0

# database
host = "10.216.121.42"
dbname = "d_ai_online"
port = 5085
user = "xuyifei"
password = "7R3rwmQcnn"


def exec_sql(sql, balanceTime=0):
    """
    exec_sql
    :param sql:
    :param balanceTime:
    :return:
    """
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
        results = threading.Thread(target=do_exec_sql, args=(sql_cmd, balanceTime,)).start()
    else:
        results = do_exec_sql(sql_cmd)
    return results


# db = MySQLdb.connect(host=host,user=user,passwd=password,db=dbname,port=port,charset="utf8")

def do_exec_sql(sql, balanceTime=0):
    """
    do_exec_sql
    :param sql:
    :param balanceTime:
    :return:
    """
    time.sleep(random.random()*balanceTime)
    results = ''

    db = None
    cursor = None

    try:
        db = MySQLdb.connect(
            host=host,
            user=user,
            passwd=password,
            db=dbname,
            port=port,
            charset="utf8",
            connect_timeout=20
        )
        db.autocommit(True)
        cursor = db.cursor()

        for cmd in sql:
            results = cursor.execute(cmd)
            # print sql
            if cmd.startswith('select'):
                results = cursor.fetchall()
            elif cmd.startswith('insert'):
                results = cursor.lastrowid

        db.commit()
    except Exception as e:
        log.error((sql, sys.exc_info()[0], sys.exc_info()[1]))
        if db is not None:
            db.rollback()
        return
    finally:
        if cursor is not None:
            cursor.close()
        if db is not None:
            db.close
    
    return results


def md5(cleartext):
    """
    md5
    :param cleartext:
    :return:
    """
    m2 = hashlib.md5()
    m2.update(cleartext)
    return m2.hexdigest()


def get_id_value_dict(tablename, id, value, sqladd=''):
    """
    get_id_value_dict
    :param tablename:
    :param id:
    :param value:
    :param sqladd:
    :return:
    """
    value_dict = {}
    sql = "select %s,%s from %s %s" % (id, value, tablename, sqladd)
    for item in exec_sql(sql):
        try:    
            temp_id = str(item[0].encode('utf-8'))
        except Exception as e:
            temp_id = str(item[0])
        try:    
            temp_value = str(item[1].encode('utf-8'))
        except Exception as e:
            temp_value = str(item[1])
        value_dict[temp_id] = str(temp_value)
    return value_dict
