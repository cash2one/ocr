<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file AIDemo.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/12/13 14:33:00
 * @brief 
 *  
 **/

class Action_AIDemo extends Ap_Action_Abstract {

    /**
     * execute 
     * 
     * @access public
     * @return void
     */
    public function execute() {
        //print_r(Brain_AIApi::callApi('face', Brain_AIApi::getImageByUrl('http://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/face/demo-pic6.jpg')));
        //print_r(Brain_AIApi::callApi('commontext', Brain_AIApi::getImageByUrl('http://www.bz55.com/uploads/allimg/150514/140-150514154428.jpg')));
        //print_r(Brain_AIApi::callApi('idcard', Brain_AIApi::getImageByUrl('http://www.sznews.com/ent/images/attachement/jpg/site3/20141011/4437e629783815a2bce253.jpg')));
        //print_r(Brain_AIApi::callApi('bankcard', Brain_AIApi::getImageByUrl('http://b.hiphotos.baidu.com/zhidao/pic/item/d058ccbf6c81800a187419d0b43533fa838b475e.jpg')));
        //print_r(Brain_AIApi::callApi('pornography', Brain_AIApi::getImageByUrl('http://www.sznews.com/ent/images/attachement/jpg/site3/20140123/001e4f9d7bf9144b139712.jpg')));
        //return

        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        
        $demoType = Brain_Util::getParamAsString($arrInput, 'type', '');
        $imageUrl = Brain_Util::getParamAsString($arrInput, 'image_url', '');
        $image = Brain_Util::getParamAsString($arrInput, 'image', '');
        $strAction = Brain_Util::getParamAsString($arrInput, 'action', 'api');
        
        if($strAction == 'api')
        {
            /* 
             * 1. 参数检查 
             * */
            
            if (!array_key_exists($demoType, Brain_AIApi::$arrTypelist)) {
                Brain_Output::jsonOutput(1, '请求Demo类型错误');
                return false;
            }
            
            //访问频次检查
            if(Brain_AIApi::checkVisit($demoType) == false)
            {
                Brain_Output::jsonOutput(1, '请求Demo过于频繁');
                return;
            }
            
            $filter_image = '';
            if($imageUrl == '' && $image == ''){
                Brain_Output::jsonOutput(1, '请上传图片或图片URL');
                return;
            }
            else if($imageUrl != '')
            {
                if (!filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                    Brain_Output::jsonOutput(1, '图片地址格式错误');
                    return;
                } 
                
                $image_header = Brain_AIApi::getHeaderByUrl($imageUrl);
                if($image_header['Content-Length'] > Brain_AIApi::MAX_IMAGE_LIMIT)
                {
                    Brain_Output::jsonOutput(1, '图片超过大小限制');
                    return;
                }
                
                if(!in_array($image_header['Content-Type'], Brain_AIApi::$arrImageType))
                {
                    Brain_Output::jsonOutput(1, '图片类型错误（支持jpg、png、bmp格式）');
                    return;
                }
                
                $filter_image = Brain_AIApi::getImageByUrl($imageUrl);
            }
            else if($image != '')
            {
                $image_type = substr(
                    $image, stripos($image, ':') + 1, stripos($image, ';') - stripos($image, ':') - 1
                );
                
                if(!in_array($image_type, Brain_AIApi::$arrImageType))
                {
                    Brain_Output::jsonOutput(1, '图片类型错误（支持jpg、png、bmp格式）');
                    return;
                }
                
                if(strlen($image) > ceil(Brain_AIApi::MAX_IMAGE_LIMIT / 3) * 4)
                {
                    Brain_Output::jsonOutput(1, '图片超过大小限制');
                    return;
                }
                //限制图片大小为2M，base64编码后大小为[n/3]*4, []代表上取整
                $filter_image = substr(
                    $image, stripos($image, ',') + 1, 
                    ceil(Brain_AIApi::MAX_IMAGE_LIMIT / 3) * 4
                );
            }
            
            if ($filter_image == '') {
                Brain_Output::jsonOutput(1, '获取图片失败');
                return;
            } 
            
            /* 
             * 2. 逻辑处理 
             * */
            $ret_data = Brain_AIApi::callApi($demoType, $filter_image);
            
            Brain_Output::jsonOutput($ret_data['errno'], $ret_data['msg'], $ret_data['data']);
        }
        else if($strAction == 'getHeader')
        {
            if($imageUrl != '' && filter_var($imageUrl, FILTER_VALIDATE_URL)){
                
                $result = Brain_AIApi::getHeaderByUrl($imageUrl);
                
                $ret_data = array(
                    'Content-Type' => $result['Content-Type'],
                    'Content-Length' => $result['Content-Length'],
                );
                
                Brain_Output::jsonOutput(0, 'success', $ret_data);
                return;
            }
            else
            {
                Brain_Output::jsonOutput(1, '图片url格式错误');
                return;
            }
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
