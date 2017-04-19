<?php
/***************************************************************************
 *
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file Download.php
 * @author wangyu61(wangyu61@baidu.com)
 * @date 2017/04/06 14:28:45
 *
 **/
class Action_Download extends Ap_Action_Abstract
{

    public function execute()
    {
        $page = new Service_Page_Download();
        $page->execute();
        return;
    }
}
