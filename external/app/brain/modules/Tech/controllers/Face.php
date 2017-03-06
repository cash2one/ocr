<?php

/**
 * Created by songqingyun@baidu.com.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:54
 */
class Controller_Face extends Ap_Controller_Abstract
{
    public $actions = array(
        'detect' => 'actions/tech/face/Detect.php',
        'search' => 'actions/tech/face/Search.php',
        'compare' => 'actions/tech/face/Compare.php',
    );

}