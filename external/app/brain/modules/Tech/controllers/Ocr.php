<?php

/**
 * Created by songqingyun@baidu.com.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:54
 */
class Controller_Ocr extends Ap_Controller_Abstract
{
    public $actions = array(

        'bankcard' => 'actions/ocr/Bankcard.php',
        'general' => 'actions/ocr/General.php',
        'idcard' => 'actions/ocr/IdCard.php',
        'general_enhanced' => 'actions/ocr/GeneralEnhanced.php',
    );

}