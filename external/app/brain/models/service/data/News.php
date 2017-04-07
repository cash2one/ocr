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
        $this ->newsDao = new Dao_News();
    }

    /**
     * 获取最新的新闻ID
     * @param
     * @return int 最新的新闻ID
     * @author songqingyun
     */
    public function getNewsLastId(){
        $news = $this->newsDao->getNewsList(0,1);
        if (empty($news)){
            return 1;
        }
        return $news[0]['id'];
    }

    /**
     * 获取特定tag的某一页面offset的新闻列表
     * 默认缓存10分钟
     * @param $tag
     * @param $offset
     * @return
     */
    public function getNewsListByTagAndOffset($tag, $offset)
    {
        $newsList_key = 'ai_platform_news_tag_'.$tag.'_offset_'.$offset;
        $newsList_value = Brain_Memcache::get($newsList_key);
        if(!empty($newsList_value)){
            echo "新闻列表，命中缓存...";
            $newsList = $newsList_value;
            echo $newsList_key . ' '. $newsList;
            return $newsList;
        } else {
            echo "新闻列表，未命中缓存...";
            if('0' == $tag){
                $newsStart = ''.(($offset-1) * 10);
                $newsList = $this->newsDao->getNewsList($newsStart,'10');
            }else{
                //先查询t_news_tag表，找出第offset页的news_id;查询t_news表，逐一查询每条news_id对应的记录;
                $newsStart = ''.(($offset-1) * 10);
                $newsIdList = $this->newsDao->getTagNewsIdList($tag,$newsStart,'10');

                $newsList = array();
                if (is_array($newsIdList) && count($newsIdList) > 0) {
                    $count = count($newsIdList);
                    for($index=0; $index<$count; $index++){
                        $newsList[$index] = $this->newsDao->getNews($newsIdList[$index]);
                    }
                }
            }
            echo $newsList_key . ' '. $newsList;
            Brain_Memcache::set($newsList_key, $newsList, Lib_Const::NEWS_CACHE_TIME);
            return $newsList;
        }
    }

    /**
     * 获取特定tag的总页数
     * 默认缓存10分钟
     * @param $tag
     * @return
     */
    public function getPaginationByTag($tag)
    {
        $tag_pagination = 'ai_platform_news_tagpagination_'.$tag;
        $tag_pagination_total = Brain_Memcache::get($tag_pagination);
        if(!empty($tag_pagination_total)){
            echo "分页信息，命中缓存...";
            $total = $tag_pagination_total;
            echo $tag . ' '. $total;
            return $total;
        } else {
            echo "分页信息，未命中缓存...";
            $tagNewsCount = $this->newsDao->getTagNewsCount($tag);
            $total = ''.( (intval($tagNewsCount)-1)/10 + 1);
            echo $tag . ' '. $total;
            Brain_Memcache::set($tag_pagination, $total, Lib_Const::NEWS_CACHE_TIME);
            return $total;
        }
    }

}