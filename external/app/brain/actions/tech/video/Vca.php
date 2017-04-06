<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:16
 */
class Action_Vca extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "video_vca";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/video-vca.tpl"
        );
    }
}