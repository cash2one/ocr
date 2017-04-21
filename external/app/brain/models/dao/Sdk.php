<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:04
 */
class Dao_Sdk extends Dao_Base
{
    // 表名
    private $strTable;
    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'name',
        'abs',
        'version',
        'file_path',
        'pub_time',
        'category',
        'language',
        'enable',
    );
    private $arrDefaultFields2 = array(
        'id',
        'name',
        'abs',
        'version',
        'file_path as filePath',
        'pub_time',
        'category',
        'language',
        'enable',
    );

    /**
     * Dao_Sdk constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_sdk';
    }

    /**
     * 获取所有有效的sdk最多100个
     * @return
     */
    public function getSdkList()
    {
        $arrFields = $this->arrDefaultFields2;
        $arrConds = array(
            "enable=" => 1
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by id asc ',
            'limit 100',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

    /**
     * 根据id获取sdk
     * @param $id
     * @return
     */
    public function getSdkById($id)
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'id=' => $id,
        );
        $arrOptions = null;
        $arrAppends = array(
            'limit 1',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

}