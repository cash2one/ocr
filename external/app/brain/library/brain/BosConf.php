<?php
/*
* Copyright 2014 Baidu, Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
*
* Http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
* an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
* specific language governing permissions and limitations under the License.
*/

error_reporting(-1);
date_default_timezone_set('UTC');

define('_BOS_CLIENT_ROOT', dirname(__DIR__));

$BOS_CONFIG =
    array(
        'credentials' => array(
            'accessKeyId' => 'f86a2044998643b5abc89b59158bad6d',
            'secretAccessKey' => '2ed913d114e042059031af493287cc03',
        ),
        'endpoint' => 'http://bj.bcebos.com',
    );
