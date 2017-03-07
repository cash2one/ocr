<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Case.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Action_Case extends Ap_Action_Abstract {

    /**
     * execute 
     * 
     * @access public
     * @return void
     */
    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $strAction = $arrInput['action'];

        $dbCase = new Dao_Case();

        if ('add' === $strAction) {

            $dataContent = array();
            $strUsername = $dataContent['username'] = Brain_Util::getParamAsString($arrInput, 'username');
            $strCompany = $dataContent['company'] =  Brain_Util::getParamAsString($arrInput, 'company');
            $strPhone = $dataContent['phone'] =  Brain_Util::getParamAsString($arrInput, 'phone');
            $strContent = $dataContent['content'] =  Brain_Util::getParamAsString($arrInput, 'content');
            $strContactway= $dataContent['contactway'] =  Brain_Util::getParamAsString($arrInput, 'contactWay');
            $strTrade= $dataContent['trade'] =  Brain_Util::getParamAsString($arrInput, 'trade');
            $strTech = $dataContent['tech'] =  Brain_Util::getParamAsString($arrInput, 'tech');
            
            $strCode = strtoupper(Brain_Util::getParamAsString($arrInput, 'code'));

            $strSiteUrl = $dataContent['siteUrl'] =  Brain_Util::getParamAsString($arrInput, "siteUrl");
            $business = $dataContent['business'] = Brain_Util::getParamAsString($arrInput, "business");
            $requirement = $dataContent['requirement'] = Brain_Util::getParamAsString($arrInput, "requirement");

            $seccode = Brain_Seccode::getSeccode();
            //echo $seccode, "<br>", $strCode;
            
            if($strCode != '' && $seccode != '' && $seccode == $strCode)
            {
                $caseId = null;
                try {
                    $jsonContent = Bd_String::json_encode($dataContent);
                    $caseId = $dbCase->insertCase($strUsername, $strCompany, $strPhone,
                        $strContent, $strContactway, $strTech, $jsonContent);
                } catch (Exception $e) {
                    Bd_Log::warning('Db operate fail: '.$e->getMessage());
                    Brain_Output::jsonOutput(1, 'Db operate fail');
                }   

                //发送邮件
                if ($caseId)
                {   
                    $dbCase->sendCase($caseId);
                }   
                
                Brain_Output::jsonOutput(0, 'success');
            }
            else{
                Brain_Output::jsonOutput(1, 'code is wrong');
            }

        } else {
            Brain_Output::jsonOutput(1, 'action is wrong');

            //Brain_Output::htmlOutput(array(), 'brain/page/Case/Case.tpl');
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
