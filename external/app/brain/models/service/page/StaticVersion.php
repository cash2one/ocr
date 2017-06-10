<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/17
 * Time: 下午10:00
 */
class Service_Page_StaticVersion
{


    public function __construct()
    {
    }

    /**
     *
     */
    public function execute()
    {
        $odpDir = Bd_Conf::getAppConf('odp_info/path');
        $versionContent = json_decode(file_get_contents($odpDir."/webroot/version.json"), true);
        $feVersion = $versionContent['currentVersion']['timeStamp'];
        Brain_Output::jsonOutput(0,"success",$feVersion);
    }

}