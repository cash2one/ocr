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
class Action_Face extends Ap_Action_Abstract {

    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];

        $class_name = substr(strtolower(__CLASS__), strlen('action_'));
        $techList = array('detect', 'search', 'compare');

        $inputKeys = array_keys($arrInput);
        $tech = $inputKeys[0];
        $templateName = "$class_name-$tech";

        $titleList = array(
            'detect' => '人脸检测-百度云',
            'search' => '人脸查找-百度云',
            'compare' => '人脸比较-百度云',
            'comment_tag' => '评论观点抽取-百度云',
            'dnnlm_cn' => '中文DNN语言模型-百度云',
            'lexical' => '词法分析-百度云',
            'simnet' => '短文本相似度-百度云',
            'word_embedding' => '中文词向量表示-百度云',
            'bankcard' => '银行卡识别-百度云',
            'general' => '通用文字识别-百度云',
            'idcard' => '身份证识别-百度云',
            'asr' => '语音识别-百度云',
            'tts' => '语音合成-百度云',
            'wake' => '语音唤醒-百度云',
        );
        
        $arrPageInfo = array(
            'title' => $titleList[$tech],
            'src' => 'cloud',
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
