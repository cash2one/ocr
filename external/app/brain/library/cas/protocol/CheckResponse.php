<?php
require_once(dirname(__FILE__).'/../Protocol.php');
class Cas_Protocol_CheckResponse extends Cas_Protocol {
	var $ucid;
	var $tag;			//1表示使用重名登陆
	var $utype;			// utype
	var $login_appid;	// 登录appid
	var $reg_appid;		// 注册appid
	var $expire_days;	// 密码过期时间
	var $login_time;	// 上次登录时间
	var $username;		// 用户名
	var $ucname;		// 用户中心用户名
	var $reserve;		// 登录时存入的保留字段
	var $tgc; //tgc


    
    /**
     * @return int
     */
    function getExpire_days() {
        return $this->expire_days;
    }

    /**
     * @return int
     */
    function getLogin_time() {
        return $this->login_time;
    }

    /**
     * @return string
     */
    function getReserve() {
        return $this->reserve;
    }

    /**
     * @return int
     */
    function getTag() {
        return $this->tag;
    }

    /**
     * @return string
     */
    function getTgc() {
        return $this->tgc;
    }

    /**
     * @return string
     */
    function getUcname() {
        return $this->ucname;
    }

    /**
     * @return string
     */
    function getUsername() {
        return $this->username;
    }

    /**
     * 1=INNER; 2=OUTER; 3=AGENT
     * @return int
     */
    function getUtype() {
        return $this->utype;
    }

    /**
     * @return int
     */
    function getLogin_appid() {
        return $this->login_appid;
    }

    /**
     * @return int
     */
    function getReg_appid() {
        return $this->reg_appid;
    }

    /**
     * @return int
     */
    function getUcid() {
        return $this->ucid;
    }

	
	
}

?>