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
        $passId = '';
        $ucId = '';

        $userInfo = Brain_User::getUserInfo();



        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $filePath = Brain_Util::getParamAsString($arrInput, 'filePath');


        $serviceType = -1;
        $language = -1;
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
            $type = $arrInput['type'];
            if ($type == 'ocr') {
                $serviceType = 0;
            } elseif ($type == 'bfr') {
                $serviceType = 1;
            } elseif ($type == 'nlp') {
                $serviceType = 2;
            } elseif ($type == 'antiporn') {
                $serviceType = 3;
            }
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

        $odp_path = Bd_Conf::getAppConf('odp_info/path');
        $path = $odp_path . $filePath;
        if (file_exists($path)) {
            ob_start();
            $size = filesize($path);
            header("Content-type:  application/octet-stream ");
            header("Accept-Ranges:  bytes ");
            header("Accept-Length: " . $size);
            header("Content-Disposition:  attachment;  filename=" . $filePath);
            echo file_get_contents($path);
            readfile($path);

            if  ($serviceType != -1 && $language != -1 && http_response_code() != 302 && !isset($arrInput["castk"])) {
                $dbSdkInfo = new Dao_SdkInfo();
                $dbSdkInfo->insertSdkInfo($ucId, $passId, $serviceType, $language);
            }
        } else {
            $url = '/404';
            Header("Location: $url");
        }

        return;
    }
}
