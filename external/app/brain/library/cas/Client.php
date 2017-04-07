<?php
#require_once 'Cas/Info.php';
#require_once 'Cas/Svr/Communicator.php';
#require_once 'Cas/Protocol/CheckResponse.php';
#require_once 'Cas/Protocol/RealStResponse.php';
/**
 * Cas-Client类
 *
 */
class Cas_Client {
	/**
	 * 配置信息
	 *
	 * @var Cas_Info
	 */
	var $_objCasInfo;

	/**
	 * socket验证对象
	 *
	 * @var Cas_Svr_Communicator
	 */
	var $_objSvr;
	/**
	 * 当前成功的ST
	 *
	 * @var string
	 */
	var $_strST;
	/**
	 * 当前成功的ucid
	 *
	 * @var int
	 */
	var $_intUcid;
	
	/**
	 * 构造函数
	 *
	 * @param Cas_Info $objCasInfo
	 */
	function __construct($objCasInfo) {
		$this->Cas_Client($objCasInfo);
	}
	/**
	 * 构造函数
	 *
	 * @param Cas_Info $objCasInfo
	 */
	function Cas_Client($objCasInfo) {
		$this->_objCasInfo = $objCasInfo;
		$arrS = $this->_objCasInfo->getServers();
		$intTout = $this->_objCasInfo->getTimeOut();
		$strSubAppKey = $this->_objCasInfo->getAppKey();
		$this->_objSvr = new Cas_Svr_Communicator($arrS, $strSubAppKey, $intTout);	
	}
	
