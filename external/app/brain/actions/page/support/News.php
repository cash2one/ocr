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
            
            $arrRet = array(
                'errno' => 0,
                'msg' => 'success',
                'data' => (object) array(),
            );
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews[0];
                $dbNews->addPv($strId);
            }
            //Brain_Output::jsonOutput($arrRet);
            //Brain_Output::htmlOutput($arrRet, 'brain/page/news/detail.tpl');
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
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
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
            Brain_Output::htmlOutput(array(), 'brain/platform/support/news/news-list.tpl');
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
