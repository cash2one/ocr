<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/6
 * Time: 下午3:09
 */
class Action_Sentiment_Classify extends Ap_Action_Abstract{
    public function execute(){
        $arrPageInfo['page'] = "nlp_sentiment_classify";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/nlp-sentiment_classify.tpl"
        );
    }
}