<?php
/***************************************************************************
 *
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Const.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/05/05 11:10:47
 * @brief 常量
 *
 **/
class Lib_Const
{
    const HTTP_ERR_UNKNOWN_METHOD = -401;

    const RAL_ERR_GENERAL = -301;
    const RAL_ERR_EMPTY = -302;

    const JSON_ERR_DECODE = -501;

    const LOGIN_ERR_PASSPORT = -601;

    const ERR_GENERAL = -1;

    const SQL_ERR_GENERAL = -701;
    const SQL_ERR_DUPLICATE_ENTRY = -702;
    const SQL_ERR_QUERY = -703;
    const SQL_ERR_ASSEMBER = -704;
    const SQL_ERR_CONN = -705;

    const HIPHOTO_ERR_UPLOAD = -801;

    const MDB_SUCCESS = 0;
    const MDB_ERR_CONF = -101;
    const MDB_ERR_CONNECTION = -102;
    const MDB_ERR_QUERY = -103;
    const MDB_ERR_TIMEOUT = -104;

    const ERRORNO_DB_DUPLICATE_ENTRY = -1001;
    const ERRORNO_DB_QUERY_FAILED = -1002;
    const ERRORNO_DB_GENERAL_ERROR = -1003;
    const ERRORNO_PIC_UPLOAD_ERROR = -1004;
    const NEWS_CACHE_TIME = 600;

}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
