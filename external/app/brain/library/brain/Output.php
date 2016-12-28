<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Output.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/05/11 17:07:31
 * @brief 
 *  
 **/

class Brain_Output {
    
    /**
     * @brief html模板输出
     *
     * @param [in] $arrPageInfo   : 写入模板的数据
     * @param [in] $strTpl   : 模板地址
     *
     * @author huanglinhao
     *
     * @date 2016/05/11 17:10:09
    **/
    public function htmlOutput($arrPageInfo, $strTpl) {
        header('Content-Type: text/html; charset=UTF-8');
        $tpl = Bd_TplFactory::getInstance();
        $arrPageInfo['userInfo'] = Brain_User::getUserInfo();
        $tpl->assign($arrPageInfo);
        $strEcho = $tpl->fetch($strTpl);
        echo $strEcho;
    }

    /**
     * @brief json输出
     *
     * @param arrPageInfo 待输出数组
     *
     * @author huanglinhao
     *
     * @date 2016/05/12 19:19:44
    **/
    public function jsonOutput($errno, $msg, $data='') {
        //header('Content-Type: text/javascript; charset=UTF-8');
        header('Content-Type: text/json; charset=UTF-8');
        header('Access-Control-Allow-Origin: *');
        
        $arrPageInfo = array(
            'errno' => $errno,
            'msg' => $msg,
            'data' => $data,
        );
        
        $strRet = json_encode($arrPageInfo, JSON_UNESCAPED_UNICODE);
        echo $strRet;
    }


    /**
     * @brief jsonp输出
     *
     * @param [in] $arrPageInfo   : 待输出数组
     * @param [in] $callback   : 回调参数
     *
     * @author huanglinhao
     * @date 2016/05/12 19:20:21
    **/
    public function jsonpOutput($arrPageInfo, $callback) {
        header('Content-Type: text/javascript; charset=UTF-8');
        header('Access-Control-Allow-Origin: *');
        if (preg_match('/^[_A-Za-z]+[_A-Za-z0-9]*$/', $callback)) {
            $strRet = $callback . '(' . json_encode($arrPageInfo, JSON_UNESCAPED_UNICODE) . ')';
        } else {
            $strRet = json_encode($arrPageInfo, JSON_UNESCAPED_UNICODE);
        }
        echo $strRet;
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
