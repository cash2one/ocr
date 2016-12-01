<?php
/**
 * @file Seccode.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Brain_Seccode {
    /**
     * showSeccode 显示验证码
     * 
     * @static
     * @access public
     * @return void
     */
    public static function showSeccode() {
        $seccode = rand(100000, 999999);
        session_start();
        $_SESSION[$_SERVER['REMOTE_ADDR'].'_seccode'] = $seccode;

        header("Expires: -1");
        header("Cache-Control: no-store, private, post-check=0, pre-check=0, max-age=0", FALSE);
        header("Pragma: no-cache");

        $code = new Lib_Seccode();
        $code->code = $seccode;
        $code->type = 0;
        $code->width = 70;
        $code->height = 21;
        $code->background = 0;
        $code->adulterate = 1;
        $code->ttf = 1;
        $code->angle = 0;
        $code->color = 1;
        $code->size = 0;
        $code->shadow = 1;
        $code->animator = 0;
        //$code->fontpath = ROOT . 'htdocs/images/fonts/';
        //$code->datapath = ROOT . 'htdocs/images/';
        $code->includepath = '';
        $code->display();

    }

    /**
     * getSeccode 获取验证码
     * 
     * @static
     * @access public
     * @return void
     */
    public static function getSeccode() {
        session_start();
        $seccode = $_SESSION[$_SERVER['REMOTE_ADDR'].'_seccode'];

        if($seccode == '')
        {
            return;
        }
        else
        {
            unset($_SESSION[$_SERVER['REMOTE_ADDR'].'_seccode']);
            $code = new Lib_Seccode();
            $code->seccodeconvert($seccode);
            return $seccode;
        }
    }

    /**
     * checkSeccode 检验验证码
     * 
     * @static
     * @access public
     * @return Boolean
     */
    public static function checkSeccode($strCode) {
        $seccode = Brain_Seccode::getSeccode();

        if($strCode != '' && $seccode != '' && $seccode == $strCode)
        {
            return True;
        }
        else
        {
            return False;
        }

    }

}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
