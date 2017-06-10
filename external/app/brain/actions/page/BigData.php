<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file BigData.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/21 18:57:37
 * @brief 
 *  
 **/
class Action_BigData extends Ap_Action_Abstract {

    public function execute() {
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'brain/page/bd/bd.tpl'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
