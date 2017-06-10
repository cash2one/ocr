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

    private $bannerData;

    public function __construct()
    {
        $this->newsData = new Service_Data_News();
        $this->bannerData = new Service_Data_Banner();
    }

    /**
     * @return
     */
    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        if (isset($arrInput['action']) && $arrInput['action'] == "reviewBanner") {
            $banner = $this->bannerData->mergeBanner();
        } else {
            $banner = $this->bannerData->getBanner();
        }
        $arrPageInfo['banners'] = $this->bannerData->getBannerData($banner);
        $arrPageInfo['messagelist'] = Bd_Conf::getAppConf('messagelist');
        $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7);
        $lastestNews = $this->newsData->getLastestNews();
        $newsList = $this->newsData->getHomeNewsList();
        $arrPageInfo['lastestNews'] = $lastestNews[0];
        $arrPageInfo['newsList'] = $newsList;

        Brain_Output::htmlOutput(
            $arrPageInfo,
            'brain/platform/home.tpl'
        );
    }
}