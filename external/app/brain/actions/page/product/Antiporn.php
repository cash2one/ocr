<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Antiporn.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief 
 *  
 **/
class Action_Antiporn extends Ap_Action_Abstract {

    public function execute() {
        $tech = 'antiporn';
        $templateFile = Brain_Cloud::genCloudTemplate($tech);

        $arrPageInfo = array(
            'title' => '色情识别-百度云',
            'src' => 'cloud',
        );  

        Brain_Output::htmlOutput(
            $arrPageInfo, 
            "brain/cloud/$tech.tpl"
        ); 
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
