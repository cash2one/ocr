<?php
/**
 * @name Main_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Product extends Ap_Controller_Abstract {
    public $actions = array(

        'antiporn' => 'actions/page/product/Antiporn.php',
        'anti' => 'actions/page/product/Anti.php',
        'face'     => 'actions/page/product/Face.php',
        'nlp'      => 'actions/page/product/Nlp.php',
        'ocr'      => 'actions/page/product/Ocr.php',
        'speech'   => 'actions/page/product/Speech.php',
        'video'   => 'actions/page/product/Video.php',
        'imagecensoring' => 'actions/page/product/Imagecensoring.php',
    );
}
