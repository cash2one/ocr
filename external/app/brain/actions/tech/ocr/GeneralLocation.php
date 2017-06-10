<?php
/**
 * Created by PhpStorm.
 * User: yanglong01
 * Date: 2017/3/28
 * Time: 下午3:16
 */
class Action_General_Location extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "ocr_general_location";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/ocr-general_location.tpl"
        );
    }
}
