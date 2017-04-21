<?php
/***************************************************************************
 *
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Sdk.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/06/18 18:48:45
 * @brief
 *
 **/
class Action_Sdk extends Ap_Action_Abstract
{

    public function execute()
    {
        $page = new Service_Page_Sdk();
        $page->execute();
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
