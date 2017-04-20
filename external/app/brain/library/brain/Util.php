<?php

/**
 * @name Brain_Util
 * @desc APP公共工具类
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Brain_Util
{

    /**
     * getDefaultDBConn 取默认的数据库连接
     *
     * @static
     * @access public
     * @return void
     */
    public static function getDefaultDBConn()
    {
        return self::getDBConn('AiBrainOnline');
    }

    /**
     * getDBConn 取指定的数据库连接
     *
     * @param mixed $strName
     * @static
     * @access public
     * @return void
     */
    public static function getDBConn($strName)
    {
        $oDB = Bd_Db_ConnMgr::getConn($strName);
        if ($oDB === false) {
            throw new Exception('db conn error(check dbral log)', Lib_Const::SQL_ERR_CONN);
        } else {
            $oSQLAssember = new Bd_Db_SQLAssember($oDB);
            if ($oSQLAssember === false) {
                throw new Exception('new sqlassember error', Lib_Const::SQL_ERR_ASSEMBER);
            } else {
                $oRet = (object)array();
                $oRet->db = $oDB;
                $oRet->sqla = $oSQLAssember;
                return $oRet;
            }
        }
    }

    /**
     * getParamAsString
     *
     * @param mixed $arrInput
     * @param mixed $strKey
     * @param string $strDefalutValue
     * @static
     * @access public
     * @return void
     */
    public static function getParamAsString($arrInput, $strKey, $strDefalutValue = '')
    {
        $strValue = $strDefalutValue;
        if (isset($arrInput[$strKey])) {
            $strValue = trim($arrInput[$strKey]);
            if ('' === $strValue) {
                $strValue = $strDefalutValue;
            }
        } else {
            $strValue = $strDefalutValue;
        }
        return $strValue;
    }

    /**
     * getParamAsInt
     *
     * @param mixed $arrInput
     * @param mixed $strKey
     * @param int $intDefalutValue
     * @static
     * @access public
     * @return void
     */
    public static function getParamAsInt($arrInput, $strKey, $intDefalutValue = 0)
    {
        $intValue = 0;
        if (isset($arrInput[$strKey])) {
            $strValue = trim($arrInput[$strKey]);
            if ('' === $strValue) {
                $intValue = intval($intDefalutValue);
            } else {
                $intValue = intval($strValue);
            }
        } else {
            $intValue = intval($intDefalutValue);
        }
        return $intValue;
    }

    /**
     * @param $url
     * @param $param
     * @return string
     */
    public static function appendUrl($url, $param)
    {
        $url = Bd_Str::urldecode($url);
        if (empty($param) || empty($url)) {
            return $url;
        }
        $urls = explode("#", $url);
        $last = "";
        if (sizeof($urls) == 2) {
            $last = "#" . $urls[1];
        }
        $url = $urls[0];
        if (Bd_Str::exist($url, "?")) {
            $url .= "&";
        } else {
            $url .= "?";
        }

        foreach ($param as $k => $v) {
            if (Bd_Str::exist($url, $k)) {
                continue;
            }
            $url .= $k . "=" . $v . "&";
        }
        return rtrim($url, "&") . $last;

    }
}
