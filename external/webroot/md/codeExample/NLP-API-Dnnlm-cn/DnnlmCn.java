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
 * 中文DNN语言模型
 */
public class DnnlmCn {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * http://ai.baidu.com/download/demo/java/utils/FileUtil.java
     * http://ai.baidu.com/download/demo/java/utils/Base64Util.java
     * http://ai.baidu.com/download/demo/java/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 中文DNN语言模型url
        String dnnlm_cn_Url = "https://aip.baidubce.com/rpc/2.0/nlp/v1/dnnlm_cn";
        String input_sequence = "百度是个搜索公司";
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("input_sequence", input_sequence);
            String params = GsonUtils.toJson(map);
            params = URLEncoder.encode(params, "GBK");
            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(dnnlm_cn_Url, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
