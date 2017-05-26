<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Word_Emb_Sim extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "nlp_word_emb_sim";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/nlp-word_emb_sim.tpl"
        );
    }
}