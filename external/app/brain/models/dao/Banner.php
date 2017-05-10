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
class Dao_Banner extends Dao_Base
{
    // 表名
    private $strTable;
    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'value',
        'dis_order',
        'template_code',
    );

    /**
     * Dao_Banner constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_banner';
    }

    /**
     * 获取Banner
     * @return
     */
    public function getBanner()
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'status=' => 1,
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by dis_order asc, id desc',
            'limit 20',
        );
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        $arrDBRet = $this->query($strSQL);
        return $arrDBRet;
    }
}