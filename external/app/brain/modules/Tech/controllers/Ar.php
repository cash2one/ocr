<?php

/**
 * Created by songqingyun@baidu.com.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:54
 */
class Controller_Ar extends Ap_Controller_Abstract
{
    public $actions = array(

        '' => 'actions/tech/ar/Ar.php',
    );

    public function indexAction(){
        $arrPageInfo['page'] = "ar";
        Brain_Output::htmlOutput(
            $arrPageInfo,
            "brain/platform/technology/ar.tpl"
        );
    }

}