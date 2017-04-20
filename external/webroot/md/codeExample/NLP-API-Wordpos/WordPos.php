<?php
function request_post($url = '', $param = '') {
        if (empty($url) || empty($param)) {
            return false;
        }
        
        $postUrl = $url;
        $curlPost = $param;
        $curl = curl_init();//初始化curl
        curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
        curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $data = curl_exec($curl);//运行curl
        curl_close($curl);
        
        return $data;
    }

	$url = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/wordpos?access_token=24.bb41cb1bd46dd44b9c801b10ce010240.2592000.1492322377.282335-9252280';
    $bodys = "{\"query\":\"你好百度\"}";
    
    $res = request_post($url, $bodys);

    var_dump($res);
?>