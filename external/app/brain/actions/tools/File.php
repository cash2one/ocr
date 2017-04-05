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
class Action_File extends Ap_Action_Abstract
{

    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $url = Brain_Util::getParamAsString($arrInput, 'url');
        $param = array(
            "aibaiduid" => $_COOKIE['BAIDUID'],
            "fromai" => 1,
        );
        $url = Brain_Util::appendUrl($url, $param);
        if (empty($url)) {
            $url = "https://ai.baidu.com";
        }
        if (!Bd_Str::exist($url, "http")) {
            $url = "https://" . $url;
        }
        $url = Bd_Str::urldecode($url);

        header("Location: $url");
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
