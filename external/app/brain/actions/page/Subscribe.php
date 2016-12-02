<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Subscribe.php
 * @author piaohongji(piaohongji@baidu.com)
 * @date 2016/07/29 14:33:00
 * @brief 
 *  
 **/

class Action_Subscribe extends Ap_Action_Abstract {

    /**
     * execute 
     * 
     * @access public
     * @return void
     */
    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $strEmail = Brain_Util::getParamAsString($arrInput, 'email', '');

        $strCode = strtoupper(Brain_Util::getParamAsString($arrInput, 'code'));
        if(!Brain_Seccode::checkSeccode($strCode))
        {
            Brain_Output::jsonOutput(2, 'code is wrong');
            return;
        }

        if (!filter_var($strEmail, FILTER_VALIDATE_EMAIL)) {
            Brain_Output::jsonOutput(1, '邮件地址格式错误');
            return;
        }
        
        $dbSubscribe = new Dao_Subscribe();
        $subscribeInfo = $dbSubscribe->getSubscribe($strEmail);
        
        if(empty($subscribeInfo))
        {
            $strName = Brain_Util::getParamAsString($arrInput, 'name', '');
            if (!empty($strName) && !preg_match("/^[\x{4e00}-\x{9fa5}A-Za-z0-9 _-]+$/u", $strName)) {
                Brain_Output::jsonOutput(1, '姓名只允许有中文、字母');
                return;
            }
            
            $sex = Brain_Util::getParamAsInt($arrInput, 'sex', 1);
            if ($sex !== 1 && $sex !== 2) {
                $sex = 1;
            }
            
            try {
                $arrSub = $dbSubscribe->insertSubscribe($strName, $sex, $strEmail);
            } catch (Exception $e) {
            }
            Brain_Output::jsonOutput(0, 'success');
        }
        else{
        
            //验证token 
            $strCreatetime = $subscribeInfo[0]['createtime'];
            $strId = $subscribeInfo[0]['id'];
            $strToken = Brain_Util::getParamAsString($arrInput, 'token', '');
            if ($strToken != md5($strEmail . $strCreatetime . $strId))
            { 
                Brain_Output::jsonOutput(1, 'token is invalid!');
                return; 
            } 
            
            $strAction = Brain_Util::getParamAsString($arrInput, 'action', '');
            if ('subAll' === $strAction) {
                
                try {
                    $dbSubscribe->subscribe('all'); 
                } catch (Exception $e) {
                }
                Brain_Output::jsonOutput(0, 'subscribe all info success!');
            }
            else if ('subImportant' === $strAction) {
            
                try {
                    $dbSubscribe->subscribe('important');
                } catch (Exception $e) {
                }
                Brain_Output::jsonOutput(0, 'subscribe important info success!');
            }
            else if ('subNone' === $strAction) {
            
                try {
                    $dbSubscribe->subscribe('none');
                } catch (Exception $e) {
                }
                Brain_Output::jsonOutput(0, 'cancel subscribe success!');
            } else {
                Brain_Output::jsonOutput(1, 'action is wrong');
            }
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
