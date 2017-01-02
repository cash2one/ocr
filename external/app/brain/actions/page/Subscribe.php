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
        $strAction = Brain_Util::getParamAsString($arrInput, 'action', 'add');

        if (!filter_var($strEmail, FILTER_VALIDATE_EMAIL)) {
            Brain_Output::jsonOutput(1, '邮件地址格式错误');
            return;
        }
        
        $dbSubscribe = new Dao_Subscribe();
        $subscribeInfo = $dbSubscribe->getSubscribe($strEmail);
        
        if($strAction == 'add')
        {
            $strCode = strtoupper(Brain_Util::getParamAsString($arrInput, 'code'));
            if(!Brain_Seccode::checkSeccode($strCode))
            {
                Brain_Output::jsonOutput(2, 'code is wrong');
                return;
            }

            $strName = Brain_Util::getParamAsString($arrInput, 'name', '');
            if (!empty($strName) && !preg_match("/^[\x{4e00}-\x{9fa5}A-Za-z0-9 _-]+$/u", $strName)) {
                Brain_Output::jsonOutput(1, '姓名只允许有中文、字母');
                return;
            }
            
            $sex = Brain_Util::getParamAsInt($arrInput, 'sex', 1);
            if ($sex !== 1 && $sex !== 2) {
                $sex = 1;
            }
            
            //如果用户曾经订阅过，则订阅所有
            if(empty($subscribeInfo))
            {
                try {
                    $arrSub = $dbSubscribe->insertSubscribe($strName, $sex, $strEmail);
                } catch (Exception $e) {
                    Bd_Log::warning('Db operate fail: '.$e->getMessage());
                    Brain_Output::jsonOutput(1, 'Db operate fail');
                }
                Brain_Output::jsonOutput(0, 'success');
            }
            else{
                try {
                    $dbSubscribe->subscribe($strEmail, 'all', $strReason); 
                } catch (Exception $e) {
                    Bd_Log::warning('Db operate fail: '.$e->getMessage());
                    Brain_Output::jsonOutput(1, 'Db operate fail');
                }
                Brain_Output::jsonOutput(0, 'success');
            }
        }
        else if($strAction == 'chooseReason'){
            $strToken = Brain_Util::getParamAsString($arrInput, 'token', '');
            
            $arrPageInfo['email'] = $strEmail;
            $arrPageInfo['token'] = $strToken;
            Brain_Output::htmlOutput(
                $arrPageInfo, 
                'brain/email/unsubscribe.tpl'
            );
        }
        else if($strAction == 'unsubscribe'){
        
            //验证token 
            $strSex = $subscribeInfo[0]['sex'];
            $strId = $subscribeInfo[0]['id'];
            $strToken = Brain_Util::getParamAsString($arrInput, 'token', '');
            $strReason = Brain_Util::getParamAsString($arrInput, 'reason', '');
            $strFollow = Brain_Util::getParamAsInt($arrInput, 'follow');

            if ($strToken != md5($strEmail . $strSex . $strId))
            { 
                Brain_Output::jsonOutput(1, 'token is invalid!');
                return; 
            } 
            
            if (1 == $strFollow) {
            
                try {
                    $dbSubscribe->subscribe($strEmail, 'important', $strReason);
                } catch (Exception $e) {
                    Bd_Log::warning('Db operate fail: '.$e->getMessage());
                    Brain_Output::jsonOutput(1, 'Db operate fail');
                }
                //Brain_Output::jsonOutput(0, 'subscribe important info success!');
            }
            else if (0 === $strFollow) {
            
                try {
                    $dbSubscribe->subscribe($strEmail, 'none', $strReason);
                } catch (Exception $e) {
                    Bd_Log::warning('Db operate fail: '.$e->getMessage());
                    Brain_Output::jsonOutput(1, 'Db operate fail');
                }
                //Brain_Output::jsonOutput(0, 'cancel subscribe success!');
            } else {
                //Brain_Output::jsonOutput(1, 'action is wrong');
            }
            
            Brain_Output::htmlOutput(array(), 'brain/email/unsubscribe-notice.tpl');
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
