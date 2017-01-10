<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Image.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief 
 *  
 **/
class Action_Image extends Ap_Action_Abstract {

    public function execute() {
        !Brain_User::checkUuapLogin() && exit(0);
        Brain_Output::htmlOutput(
            $arrPageInfo, 
            'views/image.html'
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
