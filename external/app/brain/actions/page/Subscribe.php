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
        $strAction = $arrInput['action'];
        $arrRet = array(
            'errno' => 0,
            'msg' => 'success',
            'data' => (object) array(),
        );
        $name = Brain_Util::getParamAsString($arrInput, 'name', '');
        if (!empty($name) && !preg_match("/^[\x{4e00}-\x{9fa5}A-Za-z0-9 _-]+$/u",$name)) {
            $arrRet = array(
                'errno' => 1,
                'msg' => '姓名只允许有中文、字母',
                'data' => (object) array(),
            );
            Brain_Output::jsonOutput($arrRet);
            exit;
        }
        $sex = Brain_Util::getParamAsInt($arrInput, 'sex', 1);
        if ($sex !== 1 && $sex !== 2) {
            $sex = 1;
        }
        $email = Brain_Util::getParamAsString($arrInput, 'email', '');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $arrRet = array(
                'errno' => 1,
                'msg' => '邮件地址格式错误',
                'data' => (object) array(),
            );
            Brain_Output::jsonOutput($arrRet);
            exit;
        }
        if (!empty($email) && !preg_match('/^[.A-Za-z0-9@_-]+$/u', $email)) {
            $arrRet = array(
                'errno' => 1,
                'msg' => '邮件地址错误',
                'data' => (object) array(),
            );
            Brain_Output::jsonOutput($arrRet);
            exit;
        }

        $subscribe = new Dao_Subscribe();
        try {
            $arrSub = $subscribe->insertSubscribe($name, $sex, $email);
        } catch (Exception $e) {
        }
        Brain_Output::jsonOutput($arrRet);
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
