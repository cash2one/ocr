<?php
/**
 * @file Token.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Brain_Token {
    
    const OPENAPI_URL = "https://openapi.baidu.com/oauth/2.0/token";
    const MEMCACHE_KEY_TOKEN = "openapi_token";

    /**
     * getToken 获取token
     * 
     * @static
     * @access public
     * @return void
     */
    public static function getToken() {
        
        $token = Brain_Memcache::get(Brain_Token::MEMCACHE_KEY_TOKEN);
        
        if($token == '')
        {
            $token = Brain_Token::getTokenFromOpenapi();
            var_dump($token);
            echo 'xxxxxxxxxx';
            
            if($token != '')
            {
                Brain_Memcache::set(
                    Brain_Token::MEMCACHE_KEY_TOKEN,
                    $token, 20 * 24 * 3600);
            }
        }
        
        return $token;
    }
    
    /**
     * getToken 获取token从openapi.baidu.com
     * 
     * @static
     * @access public
     * @return void
     */
    public static function getTokenFromOpenapi() {
        $openapiConf = Bd_Conf::getAppConf('openapi');
        
        $tokenUrl = Brain_Token::OPENAPI_URL . '?' .
            'grant_type=' . $openapiConf['grant_type'] . '&' . 
            'client_id=' . $openapiConf['client_id'] . '&' . 
            'client_secret=' . $openapiConf['client_secret'];
            
        //echo file_get_contents($tokenUrl);
        $tokenInfo = json_decode(file_get_contents($tokenUrl));
        
        if(array_key_exists('access_token', $tokenInfo))
        {
            return $tokenInfo->access_token;
        }
        else
        {
            return;
        }
    }

}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
