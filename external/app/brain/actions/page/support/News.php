<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file News.php
 * @author piaohongji(piaohongji@baidu.com)
 * @date 2016/07/29 14:33:00
 * @brief 
 *  
 **/

class Action_News extends Ap_Action_Abstract {
    /**
     * execute 
     * 
     * @access public
     * @return void
     */
    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $strAction = $arrInput['action'];

        $dbNews = new Dao_News();
        $dbTag = new Dao_Tag();
        $dbNewsTag = new Dao_NewsTag();


        if ('list' === $strAction) {
            $strPn = '' . Brain_Util::getParamAsInt($arrInput, 'pn', 0);
            $strRn = '' . Brain_Util::getParamAsInt($arrInput, 'rn', 10);
            $arrNews = $dbNews->getNewsList($strPn, $strRn);

            Brain_Output::jsonOutput(0, 'success', $arrNews);
        } else if ('top3' === $strAction) {
            $arrNews = $dbNews->getNewsList('0', '3');

            Brain_Output::jsonOutput(0, 'success', $arrNews);
        } else if ('detail' === $strAction) {
            $strId = Brain_Util::getParamAsString($arrInput, 'id');
            $arrNews = $dbNews->getNews($strId);
            //增加tag信息
            $tagList = array();
            $newsTag = $dbNewsTag->getTagIdListByNewsId($strId);
            if(!empty($newsTag)){
                $tagIds = array();
                foreach ($newsTag as $x_value) {
                    $tagIds[] = $x_value['tag_id'];
                }
                $tagList = $dbTag->getTagListByIds($tagIds);
            }
            $arrRet = array(
                'errno' => 0,
                'msg' => 'success',
                'data' => (object) array(),
            );
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews[0];
                $arrRet['tagList'] = $tagList;
                $dbNews->addPv($strId);
            }
            $arrRet['page'] = substr(strtolower(__CLASS__), 7);
            Brain_Output::htmlOutput($arrRet, 'brain/platform/support/news/news-con.tpl');
        }  else {
            $offset = Brain_Util::getParamAsInt($arrInput, 'offset', 1);
            $tag = ''.Brain_Util::getParamAsInt($arrInput, 'tag', 0);
            //热门标签
            $service_Tag = new Service_Data_Tag();
            $tagList = $service_Tag->getTags();
            //新闻列表
            $service_News = new Service_Data_News();
            $newsList = $service_News->getNewsListByTagAndOffset($tag, $offset);
            //分页信息
            $pagination = array();
            $pagination['total'] = $service_News->getPaginationByTag($tag);
            $pagination['offset'] = ''.$offset;

            $arrRet = array();
            $arrRet['page'] = substr(strtolower(__CLASS__), 7);
            $arrRet['newsList'] = $newsList;
            $arrRet['tagList'] = $tagList;
            $arrRet['pagination'] = $pagination;
            $arrRet['currentTag'] = $tag;
            //返回
            Brain_Output::htmlOutput($arrRet, 'brain/platform/support/news/news-list.tpl');
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
