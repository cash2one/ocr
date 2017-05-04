<?php
/***************************************************************************
 *
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * @file File.php
 * @author songqingyun(songqingyun@baidu.com)
 * @date 2017/04/05 15:48:45
 *
 **/
include("BaiduBce.phar");
use BaiduBce\Util\Time;
use BaiduBce\Services\Bos\BosClient;

class Action_File extends Ap_Action_Abstract
{

    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $filePath = Brain_Util::getParamAsString($arrInput, 'filePath');
        $fileDao = new Dao_MFile();
        $files = $fileDao->getFile($filePath);
        if (empty($files)) {
            header("Location: /error");
            return;
        }

        $file = $files[0];

        $BOS_CONFIG =
            array(
                'credentials' => array(
                    'ak' => 'f86a2044998643b5abc89b59158bad6d',
                    'sk' => '2ed913d114e042059031af493287cc03',
                ),
                'endpoint' => 'http://bj.bcebos.com',
            );
        $client = new BosClient($BOS_CONFIG);
        // 图片
        if ($file['type'] == 1) {
            header("Cache-Control: public");
            header("Pragma: cache");
            $offset = 30 * 60 * 60 * 24; // cache 1 month
            $ExpStr = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
            header($ExpStr);
            header("Content-Type:" . $file['content_type'] . ";");
            $str = $client->getObjectAsString("aip-web", $filePath);
            echo $str;
            exit;
        } else {
            $str = $client->getObjectAsString("aip-web", $filePath);
            header("Content-type:  application/octet-stream ");
            header("Accept-Ranges:  bytes ");
            header("Accept-Length: " . $file['size']);
            header("Content-Disposition:  attachment;  filename=" . $file['name']);
            echo $str;
            return;
        }

    }
}