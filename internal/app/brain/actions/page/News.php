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
class Action_News extends Ap_Action_Abstract
{

    /**
     * execute
     *
     * @access public
     * @return void
     */
    public function execute()
    {
        !Brain_User::checkInternalUser() && exit(0);
        $arrRequest = Saf_SmartMain::getCgi();
        $arrInput = $arrRequest['request_param'];
        $strAction = $arrInput['action'];

        $arrRet = array(
            'errno' => 0,
            'msg' => 'success',
            'data' => (object)array(),
        );
        $dbNews = new Dao_News();

        if ('list' === $strAction) {
            // source: int 内网, ext 外网
            $source = Brain_Util::getParamAsString($arrInput, 'source', 'int');
            $strPn = '' . Brain_Util::getParamAsInt($arrInput, 'pn', 0);
            $strRn = '' . Brain_Util::getParamAsInt($arrInput, 'rn', 10);
            if ($source == 'ext') {
                $dbNewsExt = new Dao_NewsExt();
                try {
                    $arrNews = $dbNewsExt->getNewsList($strPn, $strRn);
                } catch (Exception $e) {
                }
            } else if ($source == 'int') {
                try {
                    $arrNews = $dbNews->getNewsList($strPn, $strRn);
                } catch (Exception $e) {
                }
            } else {

            }

            // $arrNews = $dbNews->getNewsList($strPn, $strRn);
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews;
            }
            Brain_Output::jsonOutput($arrRet);
        } else if ('showlist' === $strAction) {
            Brain_Output::htmlOutput(array(), 'brain/page/modifynews/modifynewslist.tpl');
        } else if ('modifynews' === $strAction) {
            Brain_Output::htmlOutput(array(), 'brain/page/modifynews/modifynews.tpl');
        } else if ('top3' === $strAction) {
            $arrNews = $dbNews->getNewsList('0', '3');
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews;
            }
            Brain_Output::jsonOutput($arrRet);
        } else if ('detail' === $strAction) {
            $strId = Brain_Util::getParamAsString($arrInput, 'id');
            // source: int 内网, ext 外网
            $source = Brain_Util::getParamAsString($arrInput, 'source', 'int');
            if ($source == 'ext') {
                $dbNewsExt = new Dao_NewsExt();
                try {
                    $arrNews = $dbNewsExt->getNews($strId);
                } catch (Exception $e) {
                }
            } else if ($source == 'int') {
                try {
                    $arrNews = $dbNews->getNews($strId);
                } catch (Exception $e) {
                }
            } else {

            }

            //$arrNews = $dbNews->getNews($strId);
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews[0];
                $dbNews->addPv($strId);
            }
            //Brain_Output::jsonOutput($arrRet);
            Brain_Output::htmlOutput($arrRet, 'brain/page/news/detail.tpl');
        } else if ('detail2' === $strAction) {
            $strId = Brain_Util::getParamAsString($arrInput, 'id');
            // source: int 内网, ext 外网
            $source = Brain_Util::getParamAsString($arrInput, 'source', 'int');
            if ($source == 'ext') {
                $dbNewsExt = new Dao_NewsExt();
                try {
                    $arrNews = $dbNewsExt->getNews($strId);
                } catch (Exception $e) {
                }
            } else if ($source == 'int') {
                try {
                    $arrNews = $dbNews->getNews($strId);
                } catch (Exception $e) {
                }
            } else {

            }
            //$arrNews = $dbNews->getNews($strId);
            if (is_array($arrNews) && count($arrNews) > 0) {
                $arrRet['data'] = $arrNews[0];
                //    $dbNews->addPv($strId);
            }
            Brain_Output::jsonOutput($arrRet);
            //Brain_Output::htmlOutput($arrRet, 'brain/page/news/detail.tpl');
        } else if ('sync' === $strAction) {
            $pwd = Brain_Util::getParamAsString($arrInput, 'pwd');
            if (empty($pwd) || "MhxzKhl" != $pwd) {
                exit("参数错误");
            }
            $dbNewsExt = new Dao_NewsExt();
            $newsAll = $dbNews->getAllNews();
            foreach ($newsAll as $news) {
                $dbNewsExt->insertNewsPlace($news['title'], $news['time'], $news['author'], $news['content'],
                    $news['link'], $news['abs'], 1, $news['ts'], $news['pv']);
            }
            Brain_Output::jsonOutput($arrRet);
        } else if ('pic' === $strAction) {
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
                //curl_setopt($ch, CURLOPT_URL, 'https://yl.baidu.com/rp/api/world');
                curl_setopt($ch, CURLOPT_URL, 'http://cq02-rp-video-lamp00.cq02.baidu.com:8090/rp/api/world');
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
            Brain_Output::htmlOutput(array(), 'brain/page/news/news.tpl');
        }
    }
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
