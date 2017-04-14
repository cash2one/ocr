/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
package com.baidu.ai.aip.nlp;

import com.baidu.ai.aip.utils.GsonUtils;
import com.baidu.ai.aip.utils.HttpUtil;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 词向量表示接口
 */
public class WordEmbedding {

    /**
     * 代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * https://ai.baidu.com/file/BA73D199EED14D8AA5FC5A4BF4BDDA34
     * https://ai.baidu.com/file/C8D81F3301E24D2892968F09AE1AD6E2
     * https://ai.baidu.com/file/88C6E86FB5D141889391693FC84504B1
     * 下载
     */
    
    public static void main(String[] args) {
        // 词向量表示url
        String wordEmbeddingUrl = "https://aip.baidubce.com/rpc/2.0/nlp/v1/wordembedding";
        // 输入两个词
        String query1 = "百度";
        String query2 = "谷歌";
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("query1", query1);
            map.put("query2", query2);
            map.put("tid", 1); // 指定算法类型
            // 输入一个词
            // map.put("query1", query1);
            // map.put("tid", 2); //指定算法类型
            String params = GsonUtils.toJson(map);
            params = URLEncoder.encode(params, "GBK");
            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(wordEmbeddingUrl, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
