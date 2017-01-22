<?php
/**
 * @file Cloud.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Brain_Cloud {
    
    const TEMPLATE_URL = "https://cloud.baidu.com/solution/zhongce_tpl.html";
    const MEMCACHE_KEY_TEMPLATE = "cloud_template_key";
    const TEMPLATE_LIFE_TIME = 3600;

    /**
     * genCloudTemplate 生成百度云模板页面
     * 
     * @static
     * @param mixed $tech
     * @access public
     * @return void
     */
    public static function genCloudTemplate($tech) {
        
        $odpDir = dirname(dirname(dirname(dirname(dirname(__FILE__)))));
        
        $templateDir = $odpDir . '/template/brain/cloud/';
        $templateFile = $templateDir . "/$tech.tpl";

        if (!is_dir($templateDir))
        {
            mkdir($templateDir);
        }
            
        $templateKey = Brain_Cloud::MEMCACHE_KEY_TEMPLATE.$_SERVER["SERVER_ADDR"].$tech;
        $isTemplateExpired = Brain_Memcache::get($templateKey);
        $isTemplateExists = file_exists($templateFile);

        if(empty($isTemplateExpired) || !$isTemplateExists)
        {
            
            $content = file_get_contents(Brain_Cloud::TEMPLATE_URL);
            //$content = file_get_contents('https://cloudtest.baidu.com/solution/zhongce_tpl.html');

            if (!empty($content))
            {

                $tech_content = file_get_contents($odpDir."/webroot/src/view/technology/$tech.html");

                //get fe version
                $versionContent = json_decode(file_get_contents($odpDir."/webroot/version.json"), true);
                $feVersion = $versionContent['currentVersion']['timeStamp'];

                $css = "<link rel=\"stylesheet\" href=\"/ai_dist/$feVersion/css/technology/$tech.style.css\">\n";
                $css .= "<!--[if IE 9]><link rel=\"stylesheet\" href=\"/ai_dist/$feVersion/css/ie9.css\"><![endif]-->";

                $js = "<script src=\"/ai_dist/$feVersion/js/common.bundle.js\"></script>\n";
                $js .= "<script src=\"/ai_dist/$feVersion/js/technology/$tech.js\"></script>\n";

                $content = str_ireplace('<main>', '<main class="ai-platform">', $content);
                $content = str_ireplace('{{body}}', $tech_content, $content);
                $content = str_ireplace('{{title}}', '{%$title%}', $content);
                $content = str_ireplace('</head>', "$css</head>", $content);
                $content = str_ireplace('</body>', "$js</body>", $content);
                
                file_put_contents($templateFile, $content);

                Brain_Memcache::set($templateKey, 1, Brain_Cloud::TEMPLATE_LIFE_TIME);
            }
        }

        return $templateFile;
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
