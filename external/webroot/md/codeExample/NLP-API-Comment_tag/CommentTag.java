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
 * 评论观点抽取
 */
public class CommentTag {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * http://ai.baidu.com/download/demo/java/utils/FileUtil.java
     * http://ai.baidu.com/download/demo/java/utils/Base64Util.java
     * http://ai.baidu.com/download/demo/java/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 评论观点抽取url
        String comment_tag_Url = "https://aip.baidubce.com/rpc/2.0/nlp/v1/comment_tag";
        String comment = "个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错";
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("comment", comment); // 评论内容
            map.put("entity", "NULL"); // 实体名，当前取值为NULL，暂时不生效
            map.put("type", "10"); // 类别
            String params = GsonUtils.toJson(map);
            params = URLEncoder.encode(params, "GBK");
            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(comment_tag_Url, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
