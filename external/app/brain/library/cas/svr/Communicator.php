<?php
//require_once 'Cas/Msg.php';
//require_once 'Cas/Protocol/NsHeader.php';
define('CMD_CHECK_ID', 7);
define('CMD_GET_REAL_ST', 11);
define('CMD_SET_PUB_SESS', 12);
define('CMD_GET_PUB_SESS', 13);
define('CMD_UNSET_PUB_SESS', 14);
define('VERSION', 1000);
define('CAS_PROVIDER', "cas-client");
define('MAGIC_NUM', 0xfb709394);

define('CAS_SUCC_REJECT', 1);
define('CAS_SUCC', 0);
define('CAS_FAIL_REQ', -1);
define('CAS_INVALID_REQ', -2);
define('CAS_NO_SUCH', -3);
/**
 * 访问uc-cas的封装
 *
 */
class Cas_Svr_Communicator {
	
//	const CMD_CHECK_ID = 7;
//	const CMD_GET_REAL_ST = 11;
//	const CMD_GET_PUB_SESS = 13;
//	const CMD_SET_PUB_SESS = 12;
//	const CMD_UNSET_PUB_SESS = 14;
//	const VERSION = 1000;
//	const CAS_PROVIDER = "cas-client";
//	const MAGIC_NUM = 0xfb709394;
//	
//	const CAS_SUCC_REJECT = 1;
//	const CAS_SUCC = 0;
//	const CAS_FAIL_REQ = -1;
//	const CAS_INVALID_REQ = -2;
//	const CAS_NO_SUCH = -3;
	/**
	 * 服务器信息 array(ip:port, )
	 *
	 * @var array
	 */
	var $_arrServers;
	/**
	 * 当前可用的服务器信息 array(ip:port, )
	 *
	 * @var array
	 */
	var $_arrCurr_Servers;
	
	/**
	 * int
	 *
	 * @var int 毫秒为单位
	 */
	var $_intTimeOut;
	/**
	 * 通讯key
	 *
	 * @var string
	 */
	var $_strSubAppkey;
	/**
	 * 链接对象
	 *
	 * @var resource
	 */
	var $_objConn;
	
	function __construct($arrServers, $strAppKey = '', $intTimeOut = 1000) {
		$this->Cas_Svr_Communicator($arrServers, $strAppKey, $intTimeOut);
	}
	
	function Cas_Svr_Communicator($arrServers, $strAppKey = '', $intTimeOut = 1000) {
		$this->_arrServers = $arrServers;
		$this->_arrCurr_Servers = $arrServers;
		$this->_intTimeOut = $intTimeOut;
		$this->_strSubAppkey = $strAppKey;
	}
	
	function getLogid() {
		list($usec, $sec) = explode(" ", microtime());
		return ($usec + $sec) * 1000;
	}
	
	function getPackFromData($arrData) {
		return mc_pack_array2pack($arrData);
	}
	
	function getDataFromPack($strData) {
		return mc_pack_pack2array($strData);
	}
	/**
	 * 校验st
	 *
	 * @param int $ucid
	 * @param int $appid
	 * @param string $st
	 * @param string $subappkey
	 * @return array
	 */
	function validateST($ucid, $appid, $st) {
		$objNsHead = new Cas_Protocol_NsHeader(CMD_CHECK_ID, VERSION, CAS_PROVIDER, MAGIC_NUM, 0);
		$arrData = array(
			'appid'=>$appid,
			'st_len'=>strlen($st),
			'st'=>$st,
			'ucid'=>$ucid,
			'key_len'=>strlen($this->_strSubAppkey),
			'key'=>$this->_strSubAppkey,
		);
		$arrRet = $this->exchangeNsData($objNsHead, $arrData);
		return $arrRet;
	}
	
