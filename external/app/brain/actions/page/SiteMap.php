<?php
/***************************************************************************
 *
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @brief
 *
 **/
class Action_SiteMap extends Ap_Action_Abstract
{

    private $newsPage;


    public function execute()
    {   $this->newsPage = new Service_Page_News();
        $txt = $this->newsPage->execute();
        Brain_Output::txtOutput(
            $txt
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
