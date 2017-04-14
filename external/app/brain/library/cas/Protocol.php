<?php

class Cas_Protocol {
	
	var $_arrAssocData;

    /**
     * Cas_Protocol constructor.
     * @param $arrData
     */
    function __construct($arrData) {    	
    	$this->Cas_Protocol($arrData);
    }

    /**
     * @param $arrData
     */
    function Cas_Protocol($arrData) {
    	if (!is_array($arrData) || count($arrData)<1) {
    		$this->_arrAssocData = array();
    	} else {
    		$this->_arrAssocData = $arrData;
    		foreach ($arrData as $k=>$v) {
    			$this->$k = $v;
    		}
    	}
    }
    
    /**
     * 获得返回的域
     *
     * @param string $strKey
     * @return mix
     */
    function getField($strKey) {
    	$strKey = trim($strKey);
    	if (strlen($strKey)>0 && array_key_exists($strKey, $this->_arrAssocData)) {
    		return $this->_arrAssocData[$strKey];
    	} else {
    		return null;
    	}
    }
    /**
     * 把数据转换成mcpack格式
     * @return string
     */
    function toMcpackString() {    	
    	$strDataToSend = mc_pack_array2pack($this->_arrAssocData);
    	return $strDataToSend;
    }
}

