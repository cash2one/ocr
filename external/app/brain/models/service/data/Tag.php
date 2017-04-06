<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/6
 * Time: 下午9:48
 */
class Service_Data_Tag
{

    private $tagDao;

    function __construct()
    {
        $this->tagDao = new Dao_Tag();
    }

    /**
     * 获取所有有效的tag
     * 默认缓存10分钟
     */
    public function getTags()
    {
        //请求热门标签:tag
        $tag_key = 'ai_platform_news_tag_list';
        $tag_value = Brain_Memcache::get($tag_key);
        if (!empty($tag_value)) {
            echo "热门标签，命中缓存...";
            $tagList = $tag_value;
            echo $tag_key . ' ' . $tagList;
            return $tagList;
        } else {
            echo "热门标签，未命中缓存...";
            $tags = $this->tagDao->getTagList();
            echo "查库结果展示：" . $tag_key . ' ' . $tags;
            Brain_Memcache::set($tag_key, $tags, Lib_Const::NEWS_CACHE_TIME);
            return $tags;
        }
    }

}