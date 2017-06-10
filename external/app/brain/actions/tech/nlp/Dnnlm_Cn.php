<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Dnnlm_Cn extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "nlp_dnnlm_cn";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/nlp-dnnlm_cn.tpl"
        );
    }
}