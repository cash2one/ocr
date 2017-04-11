<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:16
 */
class Action_WebImage extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "ocr_webimage";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/ocr-webimage.tpl"
        );
    }
}