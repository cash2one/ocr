<?php

/**
 * Created by PhpStorm.
 * User: wangyu61
 * Date: 2017/4/19
 * Time: 下午1:27
 */
class Service_Page_Home
{

    private $newsData;

    public function __construct()
    {
        $this->newsData = new Service_Data_News();
    }

    /**
     * @return
     */
    public function execute() {
        $arrPageInfo['messagelist'] = Bd_Conf::getAppConf('messagelist');
        $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7);
        $lastestNews  = $this->newsData->getLastestNews();
        $newsList  = $this->newsData->getHomeNewsList();
        $arrPageInfo['lastestNews'] = $lastestNews[0];
        $arrPageInfo['newsList'] = $newsList;



        Brain_Output::htmlOutput(
            $arrPageInfo,
            'brain/platform/home.tpl'
        );
    }
}