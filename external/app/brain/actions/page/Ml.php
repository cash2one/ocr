<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file EasyDl.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/20 11:14:59
 * @brief 
 *  
 **/
class Action_Ml extends Ap_Action_Abstract {

    public function execute() {
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'brain/page/ml/ml.tpl'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
