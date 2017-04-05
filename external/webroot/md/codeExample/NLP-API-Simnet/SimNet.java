/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
package com.baidu.ai.aip.nlp;

import com.baidu.ai.aip.utils.GsonUtils;
import com.baidu.ai.aip.utils.HttpUtil;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 短文本相似度
 */
public class SimNet {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/FileUtil.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/Base64Util.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 短文本相似度url
        String simNetUrl = "https://aip.baidubce.com/rpc/2.0/nlp/v1/simnet";
        try {
            String shortText1 = "你好百度";
            Map<String, Object> qslots_params = new HashMap<String, Object>();
            qslots_params.put("terms_sequence", shortText1);
            qslots_params.put("type", 0);
            qslots_params.put("items", new ArrayList());
            List<Object> qslots = new ArrayList<Object>();
            qslots.add(qslots_params);

            String shortText2 = "你好世界";
            Map<String, Object> tslots_params = new HashMap<String, Object>();
            tslots_params.put("terms_sequence", shortText2);
            tslots_params.put("type", 0);
            tslots_params.put("items", new ArrayList());
            List<Object> tslots = new ArrayList<Object>();
            tslots.add(tslots_params);

            Map<String, Object> input = new HashMap<String, Object>();
            input.put("qslots", qslots);
            input.put("tslots", tslots);
            input.put("type", 0);

            Map<String, Object> map = new HashMap<String, Object>();
            map.put("input", input);

            String params = GsonUtils.toJson(map);
            params = URLEncoder.encode(params, "GBK");

            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(simNetUrl, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
