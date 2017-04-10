<?php
require_once(dirname(__FILE__).'/../Svr/Communicator.php)';
/**
 * 共有session类
 *
 */
class Cas_Sess_Pub {
	var $arrServers;
	var $intTimeout;
	var $strAppKey;
	var $objSvr;
	
	function __construct($arrS, $strAppKey = '', $intTmOut = 1000) {
		$this->Cas_Sess_Pub($arrS, $strAppKey, $intTmOut);
	}
	
	function Cas_Sess_Pub($arrS, $strAppKey = '', $intTmOut = 1000) {
		$this->arrServers = $arrS;
		$this->intTimeout = $intTmOut;
		$this->strAppKey = $strAppKey;
		$this->objSvr = new Cas_Svr_Communicator($arrS,$strAppKey, $intTmOut);
	}
	
	function getData($strKey) {
		$arrData = $this->objSvr->getPubSessData($strKey);
		return $arrData['buffer'];
	}
	function setData($strKey, $strData) {
		return $this->objSvr->setPubSessData($strKey, $strData);
	}
	function unsetData($strKey) {
		return $this->objSvr->unsetPubSessData($strKey);
	}
}

?>