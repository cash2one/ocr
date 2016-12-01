<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Input.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/05/12 19:44:21
 * @brief 
 *  
 **/

class Brain_Input {
    private static $arrInput;
    /**
     * @brief 获取post参数
     *
     * @return array
     *
     * @author huanglinhao
     * 
     * @date 2016/05/12 19:45:49
    **/

    public static function post() {
        if (isset(self::$arrInput)) {
            return $arrInput['post'];
        } else {
            self::$arrInput = Saf_SmartMain::getCgi();
            return self::$arrInput['post'];
        }
    }

    /**
     * @brief 获取get参数
     *
     * @return  array
     *
     * @author huanglinhao
     *
     * @date 2016/05/12 19:46:00
    **/
    public static function get() {
        if (isset(self::$arrInput)) {
            return $arrInput['get'];
        } else {
            self::$arrInput = Saf_SmartMain::getCgi();
            return self::$arrInput['get'];
        }
    }

    /**
     * @brief 获取request 参数
     *
     * @return array
     *
     * @author huanglinhao
     *
     * @date 2016/05/12 19:46:43
    **/
    public static function request() {
        if (isset(self::$arrInput)) {
            return $arrInput;
        } else {
            self::$arrInput = Saf_SmartMain::getCgi();
            return self::$arrInput;
        }
    }

    /**
     * @brief 获取请求方法
     *
     * @return string
     *
     * @author huanglinhao
     *
     * @date 2016/05/12 19:50:30
    **/
    public function getMethod() {
        return $strMethod = strtolower($_SERVER['REQUEST_METHOD']);
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
