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
        var_dump('Here!111');

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

        if(!empty($_COOKIE['__cas__id__'])){
            $ucid = $_COOKIE['__cas__id__'];
            var_dump($ucid);
        } else{
            var_dump('No ucid');
        }

        $dbSdkInfo = new Dao_SdkInfo();
        $dbSdkInfo->insertSdkInfo($passId, $ucid, 1, 0);

        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $filePath = Brain_Util::getParamAsString($arrInput, 'filePath');
        var_dump($filePath);

        ob_start(); 
        $size = readfile($filePath); 
        header("Content-type:  application/octet-stream ");
        header("Accept-Ranges:  bytes ");
        header("Accept-Length: " . $size);
        var_dump('fileSize');
        var_dump($file['size']);
        header("Content-Disposition:  attachment;  filename=" . $filePath);
        var_dump(file_get_contents($filePath));
        readfile($filePath); 
        return ;
    }
}