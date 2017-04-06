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
        $arrPageInfo['lastestNews'] = $lastestNews;
        $arrPageInfo['newsList'] = $newsList;
        echo "首页新闻：";
        echo "<br>";
        echo "lastestNews";
        echo "<br>";
        echo count($lastestNews);
        for($i=0;$i<count($lastestNews);$i++){
            foreach($lastestNews as $x=>$x_value){
                echo "Key=" . $x . ", Value=" . $x_value;
                echo "<br>";
            }
        }
        echo "newsList";
        echo "<br>";
        echo count($newsList);
        for($i=0;$i<count($newsList);$i++){
            foreach($newsList[i] as $x=>$x_value){
                echo "Key=" . $x . ", Value=" . $x_value;
                echo "<br>";
            }
        }
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'brain/platform/home.tpl'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
