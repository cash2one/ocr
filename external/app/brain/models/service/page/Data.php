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
                $filePath = $this->docData->getFilePath($version, $jsonPath);
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $filePath);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $file = curl_exec($ch);
                if (!file_exists($this->odpPath . "/webroot/data/$version/")) {
                    mkdir($this->odpPath . "/webroot/data/$version/");
                }
                file_put_contents($this->odpPath . "/webroot/data/$version/$jsonPath", $file);
                curl_close($ch);
                echo $file;
            }
        } else {
            $filePath = $this->docData->getFilePath($version, $jsonPath);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $filePath);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $file = curl_exec($ch);
            curl_close($ch);
            echo $file;
        }
    }
}