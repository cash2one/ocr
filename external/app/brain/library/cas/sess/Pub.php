<?php
require_once(dirname(__FILE__).'/../svr/Communicator.php)');
/**
 * 共有session类
 *
 */
class Cas_Sess_Pub {
	var $arrServers;
	var $intTimeout;
	var $strAppKey;
	var $objSvr;

    /**
     * Cas_Sess_Pub constructor.
     * @param $arrS
     * @param string $strAppKey
     * @param int $intTmOut
     */
	function __construct($arrS, $strAppKey = '', $intTmOut = 1000) {
		$this->Cas_Sess_Pub($arrS, $strAppKey, $intTmOut);
	}

    /**
     * @param $arrS
     * @param string $strAppKey
     * @param int $intTmOut
     */
	function Cas_Sess_Pub($arrS, $strAppKey = '', $intTmOut = 1000) {
		$this->arrServers = $arrS;
		$this->intTimeout = $intTmOut;
		$this->strAppKey = $strAppKey;
		$this->objSvr = new Cas_Svr_Communicator($arrS,$strAppKey, $intTmOut);
	}

    /**
     * @param $strKey
     * @return mixed
     */
	function getData($strKey) {
		$arrData = $this->objSvr->getPubSessData($strKey);
		return $arrData['buffer'];
	}

    /**
     * @param $strKey
     * @param $strData
     * @return mixed
     */
	function setData($strKey, $strData) {
		return $this->objSvr->setPubSessData($strKey, $strData);
	}

    /**
     * @param $strKey
     * @return mixed
     */
	function unsetData($strKey) {
		return $this->objSvr->unsetPubSessData($strKey);
	}
}

?>