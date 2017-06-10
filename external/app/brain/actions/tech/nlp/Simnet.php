<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Simnet extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "nlp_simnet";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/nlp-simnet.tpl"
        );
    }
}