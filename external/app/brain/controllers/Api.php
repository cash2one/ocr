<?php
/**
 * @name Api_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Api extends Ap_Controller_Abstract {
    public $actions = array(
        "staticversion"=>"actions/api/StaticVersion.php",
    );
}
