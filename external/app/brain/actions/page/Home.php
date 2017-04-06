<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Home.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/13 16:06:59
 * @brief 
 *  
 **/

class Action_Home extends Ap_Action_Abstract {

    public function execute() {
        $arrPageInfo['messagelist'] = Bd_Conf::getAppConf('messagelist');
        $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7);
        $dbNews = new Dao_News();
        $lastestNews  = $dbNews->getLastestNews();
        $newsList  = $dbNews->getHomeNewsList();
        $arrPageInfo['lastestNews '] = $lastestNews;
        $arrPageInfo['newsList '] = $newsList;
        echo "首页新闻：";
        echo "lastestNews" . $lastestNews;
        echo "newsList" . $newsList;
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'brain/platform/home.tpl'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
