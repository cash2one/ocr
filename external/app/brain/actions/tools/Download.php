<?php
/***************************************************************************
 *
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Download.php
 * @author wangyu61(wangyu61@baidu.com)
 * @date 2017/04/06 14:28:45
 *
 **/

class Action_Download extends Ap_Action_Abstract
{

    public function execute()
    {
        $passId = '123';
        $ucid = '321';

        $userInfo = Bd_Passport::checkUserLogin();
        var_dump($userInfo);
        if($userInfo != false){
            $passId = $userInfo['uid'];
            var_dump($passId);
        } else{
            var_dump('No passId');
        }

        $arrServers = array('10.95.106.174:8042');
        $intAppid = '469';
        $strAppKey = 'ai.baidu.com';
        $intTmOut = '2000';
        $strCookieDomain = '10.95.106.174';
        $strLoginUrl = 'login.bce.baidu.com';
        $strJumpUrl = 'ai.baidu.com';
        var_dump($ucid);
        $casInfo = new Cas_Info($arrServers, $intAppid, $strAppKey,$intTmOut);
        var_dump($ucid);
        $casInfo->setCookieDomain($strCookieDomain);
        $casInfo->setLoginUrl($strLoginUrl);
        $casInfo->setJumpUrl($strJumpUrl);
        //$casInfo->setAutoRedirect(false);
        var_dump($ucid);
        $cas_client = new Cas_Client($casInfo);
        var_dump($ucid);
        $objCheckRes = $cas_client->validate();
        var_dump($ucid);
        $ucid = (string)$objCheckRes->getUcid();
        var_dump($ucid);

        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $filePath = Brain_Util::getParamAsString($arrInput, 'filePath');
        var_dump($filePath);

        $serviceType = 0;
        $language = 0;
        $sdkArr = explode('-', $filePath);
        if ($sdkArr[1] == 'ocr') {
            $serviceType = 0;
        } elseif ($sdkArr[1] == 'face') {
            $serviceType = 1;
        } elseif ($sdkArr[1] == 'nlp') {
            $serviceType = 2;
        } elseif ($sdkArr[1] == 'antiporn') {
            $serviceType = 3;
        } elseif ($sdkArr[1] == 'python') {
            $language = 2;
        }

        if ($sdkArr[2] == 'java') {
            $language = 0;
        } elseif ($sdkArr[2] == 'php') {
            $language = 1;
        } elseif ($sdkArr[2] == 'android') {
            $language = 3;
        } elseif ($sdkArr[2] == 'ios') {
            $language = 4;
        }

        $dbSdkInfo = new Dao_SdkInfo();
        $dbSdkInfo->insertSdkInfo($passId, $ucid, $serviceType, $language);

        ob_start(); 
        $size = readfile($filePath); 
        header("Content-type:  application/octet-stream ");
        header("Accept-Ranges:  bytes ");
        header("Accept-Length: " . $size);
        header("Content-Disposition:  attachment;  filename=" . $filePath);
        readfile($filePath); 
        return ;
    }
}
