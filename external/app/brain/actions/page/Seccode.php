<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Seccode.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Action_Seccode extends Ap_Action_Abstract {

    /**
     * execute 
     * 
     * @access public
     * @return void
     */
    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $strAction = Brain_Util::getParamAsString($arrInput, 'action', '');
        $strCode = strtoupper(Brain_Util::getParamAsString($arrInput, 'code', ''));
        
        if ('show' === $strAction) {
            Brain_Seccode::showSeccode();
        }
        else if ('check' === $strAction) {
            
            if(!Brain_Seccode::checkSeccode($strCode, 0))
            {
                Brain_Output::jsonOutput(1, 'fail');
            }
            else
            {
                Brain_Output::jsonOutput(0, 'success');
            }
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
