<?php
#require_once 'Cas/Protocol.php';
class Cas_Protocol_RealStResponse extends Cas_Protocol {

	var $st;	// 真实st
	var $ucid;	// 用户id
    /**
     * @return string
     */
    function getSt() {
        return $this->st;
    }

    /**
     * @return int
     */
    function getUcid() {
        return $this->ucid;
    }	
}
