<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file UserProfile.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/23 10:28:45
 * @brief 
 *  
 **/
class Action_UserProfile extends Ap_Action_Abstract {

    public function execute() {
        !Brain_User::checkInternalUser() && exit(0);
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'views/userProfile.html'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
