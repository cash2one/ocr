<?php
/**
 * @file Subscribe.php
 * @author 朴红吉(piaohongji@baidu.com)
 * @date 2015/07/20 19:58:15
 * @brief 
 *  
 **/

class Dao_Subscribe extends Dao_Base {

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'name',
        'sex',
        'email',
        'createtime',
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
        $this->strTable = 't_subscribe';
    }

    /**
     * insertNews 
     * 
     * @param mixed $strTitle 
     * @param mixed $strTime 
     * @param mixed $strAuthor 
     * @param mixed $strContent 
     * @param mixed $strLink 
     * @param mixed $strAbs 
     * @access public
     * @return void
     */
    public function insertSubscribe($name, $sex, $email) {
        $arrRow = array(
            'name' => $name,
            'sex' => $sex,
            'email' => $email,
        );  
        $arrOptions = null;
        $arrOnDup = $arrRow;
        $strSQL = $this->objSQLAssember->getInsert($this->strTable, $arrRow, $arrOptions, $arrOnDup);

        Bd_Log::addNotice('insert', $strSQL);
        $arrDBRet = $this->objDB->query($strSQL);
        if ($arrDBRet === false) {
            throw new Exception('query failed', Lib_Const::ERRORNO_DB_QUERY_FAILED);
        } else {
            $strConnId = '' . $this->objDB->getInsertId();
            return $strConnId;
        } 
    }
}
