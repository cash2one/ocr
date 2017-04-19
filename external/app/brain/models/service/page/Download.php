<?php

/**
 * Created by PhpStorm.
 * User: songqingyun
 * Date: 2017/4/19
 * Time: 下午1:27
 */
class Service_Page_Download
{

    private $sdkData;

    public function __construct()
    {
        $this->sdkData = new Service_Data_Sdk();
    }

    /**
     *
     */
    public function execute()
    {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $sdkId = Brain_Util::getParamAsInt($arrInput, 'sdkId');
        if ($sdkId < 0) {
            header("Location: /error");
            return;
        }
        $sdk = $this->sdkData->getSdkById($sdkId);

        if (empty($sdk)) {
            header("Location: /error");
            return;
        }
        $passId = '';
        $ucId = '';
        $serviceType = -1;
        $language = -1;
        $userInfo = Brain_User::getUserInfo();
        if ($userInfo && !empty($userInfo)) {
            if ($userInfo['type'] == 1) {
                $passId = $userInfo['uid'];
            } elseif ($userInfo['type'] == 2) {
                $ucId = $userInfo['uid'];
            }
        }

        $serviceType = $this->getSdkLogCat($sdk);
        $language = $this->getSdkLogLan($sdk);
        if ($serviceType != -1 && $language != -1 && http_response_code() != 302 && !isset($arrInput["castk"])) {
            $dbSdkInfo = new Dao_SdkInfo();
            $dbSdkInfo->insertSdkInfo($ucId, $passId, $serviceType, $language);
        }
        header("Location: " + $sdk['filePath']);
    }

    /**
     * TODO: 临时方案
     * sdk的category和 sdk log的分类关系映射
     * @param $sdk
     * @return
     */
    private function getSdkLogCat($sdk)
    {
        $catId = (int)$sdk['category'];
        return $catId - 1;
    }

    /**
     * TODO: 临时方案
     * sdk的category和 sdk log的分类关系映射
     * @param $sdk
     * @return
     */
    private function getSdkLogLan($sdk)
    {
        $lanId = (int)$sdk['language'];
        return $lanId - 1;
    }
}