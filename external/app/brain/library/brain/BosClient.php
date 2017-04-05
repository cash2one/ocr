<?php
/*
* Copyright 2014 Baidu, Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not
* use this file except in compliance with the License. You may obtain a copy of
* the License at
*
* Http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/

include 'BaiduBce.phar';
require 'BosConf.php';

use BaiduBce\BceClientConfigOptions;
use BaiduBce\Util\Time;
use BaiduBce\Util\MimeTypes;
use BaiduBce\Http\HttpHeaders;
use BaiduBce\Services\Bos\BosClient;
use BaiduBce\Services\Bos\CannedAcl;
use BaiduBce\Services\Bos\BosOptions;
use BaiduBce\Auth\SignOptions;

use BaiduBce\Log\LogFactory;

class BosClien
{
    private $client;
    private $bucket;
    private $key;
    private $filename;
    private $download;

    public function __construct()
    {
        global $BOS_CONFIG;

        parent::__construct();
        $this->client = new BosClient($BOS_CONFIG);
        $this->logger = LogFactory::getLogger(get_class($this));
    }

    public function setUp()
    {
        $id = rand();
        $this->bucket = sprintf('test-bucket%d', $id);
        $this->key = sprintf('test_object%d', $id);
        $this->filename = sprintf(__DIR__.'\\'.'temp_file%d.txt', $id);
        $this->download = __DIR__.'\\'.'download.txt';
        $this->client->createBucket($this->bucket);
    }
}
