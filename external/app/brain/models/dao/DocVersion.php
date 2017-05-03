<?php
/**
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:04
 */
class Dao_DocVersion extends Dao_Base
{
    // 表名
    private $strTable;
    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'version',
        'status',
        'update_time',
    );

    /**
     * Dao_DocVersion constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_doc_version';
    }

    /**
     * 获取最新的doc版本信息
     * @return
     */
    public function getLatestVersion()
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'status=' => 0,
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by version desc',
            'limit 1',
        );
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        $arrDBRet = $this->query($strSQL);
        return $arrDBRet;
    }
}