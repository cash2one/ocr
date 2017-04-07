<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file News.php
 * @author piaohongji(piaohongji@baidu.com)
 * @date 2016/07/29 14:33:00
 * @brief 
 *  
 **/

class Action_News extends Ap_Action_Abstract {

    //缓存超时设置
    const TIME_LIMIT = 3600;

    /**
     * execute 
     * 
     * @access public
     * @return void
     */
    public function execute() {
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $strAction = $arrInput['action'];

        $dbNews = new Dao_News();
        $dbTag = new Dao_Tag();
        $dbNewsTag = new Dao_NewsTag();


        if ('list' === $strAction) {
            $strPn = '' . Brain_Util::getParamAsInt($arrInput, 'pn', 0);
            $strRn = '' . Brain_Util::getParamAsInt($arrInput, 'rn', 10);
            $arrNews = $dbNews->getNewsList($strPn, $strRn);

            Brain_Output::jsonOutput(0, 'success', $arrNews);
        } else if ('top3' === $strAction) {
            $arrNews = $dbNews->getNewsList('0', '3');

            Brain_Output::jsonOutput(0, 'success', $arrNews);
        } else if ('detail' === $strAction) {
            $strId = Brain_Util::getParamAsString($arrInput, 'id');
            $arrNews = $dbNews->getNews($strId);
            //增加tag信息
            $tagList = array();
            $newsTag = $dbNewsTag->getTagIdListByNewsId($strId);
            if (is_array($newsTag) && count($newsTag) > 0) {
                /*
                 * $count = count($newsTag);
                 * for($index=0; $index<$count; $index++){
                 * $tagList[$index] = $dbTag->getTag($newsTag[$index]['tag_id']);
                 * }
                 */
                for($i=0;$i<count($newsTag);$i++){
                    foreach($newsTag[$i] as $x=>$x_value){
                        echo "Key=" . $x . ", Value=" . $x_value;
                        $wyd = $dbTag->getTag(''.$x_value);    //$tagList[$i] = $dbTag->getTag($x_value);
                        for($j=0;$j<count($wyd);$j++){
                            foreach($wyd[$j] as $x=>$x_value){
                                echo "Key=" . $x . ", Value=" . $x_value;
                                echo "<br>";
                            }
                            array_push($tagList, $wyd[$j]);
                        }
                    }
                }
            }
            echo "新闻页--Tag信息：" . count($tagList);
            echo "<br>";
            for($i=0;$i<count($tagList);$i++){
                foreach($tagList[$i] as $x=>$x_value){
                    echo "Key=" . $x . ", Value=" . $x_value;
                    echo "<br>";
                }
            }
            $arrRet = array(
                'errno' => 0,
                'msg' => 'success',
                'data' => (object) array(),
            );
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews[0];
                //增加tag信息
                $arrRet['data']['tagList '] = $tagList;
                $dbNews->addPv($strId);
            }
            //Brain_Output::jsonOutput($arrRet);
            //Brain_Output::htmlOutput($arrRet, 'brain/page/news/detail.tpl');
            $arrRet['page'] = substr(strtolower(__CLASS__), 7);
            Brain_Output::htmlOutput($arrRet, 'brain/platform/support/news/news-con.tpl');
        } else if ('delete' === $strAction) {
            // new
            exit;
            $strId = Brain_Util::getParamAsString($arrInput, 'id');

            $dbNews->deleteNews($strId);
            Brain_Output::jsonOutput(0, 'success');
        } else if ('update' === $strAction) {
            // new
            exit;
            $strTitle = Brain_Util::getParamAsString($arrInput, 'title');
            $strTime = Brain_Util::getParamAsString($arrInput, 'time');
            $strAuthor = Brain_Util::getParamAsString($arrInput, 'author');
            $strContent = Brain_Util::getParamAsString($arrInput, 'content');
            $strAbs = Brain_Util::getParamAsString($arrInput, 'abs');
            $strLink = Brain_Util::getParamAsString($arrInput, 'link');
            $strId = Brain_Util::getParamAsString($arrInput, 'id');

            $dbNews->updateNews($strId, $strTitle, $strTime, $strAuthor, $strContent, $strLink, $strAbs);
            Brain_Output::jsonOutput(0, 'success');
        } else if ('add' === $strAction) {
            // new
            exit;
            $strTitle = Brain_Util::getParamAsString($arrInput, 'title');
            $strTime = Brain_Util::getParamAsString($arrInput, 'time');
            $strAuthor = Brain_Util::getParamAsString($arrInput, 'author');
            $strContent = Brain_Util::getParamAsString($arrInput, 'content');
            $strAbs = Brain_Util::getParamAsString($arrInput, 'abs');
            $strLink = Brain_Util::getParamAsString($arrInput, 'link');
            $dbNews->insertNews($strTitle, $strTime, $strAuthor, $strContent, $strLink, $strAbs);
            Brain_Output::jsonOutput(0, 'success');
        } else if ('edit' === $strAction) {
            // new
            exit;
            Brain_Output::htmlOutput(array(), 'brain/page/editnews/editnews.tpl');
        } else if ('pic' === $strAction) {
            exit;
            $strRet = '';
            if (isset($_FILES['upload']['tmp_name'])) {
                $strPicFile = $_FILES['upload']['tmp_name'];
                $ch = curl_init();
                $arrPostData = array(
                    '_token' => 'qWe#5^&8',
                    'pic' => '@' . $strPicFile,
                );
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_VERBOSE, 0);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible;)');
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_URL, 'https://yl.baidu.com/rp/api/world');
                // curl_setopt($ch, CURLOPT_URL, 'http://cq01-piaohongji-m1.epc.baidu.com:8090/rp/api/world');
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $arrPostData);
                $strData = curl_exec($ch);
                curl_close($ch);

                $arrData = json_decode($strData, true);
                $strPicUrl = '';
                if (isset($arrData['data']['pic']['pic_url'])) {
                    $strPicUrl = $arrData['data']['pic']['pic_url'];
                }
                $strRet = '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction("' . $_GET['CKEditorFuncNum'] . '", "' . $strPicUrl . '");</script>';
            }
            header('Content-Type: text/html; charset=UTF-8');
            echo $strRet;
        } else {
            //Brain_Output::htmlOutput(array(), 'brain/page/news/news.tpl');
            $offset = Brain_Util::getParamAsInt($arrInput, 'offset', 1);    //默认1
            $tag = ''.Brain_Util::getParamAsInt($arrInput, 'tag', 0);    //默认0:所有标签
            echo $tag;
            echo $offset;
            //请求热门标签:tag
            $service_Tag = new Service_Data_Tag();
            $tagList = $service_Tag->getTags();
            //请求新闻列表:tag、offset
            $service_News = new Service_Data_News();
            $newsList = $service_News->getNewsListByTagAndOffset($tag, $offset);
            //分页信息请求：tag、offset---查询t_news_tag表，得出记录条数，求得总页码、当前页码
            $pagination = array();
            $pagination['total'] = $service_News->getPaginationByTag($tag);
            $pagination['offset'] = ''.$offset;
            //汇总
            $arrRet = array();
            $arrRet['page'] = substr(strtolower(__CLASS__), 7);
            $arrRet['newsList'] = $newsList;
            $arrRet['tagList'] = $tagList;
            $arrRet['pagination'] = $pagination;
            //返回
            Brain_Output::htmlOutput($arrRet, 'brain/platform/support/news/news-list.tpl');
        }
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
