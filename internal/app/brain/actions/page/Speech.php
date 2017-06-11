<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Speech.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:49:22
 * @brief 
 *  
 **/
class Action_Speech extends Ap_Action_Abstract {

    public function execute() {
        !Brain_User::checkInternalUser() && exit(0);
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'views/speech.html'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
