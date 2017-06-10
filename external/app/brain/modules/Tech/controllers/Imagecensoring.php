<?php
/**
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/**
 * Created by songqingyun@baidu.com.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:54
 */
class Controller_Imagecensoring extends Ap_Controller_Abstract
{
    public $actions = array(

        'antiporn' => 'actions/tech/imagecensoring/Antiporn.php',
        'antiterror' => 'actions/tech/imagecensoring/Antiterror.php',
    );

}