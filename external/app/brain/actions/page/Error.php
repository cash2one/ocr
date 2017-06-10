<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Home.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/13 16:06:59
 * @brief 
 *  
 **/

class Action_Error extends Ap_Action_Abstract {

    public function execute() {
        $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7);
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'brain/platform/error.tpl'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
