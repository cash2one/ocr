<?php
require_once(dirname(__FILE__).'/../Packer.php');
define('NS_HEADER_LEN', 36);
class Cas_Protocol_NsHeader {
/**
 * typedef struct _nshead_t
{
        unsigned short id;              ///<id     2
        unsigned short version;         ///<版本号  4
        ///(M)由apache产生的logid，贯穿一次请求的所有网络交互
        unsigned int   log_id;    8
        ///(M)客户端标识，建议命名方式：产品名-模块名，比如"sp-ui", "mp3-as"
        char           provider[16];   24
        ///(M)特殊标识，标识一个包的起始
        unsigned int   magic_num;   28
        unsigned int   reserved;    32   ///<保留
        ///(M)head后请求数据的总长度
        unsigned int   body_len;   36
} nshead_t;
 *
 */	
	var $_shortId;
	var $_shortVersion;
	var $_intLogid;
	var $_strProvider;
	var $_intMagicNum;
	var $_intReserved;
	var $_intBodyLen;
	/**
	 * 二进制打包对象
	 *
	 * @var Cas_Packer
	 */
	var $_objPacker;
	
	/**
	 * 构造对象
	 *
	 * @param short $intCmdID
	 * @param short $intVersion
	 * @param string $strProvider
	 * @param int $intMagicNum
	 * @param int $intReserved
	 */
    function __construct($intCmdID, $intVersion, $strProvider, $intMagicNum, $intReserved) {
        $this->Cas_Protocol_NsHeader($intCmdID, $intVersion, $strProvider, $intMagicNum, $intReserved);
    }
	/**
	 * 构造对象
	 *
	 * @param short $intCmdID
	 * @param short $intVersion
	 * @param string $strProvider
	 * @param int $intMagicNum
	 * @param int $intReserved
	 */
    function Cas_Protocol_NsHeader($intCmdID, $intVersion, $strProvider, $intMagicNum, $intReserved) {
        $this->_shortId = $intCmdID;
        $this->_shortVersion = $intVersion;
        $this->_strProvider = $strProvider;
        $this->_intMagicNum = $intMagicNum;
        $this->_intReserved = $intReserved;
        $this->_intLogid = 0;
        $this->_intBodyLen = 0;
        $this->_objPacker = new Cas_Packer();
    }
    /**
     * 返回logid
     *
     * @return int
     */
    function getLogid() {
    	return $this->_intLogid;
    }
    /**
     * 设置logid
     *
     * @param int $intLogid
     */
    function setLogid($intLogid) {
    	$this->_intLogid = $intLogid;
    }
    /**
     * 设置bodylen
     *
     * @param int $intBodyLen
     */
    function setBodyLen($intBodyLen) {
    	$this->_intBodyLen = $intBodyLen;
    }
    /**
     * 获得bodylen
     *
     * @return int
     */
    function getBodyLen() {
    	return $this->_intBodyLen;
    }
    
    /**
     * 获得reserved字段
     *
     * @return int
     */
    function getReserved() {
    	return $this->_intReserved;
    }
    
    /**
     * 获得当前成员变量组成的二进制数据
     *
     * @return string
     */
    function getBinData() {
    	$this->_objPacker->clearData();
		$this->_objPacker->packInt16($this->_shortId);
		$this->_objPacker->packInt16($this->_shortVersion);
		$this->_objPacker->packInt32($this->_intLogid);
		$this->_objPacker->packNChar($this->_strProvider, 16);
		$this->_objPacker->packInt32($this->_intMagicNum);
		$this->_objPacker->packInt32($this->_intReserved);	
		$this->_objPacker->packInt32($this->_intBodyLen);
		$strBinData = $this->_objPacker->getData();
		return $strBinData;
    }
    /**
     * 根据二进制数据获得Crab_Ns_Header对象
     *
     * @param string $strBinData
     * @return Cas_Protocol_NsHeader
     */
    static function createNsHeaderFromBinData($strBinData) {
    	$objPacker =  new Cas_Packer();
    	$objPacker->setData($strBinData);
    	$shortId = $objPacker->unpackInt16();
    	$shortVersion = $objPacker->unpackInt16();
    	$intLogid = $objPacker->unpackInt32();
    	$strProvider = $objPacker->unpackNChar(16);
    	$intMagicNum = $objPacker->unpackInt32();
    	$intReserved = $objPacker->unpackInt32();
    	$intBodyLen = $objPacker->unpackInt32();
		$objNsH = new Cas_Protocol_NsHeader($shortId, $shortVersion, $strProvider, $intMagicNum, $intReserved);
		$objNsH->setBodyLen($intBodyLen);
		$objNsH->setLogid($intLogid);
		return $objNsH;
    }
}

?>