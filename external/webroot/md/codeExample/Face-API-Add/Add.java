/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
package com.baidu.ai.aip.face;

import com.baidu.ai.aip.utils.Base64Util;
import com.baidu.ai.aip.utils.FileUtil;
import com.baidu.ai.aip.utils.HttpUtil;

import java.net.URLEncoder;

/**
 * 人脸查找——注册
 */
public class Add {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/FileUtil.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/Base64Util.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 人脸查找——注册 url
        String addUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/add";
        // 请求参数
        // 用户ID（用户自定义）
        String uid = "test_user_5";
        // 用户信息（用户自定义）
        String userInfo = "userInfo5";
        // 用户所属组（用户自定义）
        String groupId = "test_group_2";
        // 本地文件路径
        String filePath1 = "#####本地文件路径#####";
        String filePath2 = "#####本地文件路径#####";
        try {
            byte[] imgData1 = FileUtil.readFileByBytes(filePath1);
            byte[] imgData2 = FileUtil.readFileByBytes(filePath2);
            String imgStr1 = Base64Util.encode(imgData1);
            String imgStr2 = Base64Util.encode(imgData2);

            String params = "uid=" + uid + "&user_info=" + userInfo + "&group_id=" + groupId + "&"
                    + URLEncoder.encode("images", "UTF-8") + "=" + URLEncoder.encode(imgStr1 + "," + imgStr2, "UTF-8");
            /**
             * 线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
             */
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(addUrl, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
