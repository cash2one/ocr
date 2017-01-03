<?php
/**
 * @name Main_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Tech extends Ap_Controller_Abstract {
    public $actions = array(

        'antiporn' => 'actions/page/tech/Antiporn.php',
        'face'     => 'actions/page/tech/Face.php',
        'nlp'      => 'actions/page/tech/Nlp.php',
        'ocr'      => 'actions/page/tech/Ocr.php',
        'speech'   => 'actions/page/tech/Speech.php',
        'ar'       => 'actions/page/tech/Ar.php',
    );
}
