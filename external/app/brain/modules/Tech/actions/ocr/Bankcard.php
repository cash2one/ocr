<?php
/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:58
 */
class Action_BankCard extends Ap_Action_Abstract {

    public function execute() {
        Bd_log::addNotice("BackCard");
            $arrPageInfo['page'] = "ocr-bankcard";
            Brain_Output::htmlOutput(
                $arrPageInfo,
                "brain/platform/technology/ocr-bankcard.tpl"
            );
    }
}
