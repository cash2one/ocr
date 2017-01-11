<?php
/**
 * @file User.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Brain_User {
    

    /**
     * getUserInfo 获取用户信息
     * 
     * @static
     * @access public
     * @return void
     */
    public static function getUserInfo() {
        $userInfo = Bd_Passport::checkUserLogin();

        if ($userInfo === false)
        {
            return false;
        }
        else
        {
            $uuapUser = Brain_User::getUuapByHi($userInfo['uname']);
            //$uuapUser = Brain_User::getUuapByHi('yuxiangchichu');
            return $uuapUser->return->username;
        }
    }
 
    /**
     * getUuapByHi 根据hi获取用户信息
     * 
     * @static
     * @param mixed $type 
     * @access public
     * @return void
     */
    public static function getUuapByHi($hi) {

        //WSDL文件的地址
        //$wsdluri = "http://itebeta.baidu.com:8102/ws/UserRemoteService?wsdl";
        //$appKey = "UICWSTestKey";
        //$wsdluri = "http://uuap.baidu.com:8086/ws/UserRemoteService?wsdl";
        //$appKey = "uuapclient-7-dtS4xXLQbP2kqietxAXw";
        $confDir = 'ral/services/uuap/';
        $confPath = 'CamelConfig/ServiceConfig/Local/Service/';
        $serviceConf = Bd_Conf::getConf($confDir . $confPath);

        $wsdluri = 'http://';
        $wsdluri .= $serviceConf[1]['Server'][0]["Hostname"].':'.$serviceConf[1]["DefaultPort"];
        $wsdluri .= "/ws/UserRemoteService?wsdl";
        $appKey = $serviceConf[1]["AppKey"];


        $soapclient = new SoapClient($wsdluri);

        //SoapHeader（命名空间，关键字--appKey--无需变化，appKey对应的值,false)
        $soapheader = new SoapHeader(
            "http://schemas.xmlsoap.org/wsdl/soap/", "appKey", $appKey, false
        );
        $soapclient->__setSoapHeaders(array($soapheader));

        //发出请求调用
        $ret = $soapclient->getUserByHiNumber(array('arg0'=>$hi));

        return $ret;
    }
 
    /**
     * checkInternalUser 检查UUAP登录
     * 
     * @static
     * @access public
     * @return void
     */
    public static function checkInternalUser() {
        
        if (!empty($_COOKIE['uniqId']))
        {
            $userInfo = Brain_Memcache::get($_COOKIE['uniqId']);
            if (!empty($userInfo))
            {
                return $userInfo;
            }
        }

        $userInfo = Brain_User::getUserInfo();
        if (!empty($userInfo))
        {

            $uniqId = Brain_User::genUniqId();

            $userInfo = Brain_Memcache::set($uniqId, $userInfo, 3600);
            setcookie("uniqId", $uniqId, time() + 24 * 3600, '/');
            
            return $userInfo;
        }
    }
 
    /**
     * genUniqId 生成唯一id
     * 
     * @static
     * @access public
     * @return void
     */
    public static function genUniqId() {
        
        $clientIp = Bd_Ip::getClientIp();
        $uniqId = 'uuap_'.$clientIp.uniqid().mt_rand();
        
        return md5($uniqId);
    }
  
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
