<?php
/**
 * @file MFile.php
 * @author songqingyun(songqingyun@baidu.com)
 * @date 2017/04/05 16:00:00
 * @brief 
 *  
 **/

class Dao_MFile extends Dao_Base {

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'file_key',
        'type',
        'name',
        'md5',
        'content_type',
        'file_size',
    );

    /**
     * @brief 连接db，表名初始化
     *
     * @return  null
     *
     * @date 2015/07/20 20:00:24
     **/
    public function __construct() {
        parent::__construct();
        $this->strTable = 't_file';
    }



    /**
     * getCase
     *
     * @param mixed $caseId
     * @access public
     * @return void
     */
    public function getFile($fileKey) {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'file_key=' => $fileKey,
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