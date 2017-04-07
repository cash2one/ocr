<?php
/**
 * User: wangyadong03
 * Date: 2017/4/6
 * Time: 10:58
 */
class Dao_NewsTag extends Dao_Base
{

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'news_id',
        'tag_id',
    );

    // 某类标签的新闻id列表
    private $tagNewsIdListFields = array(
        'news_id',
    );


    // 某则新闻的标签列表
    private $newsTagIdListFields = array(
        'tag_id',
    );

    /**
     * @brief 连接db，表名初始化
     * @return  null
     * Date: 2017/4/6
     * Time: 10:58
     **/
    public function __construct()
    {
        parent::__construct();
        $this->strTable = 't_news_tag';
    }

    /**
     * getTagIdListByNewsId
     * @param null
     * @access public
     * @return void
     */
    public function getTagIdListByNewsId($newsId)
    {
        $arrFields = $this->newsTagIdListFields;
        $arrConds = array(
            'news_id=' => $newsId,
        );
        $arrOptions = null;
        $arrAppends = null;
        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);
        $arrDBRet = $this->query($strSQL);
        return $arrDBRet;
    }

    /**
     * getTagNewsIdList
     * @param null
     * @access public
     * @return void
     */
    public function getTagNewsIdList($tag_id,$strStart,$strCount)
    {
        $arrFields = $this->tagNewsIdListFields;
        $arrConds = array(
            'tag_id=' => $tag_id,
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
     * getTagNewsCount
     * @param null
     * @access public
     * @return void
     */
    public function getTagNewsCount($tag_id)
    {
        $arrFields = array('count(*)');
        if('0' != $tag_id){
            $arrConds = array(
                'tag_id =' => $tag_id,
            );
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