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
class Action_Nlp extends Ap_Action_Abstract {

    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];

        $class_name = substr(strtolower(__CLASS__), strlen('action_'));
        $techList = array('comment_tag', 'dnnlm_cn', 'lexical', 'simnet', 'word_embedding');

        $inputKeys = array_keys($arrInput);
        $tech = $inputKeys[0];
        if (in_array($tech, $techList)){
            Brain_Output::htmlOutput(
                $arrPageInfo, 
                "brain/platform/technology/$class_name-$tech.tpl"
            );
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
