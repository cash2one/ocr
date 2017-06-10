<?php
/**
 * @file ApiVisit.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/12/13 19:58:15
 * @brief 
 *  
 **/

class Dao_ApiVisit extends Dao_Base {

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'ip',
        'uname',
        'api',
        'error_code',
        'error_msg',
        'create_time',
        'log_id',
    );

    // 表名
    private $strTable;

    /**
     * @brief 连接db，表名初始化
     *
     * @return  null
     *
     * @date 2015/07/20 20:00:24
     **/
    public function __construct() {
        parent::__construct();
        $this->strTable = 't_api_visit';
    }

    /**
     * insertApiVisit 
     * 
     * @param mixed $ip 
     * @param mixed $error_code 
     * @param mixed $api 
     * @param mixed $log_id 
     * @param mixed $error_msg 
     * @access public
     * @return void
     */
    public function insertApiVisit($ip, $api, $error_code, $error_msg, $log_id=0) {
        
        $userInfo = Brain_User::getUserInfo();
        $arrRow = array(
            'ip' => $ip,
            'uname' => strval($userInfo['uname']),
            'api' => $api,
            'error_code' => $error_code,
            'error_msg' => $error_msg,
            'log_id' => $log_id,
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
   
    /**
     * getVisitInfo 
     * 
     * @param mixed $ip 
     * @param mixed $beginTime 
     * @access public
     * @return void
     */ 
    public function getVisitInfo($ip, $beginTime) {
        //获取访问次数
        $arrFields = array('count(*)');
        $arrConds = array(
            'ip=' => $ip,
            'create_time>=' => $beginTime,
        );  
        $arrOptions = null;
        $arrAppends = array(
            'limit 1',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
    
        $arrDBRet = $this->query($strSQL);
        
        $visitCount = $arrDBRet[0]['count(*)'];
        
        //获取最初一次访问时间
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'ip=' => $ip,
            'create_time>=' => $beginTime,
        );  
        $arrOptions = null;
        $arrAppends = array(
            'order by create_time asc',
            'limit 1',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        
        $arrDBRet = $this->query($strSQL);

        $visitTime = $arrDBRet[0]['create_time'];
        
        return array(
            'visitTime' => $visitTime, 
            'visitCount' => $visitCount,
        );
    } 

}
