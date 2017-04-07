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
        $passId = '111';
        $ucid = '222';

        $userInfo = Bd_Passport::checkUserLogin();
        if($userInfo != false){
            $passId = $userInfo['uid'];
        }


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

        ob_start(); 
        $size = readfile($filePath); 
        header("Content-type:  application/octet-stream ");
        header("Accept-Ranges:  bytes ");
        header("Accept-Length: " . $size);
        header("Content-Disposition:  attachment;  filename=" . $filePath);
        readfile($filePath); 

        // $arrServers = array('10.95.106.174:8042');
        // $intAppid = '469';
        // $strAppKey = 'ai.baidu.com';
        // $intTmOut = '2000';
        // $strCookieDomain = 'ai.baidu.com';
        // $strLoginUrl = 'http://login.bcetest.baidu.com';
        // $strJumpUrl = 'http://ai.baidu.com';
        // $casInfo = new Cas_Info($arrServers, $intAppid, $strAppKey,$intTmOut);
        // $casInfo->setCookieDomain($strCookieDomain);
        // $casInfo->setLoginUrl($strLoginUrl);
        // $casInfo->setJumpUrl($strJumpUrl);
        // $casInfo->setAutoRedirect(false);
        // $cas_client = new Cas_Client($casInfo);
        // //$objCheckRes = $cas_client->validate();
        // $ucid = (string)$objCheckRes->getUcid();
        var_dump($ucid);

        $dbSdkInfo = new Dao_SdkInfo();
        $dbSdkInfo->insertSdkInfo($passId, $ucid, $serviceType, $language);

        return ;
    }
}
