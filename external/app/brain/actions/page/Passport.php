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
class Action_Passport extends Ap_Action_Abstract {
    public function execute() {

        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        if($arrInput['password'] == '1508c84d57fc486967451b3c66f8d8c5')
        {
            var_dump(Bd_Passport::checkUserLogin());
            var_dump($_SERVER);
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
