<?php
/**
 * Class SafeCurl
 * @author  xulichen @ SMD
 * 2016-08-16 15:09
 */
class SafeCurl
{
    public $ch;
    public $url = '';
    // 用于拼接完整url
    public $host = '';
    public $ip = '';
    public $port = '';
    public $scheme = '';
    public $path = '';
    public $query = '';

    public $whitelist = array(
        "ip" => array(),
        "scheme" => array('http', 'https',),
        "port" => array('all',),
        "content_type" => array('all',),
        "ip:port" => array(),
    );

    public $ssrf_config = array(
        "allow_redirect" => false,
        "redirect_count" => 3, //页面访问深度
        "crawl_timeout" => 2,
        "user-agent" => "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Scurl",
    );
    // output
    public $output = array(
        "isValid" => false,
        "info" => '',
    );

    /**
     * SafeCurl constructor.
     * @param null $whitelist
     * @param null $ssrf_config
     */
    function __construct($whitelist=null, $ssrf_config=null)
    {
        if (!is_null($whitelist)){
            $this->whitelist = $whitelist;
        }
        if (!is_null($ssrf_config)){
            $this->ssrf_config = $ssrf_config;
        }
    }
    /**
     * 单次添加指定类型的白名单信息
     * @param $type
     * @param $value
     */
    public function addWhitelist($type, $value){
        if (in_array('all', $this->whitelist[$type])){
            $this->whitelist[$type] = array();
        }
        array_push($this->whitelist[$type], $value);
    }

    /**
     * 设置是否允许重定向
     */
    public function allowRedirect(){
        $this->ssrf_config["allow_redirect"] = true;
    }

    /**
     * 设置页面访问深度
     * @param $count
     */
    public function setRedirectCount($count){
        $this->ssrf_config["redirect_count"] = $count;
    }

    /**
     * 设置curl爬取的超时时间
     * @param $time
     */
    public function setCrawlTimeout($time){
        $this->ssrf_config["crawl_timeout"] = $time;
    }

    /**
     * 设置curl的User-Agent
     * @param $ua
     */
    public function setUA($ua){
        $this->ssrf_config["user-agent"] = $ua;
    }

    /**
     * @param $url
     * @return array
     */
    public function checkURL($url){
        $param = array(
            "url" => '',
            "isValid" => true,
            "parts" => array(),
            "info" => '',
        );
        // 分析url
        if ($url) {
            $parts = parse_url($url);
        } else {
            $param['isValid']=false;
            $param['info']='This URL is Empty.';
            $this->output['info'] = $param['info'];
            return $param;
        }

        //没有scheme 添加 http://
        if (!isset($parts['scheme'])) {
            $url = 'http://'.$url;
            $scheme = 'http';
        } else{
            $scheme = $parts['scheme'];
        }
        // 若没有host 添加scheme 重新判断
        if (!isset($parts['host'])) {
            $parts = parse_url($url);
        }
        // parse_url 若url 为非法 则返回 bool false
        if (!$parts){
            $parts = array();
        }
        // 判断白名单协议
        if(!in_array($scheme, $this->whitelist['scheme'])){
            $param['isValid'] = false;
            $param['info'] .= '[scheme]';
        }

        // 判断白名单端口
        if(array_key_exists('port', $parts)){
            $port = $parts['port'];
            if(!in_array($port, $this->whitelist['port']) && !in_array('all', $this->whitelist['port'])){
                $param['isValid'] = false;
                $param['info'] .= '[port]';
            }
        } else{
            // 补全默认端口
            if ($scheme === 'http'){
                $parts['port'] = 80;
            }
            if ($scheme === 'https'){
                $parts['port'] = 443;
            }
        }

        // 判断 ip:port 形式白名单
        $ip_port = @$parts['host'].":".@$parts['port'];
        if (in_array($ip_port, $this->whitelist['ip:port'])){
            $param['isValid'] = true;
        }
        // 整体判断url是否合法
        $param['url'] = $url;
        $res = filter_var($url, FILTER_VALIDATE_URL);
        // 新增host为空判断
        if ($res && $param['isValid']){
            $param['parts'] = $parts;
        } else{
            $param['isValid'] = false;
            $this->output['info'] = $param['info'].'This URL is invalid.';
        }
        return $param;
    }

    /**
     * 判断IP是否为外网IP
     * @param $ip
     * @return bool true -> 外网IP false -> 内网
     */
    public function checkIP($ip){
        $isValidIP = true;
        if(in_array($ip, $this->whitelist["ip"])){
            return true;
        }
        // 单独判断 loopback 127.x.x.x
        $sp = explode('.', $ip);
        if ($sp[0] === '127'){
            $isValidIP = false;
        }
        //整体判断是否为外网IP
        $res = filter_var(
            $ip,
            FILTER_VALIDATE_IP,
            FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE |  FILTER_FLAG_NO_RES_RANGE);
        if($res && $isValidIP){
            return true;
        } else{
            $this->output['info'] = 'IP invalid.';
            return false;
        }
    }

