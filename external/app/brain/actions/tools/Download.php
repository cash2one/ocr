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
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        var_dump('Here!!\n');
        var_dump($arrInput);

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

        $filePath = Brain_Util::getParamAsString($arrInput, 'filePath');

        return;
    }
}