	/**
	 * 校验st
	 *
	 * @param int $ucid
	 * @param int $appid
	 * @param string $st
	 * @param string $subappkey
	 * @return array
	 */
	function getPubSessData($strKey) {
		$arrRet = array();
		$strKey = trim($strKey);
		if (strlen($strKey)<10) {
			return NULL;
		}
		$strSubKey = '';
		$intP = strpos($strKey, ".");
		if ($intP>0) {
			$strSubKey = substr($strKey, $intP+1, strlen($strKey) - $intP - 1);
			$strKey = substr($strKey, 0, $intP);			
		}
				
		$objNsHead = new Cas_Protocol_NsHeader(CMD_GET_PUB_SESS, VERSION, CAS_PROVIDER, MAGIC_NUM, 0);
		$arrData = array(
			'st'=>$strKey,
			'st_len'=>strlen($strKey),
			'subkey'=>$strSubKey,
			'sub_key_len'=>strlen($strSubKey),
			'key_len'=>strlen($this->_strSubAppkey),
			'key'=>$this->_strSubAppkey,
		);
		$arrTmp = $this->exchangeNsData($objNsHead, $arrData);	
		if ($arrTmp) {
			$objNsHead = $arrTmp['nsheader'];
			$arrRet = $arrTmp['data'];
		}
		if (!$arrRet) {
			$arrRet = array();
		}		
		return $arrRet;
	}
/**
	 * 校验st
	 *
	 * @param string $strKey
	 * @param string $strData
	 * @return bool
	 */
	function setPubSessData($strKey, $strData) {
		$bolRet = false;
		$strKey = trim($strKey);
		if (strlen($strKey)<10) {
			return $bolRet;
		}
		$strSubKey = '';
		$intP = strpos($strKey, ".");
		if ($intP>0) {
			$strSubKey = substr($strKey, $intP+1, strlen($strKey) - $intP - 1);
			$strKey = substr($strKey, 0, $intP);			
		}
				
		$objNsHead = new Cas_Protocol_NsHeader(CMD_SET_PUB_SESS, VERSION, CAS_PROVIDER, MAGIC_NUM, 0);
		$arrData = array(
			'st'=>$strKey,
			'st_len'=>strlen($strKey),
			'subkey'=>$strSubKey,
			'sub_key_len'=>strlen($strSubKey),
			'key_len'=>strlen($this->_strSubAppkey),
			'key'=>$this->_strSubAppkey,
			'data_len'=>strlen($strData),
			'buffer'=>$strData,
		);
		$arrTmp = $this->exchangeNsData($objNsHead, $arrData);	
		if ($arrTmp) {
			$objNsHead = $arrTmp['nsheader'];
			if ($objNsHead != NULL && $objNsHead->getReserved() === 0) {
				$bolRet = true;
			}
			
		}		
		return $bolRet;
	}
/**
	 * 校验st
	 *
	 * @param int $ucid
	 * @param int $appid
	 * @param string $st
	 * @param string $subappkey
	 * @return array
	 */
	function unsetPubSessData($strKey) {
		$bolRet = false;
		$strKey = trim($strKey);
		if (strlen($strKey)<10) {
			return $bolRet;
		}
		$strSubKey = '';
		$intP = strpos($strKey, ".");
		if ($intP>0) {
			$strSubKey = substr($strKey, $intP+1, strlen($strKey) - $intP - 1);
			$strKey = substr($strKey, 0, $intP);			
		}
				
		$objNsHead = new Cas_Protocol_NsHeader(CMD_UNSET_PUB_SESS, VERSION, CAS_PROVIDER, MAGIC_NUM, 0);
		$arrData = array(
			'st'=>$strKey,
			'st_len'=>strlen($strKey),
			'subkey'=>$strSubKey,
			'sub_key_len'=>strlen($strSubKey),
			'key_len'=>strlen($this->_strSubAppkey),
			'key'=>$this->_strSubAppkey,
		);
		$arrTmp = $this->exchangeNsData($objNsHead, $arrData);	
		if ($arrTmp) {
			$objNsHead = $arrTmp['nsheader'];
			if ($objNsHead != NULL && $objNsHead->getReserved() === 0) {
				$bolRet = true;
			}			
		}		
		return $bolRet;
	}
	
	/**
	 * 根据一次性stkey获得用于校验的st
	 *
	 * @param string $stkey
	 * @param string $appkey
	 * @param int $appid
	 * @return array
	 */
	function getRealST($stkey, $appid) {
		$objNsHead = new Cas_Protocol_NsHeader(CMD_GET_REAL_ST, VERSION, CAS_PROVIDER, MAGIC_NUM, 0);
		$arrData = array(
			'appid'=>$appid,
			'st_key_len'=>strlen($stkey),
			'st_key'=>$stkey,
			'key_len'=>strlen($this->_strSubAppkey),
			'key'=>$this->_strSubAppkey,
		);

		$arrRet = $this->exchangeNsData($objNsHead, $arrData);
		return $arrRet;
	}

