<?php
/**
 * @file Session.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Dao_Session extends Dao_Base {

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'k',
        'v',
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
        $this->strTable = 't_user_session';
    }

    /**
     * insertCase 
     * 
     * @param mixed $k
     * @param mixed $v
     * @access public
     * @return void
     */
    public function setSession($k, $v, $expire=0) {
        $data_session = $this->getSession($k);
        
        if(empty($data_session))
        {
            $arrRow = array(
                'k' => $k,
                'v' => $v,
                'expire' => $expire,
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
        else
        {
            $arrRow = array(
                'v' => $v,
                'expire' => $expire,
            );
            $arrConds = array(
                'k=' => $k,
            );
            $arrOptions = null;
            $strSQL = $this->objSQLAssember->getUpdate($this->strTable, $arrRow, $arrConds);
            Bd_Log::addNotice('update', $strSQL);
            $arrDBRet = $this->objDB->query($strSQL);
            if ($arrDBRet === false) {
                throw new Exception('query failed', Lib_Const::ERRORNO_DB_QUERY_FAILED);
            } else {
                return $arrDBRet;
            }
        }
        
    }

    /**
     * getSession 
     * 
     * @param mixed $sessionId 
     * @access public
     * @return void
     */
    public function getSession($sessionId) {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'k=' => $sessionId,
        );
        $arrOptions = null;
        $arrAppends = array(
            'limit 1',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

    /**
     * clearExpiredSession 
     * 
     * @access public
     * @return void
     */
    public function clearExpiredSession() {
        $arrConds = array(
            'expire <'  => date('Y-m-d H:i:s', time()),
        );
        $arrOptions = null;
        $arrAppends = null;
        $strSQL = $this->objSQLAssember->getDelete($this->strTable, $arrConds, $arrOptions, $arrAppends);
        Bd_Log::addNotice('delete', $strSQL);
        $arrDBRet = $this->objDB->query($strSQL);
        if ($arrDBRet === false) {
            throw new Exception("query failed", Lib_Const::ERRORNO_DB_QUERY_FAILED);
        } else {
            return $arrDBRet;
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
