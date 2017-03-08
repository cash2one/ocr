<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/8
 * Time: 下午5:41
 */
class Service_Data_News{

    protected $newsDao;

    public function __construct()
    {
        $this ->newsDao = new Dao_NewsExt();
    }

    public function getNewsLastId(){
        $news = $this->newsDao->getNewsList(0,1);
        if (empty($news)){
            return 1;
        }
        return $news[0][id];
    }

}