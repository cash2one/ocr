<?php
/***************************************************************************
 *
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Docs.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief
 *
 **/
class Action_Docs extends Ap_Action_Abstract
{

    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $arrPageInfo['page'] = "docs";
        $version = Brain_Util::getParamAsInt($arrInput, 'version');
        if ($version !== '') {
            setcookie("docVersion", $version);
        }
        Brain_Output::htmlOutput(
            $arrPageInfo,
            'brain/platform/newDocument/newDocument.tpl'

        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
