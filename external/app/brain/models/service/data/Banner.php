<?php
/**
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/**
 * Created by PhpStorm.
 * User: wangyu61
 * Date: 2017/3/8
 * Time: 下午5:41
 */
class Service_Data_Banner
{

    protected $bannerDao;
    protected $bannerReviewDao;
    private $cacheBannerList = "AIP_WEB_BANNER_LIST";

    public function __construct()
    {
        $this->bannerDao = new Dao_Banner();
        $this->bannerReviewDao = new Dao_BannerReview();
    }

    /**
     * 清除缓存
     * @return
     */
    public function cleanCache()
    {
        Brain_Memcache::delete($this->cacheBannerList);
    }

    /**
     * 获取首页banner图
     * @return array
     */
    public function getBanner()
    {
        $val = Brain_Memcache::get($this->cacheBannerList);
        if ($val && !empty($val)) {
            return Bd_String::json_decode($val, true);
        } else {
            $list = $this->bannerDao->getBanner();
            Brain_Memcache::set($this->cacheBannerList, Bd_String::json_encode($list), 60 * 60);
            return $list;
        }
    }

    /**
     * 获取预览banner
     * @return array
     */
    public function getBannerReview()
    {
        return $this->bannerReviewDao->getBannerReview();
    }

    /**
     * 合并预览和在线banner
     * @return array
     */
    public function mergeBanner()
    {
        $reviews = $this->getBannerReview();
        $banners = $this->getBanner();
        if (empty($reviews)) {
            return $banners;
        }
        if (empty($banners)) {
            return $banners;
        }
        foreach ($banners as $ban) {
            foreach ($reviews as $r) {
                if ($ban['dis_order'] >= $r['dis_order']) {
                    $ban['dis_order'] = $ban['dis_order'] + 1;
                }
            }
        }
        $result = array_merge($banners, $reviews);
        foreach ($result as $item) {
            $key_array[] = $item["dis_order"];
        }
        array_multisort($key_array, SORT_ASC, $result);
        return $result;
    }

}