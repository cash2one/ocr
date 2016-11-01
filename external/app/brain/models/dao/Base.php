<?php
/**
 * @name Dao_Base
 * @desc 数据库访问的父类，所有数据库访问dao 都继承这个类
 * @author 朴红吉(piaohongji@baidu.com)
 */
class Dao_Base {
    /**
     * objDB 数据库对象
     * 
     * @var mixed
     * @access protected
     */
    protected $objDB;

    /**
     * objSQLAssember SQLAssemer 对象
     * 
     * @var mixed
     * @access protected
     */
    protected $objSQLAssember;

    /**
     * __construct 
     * 
     * @access protected
     * @return void
     */
    function __construct() {
        $o = Brain_Util::getDefaultDBConn();
        $this->objDB = $o->db;
        $this->objSQLAssember = $o->sqla;
    }

    /**
     * query 执行一个数据库查询，返回查询结果
     * 
     * @param mixed $strSQL 
     * @access protected
     * @return void
     */
    protected function query($strSQL) {
        Bd_Log::trace('sql_trace: ' . $strSQL);
        if ($this->objDB) {
            $arrDBRet = $this->objDB->query($strSQL);
            $errno = $this->objDB->errno();
            $error = $this->objDB->error();
            if ($arrDBRet === false) {
                // 对于唯一索引冲突（1062），单独提示一下
                if ($errno === 1062) {
                    throw new Exception('query failed(sql=' . $strSQL . ')', 
                        Brain_Const::ERRORNO_DB_DUPLICATE_ENTRY); 
                }
                throw new Exception('query failed(sql=' . $strSQL . ')', Brain_Const::ERRORNO_DB_QUERY_FAILED); 
            } else {
                return $arrDBRet;
            }
        }
        throw new Exception('objDB in Dao_Base is not an object', Brain_Const::ERRORNO_DB_GENERAL_ERROR); 
    }

    /**
     * queryWithCount 执行一个数据库查询，同时查询SQL_CALC_FOUND_ROWS
     * 
     * @param mixed $strSQL 
     * @param mixed $intFoundRows 
     * @access protected
     * @return void
     */
    protected function queryWithCount($strSQL, &$intFoundRows) {
        Bd_Log::trace('sql_trace: ' . $strSQL);
        if ($this->objDB) {
            $arrDBRet = $this->objDB->query($strSQL);
            if ($arrDBRet === false) {
                throw new Exception('query failed(sql=' . $strSQL . ')', Brain_Const::ERRORNO_DB_QUERY_FAILED); 
            } else {
                $strSQLFoundRows = 'select found_rows() as found_rows';
                $arrFoundRows = $this->objDB->query($strSQLFoundRows);
                if (is_array($arrFoundRows) && isset($arrFoundRows[0]['found_rows'])) {
                    $intFoundRows = $arrFoundRows[0]['found_rows'];
                } else {
                    $intFoundRows = 0;
                }
                return $arrDBRet;
            }
        }
        throw new Exception('objDB in Dao_Base is not an object', Brain_Const::ERRORNO_DB_GENERAL_ERROR); 
    }

    /**
     * escapeString 做sql 转义
     * 
     * @param mixed $str 
     * @access protected
     * @return void
     */
    protected function escapeString($str) {
        if ($this->objDB) {
            $strRet = $this->objDB->escapeString($str);
            return $strRet;
        }
        throw new Exception('objDB in Dao_Base is not an object', Brain_Const::ERRORNO_DB_GENERAL_ERROR); 
    }

    /**
     * sqlBeautifier 
     * 有时用多行拼出一个sql 语句
     * 将sql 中的"\n", "\r" 删除掉
     * 
     * @param mixed $strSQL 
     * @access protected
     * @return void
     */
    protected function sqlBeautifier($strSQL) {
        $arrReplace = array(
            "\n" => '',
            "\r" => '',
        );
        foreach ($arrReplace as $k => $v) {
            $strSQL = str_replace('' . $k, '' . $v, $strSQL);
        }
        $strSQL = trim($strSQL);
        return $strSQL;
    }

    /**
     * getSQLIn 
     * 
     * @param mixed $arrValues 
     * @access protected
     * @return void
     */
    protected function getSQLIn($arrValues) {
        $strRet = '';
        if (is_array($arrValues) && count($arrValues) > 0) {
            foreach ($arrValues as $v) {
                //$strRet .= $this->escapeString($v) . ',';
                $strRet .= "'" . $this->escapeString($v) . "',";
            }
            $strRet = rtrim($strRet, ',');
            $strRet = '(' . $strRet . ')';
        }
        return $strRet;
    }

    /**
     * buildFields 
     * 
     * @param mixed $arrFields 
     * @access protected
     * @return void
     */
    protected function buildFields($arrFields) {
        $strRet = '';
        if (is_array($arrFields) && count($arrFields)) {
            foreach ($arrFields as $strOne) {
                $strRet .= ' ' . $this->escapeString($strOne) . ',';
            }
            $strRet = rtrim($strRet, ',');
        }
        return $strRet;
    }

    /**
     * buildConds 
     * 
     * @param mixed $arrConds 
     * @access protected
     * @return void
     */
    protected function buildConds($arrConds) {
        $strRet = '';
        if (is_array($arrConds) && count($arrConds)) {
            foreach ($arrConds as $k => $v) {
                if (is_string($k)) {
                    $strRet .= ' ' . $this->escapeString($k) . ' ' . $this->escapeString($v) . ' and';
                } else {
                    $strRet .= '' . $this->escapeString($v) . ' and';
                }
            }
            $strRet = rtrim($strRet, 'and') . ' ';
        }
        return $strRet;
    }

    /**
     * getAffectedRows 
     * 
     * @access protected
     * @return void
     */
    protected function getAffectedRows() {
        return $this->objDB->getAffectedRows();
    }


    /**
     * fillIfNotNull 
     * 
     * @param mixed $arrEntity 
     * @param mixed $strKey 
     * @param mixed $strValue 
     * @access private
     * @return void
     */
    protected function fillIfNotNull(&$arrEntity, $strKey, $strValue) {
        if ($strValue !== null) {
            $arrEntity[$strKey] = $strValue;
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
