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
        $siteMapConf =Bd_Conf::getConf('/sitemap/');
       // var_dump($siteMapConf['url']);
        $txt = '';
        foreach ($siteMapConf['url'] as $url)
        {
            $txt .= $url ."/n";
        }
        Brain_Output::txtOutput(
            $txt
        );
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
