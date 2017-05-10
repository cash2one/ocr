<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:00
 */
class Service_Page_CleanCache
{

    private $cleanCacheData;

    function __construct()
    {
        $this->cleanCacheData = new Service_Data_CleanCache();
    }

    /**
     * @return void
     */
    public function execute()
    {

        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $apiTime = $arrInput['apiTime'];
        $apiKey = $arrInput['apiKey'];
        $cleanType = $arrInput['cleanType'];
        if (empty($apiTime)) {
            Brain_Output::jsonOutput(500, "time null");
            return;
        }

        if (empty($apiKey)) {
            Brain_Output::jsonOutput(500, "key null");
            return;
        }

        if (empty($cleanType)) {
            Brain_Output::jsonOutput(500, "type null");
            return;
        }

        if (time() - 300 > (int)$apiTime) {
            Brain_Output::jsonOutput(500, "time out");
            return;
        }
        $salt = Bd_Conf::getAppConf('api_auth_salt/salt');
        $key = md5($cleanType + $salt + $apiTime);
        if ($apiKey !== $key) {
            Brain_Output::jsonOutput(500, "key error");
            return;
        }

        $this->cleanCacheData->cleanByType($cleanType);
        Brain_Output::jsonOutput(0, "success");
        return;
    }

}