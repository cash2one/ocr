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
        $clientIp = Bd_Ip::getClientIp();

        //整体判断是否为外网IP
        $isIPV4 = filter_var($clientIp, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
        if(!$isIPV4) 
        {
            return false;
        }

        $isExternal = filter_var(
            $clientIp, FILTER_VALIDATE_IP,
            FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
        );
        if($isExternal)
        {
            return false;
        }
        
        $userInfo = Bd_PhpCas::isAuthenticated();

        if ($userInfo === false)
        {
            $userInfo = Bd_PhpCas::login();

        }
        
        return $userInfo;
    }
 
    /**
     * checkUuapLogin 检查UUAP登录
     * 
     * @static
     * @access public
     * @return void
     */
    public static function checkUuapLogin() {
        
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
