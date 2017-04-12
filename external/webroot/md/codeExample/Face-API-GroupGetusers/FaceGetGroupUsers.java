/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
package com.baidu.ai.aip.face;

import com.baidu.ai.aip.utils.HttpUtil;

/**
 * 人脸查找——组内用户列表查询
 */
public class GetUsers {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * http://ai.baidu.com/download/demo/java/utils/FileUtil.java
     * http://ai.baidu.com/download/demo/java/utils/Base64Util.java
     * http://ai.baidu.com/download/demo/java/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 人脸查找——组内用户列表查询 url
        String getUsersUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getusers";
        // 请求参数
        // 用户组ID
        String groupId = "test_group_2";
        // 起始编号
        String start = "0";
        // 结束编号
        String end = "100";
        String params = "group_id=" + groupId + "&start=" + start + "&end=" + end;
        try {
            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(getUsersUrl, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
