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
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];

        $class_name = substr(strtolower(__CLASS__), strlen('action_'));
        $techList = array('bankcard', 'general', 'idcard', 'general_enhanced');

        $inputKeys = array_keys($arrInput);
        $tech = $inputKeys[0];
        if (in_array($tech, $techList)){
            $arrPageInfo['page'] = substr(strtolower(__CLASS__), 7).'_'.$tech;
            Brain_Output::htmlOutput(
                $arrPageInfo,
                "brain/platform/technology/$class_name-$tech.tpl"
            );
        }
    }
}
