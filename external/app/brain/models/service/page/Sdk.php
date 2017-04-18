<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:00
 */
class Service_Page_Sdk
{

    private $sdkData;

    public function __construct()
    {
        $this->sdkData = new Service_Data_Sdk();
    }

    /**
     *
     */
    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        if (isset($arrInput['action']) && $arrInput['action'] =="1"){
            $this->sdkData->cleanCache();
            Brain_Output::jsonOutput(0,"clean cache success");
        }
        $sdk = $this->sdkData->sdkData();
        $arrPageInfo['page'] = "sdk";
        $arrPageInfo['sdk'] = $sdk;
        Brain_Output::htmlOutput(
            $arrPageInfo,
            'brain/platform/sdk/sdk.tpl'
        );
    }

}