    /**
     * 校验ST是否合法；
     * 返回值为array类型，值为：
     * 
     * @param strST    来自cookie的ST，如果为NULL，则从URL中获取st参数
     * @return $arrRet 
     * 		array(
     *  		  ucid:int,
     * 			  tag:,//重名
     * 			  appid:,
     * 			  forcechgpwd:,//强制修改密码
     * 			  pwdoverdue:,//密码过期
     * 			  reserve:,含义：4个bits标h识一个含义，最低4bits=强制修改密码；4--8bits=密码过期
     * 		)
     */
    function validate() {
    	$this->_intUcid = 0;
	    $this->_strST = '';
    	//初始化变量
    	$objCheckRes = null;
    	//$strST = '';
    	//$intUcid = 0;
    	$strSTCookieName = $this->_objCasInfo->getCookieSTKey();    	
    	$strUcidCookieName = $this->_objCasInfo->getCookieIDKey();
    	$strRNCookieName = $this->_objCasInfo->getCookieRNKey();
    	$bolIsAutoRedirect = $this->_objCasInfo->isAutoRedirect();    	
    	$intAppid = $this->_objCasInfo->getBizAppid();
    	//$strSubappkey = $this->_objCasInfo->getAppKey();
    	//检查stkey
    	$strSTKeyParamName = $this->_objCasInfo->getStKeyParamName();
    	$strSTKey = $_REQUEST[$strSTKeyParamName];
    	$strSTKey = trim($strSTKey);
    	
    	$strST = $_COOKIE[$strSTCookieName];
    	$intUcid = $_COOKIE[$strUcidCookieName];
    	$intLocalHb = $_COOKIE[$strRNCookieName];
    	
    	Cas_Msg::Log("params:" . "st:" . htmlspecialchars($strST) . ",ucid:" . intval($intUcid) . ",localhb:" . intval($intLocalHb));
    	
    	//处理STKEY
    	if (strlen($strSTKey) > 10 && strlen($strSTKey) < 128) {
    		Cas_Msg::Log("next to get real st");
    		$arrTmp = $this->_objSvr->getRealST($strSTKey, $intAppid);
    		$objNsH = $arrTmp['nsheader'];
    		if ($objNsH!=NULL) {
    			$intRvd = $objNsH->getReserved();
    			if ($intRvd === 0) {   			
	    			$objRealStRes = new Cas_Protocol_RealStResponse($arrTmp['data']);
	    			$strST = $objRealStRes->getSt();
	    			$intUcid = $objRealStRes->getUcid();
    			}
    			Cas_Msg::Log("get real st, reserved is:{$intRvd}");
    		}
    	} elseif (strlen($strSTKey)>0) {
    		$strSTKey = base64_decode(urldecode($strSTKey));
    	}
    	
    	//处理未登录
    	if ( ! $bolIsAutoRedirect 
    		&& (strcmp($strSTKey, "-1") == 0
    			|| (strcmp($strST, "NLI")== 0 && strcmp($intUcid, "0") == 0)) ) {    		
    		Cas_Msg::Log("not login cmd");
    		//检测是否登陆uc
    		$bolIsLogin = false;
    		$strTmpSigninMark = trim($_COOKIE['SIGNIN_UC']);    		
    		if ($strTmpSigninMark) {
    			$strSigninMark = substr($strTmpSigninMark, 0, 32);
    			$intGlobalHeartBeat = substr($strTmpSigninMark, 32, 11);
    			//检测全局heartbeat
    			if (!is_numeric($intGlobalHeartBeat) || $intGlobalHeartBeat<10) {
    				$intGlobalHeartBeat = 1;
    			} else {
    				//校验全局的heartbeat是否合法
    				$intModCheck = ($intGlobalHeartBeat % 10);
    				$intGlobalHeartBeat = intval( ($intGlobalHeartBeat - $intModCheck)/10 );
    				if ($intGlobalHeartBeat%10 != $intModCheck) {
    					$intGlobalHeartBeat = 0;
    					Cas_Msg::Log('heartbeat data error: check' . $intModCheck . ',real:' . $intGlobalHeartBeat);
    				}
    			}
    			//检测本地heartbeat
    			if (!is_numeric($intLocalHb)) {
    				$intLocalHb = 0;
    			}
    			Cas_Msg::Log("heart beat:local:{$intLocalHb}, theglobal:{$intGlobalHeartBeat}");
    			//判断心跳是否不一致，如果不一致则需要跳转去尝试获得登陆状态
    			if (strcmp($strSigninMark, md5("1" . CAS_COOKIE_ENC)) == 0
    				&& $intLocalHb < $intGlobalHeartBeat) {
    					$bolIsLogin = true;
    				//if (strcmp($strSTKey, "-1") == 0) {
    					$intLocalHb = $intGlobalHeartBeat;
    					//@todo 写cookie
    					$this->_writeHeartBeat($intLocalHb);
    				//}
    			//处理用户收藏了某个?castk=LTE%3D的连接，但是的确处于登陆状态的
    			} elseif ($intLocalHb == $intGlobalHeartBeat 
    				&& $intGlobalHeartBeat>0 
    				&& is_numeric($intUcid) 
    				&& $intUcid>0 
    				&& strlen($strST)>10) {
    				
    				Cas_Msg::Log('castk=-1 but cookie has st and ucid, next try to validate');
    				$arrTmp = $this->_objSvr->validateST($intUcid, $intAppid, $strST);
    				$objCheckRes = $this->procValidateResult($intUcid, $strST, $arrTmp);
    				if ($objCheckRes != NULL) {
    					Cas_Msg::Log('castk=-1 but cookie has st and ucid, next try to validate-->success');
    					return $objCheckRes;
    				}
    				Cas_Msg::Log('castk=-1 but cookie has st and ucid, next try to validate-->failed, next write NLI');
    			}
    		}
    		
    		if (!$bolIsLogin) {
	    		if (strcmp($strST, "NLI") !=0 || strcmp($intUcid, "0") !=0) {
	    			$this->_writeCookie("NLI", "0");
	    		}
	    		return  $objCheckRes;
    		}
    	}

    	//验证或跳转
    	if (is_numeric($intUcid) && $intUcid>0 && strlen($strST)>10) {
	    	$arrTmp = $this->_objSvr->validateST($intUcid, $intAppid, $strST);
	    	$objCheckRes = $this->procValidateResult($intUcid, $strST, $arrTmp);
	    	if ($objCheckRes == NULL) {
	    		Cas_Msg::Log("validate failed, response is null" );
	    		$this->gotoJump();
	    	}
	    	Cas_Msg::Log("validate success");
	    	return $objCheckRes;
    	} else {
    		$this->_clearCookie();
    		$this->gotoJump();
    		return $objCheckRes;
    	}
    }
    /**
     * 处理验证结果
     *
     * @param int $intUcid
     * @param string $strST
     * @param array $arrData 验证的结果
     * @return Cas_Protocol_CheckResponse
     */
    function procValidateResult($intUcid, $strST, $arrData) {
    	$objCheckRes = NULL;
    	$strSTCookieName = $this->_objCasInfo->getCookieSTKey();    	
    	$strUcidCookieName = $this->_objCasInfo->getCookieIDKey();
    	if (!is_array($arrData)) {
    		$this->_clearCookie();
	    	return $objCheckRes;
    	}    	
    	$objNsH = $arrData['nsheader'];
	    if ($objNsH == NULL || $objNsH->getReserved() != 0) {
	    	$msg = "";
	    	if ($objNsH) {
	    		$msg = "reserved is:" . $objNsH->getReserved();
	    	} else {
	    		$msg = "nshead is null";
	    	}
	    	Cas_Msg::Log("validate failed:" . $msg);
	    	$this->_clearCookie();
	    	return $objCheckRes;
	    } else {
	    	Cas_Msg::Log(array('msg'=>"validate result:", 'data'=>$arrData['data']));
	    	//处理成功结果
	    	$strCookieST = $_COOKIE[$strSTCookieName];
			$intCookieUcid = $_COOKIE[$strUcidCookieName];
		    if (strcmp($strCookieST, $strST) != 0 || $intUcid != $intCookieUcid) {
		    	$this->_writeCookie($strST, $intUcid);
		    }
		    $this->_intUcid = $intUcid;
		    $this->_strST = $strST;
	    	$objCheckRes = new Cas_Protocol_CheckResponse($arrData['data']);
	    	return $objCheckRes;
	    }
    }
    
    
    /**
     * 确定是否可以使用缓存
     * @return string $strCacheKey
     */
    function canUseCache() {
    	$strST = $this->getCookieST();
    	$intUcid = $this->getCookieUcid();
    	
    	$intAppid = $this->_objCasInfo->getBizAppid();
    	$strSubappkey = $this->_objCasInfo->getAppKey();
    	
    	//检查stkey
    	$strSTKeyParamName = $this->_objCasInfo->getStKeyParamName();
    	$strSTKey = trim($_REQUEST[$strSTKeyParamName]);
    	if (strlen($strSTKey)>0 || strlen($strST)<10 || $intUcid<1) {
			return null;
		} else {
			return md5($strST . $intUcid . $intAppid . $strSubappkey);
		}
    }
    