    /**
     * 通过URL验证对应IP是否合法
     * @param $url
     * @return bool
     */
    public function validate($url)
    {
        $res = $this->checkURL($url);
        if($res['isValid'] === false){
            return false;
        } else{
            $scheme = @$res['parts']['scheme'];
            $host = @$res['parts']['host'];
            $port = @$res['parts']['port'];
            $path = @$res['parts']['path'];
            $query = @$res['parts']['query'];

            $ip = @gethostbyname($host);
            $ip_port = $ip.":".$port;
            // user 和 pass 默认不添加，如有需求请产品线自行添加
            $this->ip = $ip;
            $this->scheme = $scheme;
            $this->host = $host;
            $this->port = $port;
            $this->path = $path;
            $this->query = $query;
            if (in_array($ip_port, $this->whitelist['ip:port'])){
                return true;
            }
            if ($this->checkIP($ip)){
                return true;
            } else{
                return false;
            }
        }

    }

    /**
     * 单次抓取，重新组装url,并绑定ip和host
     * @return array
     */
    public function fetch_one(){
        if ($this->query){
            $url = sprintf("%s://%s:%s%s?%s", $this->scheme, $this->ip, $this->port, $this->path, $this->query);
        } else{
            $url = sprintf("%s://%s:%s%s", $this->scheme, $this->ip, $this->port, $this->path);
        }
        $ch = curl_init($url); //传入 url
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: '.$this->host)); //绑定host
        curl_setopt($ch, CURLOPT_HEADER, true); // 头文件的信息作为数据流输出
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 以字符串返回,而非直接输出
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false); // 关闭重定向
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->ssrf_config["crawl_timeout"]);
        curl_setopt($ch, CURLOPT_USERAGENT, $this->ssrf_config["user-agent"]);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // 需CURL配置文件,否则出现HTTPS错误
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // 忽略HTTPS证书HOST校验
        $response = curl_exec($ch);
        if ($response){
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $http_content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
            $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
            $http_header = substr($response, 0, $header_size);
            $http_body = substr($response, $header_size);
            curl_close($ch);
            $res = array(
                "isValid" => true,
                "response" => $response,
                "http_code" => $http_code,
                "http_content_type" => $http_content_type,
                "http_header" => $http_header,
                "http_body" => $http_body,
                "curl_handle" => $ch,
            );
            return $res;
        } else{
            $res = array(
                "isValid" => false,
                "curl_error" => curl_error($ch),
            );
            return $res;
        }
    }

    /**
     * 核心逻辑为手动获取location,并逐次验证url是否合法
     * 只有HTTP状态为200,且在规定次数内,才返回完整output
     * @param $url
     * @return array
     */
    public function execute($url){
        $res = null;
        $url_valid = true;
        $this->output["url_route"] = array();
        $url = trim($url);

        if (!$this->ssrf_config['allow_redirect']){
            $this->ssrf_config['redirect_count'] = 1;
        }
        for ($i = 1;$i <= $this->ssrf_config['redirect_count']; $i++){
            array_push($this->output['url_route'], $url);
            if (!$this->validate($url)){
                //每次均验证 url合法性
                $url_valid = false;
                break;
            }
            $res = $this->fetch_one();
            if ($res['isValid'] === false){
                $this->output['info'] = $res['curl_error'];
                break;
            }
            if ($res['http_code'] === 200){

                if(!in_array($res['http_content_type'], $this->whitelist['content_type'])
                    && !in_array('all', $this->whitelist['content_type'])){
                    $this->output['info'] = 'This content_type is not allowed';
                    break;
                } else{
                    $this->output['isValid'] = true;
                    break;
                }
            }
            if ($res['http_code'] !== 200 && $i === $this->ssrf_config['redirect_count']){
                $this->output['info'] = '已达到循环次数限制,非200弃包';
                break;

            }else {
                preg_match_all('/^Location:(.*)$/mi', $res["response"], $matches);
                if (!empty($matches[1])){
                    $url = trim($matches[1][0]);
                } else{
                    $this->output['info'] = 'Can not find location.';
                    break;
                }
            }
        }

        if ($url_valid){
            if ($this->output['isValid']){
                $this->output['response'] = $res['response'];
                $this->output['http_code'] = $res['http_code'];
                $this->output['http_content_type'] = $res['http_content_type'];
                $this->output['http_header'] = $res['http_header'];
                $this->output['http_body'] = $res['http_body'];
                $this->output['destination_url'] = end($this->output['url_route']);
            }
            return $this->output;
        } else{
            return $this->output;
        }
    }

}