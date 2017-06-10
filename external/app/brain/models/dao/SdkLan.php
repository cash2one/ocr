<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:04
 */
class Dao_SdkLan extends Dao_Base
{
    // 表名
    private $strTable;
    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'name',
        'icon',
    );

    /**
     * Dao_Sdk constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_sdk_language';
    }

    /**
     * 获取所有有效的sdk最多100个
     * @return
     */
    public function getList()
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            "enable=" => 1
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by  id ',
            'limit 100',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

}