/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
package com.baidu.ai.aip.face;

import com.baidu.ai.aip.utils.HttpUtil;

/**
 * 人脸查找——组列表查询
 */
public class GetList {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/FileUtil.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/Base64Util.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 人脸查找——组列表查询 url
        String getListUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getlist";
        // 请求参数
        // 起始编号
        String start = "0";
        // 结束编号
        String end = "100";
        String params = "start=" + start + "&end=" + end;
        try {
            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(getListUrl, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
