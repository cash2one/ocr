<?php

/**
 * @file News.php
 * @author 朴红吉(piaohongji@baidu.com)
 * @date 2015/07/20 19:58:15
 * @brief
 *
 **/
class Dao_News extends Dao_Base
{

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'title',
        'time',
        'author',
        'pv',
        'abs',
        'content',
        'link',
    );

    // 默认字段2
    private $arrDefaultFields2 = array(
        'id',
        'title',
        'time',
        'author',
        'pv',
        'abs',
        'link',
    );

    /**
     * @brief 连接db，表名初始化
     *
     * @return  null
     *
     * @date 2015/07/20 20:00:24
     **/
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_news';
    }

    /**
     * getNewsList
     *
     * @param mixed $strStart
     * @param mixed $strCount
     * @access public
     * @return void
     */
    public function getNewsList($strStart, $strCount)
    {
        $arrFields = $this->arrDefaultFields2;
        $arrConds = array(
            "place" => 0
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by id desc',
            'limit ' . intval($strStart) . ', ' . intval($strCount),
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

    /**
     * getNews
     *
     * @param mixed $strId
     * @access public
     * @return void
     */
    public function getNews($strId)
    {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'id=' => $strId,
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
     * addPv
     *
     * @param mixed $strId
     * @access public
     * @return void
     */
    public function addPv($strId)
    {
        $arrRow = array(
            'pv = pv + 1',
        );
        $arrConds = array(
            'id=' => $strId,
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
    public function insertNews($strTitle, $strTime, $strAuthor, $strContent, $strLink, $strAbs)
    {
        $arrRow = array(
            'title' => $strTitle,
            'time' => $strTime,
            'author' => $strAuthor,
            'content' => $strContent,
            'abs' => $strAbs,
            'link' => $strLink,
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
     * updateNews
     *
     * @param mixed $strId
     * @param mixed $strTitle
     * @param mixed $strTime
     * @param mixed $strAuthor
     * @param mixed $strContent
     * @param mixed $strLink
     * @param mixed $strAbs
     * @access public
     * @return void
     */
    public function updateNews($strId, $strTitle, $strTime, $strAuthor, $strContent, $strLink, $strAbs)
    {
        $arrRow = array(
            'title' => $strTitle,
            'time' => $strTime,
            'author' => $strAuthor,
            'content' => $strContent,
            'abs' => $strAbs,
            'link' => $strLink,
        );
        $arrConds = array(
            'id=' => '' . intval($strId),
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

    /**
     * deleteNews
     *
     * @param mixed $strId
     * @access public
     * @return void
     */
    public function deleteNews($strId)
    {
        $arrConds = array(
            'id =' => '' . intval($strId),
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
