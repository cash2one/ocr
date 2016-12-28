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
        
            return array(
                'uid' => $userInfo['uid'],
                'uname' => $userInfo['uname'],
            );
        }
    }
    
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
