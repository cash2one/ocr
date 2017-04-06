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

	$url = 'https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getusers?access_token=24.a1ff1c9e242129e0e88e506dfc223454.2592000.1492586050.282335-9395294';
    $bodys = "{\"group_id\":\"gid\",\"uid\":\"test_uid\"}";
    
    $res = request_post($url, $bodys);

    var_dump($res);
