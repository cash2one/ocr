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
        $passId = '113';
        $ucid = '223';

       try{
           $userInfo = Bd_Passport::checkUserLogin();
           if($userInfo != false){
               $passId = $userInfo['uid'];
           }else{
               // var_dump("No passId!");
           }
       } catch (Exception $e) {
           // print $e->getMessage();
       }


        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $filePath = Brain_Util::getParamAsString($arrInput, 'filePath');
        // var_dump($filePath);

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


       try {
           $arrServers = array('mycas.baidu.com:8880');
           $intAppid = '469';
           $strAppKey = 'ai.baidu.com';
           $intTmOut = '2000';
           $strCookieDomain = 'ai.baidu.com';
           $strLoginUrl = 'http://login.bce.baidu.com';
           $strJumpUrl = 'https://mycas.baidu.com:8443/?action=check&appid=';
           $casInfo = new Cas_Info($arrServers, $intAppid, $strAppKey,$intTmOut);
           $casInfo->setCookieDomain($strCookieDomain);
           $casInfo->setLoginUrl($strLoginUrl);
           $casInfo->setJumpUrl($strJumpUrl);
           $casInfo->setAutoRedirect(false);
           $cas_client = new Cas_Client($casInfo);
           $objCheckRes = $cas_client->validate();
           if (!is_null($objCheckRes)) {
               $ucid = (string)$objCheckRes->getUcid();
               // var_dump($ucid);
           }
       } catch (Exception $e) {
           // print $e->getMessage();
       }
        
        $odp_path = Bd_Conf::getAppConf('odp_info/path');
        $path = $odp_path.$filePath;
        if (file_exists($path)) {
          ob_start(); 
          $size = filesize($path); 
          header("Content-type:  application/octet-stream ");
          header("Accept-Ranges:  bytes ");
          header("Accept-Length: " . $size);
          header("Content-Disposition:  attachment;  filename=" .$filePath);
          echo file_get_contents($path);
          readfile($path);
        } else {
          $url = '/404';
          Header("Location: $url"); 
        }

        $dbSdkInfo = new Dao_SdkInfo();
        $dbSdkInfo->insertSdkInfo($ucid, $passId, $serviceType, $language);

        return ;
    }
}
