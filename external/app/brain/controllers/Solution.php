<?php
/**
 * @name Main_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Solution extends Ap_Controller_Abstract {
    public $actions = array(
        'dialog'    => 'actions/page/solution/Dialog.php',
        'facegate'  => 'actions/page/solution/Facegate.php',
        'faceprint' => 'actions/page/solution/Faceprint.php',
        'robot'     => 'actions/page/solution/Robot.php',
    );
}
