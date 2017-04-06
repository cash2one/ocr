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
     * @return  null
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
     *
     * @access public
     */
    public function getTagList()
    {
        $arrFields = $this->tagListFields;
        $arrConds = null;
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
     *
     * @access public
     */
    public function getTag($tagId)
    {
        $arrFields = $this->tagListFields;
        $arrConds = array(
            'id=' => $tagId,
        );
        $arrOptions = null;
        $arrAppends = null;
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        $arrDBRet = $this->query($strSQL);
        return $arrDBRet;
    }

}