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
class Action_SiteMap extends Ap_Action_Abstract {

    public function execute() {
        $siteMapConf =Bd_Conf::getConf("/sitemap/site_map_page");
var_dump($siteMapConf);
        Brain_Output::txtOutput(
            $siteMapConf
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
