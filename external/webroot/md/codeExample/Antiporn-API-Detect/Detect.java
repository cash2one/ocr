/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */
package com.baidu.ai.aip.antiporn;

import com.baidu.ai.aip.utils.Base64Util;
import com.baidu.ai.aip.utils.FileUtil;
import com.baidu.ai.aip.utils.HttpUtil;

import java.net.URLEncoder;

/**
 * 黄反识别服务
 */
public class Detect {

    /**
     * 重要提示代码中所需工具类
     * FileUtil,Base64Util,HttpUtil请从
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/FileUtil.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/Base64Util.java
     * https://github.com/Baidu-AIP/Demo/blob/master/java/com/baidu/ai/aip/utils/HttpUtil.java
     * 下载
     */
    public static void main(String[] args) {
        // 黄反识别url
        String detectUrl = "https://aip.baidubce.com/rest/2.0/antiporn/v1/detect";
        // 本地文件路径
        String filePath = "#####本地文件路径#####";
        try {
            byte[] imgData = FileUtil.readFileByBytes(filePath);
            String imgStr = Base64Util.encode(imgData);
            String params = URLEncoder.encode("image", "UTF-8") + "=" + URLEncoder.encode(imgStr, "UTF-8");
            String accessToken = "#####调用鉴权接口获取的token#####";
            String result = HttpUtil.post(detectUrl, accessToken, params);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
