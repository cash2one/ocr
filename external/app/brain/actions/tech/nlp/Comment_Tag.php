<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Comment_Tag extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "nlp_comment_tag";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/nlp-comment_tag.tpl"
        );
    }
}