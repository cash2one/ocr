<?php
/**
 * @file Memcache.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Brain_Memcache {

    //memcache连接
    public $mc;
    
    /**
     * get_connect 获取memcache连接
     * 
     * @static
     * @access public
     * @return void
     */
    public static function get_connect() {
 
        if($mc == null) {
            Bd_Init::init();
            $pid = 'aip_cache';
            
            $mc = Ak_Service_Memcached::create(
                array(
                    'pid' => $pid,
                )
            );

            if($mc == null) {
                Bd_Log::warning("memcache connect fail!");
                return; 
            }
        }
        
        return $mc;
    }
    
    /**
     * get 获取memcache中的值
     * 
     * @static
     * @param mixed $k
     * @access public
     * @return void
     */
    public static function get($k)
    {
        $mc = Brain_Memcache::get_connect();
        
        $v = $mc->get($k);

        return $v;
    }
    
    /**
     * set 设置memcache中的值
     * 
     * @static
     * @param mixed $k
     * @param mixed $v
     * @param mixed $expire
     * @access public
     * @return void
     */
    public static function set($k, $v, $expire=0)
    {
        $mc = Brain_Memcache::get_connect();
        $ret = $mc->set($k, $v, $expire);

        return $ret;
    }
    
    /**
     * delete 删除memcache中的值
     * 
     * @static
     * @param mixed $k
     * @access public
     * @return void
     */
    public static function delete($k)
    {
        $mc = Brain_Memcache::get_connect();
        $ret = $mc->delete($k);

        return $ret;
    }
}
?>
