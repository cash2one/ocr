<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:00
 */
class Service_Data_Sdk
{
    private $sdkDao;
    private $sdkCatDao;
    private $sdkLanDao;
    private $cacheSdkList = "AIP_WEB_SDK_LIST";
    private $cacheSdkLanList = "AIP_WEB_SDK_LAN_LIST";
    private $cacheSdkCatList = "AIP_WEB_SDK_CAT_LIST";

    /**
     * Service_Data_Sdk constructor.
     */
    public function __construct()
    {
        $this->sdkDao = new Dao_Sdk();
        $this->sdkLanDao = new Dao_SdkLan();
        $this->sdkCatDao = new Dao_SdkCat();

    }

    /**
     * 封装sdk数据给页面
     * @return array
     */
    public function sdkData()
    {
        $sdkList = $this->getSdkList();
        $catList = $this->getCatList();
        $lanList = $this->getLanList();

        $result = array();

        foreach ($sdkList as $sdk) {
            $this->setSdkCat($catList, $sdk);
            $this->setSdkType($lanList, $sdk);
            $this->setSdkVersion($sdk);
            $this->setSdkPubTime($sdk);
            $result[$sdk['cat']][] = $sdk;
        }
        return $result;
    }

    /**
     * 获取所有有效sdk
     * @return mixed|void
     */
    public function getSdkList()
    {
        $val = Brain_Memcache::get($this->cacheSdkList);
        if ($val && !empty($val)) {
            return json_decode($val);
        } else {
            $sdkList = $this->sdkDao->getSdkList();
            Brain_Memcache::set($this->cacheSdkList, json_encode($sdkList), 60 * 60);
            return $sdkList;
        }

    }

    /**
     * 设置 sdk 语言
     * @param $lanList
     * @param $sdk
     * @return
     */
    public function setSdkType($lanList, $sdk)
    {
        if (!isset($sdk) || empty($lanList)) {
            return;
        }
        foreach ($lanList as $lan) {
            if ($sdk['language'] === $lan['id']) {
                $sdk['type'] = $lan['name'];
                return $sdk;
            }
        }
        $sdk['type'] = "";
        return $sdk;

    }

    /**
     * 设置 sdk 分类
     * @param $catList
     * @param $sdk
     * @return
     */
    public function setSdkCat($catList, $sdk)
    {
        if (!isset($sdk) || empty($catList)) {
            return;
        }
        foreach ($catList as $cat) {
            if ($sdk['category'] === $cat['id']) {
                $sdk['cat'] = $cat['key'];
                return $sdk;
            }
        }
        $sdk['cat'] = "";
        return $sdk;
    }

    /**
     * 设置sdk 版本
     * @param $sdk
     * @return
     */
    public function setSdkVersion($sdk)
    {
        if (!isset($sdk)) {
            return;
        }
        $version = (int)$sdk['version'];
        $v = "";
        $v .= $version / 1000 / 1000 % 1000 . ".";
        $v .= $version / 1000 % 1000 . ".";
        $v .= $version % 1000;
        $sdk['version'] = $v;
        return $sdk;
    }

    /**
     * 设置 sdk 发布时间
     * @param $sdk
     * @return
     */
    public function setSdkPubTime($sdk)
    {
        if (!isset($sdk)) {
            return;
        }
        $pubTime = $sdk['pub_time'];
        $t = date_format($pubTime, "yyyy-MM-dd");
        $sdk['pub_time'] = $t;
        return $sdk;
    }


    /**
     * 获取所有有效分类
     * @return
     */
    public function getCatList()
    {
        $val = Brain_Memcache::get($this->cacheSdkCatList);
        if ($val && !empty($val)) {
            return json_decode($val);
        } else {
            $list = $this->sdkCatDao->getList();
            Brain_Memcache::set($this->cacheSdkCatList, json_encode($list), 60 * 60);
            return $list;
        }
    }

    /**
     * 获取所有语言
     * @return
     */
    public function getLanList()
    {
        $val = Brain_Memcache::get($this->cacheSdkLanList);
        if ($val && !empty($val)) {
            return json_decode($val);
        } else {
            $list = $this->sdkLanDao->getList();
            Brain_Memcache::set($this->cacheSdkLanList, json_encode($list), 60 * 60);
            return $list;
        }
    }

    /**
     * 清除缓存
     */
    public function cleanCache()
    {
        Brain_Memcache::delete($this->cacheSdkList);
    }

}