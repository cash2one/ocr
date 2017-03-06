<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:16
 */
class Action_General_Enhance extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "ocr_general_enhance";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/ocr-general_enhance.tpl"
        );
    }
}