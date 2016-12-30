<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Asr.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief 
 *  
 **/
class Action_Ocr extends Ap_Action_Abstract {

    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];

        $class_name = substr(strtolower(__CLASS__), strlen('action_'));
        $techList = array('bankcard', 'general', 'idcard');

        $inputKeys = array_keys($arrInput);
        $tech = $inputKeys[0];
        $templateName = "$class_name-$tech";


        $arrPageInfo = array(
            'title' => 'xxxxxxx',
        );  

        if (in_array($tech, $techList)){
            $templateFile = Brain_Cloud::genCloudTemplate($templateName);
            Brain_Output::htmlOutput(
                $arrPageInfo, 
                "brain/cloud/$templateName.tpl"
            ); 
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
