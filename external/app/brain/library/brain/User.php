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
        
        if($userInfo == false)
        {
            return;
        }
        else
        {
            $dbUser = new Dao_User();
            $dbUser->insertUser($userInfo['uid'], $userInfo['uname']);

            $result = array(
                'uid' => $userInfo['uid'],
                'uname' => iconv('gb2312', 'utf-8', $userInfo['uname']),
            );

            $isInternalUser = Brain_User::checkInternalUser($userInfo['uname']);
            if($isInternalUser)
            {
                $result['internalLink'] = '/internal/';
            }
        
            return $result;
        }
    }
    
    /**
     * checkInternalUser 检查hi账号是否关联UUAP账号
     * 
     * @static
     * @param mixed $username 
     * @access public
     * @return void
     */
    public static function checkInternalUser($username) {
        
        if ($username)
        {
            $k = 'passport_to_uuap_'.$username;
            $userInfo = Brain_Memcache::get($k);
            if (!empty($userInfo))
            {
                return $userInfo;
            }

            $uuapUser = Brain_User::getUuapByHi($username);

            if (!empty($uuapUser->return->username))
            {
                Brain_Memcache::set($k, $uuapUser->return->username, 3600);
                return $uuapUser->return->username;
            }

        }

        return;

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
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
