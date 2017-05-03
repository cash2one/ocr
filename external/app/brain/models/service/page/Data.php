<?php

/**
 * Created by PhpStorm.
 * User: wangyu61
 * Date: 2017/4/19
 * Time: 下午1:27
 */
class Service_Page_Data
{

    private $doc;

    public function __construct()
    {
        $this->doc = new Service_Data_Doc();
    }

    /**
     *
     */
    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $version = Brain_Util::getParamAsInt($arrInput, 'version');
        $jsonPath = Brain_Util::getParamAsInt($arrInput, 'jsonPath');
        if ($version == '' && !empty($_COOKIE['docVersion'])) {
            $version = $_COOKIE['docVersion'];
        } else {
            setcookie("docVersion", $version, time() + 365 * 24 * 3600);
        }

        if ($version == '') {
            header("Location: /error");
            return;
        }

        $latestVersion = $this->doc->getLatestVersion();
        Brain_Memcache::set("latestVersion", $latestVersion, 24 * 3600);

        if ($version < $latestVersion) {
            setcookie("docVersion", '');
            $version = $latestVersion;
            $filePath = "webroot/data/${version}/${jsonPath}.json";
            $fileName = $jsonPath . ".json";
            if (file_exists($filePath)) {
                ob_start();
                $size = filesize($filePath);
                header("Content-type:  application/octet-stream ");
                header("Accept-Ranges:  bytes ");
                header("Accept-Length: " . $size);
                header("Content-Disposition:  attachment;  filename=" . $fileName);
                echo file_get_contents($filePath);
                readfile($filePath);
            } else {
                $filePath = $this->doc->getFilePath($version, $jsonPath);
                $ch = curl_init($filePath);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                echo file_put_contents("webroot/data/${version}/${jsonPath}.json", curl_exec($ch));
                curl_close($ch);
            }
        } else {
            $filePath = $this->doc->getFilePath($version, $jsonPath);
            $ch = curl_init($filePath);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            echo file_get_contents(curl_exec($ch));
            curl_close($ch);
        }
    }
}