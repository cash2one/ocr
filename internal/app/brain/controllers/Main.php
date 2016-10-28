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
        'ml' => 'actions/page/MachineLearning.php',
        'kg' => 'actions/page/KnowledgeGraph.php',
        'nlp' => 'actions/page/Nlp.php',
        'userProfile' => 'actions/page/UserProfile.php',

        'news' => 'actions/page/News.php',
    );
}
