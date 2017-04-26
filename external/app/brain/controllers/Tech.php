<?php
/**
 * @name Api_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Tech extends Ap_Controller_Abstract {
    public $actions = array(
        "speech" =>"actions/tech/speech/Speech.php",
        "nlp" =>"actions/tech/nlp/Nlp.php",
        "video" =>"actions/tech/video/Video.php",
    );
}
