<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/8
 * Time: 下午5:49
 */
class Service_Page_News{
    private $newsData;
    public function __construct()
    {
        $this->newsData = new Service_Data_News();
    }

    public function execute($data=null){

        $siteMapUrls =Bd_Conf::getConf('/sitemap/site_map_page/url');
        $siteNewsUrl =Bd_Conf::getConf('/sitemap/site_news_url/url');

        // var_dump($siteMapConf['url']);
        $txt = '';
        foreach ($siteMapUrls as $url)
        {
            $txt .= $url ."\n";
        }

        $lastId = $this ->newsData->getNewsLastId();
        for ($i=1; $i<= $lastId ; $i++){
            $txt .= $siteNewsUrl.$i."\n";
        }
        return $txt;
    }
}