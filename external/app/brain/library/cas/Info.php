<?php
//.baidu.com大域下cookie的md5的key
define('CAS_COOKIE_ENC', 'Lo&^%!@*9jdba');
class Cas_Info {
	var $arrServers;
	var $strCookieDomain = ".baidu.com";
	var $strCookiePath = "/";
	var $strCookieSTKey = "__cas__st__";
	var $strCookieIDKey = "__cas__id__";
	var $strCookieRNKey = "__cas__rn__";//cookie记录登录心跳
	var $intBizAppid;
	var $strStKeyParamName = "castk";
	var $strAppKey;
	var $strEncoding = "UTF-8";
	var $bolUseSessCache = true;
	//毫秒为单位
	var $intTimeOut = 1000;
	//是否自动做跳转
	var $bolAutoRedirect = true;
	//登陆url，仅当casclient检测到错误时才会用到
	var $strLoginUrl = "http://cas.baidu.com/?tpl=www2";
	//跳转url，判断是否从其他的登陆系统跳转到当前系统，如果不允许，uclogin会跳转到登陆页面
	var $strJumpUrl = "http://cas.baidu.com/?action=check&appid=";

    /**
     * @return bool
     */
    function getBolUseSessCache() {
        return $this->bolUseSessCache;
    }

    /**
     * @param bool $bolUseSession
     */
    function setBolUseSessCache($bolUseSession) {
        $this->bolUseSessCache = $bolUseSessCache;
    }
	/**
	 * 构造函数
	 * @param $arrServers array('ip:port', 'ip:port',)
	 * @param $appid 当前appid
	 * @param $appkey 当前应用的key，可以是域名
	 * @param $tmout 毫秒为单位
	 */
	function __construct($arrServers, $appid, $appkey, $tmout = 1000) {
		$this->Cas_Info($arrServers, $appid, $appkey, $tmout);
	}
	
	/**
	 * 构造函数
	 * @param $arrServers array('ip:port', 'ip:port',)
	 * @param $appid 当前appid
	 * @param $appkey 当前应用的key，可以是域名
	 * @param $tmout 毫秒为单位
	 */
	function Cas_Info($arrServers, $appid, $appkey, $tmout = 1000) {
		$this->arrServers = $arrServers;
		$this->intBizAppid = $appid;
		$this->strAppKey = $appkey;
		$this->intTimeOut = $tmout;
	}
	/**
	 * 获得array(ip:port, ip:port...)
	 * @return array
	 */
	function getServers() {
		return $this->arrServers;
	}
	/**
	 * 设置端口 
	 * @param $arrServers
	 */
	function setServers($arrServers) {
		$this->arrServers = $arrServers;
	}
	/**
	 * 获得超时ms
	 * @return
	 */
	function getTimeOut() {
		return $this->intTimeOut;
	}
	/**
	 * 设置超时ms，默认1000
	 * @param intTimeOut
	 */
	function setTimeOut($intTimeOut) {
		$this->intTimeOut = $intTimeOut;
	}
	/**
	 * 是否自动跳转，默认true
	 * @return
	 */
	function isAutoRedirect() {
		return $this->bolAutoRedirect;
	}
	/**
	 * 设置自动跳转，默认true
	 * @param bolAutoRedirect
	 */
	function setAutoRedirect($bolAutoRedirect) {
		$this->bolAutoRedirect = $bolAutoRedirect;
	}
	/**
	 * 获得登陆url
	 * @return
	 */ 
	function getLoginUrl() {
		return $this->strLoginUrl;
	}
	/**
	 * 设置登陆url
	 * @param strLoginUrl
	 */
	function setLoginUrl($strLoginUrl) {
		$this->strLoginUrl = $strLoginUrl;
	} 
	/**
	 * 获得自动跳转url，会将uclogin特殊url+appid连接返回
	 * @return
	 */
	function getJumpUrl() {
		$strUrl = $this->strJumpUrl . $this->intBizAppid;
		if (!$this->isAutoRedirect()) {
			$strUrl .= '&rb=1';
		}
		return $strUrl;
	}
	/**
	 * 设置自动跳转url
	 * @param strJumpUrl
	 */
	function setJumpUrl($strJumpUrl) {
		$this->strJumpUrl = $strJumpUrl;
	}
	/**
	 * 获得cookiedomain
	 * @return
	 */
	function getCookieDomain() {
		return $this->strCookieDomain;
	}
	/**
	 * 设置cookiedomain，必须设置
	 * @param strCookieDomain
	 */
	function setCookieDomain($strCookieDomain) {
		$this->strCookieDomain = $strCookieDomain;
	}
	/**
	 * 获得cookiepath
	 * @return
	 */
	function getCookiePath() {
		return $this->strCookiePath;
	}
	/**
	 * 设置cookiepath
	 * @param strCookiePath
	 */
	function setCookiePath($strCookiePath) {
		$this->strCookiePath = $strCookiePath;
	}
	/**
	 * 获得appid
	 * @return
	 */
	function getBizAppid() {
		return $this->intBizAppid;
	}
	/**
	 * 设置当前应用appid
	 * @param intBizAppid
	 */
	function setBizAppid($intBizAppid) {
		$this->intBizAppid = $intBizAppid;
	}
	/**
	 * 获得stkey在url中的参数名
	 * @return
	 */
	function getStKeyParamName() {
		return $this->strStKeyParamName;
	}
	/**
	 * 设置stkey在url中的参数名
	 * @param strStKeyParamName
	 */
	function setStKeyParamName($strStKeyParamName) {
		$this->strStKeyParamName = $strStKeyParamName;
	}
	/**
	 * 获得appkey
	 * @return
	 */
	function getAppKey() {
		return $this->strAppKey;
	}
	/**
	 * 设置appkey，一般使用域名全名
	 * @param strAppKey
	 */
	function setAppKey($strAppKey) {
		$this->strAppKey = $strAppKey;
	}
	/**
	 * 
	 * @return
	 */
	function getEncoding() {
		return $this->strEncoding;
	}
	/**
	 * 设置编码，一般使用默认的utf-8
	 * @param strEncoding
	 */
	function setEncoding($strEncoding) {
		$this->strEncoding = $strEncoding;
	}
	/**
	 * 获得编码，一般使用默认的utf-8
	 * @return
	 */
	function getCookieSTKey() {
		return $this->strCookieSTKey;
	}
	/**
	 * st在cookie中的key
	 * @param strCookieSTKey
	 */
	function setCookieSTKey($strCookieSTKey) {
		$this->strCookieSTKey = $strCookieSTKey;
	}
	/**
	 * st在cookie中的key
	 * @return
	 */
	function getCookieIDKey() {
		return $this->strCookieIDKey;
	}
	/**
	 * ucid在cookie中的key
	 * @param strCookieIDKey
	 */
	function setCookieIDKey($strCookieIDKey) {
		$this->strCookieIDKey = $strCookieIDKey;
	}
	/**
	 * ucid在cookie中的key
	 * @return
	 */
	function getCookieRNKey() {
		return $this->strCookieRNKey;
	}
}

?>