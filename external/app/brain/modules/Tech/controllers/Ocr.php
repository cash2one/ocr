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

        'bankcard' => 'actions/tech/ocr/BankCard.php',
        'general' => 'actions/tech/ocr/General.php',
        'idcard' => 'actions/tech/ocr/IdCard.php',
        'general_enhanced' => 'actions/tech/ocr/GeneralEnhanced.php',
    );

}