    function getCookieUcid() {
    	$strUcidCookieName = $this->_objCasInfo->getCookieIDKey();
    	return $_COOKIE[$strUcidCookieName];
    }
    
    function getCookieST() {
    	$strSTCookieName = $this->_objCasInfo->getCookieSTKey();    	
    	return $_COOKIE[$strSTCookieName];
    }
    
    /**
     * 跳转到登陆页
     * @param $strST
     */
    function gotoLogin() {
    	$this->_clearCookie();    	
    	$strUrl = $this->_objCasInfo->getLoginUrl(); 
    	
    	header("Location: {$strUrl}");
    	exit();
    }
    
	/**
     * 跳转到登陆页
     * @param $strST
     */
    function gotoJump() {
    	$this->_clearCookie();    	
    	$strUrl = $this->_objCasInfo->getJumpUrl(); 
    	$strProtocol = 'http';
    	if(strcmp(strtolower($_SERVER['HTTPS']),'on') == 0) {
    		$strProtocol = 'https';
    	}
    	$strReqUrl = $strProtocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    	$strSTKeyParamName = $this->_objCasInfo->getStKeyParamName();
    	$intP = strpos($strReqUrl, "{$strSTKeyParamName}");
    	if ($intP>0) {
    		$strReqUrl = substr($strReqUrl,0,$intP);
    	}
    	
    	$strUrl .= '&u=' . urlencode($strReqUrl);
    	header("Location: {$strUrl}");
    	exit();
    }
    
    /**
     * 从cookie清除st *
     */
    function _clearCookie() {
    	$strSTCookieName = $this->_objCasInfo->getCookieSTKey();    	
    	$strUcidCookieName = $this->_objCasInfo->getCookieIDKey();
    	
    	$strCookiePath = $this->_objCasInfo->getCookiePath();
    	$strCookieDomain = $this->_objCasInfo->getCookieDomain();
    	
    	$strST = $_COOKIE[$strSTCookieName];
    	$intUcid = $_COOKIE[$strUcidCookieName];
    	if ($strST || $intUcid>0) {
    		//删除cookie
    		$_COOKIE[$strSTCookieName] = NULL;
    		$_COOKIE[$strUcidCookieName] = NULL;    		
	    	if ($strCookieDomain) {
	    		setcookie($strSTCookieName, $strST, time() - 100, $strCookiePath, $strCookieDomain);    		
    			setcookie($strUcidCookieName, $intUcid, time() - 100, $strCookiePath, $strCookieDomain); 			
	    	} else {    	
	    		setcookie($strSTCookieName, $strST, time() - 100, $strCookiePath);    		
    			setcookie($strUcidCookieName, $intUcid, time() - 100, $strCookiePath);
	    	}
    	}
    }
    /**
     * 写ST
     *
     * @param string $strST
     */
    function _writeCookie($strST, $intUcid) {
    	$strSTCookieName = $this->_objCasInfo->getCookieSTKey();    	
    	$strUcidCookieName = $this->_objCasInfo->getCookieIDKey();
    	
    	$strCookiePath = $this->_objCasInfo->getCookiePath();
    	$strCookieDomain = $this->_objCasInfo->getCookieDomain();
    	if ($strCookieDomain) {
    		setcookie($strSTCookieName, $strST, NULL, $strCookiePath, $strCookieDomain);
    		setcookie($strUcidCookieName, $intUcid, NULL, $strCookiePath, $strCookieDomain);
    	} else {    	
    		setcookie($strSTCookieName, $strST, NULL, $strCookiePath);
    		setcookie($strUcidCookieName, $intUcid, NULL, $strCookiePath);
    	}
    	$_COOKIE[$strSTCookieName] = $strST;
    	$_COOKIE[$strUcidCookieName] = $intUcid;
    }
 	/**
     * 写HeartBeat心跳
     *
     * @param int $intHb
     */
    function _writeHeartBeat($intHb) {
    	if (!is_numeric($intHb) || $intHb<1) {
    		return;
    	}
    	$strHbCookieName = $this->_objCasInfo->getCookieRNKey();
    	
    	$strCookiePath = $this->_objCasInfo->getCookiePath();
    	$strCookieDomain = $this->_objCasInfo->getCookieDomain();
    	if ($strCookieDomain) {
    		setcookie($strHbCookieName, $intHb, NULL, $strCookiePath, $strCookieDomain);
    	} else {    	
    		setcookie($strHbCookieName, $intHb, NULL, $strCookiePath);
    	}
    	$_COOKIE[$strHbCookieName] = $intHb;
    }
}
