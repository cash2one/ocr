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
class Dao_Doc extends Dao_Base
{
    // 表名
    private $strTable;
    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'version',
        'json_path',
        'file_path',
        'file_id',
    );

    /**
     * Dao_Doc constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_doc';
    }

    /**
     * 获取文档的filePath
     * @return
     */
    public function getDoc($version, $jsonPath)
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'version=' => $version,
            'json_path=' => $jsonPath,
        );
        $arrOptions = null;
        $arrAppends = array(
            'limit 1'
        );
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        $arrDBRet = $this->query($strSQL);
        return $arrDBRet;
    }
}