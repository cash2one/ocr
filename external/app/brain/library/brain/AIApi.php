<?php
/**
 * @file AIApi.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Brain_AIApi {
    
    //访问限制
    const SEC_VISIT_LIMIT = 1;
    const MINUTE_VISIT_LIMIT = 500;
    const MAX_IMAGE_LIMIT = 2097152; //2 * 1014 * 1024
    
    //api list
    /*
    通用文字识别  https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/general
    身份证识别    https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/idcard
    银行卡识别    https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/bankcard
    人脸识别      https://openapi.baidu.com/rest/2.0/vis-faceattribute/v1/faceattribute
    色情识别      https://openapi.baidu.com/rest/2.0/vis-antiporn/v1/antiporn
    */

    public static $arrTypelist = array(
        "commontext" => array(
            'url' => 'https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/general',
            'params' => array(
                'detect_direction' => 'true',
            ),
        ),
        "idcard" => array(
            'url' => 'https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/idcard',
            'params' => array(
                'id_card_side' => 'front',
                'detect_direction' => 'true',
            ),
        ),
        "bankcard" => array(
            'url' => 'https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/bankcard',
            'params' => array(),
        ),
        "face" => array(
            'url' => 'https://openapi.baidu.com/rest/2.0/vis-faceattribute/v1/faceattribute',
            'params' => array(
                'max_face_num' => 5,
                'face_fields' => 'age, beauty, expression, faceshape, gender, glasses, landmark, race, qualities',
            ),
        ),
        "pornography" => array(
            'url' => 'https://openapi.baidu.com/rest/2.0/vis-antiporn/v1/antiporn',
            'params' => array(),
        ),
    );

    
    /**
     * checkVisit 
     * 
     * @param mixed $demoType 
     * @access public
     * @return void
     */ 
    public static function checkVisit($demoType) {
        $clientIp = Bd_Ip::getClientIp();
        
        //单秒访问频次检查
        $k = $clientIp . '_AIDemo_' . $type;
        $secVisitNum = max(0, intval(Brain_Memcache::get($k)));
        if($secVisitNum >= Brain_AIApi::SEC_VISIT_LIMIT)
        {
            return false;
        }
        else
        {
            Brain_Memcache::set($k, $secVisitNum + 1, 1);
        }
        
        //十分钟访问频次检查
        $kNum = $clientIp . '_AIDemo_Visit_Num';
        $minuteVisitNum = max(0, intval(Brain_Memcache::get($kNum)));
        
        $kTime = $clientIp . '_AIDemo_Visit_Time';
        $minuteVisitTime = Brain_Memcache::get($kTime);
        if($minuteVisitTime == null)
        {
            $minuteVisitTime = '0000-00-00 00:00:00';
        }
        
        $beginTime = date("Y-m-d H:i:s", time() - 10 * 60);
        
        if($minuteVisitNum < Brain_AIApi::MINUTE_VISIT_LIMIT)
        {
            Brain_Memcache::set($kNum, $minuteVisitNum + 1, 10 * 60);
        } 
        else{
            //时间窗口过期，需更新数据
            if($minuteVisitTime < $beginTime)
            {
                //更新访问次数
                $dbApiVisit = new Dao_ApiVisit();
                $visitInfo = $dbApiVisit->getVisitInfo($clientIp, $beginTime);
                $minuteVisitNum = $visitInfo['visitCount'];
                $minuteVisitTime = $visitInfo['VisitTime'];
                
                if($minuteVisitTime == null)
                {
                    $minuteVisitTime = date("Y-m-d H:i:s", time());
                }
                
                Brain_Memcache::set($kNum, $minuteVisitNum, 10 * 60);
                Brain_Memcache::set($kTime, $minuteVisitTime, 10 * 60);
            }
            
            //此时$minuteVisitTime>=$beginTime
            if($minuteVisitNum >= Brain_AIApi::MINUTE_VISIT_LIMIT)
            {
                Brain_Memcache::set($kNum, $minuteVisitNum + 1, 10 * 60);
                return false;
            }
            else{
                Brain_Memcache::set($kNum, $minuteVisitNum + 1, 10 * 60);
            } 
        }
        
        return true;
    } 
            
    /**
     * callApi 
     * 
     * @param mixed $type 
     * @param mixed $image_data 
     * @access public
     * @return void
     */ 
    public static function callApi($type, $image_data) {

        $url = Brain_AIApi::$arrTypelist[$type]['url'];
        
        $postData = array(
            'access_token' => Brain_Token::getToken(),
            'image' => $image_data,
        );
        $postData = array_merge($postData, Brain_AIApi::$arrTypelist[$type]['params']);
        //print_r($postData);
        
        $ret_data = Brain_AIApi::doCallApi($url, $postData);
        
        if($ret_data == null)
        {
            return array(
                'errno' => 1,
                'msg' => 'interface error: no return value',
            );
        }
        
        $dbApiVisit = new Dao_ApiVisit();
        $dbApiVisit->insertApiVisit(
            Bd_Ip::getClientIp(),
            $type, 
            Brain_Util::getParamAsInt($ret_data, 'error_code', 0),
            Brain_Util::getParamAsString($ret_data, 'error_msg', ''),
            Brain_Util::getParamAsInt($ret_data, 'log_id', 0)
        );
        
        $result = array(
            'errno' => Brain_Util::getParamAsInt($ret_data, 'error_code', 0),
            'msg' => Brain_Util::getParamAsString($ret_data, 'error_msg', 'success'),
            'data' => '',
        );
        if(!array_key_exists('error_code', $ret_data))
        {
            unset($ret_data['log_id']);
            $result['data'] = $ret_data;
        }
        
        return $result;
    } 
            
    /**
     * doCallApi 
     * 
     * @param mixed $url 
     * @param mixed $postData 
     * @access public
     * @return void
     */ 
    public static function doCallApi($url, $postData) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        
        $header = array(
            'Host: openapi.baidu.com',
        );
        //curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        
        $output = curl_exec($ch);

        $curl_errno = curl_errno($ch); 
        $curl_error = curl_error($ch);
        //$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        //$code = curl_getinfo($ch, CURLINFO_HTTP_CODE); 

        curl_close($ch);

        if($curl_errno > 0){ 
            return array(
                'error_code' => $curl_errno,
                'error_msg' => $curl_error,
            );
        }

        return json_decode($output, true);
    } 

    /**
     * getImageByUrl 
     * 
     * @param mixed $image_url 
     * @access public
     * @return void
     */ 
    public static function getImageByUrl($image_url) {
        $image_data = file_get_contents(
            $image_url, false, null, 0, Brain_AIApi::MAX_IMAGE_LIMIT);
            
        $image_base64_data = base64_encode($image_data);
        
        return $image_base64_data;
    }

    /**
     * getHeaderByUrl 
     * 
     * @param mixed $url 
     * @access public
     * @return void
     */ 
    public static function getHeaderByUrl($url) {
        $header_data = get_headers($url, 1);
        
        return $header_data;
    } 
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
