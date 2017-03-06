<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Wake extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "speech_wake";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/speech-wake.tpl"
        );
    }
}