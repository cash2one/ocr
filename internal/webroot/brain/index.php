<?php
/**
 * @name index
 * @desc 入口文件
 * @author 黄林浩(huanglinhao@baidu.com)
 */
$objApplication = Bd_Init::init();
$objResponse = $objApplication->bootstrap()->run();
