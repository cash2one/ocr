<?php
/**
 * @author fushiguang
 * 打包/解包的父类
 */
class Cas_Packer {
    var $_strData; // 数据
    var $_intDataLen; //数据长度
    var $_intPos; //数据指针
    var $_bolLittleEndian; //小端    
    
	/**
     * 构造函数
     *
     * @param bool $bolLittleEndian 告知 packer 处理数据的方式
     */
    function __construct($bolLittleEndian = true) {
        $this->Cas_Packer($bolLittleEndian);
    }
    /**
     * 构造函数
     *
     * @param bool $bolLittleEndian 告知 packer 处理数据的方式
     */
    function Cas_Packer($bolLittleEndian = true) {
        $this->clearData();
        $this->_bolLittleEndian = $bolLittleEndian;
    }
/**
     * 获得数据
     *
     * @return string
     */
    function getData() {
        return $this->_strData;
    }
    /**
     * 获得数据长度
     *
     * @return int
     */
    function getLen() {
        return $this->_intDataLen;
    }
    /**
     * 获得当前解包时的处理位置
     *
     * @return int
     */
    function getPos() {
        return $this->_intPos;
    }
    /**
     * 设置解包时的处理位置
     *
     * @param int $iPos
     */
    function setPos($iPos) {
        if ($iPos < $this->_intDataLen) {
            $this->_intPos = $iPos;
        }
    }
    /**
     * 获得剩下数据长度
     *
     * @return int
     */
    function getRemainLen() {
        return $this->_intDataLen - $this->_intPos;
    }
    /**
     * 获得剩下的数据
     * 用在解包时
     * @return string
     */
    function getRemainData() {
        if ($this->_intPos < $this->_intDataLen) {
            $intLen = $this->_intDataLen - $this->_intPos;
            return substr($this->_strData, $this->_intPos, $intLen);
        } else {
            return '';
        }
    }
    /**
     * 设置需要处理的数据
     *
     * @param string $strData
     */
    function setData($strData) {
        $this->clearData();
        $this->_strData = $strData;
        $this->_intDataLen = strlen($strData);
    }
    /**
     * 清除数据
     */
    function clearData() {
        $this->_strData = '';
        $this->_intPos = 0;
        $this->_intDataLen = 0;
    }
    /**
     * 打包8bit数据
     *
     * @param tinyint $intVal8
     */
    function packInt8($intVal8) {
        $intVal8 = chr($intVal8);
        $intVal8 = pack('a', $intVal8);
        $this->_strData.= $intVal8;
        $this->_intDataLen+= 1;
    }
    /**
     * 打包16bit数据
     *
     * @param smallint $intVal16
     */
    function packInt16($intVal16) {
        $this->_strData.= pack('S', $intVal16);
        $this->_intDataLen+= 2;
    }
    /**
     * 打包int数据
     *
     * @param unknown_type $intVal32
     */
    function packInt32($intVal32) {
        $this->_strData.= pack('I', $intVal32);
        $this->_intDataLen+= 4;
    }
    /**
     * 打包int64数据
     *
     * @param long $intVal64
     */
    function packInt64($intVal64) {
        $intH32 = (($intVal32 >> 32) & (0x00000000FFFFFFFF));
        $intH32 = intval($intH32);
        $intL32 = (($intVal32) & (0x00000000FFFFFFFF));
        $intL32 = intval($intL32);
        if ($this->_bolLittleEndian) { //little endian
            $this->_strData.= pack('V', $intL32);
            $this->_strData.= pack('V', $intH32);
        } else { //big endian
            $this->_strData.= pack('N', $intH32);
            $this->_strData.= pack('N', $intL32);
        }
        $this->_intDataLen+= 8;
    }
    /**
     * 打包n个字符数据
     *
     * @param string $strValue
     * @param int $intNum 长度
     */
    function packNChar($strValue, $intNum) {
        $this->_strData.= pack('a' . $intNum, $strValue);
        $this->_intDataLen+= $intNum;
    }
    /**
     * 解包n个字符
     *
     * @param int $intN 长度
     * @return string trimed
     */
    function unpackNChar($intN) {
        $strTmpData = substr($this->_strData, $this->_intPos, $intN);
        $this->_intPos+= $intN;
        $arrData = unpack("C*", $strTmpData);
        $strResData = '';
        foreach ($arrData as $data) {
            $strResData.= chr($data);
        }
        return trim($strResData);
    }
    /**
     * 解包8bit数据
     *
     * @return tinyint
     */
    function unpackInt8() {
        $strTmpData = substr($this->_strData, $this->_intPos, 1);
        $strTmpData = unpack('a', $strTmpData);
        $this->_intPos++;
        $intR8 = $strTmpData[1];
        $intR8 = ord($intR8);
        return $intR8;
    }
    /**
     * 解包smallint
     *
     * @return smallint
     */
    function unpackInt16() {
        $strTmp = substr($this->_strData, $this->_intPos, 2);
        $this->_intPos+= 2;
        $arrData = unpack("S", $strTmp);
        return $arrData[1];
    }
    /**
     * 解包int
     *
     * @return int
     */
    function unpackInt32() {
        $strTmpData = substr($this->_strData, $this->_intPos, 4);
        $this->_intPos+= 4;
        $arrData = unpack("I", $strTmpData);
        return $arrData[1];
    }
    /**
     * 解包int64数据
     *
     * @return long $intVal64
     */
    function unpackInt64() {
        $strLData = substr($this->_strData, $this->_intPos, 4);
        $this->_intPos+= 4;
        $strHData = substr($this->_strData, $this->_intPos, 4);
        $this->_intPos+= 4;
        $intR64 = 0;
        if ($this->_bolLittleEndian) { //little endian
            $arr = unpack('VL32', $strLData);
            $intL32 = $arr[L32];
            $arr = unpack('VH32', $strHData);
            $intH32 = $arr[H32];
            $intR64 = (($intH32 << 32) & (0xFFFFFFFF00000000));
            $intR64+= $intL32;
            return $intR64;
        } else { //big endian
            $arr = unpack('NH32', $strLData);
            $intH32 = $arr[H32];
            $arr = unpack('NL32', $strHData);
            $intL32 = $arr[L32];
            $intR64 = (($intH32 << 32) & (0xFFFFFFFF00000000));
            $intR64+= $intL32;
            return $intR64;
        }
    }
}
