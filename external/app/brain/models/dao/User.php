<?php
/**
 * @file User.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/12/13 19:58:15
 * @brief 
 *  
 **/

class Dao_User extends Dao_Base {

    // 默认字段
    private $arrDefaultFields = array(
        'uid',
        'uname',
        'create_time',
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
        $this->strTable = 't_user';
    }

    /**
     * insertUser 
     * 
     * @param mixed $uid 
     * @param mixed $uname 
     * @param mixed $create_time 
     * @access public
     * @return void
     */
    public function insertUser($uid, $uname) {
        
        $userInfo = $this->getUserInfo($uid);

        if(!empty($userInfo))
        {
            return;
        }
        
        $arrRow = array(
            'uid' => $uid,
            'uname' => $uname,
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
     * getUserInfo 
     * 
     * @param mixed $uid 
     * @access public
     * @return void
     */ 
    public function getUserInfo($uid) {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'uid=' => $uid,
        );  
        $arrOptions = null;
        $arrAppends = array(
            'limit 1',
        );
        
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        
        $arrDBRet = $this->query($strSQL);
        
        return $arrDBRet[0];
    } 

}
