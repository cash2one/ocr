<?php

/**
 * Created by songqingyun@baidu.com.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:54
 */
class Controller_Speech extends Ap_Controller_Abstract
{
    public $actions = array(
        'index' => 'actions/tech/speech/Index.php',
        'asr' => 'actions/tech/speech/Asr.php',
        'tts' => 'actions/tech/speech/Tts.php',
        'wake' => 'actions/tech/speech/Wake.php',
    );

}