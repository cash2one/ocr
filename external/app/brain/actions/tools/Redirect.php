<?php
/***************************************************************************
 *
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Ocr.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief
 *
 **/
class Action_Redirect extends Ap_Action_Abstract
{

    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];

        $url = Brain_Util::getParamAsString($arrInput, 'url');
        $param = array(
            "aibduss" => $_COOKIE['BDUSS'],
            "fromai" => 1,
            "aiucid" => $_COOKIE['uc_login_unique']
        );
        $url = Brain_Util::appendUrl($url, $param);
        header("Location: $url");
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
