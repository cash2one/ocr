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

    public function __construct()
    {
        $this->docDao = new Dao_Doc();
        $this->docVersionDao = new Dao_DocVersion();
    }

    /**
     * 获取最新的版本号
     * @return int 最新的版本号
     * @author wangyu61
     */
    public function getLatestVersion()
    {
        $docVersion = $this->docVersionDao->getLatestVersion();
        return $docVersion['version'];
    }

    /**
     * 获取版本的文档路径
     * @return int 最新的版本信息
     * @author wangyu61
     */
    public function getFilePath($version, $jsonPath)
    {
        $doc = $this->docDao->getLatestVersion($version, $jsonPath);
        return $doc['file_path'];
    }

}