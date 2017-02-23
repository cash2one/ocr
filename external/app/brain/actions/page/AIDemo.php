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

        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        
        $demoType = strtolower(Brain_Util::getParamAsString($arrInput, 'type', 'other'));
        $strAction = Brain_Util::getParamAsString($arrInput, 'action', 'api');
            
        //访问频次检查
        if(Brain_AIApi::checkVisit($demoType) == false)
        {
            Brain_Output::jsonOutput(102, '请求Demo过于频繁');
            return;
        }
            
        if($strAction == 'api')
        {
            /* 
             * 1. 参数检查 
             * */
            
            if (!array_key_exists($demoType, Brain_AIApi::$arrTypelist)) {
                Brain_Output::jsonOutput(101, '请求Demo类型错误');
                return false;
            }
            
            if(in_array($demoType, Brain_AIApi::$arrYuyinlist))
            {
                //语音接口
                $demoType = Brain_Util::getParamAsString($arrInput, 'type', '');
                
                $input_data = array();
                if($demoType == 'tts')
                {
                    $input_data['spd'] = Brain_Util::getParamAsInt($arrInput, 'speed', 1);
                    $input_data['vol'] = Brain_Util::getParamAsInt($arrInput, 'vol', 1);
                    $input_data['per'] = Brain_Util::getParamAsInt($arrInput, 'person', 0);
                    $input_data['tex'] = addslashes(Brain_Util::getParamAsString($arrInput, 'text', ''));
                }
                else{
                    $input_data['kw'] = addslashes(Brain_Util::getParamAsString($arrInput, 'kw', ''));
                    $input_data['t'] = time() . '000';
                }
                
                $ret_data = Brain_AIApi::callYuyinApi($demoType, $input_data);
                return;
            }
            else{
                //图像接口
                
                $imageUrl = Brain_Util::getParamAsString($arrInput, 'image_url', '');
                $image = Brain_Util::getParamAsString($arrInput, 'image', '');
                
                $filter_image = '';
                if($imageUrl == '' && $image == ''){
                    Brain_Output::jsonOutput(103, '请上传图片或图片URL');
                    return;
                }
                else if($imageUrl != '')
                {
                    if (!filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                        Brain_Output::jsonOutput(104, '图片地址格式错误');
                        return;
                    } 

                    $ret_data = Brain_AIApi::getDataRetryByUrl($imageUrl);
                    if($ret_data['errno'] !== 0){
                        Brain_Output::jsonOutput($ret_data['errno'], $ret_data['msg']);
                        return;
                    }
                    if($ret_data['data']['Content-Length'] > Brain_AIApi::MAX_IMAGE_LIMIT)
                    {
                        Brain_Output::jsonOutput(105, '图片超过大小限制');
                        return;
                    }
                    
                    if(!in_array($ret_data['data']['Content-Type'], Brain_AIApi::$arrImageType))
                    {
                        Brain_Output::jsonOutput(106, '图片类型错误（支持jpg、png、bmp格式）');
                        return;
                    }
                    
                    $filter_image = substr(
                        $ret_data['data']['image_data'], 
                        stripos($ret_data['data']['image_data'], ',') + 1
                    );
                }
                else if($image != '')
                {
                    $image_type = substr(
                        $image, stripos($image, ':') + 1, stripos($image, ';') - stripos($image, ':') - 1
                    );
                    
                    if(!in_array($image_type, Brain_AIApi::$arrImageType))
                    {
                        Brain_Output::jsonOutput(106, '图片类型错误（支持jpg、png、bmp格式）');
                        return;
                    }
                    
                    if(strlen($image) > ceil(Brain_AIApi::MAX_IMAGE_LIMIT / 3) * 4)
                    {
                        Brain_Output::jsonOutput(105, '图片超过大小限制');
                        return;
                    }
                    //限制图片大小为2M，base64编码后大小为[n/3]*4, []代表上取整
                    $filter_image = substr(
                        $image, stripos($image, ',') + 1, 
                        ceil(Brain_AIApi::MAX_IMAGE_LIMIT / 3) * 4
                    );
                }
                
                if ($filter_image == '') {
                    Brain_Output::jsonOutput(107, '获取图片失败');
                    return;
                } 
                
                /* 
                 * 2. 逻辑处理 
                 * */
                $ret_data = Brain_AIApi::callImageApi($demoType, $filter_image);
                
                Brain_Output::jsonOutput($ret_data['errno'], $ret_data['msg'], $ret_data['data']);
                return;
            }
        }
        else if($strAction == 'getHeader')
        {
            $imageUrl = Brain_Util::getParamAsString($arrInput, 'image_url', '');
            if($imageUrl != '' && filter_var($imageUrl, FILTER_VALIDATE_URL)){
                
                $ret_data = Brain_AIApi::getDataRetryByUrl($imageUrl);

                Brain_Output::jsonOutput($ret_data['errno'], $ret_data['msg'], $ret_data['data']);
                return;
            }
            else
            {
                Brain_Output::jsonOutput(104, '图片地址格式错误');
                return;
            }
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
