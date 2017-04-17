<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午1:58
 */
class RedirectTest extends PHPUnit_Framework_TestCase
{
    /**
     * @return bool
     */
    public static function testRtrim(){
        $url = rtrim("cloud.baidu.com/?1=1&fromai=1&service=SVA", "&");
        echo $url;
        return true;
    }

}
