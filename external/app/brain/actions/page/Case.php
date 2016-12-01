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

        $arrRet = array(
            'errno' => 0,
            'msg' => 'success',
            'data' => (object) array(),
        );
        $dbCase = new Dao_Case();

        if ('add' === $strAction) {
            
            
            $strUsername = Brain_Util::getParamAsString($arrInput, 'username');
            $strCompany = Brain_Util::getParamAsString($arrInput, 'company');
            $strPhone = Brain_Util::getParamAsString($arrInput, 'phone');
            $strContent = Brain_Util::getParamAsString($arrInput, 'content');
            $strContactway= Brain_Util::getParamAsString($arrInput, 'contactway');
            $strTech = Brain_Util::getParamAsString($arrInput, 'tech');
            
            $strCode = strtoupper(Brain_Util::getParamAsString($arrInput, 'code'));
            
            $seccode = Brain_Seccode::getSeccode();
            //echo $seccode, "<br>", $strCode;
            
            if($strCode != '' && $seccode != '' && $seccode == $strCode)
            {
                try {
                    $dbCase->insertCase($strUsername, $strCompany, $strPhone,
                        $strContent, $strContactway, $strTech);
                } catch (Exception $e) {
                }
            }
            else{
                $arrRet['errno'] = -2;
                $arrRet['msg'] = 'code is wrong';
            }

        } else {
            $arrRet['errno'] = -1;
            $arrRet['msg'] = 'action is wrong';
            //Brain_Output::htmlOutput(array(), 'brain/page/Case/Case.tpl');
        }
        
        Brain_Output::jsonOutput($arrRet);
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
