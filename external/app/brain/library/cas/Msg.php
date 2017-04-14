<?php
/**
 * Cas校验过程中的错误信息
 * 只是存储一次请求的日志，不写文件
 */
class Cas_Msg {
	static $_arrOption;	
	static $_logid = 0;

    /**
     * @return int|string
     */
	static function getLogid() {
		if (self::$_logid == 0) {
			self::$_logid = microtime(true) . mt_rand(0,100);
		}
		return self::$_logid;
	}
	/**
	 * 设置option
	 *
	 * @param array $arrOpt
	 */
	public static function setOptions($arrOpt) {
		self::$_arrOption = $arrOpt;
	}

    /**
     * @param $strMsg
     */
	static function Log($strMsg) {
		$intLogid = self::getLogid();
		$strLogDir = self::getDir();
		if (is_array($strMsg)) {
			$strMsg = http_build_query($strMsg, 'param_');
			$strMsg = urldecode($strMsg);
		}
		$strMsg = htmlspecialchars($strMsg);
		if (strlen($strLogDir)>0 && is_dir($strLogDir)) { 
			file_put_contents($strLogDir . "/tmplog.txt", "$intLogid:$strMsg\n", FILE_APPEND);
		}
	}
	/**
	 * 返回日志路径
	 *
	 * @return string
	 */
	static function getDir() {
		if (self::$_arrOption['logdir']) {
			$strDir = self::$_arrOption['logdir'] . '/' . date('Ymd');
			if (!is_dir($strDir)) {
				@mkdir($strDir, 0755);
			}			
			return $strDir;
		} else {
			return "";
		}
	}
}