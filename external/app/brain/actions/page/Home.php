<?php
/***************************************************************************
 *
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Home.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/13 16:06:59
 * @brief
 *
 **/
class Action_Home extends Ap_Action_Abstract
{

    private $homePage;

    function __construct()
    {
        $this->homePage = new Service_Page_Home();
    }

    public function execute()
    {
        $this->homePage->execute();
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
