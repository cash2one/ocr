<?php
/**
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
 
/**
 * @file Antiporn.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief 
 *  
 **/
class Action_Antiterror extends Ap_Action_Abstract {

    public function execute() {
        $tech = 'antiterror';
        $templateFile = Brain_Cloud::genCloudTemplate($tech);

        $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7);
        $arrPageInfo['src'] = 'cloud';

        Brain_Output::htmlOutputNoUser(
            $arrPageInfo, 
            "brain/cloud/$tech.tpl"
        ); 
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
