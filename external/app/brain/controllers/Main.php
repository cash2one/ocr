<?php
/**
 * @name Main_Controller
 * @desc 主控制器,也是默认控制器
 * @author 黄林浩(huanglinhao@baidu.com)
 */
class Controller_Main extends Ap_Controller_Abstract {
    public $actions = array(
        'home' => 'actions/page/Home.php',
        'speech' => 'actions/page/Speech.php',
        'image' => 'actions/page/Image.php',
        'ml' => 'actions/page/Ml.php',
        'bigdata' => 'actions/page/BigData.php',
        'nlp' => 'actions/page/Nlp.php',
        'userprofile' => 'actions/page/UserProfile.php',

        'passport' => 'actions/page/Passport.php',
        'uuap' => 'actions/page/Uuap.php',

        //'news' => 'actions/page/News.php',
        'case' => 'actions/page/Case.php',
        'seccode' => 'actions/page/Seccode.php',
        'subscribe' => 'actions/page/Subscribe.php',
        'aidemo' => 'actions/page/AIDemo.php',

        'sdk' => 'actions/page/Sdk.php',
        'docs' => 'actions/page/Docs.php',
        'antiporn'     => 'actions/page/tech/Antiporn.php',

        'error'     => 'actions/page/Error.php',
        'siteMap'     => 'actions/page/SiteMap.php',

    );
}
