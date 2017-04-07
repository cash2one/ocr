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
        //请求热门标签:tag
        $tag_key = 'ai_platform_news_tag_list';
        $tag_value = Brain_Memcache::get($tag_key);
        if (!empty($tag_value)) {
            echo "热门标签，命中缓存...";
            $tagList = $tag_value;
            echo $tag_key . '=== ';
            echo "<br>";
            for($i=0;$i<count($tagList);$i++){
                foreach($tagList[$i] as $x=>$x_value){
                    echo "Key=" . $x . ", Value=" . $x_value;
                    echo "<br>";
                }
            }
            return $tagList;
        } else {
            echo "热门标签，未命中缓存...";
            echo "<br>";
            $tagList = $this->tagDao->getTagList();
            echo $tag_key . '===';
            echo "<br>";
            for($i=0;$i<count($tagList);$i++){
                foreach($tagList[$i] as $x=>$x_value){
                    echo "Key=" . $x . ", Value=" . $x_value;
                    echo "<br>";
                }
            }
            Brain_Memcache::set($tag_key, $tagList, Lib_Const::NEWS_CACHE_TIME);
            return $tagList;
        }
    }

}