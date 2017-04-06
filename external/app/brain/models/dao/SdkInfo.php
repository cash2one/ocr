<?php
/**
 * @file SdkInfo.php
 * @author wangyu61(wangyu61@baidu.com)
 * @date 2017/04/06 11:05:12
 * @brief 
 *  
 **/

class Dao_SdkInfo extends Dao_Base {

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'uc_id',
        'pass_id',
        'service_type',
        'language',
        'create_time',
    );

    // 表名
    private $strTable;

    /**
     * @brief 连接db，表名初始化
     *
     * @return  null
     *
     * @date 2017/04/06 20:00:24
     **/
    public function __construct() {
        parent::__construct();
        $this->strTable = 't_sdk_info';
    }

    /**
     * insertUser 
     * 
     * @param mixed $uc_id 
     * @param mixed $pass_id 
     * @param mixed $service_type
     * @param mixed $language
     * @access public
     * @return void
     */
    public function insertUser($uc_id, $pass_id, $service_type, $language) {
        
        $userInfo = $this->getUserInfo($uid);

        
        $arrRow = array(
            'uc_id' => $uc_id,
            'pass_id' => $pass_id,
            'service_type' => $service_type,
            'language' => $language,
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
