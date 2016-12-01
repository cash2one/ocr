<?php
/**
 * @file Case.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Dao_Case extends Dao_Base {

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'status',
        'username',
        'company',
        'phone',
        'email',
        'contactway',
        'tech',
        'create_time',
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
        $this->strTable = 't_user_case';
    }

    /**
     * insertCase 
     * 
     * @param mixed $strUsername 
     * @param mixed $strCompany 
     * @param mixed $strPhone 
     * @param mixed $strContent 
     * @param mixed $strContactway
     * @param mixed $strTech 
     * @access public
     * @return void
     */
    public function insertCase($strUsername, $strCompany, $strPhone, $strContent, $strContactway, $strTech) {
        $arrRow = array(
            'username' => $strUsername,
            'company' => $strCompany,
            'phone' => $strPhone,
            'content' => $strContent,
            'contactway' => $strContactway,
            'tech' => $strTech,
            'create_time' => date('Y-m-d H:i:s',time()),
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
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
