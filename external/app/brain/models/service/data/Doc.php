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
class Service_Data_Doc
{

    protected $docDao;
    protected $docVersionDao;
    private $cacheLatestDocVersion = "AIP_WEB_LATEST_DOC_VERSION";

    public function __construct()
    {
        $this->docDao = new Dao_Doc();
        $this->docVersionDao = new Dao_DocVersion();
    }

    /**
     * 清除缓存
     * @return
     */
    public function cleanCache()
    {
        Brain_Memcache::delete($this->cacheLatestDocVersion);
    }

    /**
     * 获取最新的版本号
     * @return int 最新的版本号
     * @author wangyu61
     */
    public function getLatestVersion()
    {
        $version = Brain_Memcache::get($this->cacheLatestDocVersion);
        if (empty($version)) {
            $docVersion = $this->docVersionDao->getLatestVersion();
            $version = $docVersion[0]['version'];
            Brain_Memcache::set($this->cacheLatestDocVersion, $version, 24 * 3600);
        }
        return $version;
    }

    /**
     * 获取版本的文档路径
     * @return int 最新的版本信息
     * @author wangyu61
     */
    public function getFilePath($version, $jsonPath)
    {

        $doc = $this->docDao->getDoc($version, $jsonPath);
        if (!empty($doc)) {
            $d = $doc[0];
            return $d['file_path'];
        }
        return;
    }

}