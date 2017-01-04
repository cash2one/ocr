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
        if (in_array($tech, $techList)){
            $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7).'_'.$tech;
            Brain_Output::htmlOutput(
                $arrPageInfo, 
                "brain/platform/technology/$class_name-$tech.tpl"
            );
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
