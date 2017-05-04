<?php

/**
 * Created by PhpStorm.
 * User: wangyu61
 * Date: 2017/4/19
 * Time: 下午1:27
 */
class Service_Page_Data
{

    private $docData;

    private $odpPath;

    public function __construct()
    {
        $this->docData = new Service_Data_Doc();
        $this->odpPath = Bd_Conf::getAppConf('odp_info/path');
    }

    /**
     *
     */
    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $version = Brain_Util::getParamAsInt($arrInput, 'version');
        $jsonPath = Brain_Util::getParamAsString($arrInput, 'jsonPath');
        $action = Brain_Util::getParamAsString($arrInput, "action");
        if ($action == 'cleanCache') {
            $this->docData->cleanCache();
            Brain_Output::jsonOutput(0, "success");
            return;
        }
        if ($version == '') {
            $version = $_COOKIE['docVersion'];
        }
        header("Content-type:application/json");
        $latestVersion = $this->docData->getLatestVersion();
        if (empty($version)) {
            $version = $latestVersion;
        }
        if ($version <= $latestVersion) {
            setcookie("docVersion", $version, time() - 3600);
            $version = $latestVersion;
            $filePath = $this->odpPath . "/webroot/data/$version/$jsonPath";
            if (file_exists($filePath)) {
                ob_start();
                echo file_get_contents($filePath);
            } else {
                $fileUrl= $this->docData->getFilePath($version, $jsonPath);
                Bd_Log::notice('DATA_FILE_URL_'.$fileUrl);
                $jsonFile = file_get_contents($fileUrl);
                if (!file_exists($this->odpPath . "/webroot/data/$version/")) {
                    mkdir($this->odpPath . "/webroot/data/$version/");
                }
                file_put_contents($this->odpPath . "/webroot/data/$version/$jsonPath", $jsonFile);
                echo $jsonFile;
            }
        } else {
            $fileUrl = $this->docData->getFilePath($version, $jsonPath);
            Bd_Log::notice('DATA_FILE_URL_'.$fileUrl);
            $jsonFile = file_get_contents($fileUrl);
            echo $jsonFile;
        }
    }
}