<?php
/**
 * @name Main_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Support extends Ap_Controller_Abstract {
    public $actions = array(

        'about' => 'actions/page/support/About.php',
        'video' => 'actions/page/support/Video.php',
        'news' => 'actions/page/support/News.php',
        'faq' => 'actions/page/support/Faq.php',
    );
}
