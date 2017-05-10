<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/5/10
 * Time: 下午2:42
 */
class Service_Data_CleanCache
{
    /**
     * 清除缓存
     * @param $cleanType
     * @return void
     */
    public function cleanByType($cleanType)
    {
        if ($cleanType == "doc") {
            (new Service_Data_Doc())->cleanCache();
            return;
        }
        if ($cleanType == "news") {
            (new Service_Data_News())->cleanCache();
            return;
        }
        if ($cleanType == "sdk") {
            (new Service_Data_Sdk())->cleanCache();
            return;
        }
        if ($cleanType == "banner") {
            (new Service_Data_Banner())->cleanCache();
            return;
        }

    }

}