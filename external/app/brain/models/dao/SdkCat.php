<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:04
 */
class Dao_SdkCat extends Dao_Base
{
    // 表名
    private $strTable;
    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'pid',
        'cat_name',
        'cat_key',
        'show_order',
        'icon',
    );

    /**
     * Dao_Sdk constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_sdk_category';
    }

    /**
     * 获取所有有效的sdk最多100个
     */
    public function getList()
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            "enable=" => 1
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by show_order asc ',
            'limit 100',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

}