<?php

/**
 * Created by songqingyun@baidu.com.
 * User: songqingyun
 * Date: 2017/3/3
 * Time: 下午6:54
 */
class Controller_Nlp extends Ap_Controller_Abstract
{
    public $actions = array(

        'comment_tag' => 'actions/tech/nlp/Comment_Tag.php',
        'dnnlm_cn' => 'actions/tech/nlp/Dnnlm_Cn.php',
        'lexical' => 'actions/tech/nlp/Lexical.php',
        'simnet' => 'actions/tech/nlp/Simnet.php',
        'word_embedding' => 'actions/tech/nlp/Word_Embedding.php',
    );

}