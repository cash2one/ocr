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
    const SEC_VISIT_LIMIT = 2;
    const MINUTE_VISIT_LIMIT = 1000;
    const MINUTE_TIME_LIMIT = 600;
    const MAX_IMAGE_LIMIT = 2097152; //2 * 1014 * 1024
    
    public static $arrImageType = array(
        'image/jpeg',
        'image/jpe',
        'image/jpg',
        'image/png',
        'application/x-bmp',
        'image/bmp',
    );

    public static $arrHostWhiteList = array(
        'hiphotos.baidu.com',
        'hiphotos.bdimg.com',
        'imgsrc.baidu.com',
        'imgsrc.bdimg.com',
        'imgtn.bdimg.com',
        '10.57.6.47',
    );
    
    //api list
    /*
    通用文字识别  https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/general
    身份证识别    https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/idcard
    银行卡识别    https://openapi.baidu.com/rest/2.0/vis-ocr/v1/ocr/bankcard
    人脸识别      https://openapi.baidu.com/rest/2.0/vis-faceattribute/v1/faceattribute
    色情识别      https://openapi.baidu.com/rest/2.0/vis-antiporn/v2/antiporn
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
                'max_face_num' => 20,
                'face_fields' => 'age,beauty,expression,faceshape,gender,glasses,landmark,race',
            ),
        ),
        "pornography" => array(
            'url' => 'https://openapi.baidu.com/rest/2.0/vis-antiporn/v2/antiporn',
            'params' => array(),
        ),
        "tts" => array(
            'url' => 'http://tts.baidu.com/text2audio',
            'params' => array(
                'idx' => 1,
                'cuid' => 'baidu_speech_demo',
                'cod' => 2,
                'lan' => 'zh',
                'ctp' => 1,
                'pdt' => 1,
                'pit' => 5,
            ),
        ),
        "wakescore" => array(
            'url' => 'http://yuyin.baidu.com/wake/score',
            'params' => array(),
        ),
        "wakedownload" => array(
            'url' => 'http://yuyin.baidu.com/wake/Download',
            'params' => array(),
        ),
    );
    
    public static $arrYuyinlist = array(
        "tts", 
        "wakescore", 
        "wakedownload",
    );

    
    /**
     * checkVisit 
     * 
     * @param mixed $type 
     * @access public
     * @return void
     */ 
    public static function checkVisit($type) {
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
        /*
        $kNum = $clientIp . '_AIDemo_Visit_Num';
        $minuteVisitNum = max(0, intval(Brain_Memcache::get($kNum)));
        
        $kTime = $clientIp . '_AIDemo_Visit_Time';
        $minuteVisitTime = Brain_Memcache::get($kTime);
        if($minuteVisitTime == null)
        {
            $minuteVisitTime = '0000-00-00 00:00:00';
        }
        
        $beginTime = date("Y-m-d H:i:s", time() - Brain_AIApi::MINUTE_TIME_LIMIT);
        
        if($minuteVisitNum < Brain_AIApi::MINUTE_VISIT_LIMIT)
        {
            Brain_Memcache::set($kNum, $minuteVisitNum + 1, Brain_AIApi::MINUTE_TIME_LIMIT);
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
                
                Brain_Memcache::set($kNum, $minuteVisitNum, Brain_AIApi::MINUTE_TIME_LIMIT);
                Brain_Memcache::set($kTime, $minuteVisitTime, Brain_AIApi::MINUTE_TIME_LIMIT);
            }
            
            //此时$minuteVisitTime>=$beginTime
            if($minuteVisitNum >= Brain_AIApi::MINUTE_VISIT_LIMIT)
            {
                Brain_Memcache::set($kNum, $minuteVisitNum + 1, Brain_AIApi::MINUTE_TIME_LIMIT);
                return false;
            }
            else{
                Brain_Memcache::set($kNum, $minuteVisitNum + 1, Brain_AIApi::MINUTE_TIME_LIMIT);
            } 
        }
        */
        $kVisit = $clientIp . '_AIDemo_Visit_Info';
        $visitList = explode(",", Brain_Memcache::get($kVisit));
        
        $beginTime = date("Y-m-d H:i:s", time() - Brain_AIApi::MINUTE_TIME_LIMIT);
        
        while (count($visitList) > 0 && end($visitList) > $beginTime)
        {
            array_pop($visitList);
        }
        
        array_unshift($visitList, date("Y-m-d H:i:s", time()));
        
        Brain_Memcache::set($kVisit, implode(",", $visitList), Brain_AIApi::MINUTE_TIME_LIMIT);
        if(count($visitList) > Brain_AIApi::MINUTE_VISIT_LIMIT)
        {
            return false;
        }
        else{
            return true;
        }
    } 
    
                
    /**
     * callYuyinApi 
     * 
     * @param mixed $type 
     * @param mixed $image_data 
     * @access public
     * @return void
     */ 
    public static function callYuyinApi($type, $input_data) {

        $url = Brain_AIApi::$arrTypelist[$type]['url'];
        
        $getData = array_merge($input_data, Brain_AIApi::$arrTypelist[$type]['params']);
        //print_r($getData);
        $url .= "?" . http_build_query($getData);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIE, 'BDUSS='.$_COOKIE['BDUSS']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $ret_data = curl_exec($ch);
        $curl_errno = curl_errno($ch); 
        $curl_error = curl_error($ch);
        $content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        curl_close($ch);
        
        $dbApiVisit = new Dao_ApiVisit();
        
        //正确返回
        if($type == 'tts')
        {
            if($content_type == 'audio/mp3')
            {
                $dbApiVisit->insertApiVisit(
                    Bd_Ip::getClientIp(), $type, 0, ''
                );
                //header('Content-Type: audio/mp3');
                //echo $ret_data;

                Brain_Output::jsonOutput(
                    0, 'success', 'data:audio/x-mpeg;base64,'.base64_encode($ret_data)
                );
                
                return true;
            }
        }
        else if($type == 'wakedownload')
        {
            if($content_type == 'application/octet-stream')
            {
                $dbApiVisit->insertApiVisit(
                    Bd_Ip::getClientIp(), $type, 0, ''
                );
                header('Content-Type: application/octet-stream');
                echo $ret_data;
                
                return true;
            }
        }
        else if($type == 'wakescore')
        {
            $result_data = json_decode($ret_data, true);
            if($result_data['result'] == 'success')
            {
                $dbApiVisit->insertApiVisit(
                    Bd_Ip::getClientIp(), $type, 0, ''
                );
                Brain_Output::jsonOutput(
                    0, 'success', $result_data['data']
                );
                
                return true;
            }
        }
        
        //异常返回
        if($ret_data != '')
        {
            //接口错误
            $dbApiVisit->insertApiVisit(
                Bd_Ip::getClientIp(), $type, $curl_errno, $curl_error
            );
            Brain_Output::jsonOutput(
                Brain_Util::getParamAsInt($ret_data, 'err_no', 1), 
                Brain_Util::getParamAsString($ret_data, 'err_msg', 'fail')
            );
        }
        else
        {
            if($type == 'wakedownload' && $curl_errno == CURLE_OK)
            {
                $dbApiVisit->insertApiVisit(
                    Bd_Ip::getClientIp(), $type, 1, 'download count exceeds'
                );

                Brain_Output::jsonOutput(
                    1, 'download count exceeds'
                );
            }
            else
            {
                //http错误
                $dbApiVisit->insertApiVisit(
                    Bd_Ip::getClientIp(), $type, $curl_errno, $curl_error
                );

                Brain_Output::jsonOutput(
                    $curl_errno, $curl_error
                );
            }
        }
  
        return true;
    } 
            
            
    /**
     * callImageApi 
     * 
     * @param mixed $type 
     * @param mixed $image_data 
     * @access public
     * @return void
     */ 
    public static function callImageApi($type, $image_data) {

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
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_COOKIE, 'BDUSS='.$_COOKIE['BDUSS']);
        
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

        @$image_data = file_get_contents(
            $image_url, false, null, 0, Brain_AIApi::MAX_IMAGE_LIMIT
        );
        return base64_encode($image_data);
    }

    /**
     * checkUrlAvailable
     * 
     * @param mixed $url 
     * @access public
     * @return void
     */ 
    public static function checkUrlAvailable($url, $timeout=10) {
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HEADER, false ); 
        curl_setopt($ch, CURLOPT_NOBODY, true ); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true ); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_exec($ch);
        $status = curl_errno($ch);
        curl_close($ch);
        
        return $status == 0 ? true : false;
    } 
 
    /**
     * checkUrl
     * 
     * @param mixed $url 
     * @access public
     * @return void
     */ 
    public static function checkUrl($url) {
        
        $parts = parse_url($url);
        $host = $parts['host'];
        
        $res = filter_var($url, FILTER_VALIDATE_URL);
        if(!$res)
        {
            return false;
        }

        //白名单
        foreach( Brain_AIApi::$arrHostWhiteList as $whiteHost)
        {
            if(stripos($host, $whiteHost) !== false)
            {
                return true;
            }
        }
        
        //允许内网本机
        $serverIp = $_SERVER['SERVER_ADDR'];
        $ip = @gethostbyname($host);

        if($serverIp == $ip)
        {
            return true;
        }
        
        // 单独判断 loopback 127.x.x.x
        $sp = explode('.', $ip);
        if ($sp[0] === '127'){
            return false;
        }
        
        //整体判断是否为外网IP
        $res = filter_var(
            $ip,
            FILTER_VALIDATE_IP,
            FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE |  FILTER_FLAG_NO_RES_RANGE);
        if(!$res)
        {
            return false;
        }
        
        
        return true;
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
    
   
    /**
     * getDataRetryByUrl 
     * 
     * @param mixed $url 
     * @access public
     * @return void
     */ 
    public static function getDataRetryByUrl($url) {

        if(strripos($url, 'https://cloudtest.baidu.com') === 0 
            || strripos($url, 'https://cloud.baidu.com') === 0)
        {
            if (strripos($url, 'demo-card-') !== false)
            {
                $url = substr($url, strlen('https://cloud.baidu.com'));
                $url = 'http://ai.baidu.com/index'.$url;
                //$url = 'http://cp01-yf-db-02.epc.baidu.com:8033'.$url;
            }
        }

        $orignal_url = $url;

        $k = md5('image_info_'.$orignal_url);
        $ret_data = Brain_Memcache::get($k);

        //命中缓存
        if(!empty($ret_data))
        {
            return json_decode($ret_data, true);
        }
        
        $ret_data = array();
        $ret_data['errno'] = 0;
        $ret_data['msg'] = 'success';
        $ret_data['data'] = array(
            'Content-Type' => null, 
            'Content-Length' => 0,
            'image_data' => '', 
        );

        $isUrlValid = Brain_AIApi::checkUrl($url);
        if(!$isUrlValid)
        {
            $ret_data['errno'] = 108;
            $ret_data['msg'] = 'url is not valid';
            return $ret_data;
        }

        $isUrlAvailable = Brain_AIApi::checkUrlAvailable($url, 1);

        if(!$isUrlAvailable && strripos($url, 'https') === 0)
        {
            $url = 'http'.substr($url, 5);
            $isUrlAvailable = Brain_AIApi::checkUrlAvailable($url, 3);
        }

        if(!$isUrlAvailable)
        {
            //Brain_Memcache::set($k, json_encode($ret_data, JSON_UNESCAPED_UNICODE), 60);
            return $ret_data;
        }

        $image_header = Brain_AIApi::getHeaderByUrl($url);

        if(!empty($image_header))
        {
            $ret_data['data']['Content-Type'] = $image_header['Content-Type'];
            $ret_data['data']['Content-Length'] = max(0, intval($image_header['Content-Length']));

            if( $image_header['Content-Length'] <= Brain_AIApi::MAX_IMAGE_LIMIT &&
                in_array($image_header['Content-Type'], Brain_AIApi::$arrImageType))
            {
                $image_data = Brain_AIApi::getImageByUrl($url);

                $ret_data['data']['image_data'] = 'data:'.$image_header['Content-Type'].';base64,'.$image_data;
            }

        }

        Brain_Memcache::set($k, json_encode($ret_data, JSON_UNESCAPED_UNICODE), 60);
        return $ret_data;
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
