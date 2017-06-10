<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Compare extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "face_compare";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/face-compare.tpl"
        );
    }
}