	/**
	 * 交互数据
	 *
	 * @param Cas_Protocol_Header $objNsHeader
	 * @param array $arrDataToSend
	 * @return array('nsheader'=>$objNsHeader, 'data'=>array(), 'logid'=>uint)
	 */
	function exchangeNsData($objNsHeader, $arrDataToSend) {
		$arrRet = array('nsheader'=>NULL, 'data'=>array(), 'logid'=>0);
		if (!$objNsHeader) {
			Cas_Msg::Log("ns header empty");
			return $arrRet;
		}
		if ($arrDataToSend != NULL && !is_array($arrDataToSend)) {
			Cas_Msg::Log("data to send must be array type");
			return $arrRet;
		}
		//检查logid
		$intLogid = $objNsHeader->getLogid();
		if ($intLogid <= 0 || $intLogid == NULL) {
			$intLogid = $this->getLogid();
			$objNsHeader->setLogid($intLogid);
		}
		$arrRet['logid'] = $intLogid;
		//检查body
		$strBinBody = '';
		if (count($arrDataToSend) == 0) {
			$objNsHeader->setBodyLen(0);
		} else {
			$strBinBody = $this->getPackFromData($arrDataToSend);
			$objNsHeader->setBodyLen(strlen($strBinBody));
		}
		//获得nsheader数据
		$strBinHeader = $objNsHeader->getBinData();
		$strBinToSend = $strBinHeader . $strBinBody;
		$bolC = $this->_connect();
		if (!$bolC) {
			return $arrRet;
		}
		$this->send($strBinToSend, strlen($strBinToSend));
		//下面读数据
		$strReadHeader = $this->read(NS_HEADER_LEN);
		$intNsheadRead = strlen($strReadHeader);		
		if ($intNsheadRead != NS_HEADER_LEN) {
			$this->close();
			Cas_Msg::Log("logid:$intLogid:read nsheader failed, len not equal. read:{$intNsheadRead}, but nead :" . NS_HEADER_LEN);
			return $arrRet;
		}
		$objReadNsHeader = Cas_Protocol_NsHeader::createNsHeaderFromBinData($strReadHeader);
		if (!$objReadNsHeader) {
			$this->close();
			Cas_Msg::Log("logid:$intLogid:convert readed nsheader data to object Cas_Protocol_NsHeader failed.");
			return $arrRet;
		}
		$intHeaderBodyLen = $objReadNsHeader->getBodyLen();
		
		$strReadBody = '';
		if ($intHeaderBodyLen > 0) {
			$strReadBody = $this->read($intHeaderBodyLen);
			if (strlen($strReadBody) != $intHeaderBodyLen) {
				$this->close();
				Cas_Msg::Log("logid:$intLogid:readed body len does not equal to header->bodylen");
				return $arrRet;
			}
			$arrReadBody = $this->getDataFromPack($strReadBody);
			if ($arrReadBody) {
				$arrRet['data'] = $arrReadBody;
			} 
		}
		$this->close();
		$arrRet['nsheader'] = $objReadNsHeader;
		return $arrRet;
	}
    /**
     * 关闭连接
     */
    function close() {
        if (is_resource($this->_objConn)) {
            fclose($this->_objConn);
        }
        $this->_objConn = NULL;
    }

    /**
     * 连接函数
     * 
     * @return bool
     */
    function _connect() {
    	$bolRet = false;
        $intTimeOut = $this->_intTimeOut;
        $strErrno = 0; //错误号
        $strErrstr = ''; //错误信息
       
    	$intSNum = count($this->_arrServers);
        if ($intSNum < 1) {
       		Cas_Msg::Log("the configuration is error. no server configured.");
       		return $bolRet;
       	}
        /**
         * 尝试3次连接
         */
        for ($i = 0; $i < 3; $i++) {
        	$intSNum = count($this->_arrCurr_Servers);
        	if ($intSNum < 1) {
        		Cas_Msg::Log("no available server when retry, next to init all.");
        		$this->_arrCurr_Servers = $this->_arrServers;
       			$intSNum = count($this->_arrCurr_Servers);
       		}
            $intI = mt_rand(0, $intSNum - 1);
       		$strOneS = $this->_arrCurr_Servers[$intI];
       		$arrOneS = explode(":", $strOneS);
            $strIp = $arrOneS[0];
            $intPort = intval($arrOneS[1]);
            $this->_objConn = fsockopen($strIp, $intPort, $strErrno, $strErrstr, $intTimeOut);
            
            if (is_resource($this->_objConn)) {
            	$bolRet = TRUE;
            	Cas_Msg::Log("connect to server:$strOneS success.");
                break;
            } else {
            	unset($this->_arrCurr_Servers[$intI]);
            	$this->_arrCurr_Servers = array_values($this->_arrCurr_Servers);
            	Cas_Msg::Log("connect to server:$strOneS failed. next retry.");
            }
        }
        if ($i == 3) {
            Cas_Msg::Log("connect to all servers failed." . "{$strErrno}:{$strErrstr}");           
        }
        return $bolRet;
    }

    /**
     * 读取数据
     * 
     * @param intLen    要读取的长度
     * @return string , -1 means error
     */
    function read($intLen = 0) {
    	$intFailed = -1;
    	if (!is_resource($this->_objConn)) {
    		Cas_Msg::Log("the connection resource is invalid.");
    		return $intFailed;
    	}
    	$strRead = "";
    	if ($intLen <= 0) {
			while (!feof($this->_objConn)) {
			  $strRead .= fread($this->_objConn, 8192);
			}
    	} else {
       		$strRead = fread($this->_objConn, $intLen);
    	}
        if ($strRead === FALSE) {
            return $intFailed;
        } else {
            return $strRead;
        }
    }

    /**
     * 发送数据
     * 
     * @param intLen    要发生的长度，默认是strData的长度
     * @param strData
     * 
     * @return int 发送的字节数, -1 means failed
     * @throw 异常
     */
    function send($strData, $intLen = NULL) {
    	$intFailed = -1;
    	if (!is_resource($this->_objConn)) {
    		$bolRet = $this->_connect();
    		if (!$bolRet) {
    			return $intFailed;
    		}
    		
    	}
        if ($intLen == NULL) {
            $ret = fwrite($this->_objConn, $strData);
        } else {
            $ret = fwrite($this->_objConn, $strData, $intLen);
        }
        return $ret;
    }
}