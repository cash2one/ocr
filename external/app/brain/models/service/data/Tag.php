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
     * @return
     */
    public function getTags()
    {
        $tag_key = 'ai_platform_news_tag_list';
        $tag_value = Brain_Memcache::get($tag_key);
        if (empty($tag_value)) {
            Bd_log::addNotice("Tags!!!","NO");
            $tagList = $this->tagDao->getTagList();
            Brain_Memcache::set($tag_key, $tagList, Lib_Const::NEWS_CACHE_TIME);
            return $tagList;
        } else {
            Bd_log::addNotice("Tags...","YES");
            $tagList = $tag_value;
            return $tagList;
        }
    }

}