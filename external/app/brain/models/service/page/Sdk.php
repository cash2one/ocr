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
        $sdk = $this->sdkData->sdkData();
        $arrPageInfo['page'] = "sdk";
        $arrPageInfo['sdk'] = $sdk;
        Brain_Output::htmlOutput(
            $arrPageInfo,
            'brain/platform/sdk/sdk.tpl'
        );
    }

}