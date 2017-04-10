<?php

/**
 * User: wangyadong03
 * Date: 2017/4/6
 * Time: 9:57
 */
class Dao_Tag extends Dao_Base
{

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'name',
        'enable',
        'update_time',
    );

    // 热门标签列表字段
    private $tagListFields = array(
        'id',
        'name',
    );

    /**
     * @brief 连接db，表名初始化
     * @return  void
     * Date: 2017/4/6
     * Time: 9:57
     **/
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_tag';
    }

    /**
     * getTagList
     * @access public
     * @return void
     */
    public function getTagList()
    {
        $arrFields = $this->tagListFields;
        $arrConds = array(
            'enable=' => 1
        );
        $arrOptions = null;
        $arrAppends = array(
            'order by id',
        );
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        $arrDBRet = $this->query($strSQL);
        return $arrDBRet;
    }

    /**
     * getTag
     * @param $tagId
     * @access public
     * @return void
     */
    public function getTag($tagId)
    {
        $arrFields = $this->tagListFields;
        $arrConds = array(
            'id=' => $tagId,
            'enable=' => 1,
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
     * getTagListByIds
     *
     * @param mixed $tagIds
     * @access public
     * @return void
     */
    public function getTagListByIds($tagIds)
    {
        $arrFields = $this->tagListFields;
        $getSqlIn = $this->getSQLIn($tagIds);
        if('' != $getSqlIn ){
            $arrConds =  'id IN '.$getSqlIn;
        }else{
            $arrConds = null;
        }
        $arrOptions = null;
        $arrAppends = null;

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

}