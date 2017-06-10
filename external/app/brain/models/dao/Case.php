<?php
/**
 * @file Case.php
 * @author xuyifei(xuyifei@baidu.com)
 * @date 2016/11/28 16:00:00
 * @brief 
 *  
 **/

class Dao_Case extends Dao_Base {

    // 表名
    private $strTable;

    // 默认字段
    private $arrDefaultFields = array(
        'id',
        'status',
        'username',
        'company',
        'phone',
        'contactway',
        'content',
        'tech',
        'create_time',
        'json_content',
    );

    /**
     * @brief 连接db，表名初始化
     *
     * @return  null
     *
     * @date 2015/07/20 20:00:24
     **/
    public function __construct() {
        parent::__construct();
        $this->strTable = 't_user_case';
    }

    /**
     * insertCase 
     * 
     * @param mixed $strUsername 
     * @param mixed $strCompany 
     * @param mixed $strPhone 
     * @param mixed $strContent 
     * @param mixed $strContactway
     * @param mixed $strTech 
     * @access public
     * @return void
     */
    public function insertCase($strUsername, $strCompany, $strPhone, $strContent, $strContactway, $strTech, $jsonContent) {
        $arrRow = array(
            'username' => $strUsername,
            'company' => $strCompany,
            'phone' => $strPhone,
            'content' => $strContent,
            'contactway' => $strContactway,
            'tech' => $strTech,
            'create_time' => date('Y-m-d H:i:s',time()),
            'json_content' =>$jsonContent,
        );  
        $arrOptions = null;
        $arrOnDup = $arrRow;
        $strSQL = $this->objSQLAssember->getInsert($this->strTable, $arrRow, $arrOptions, $arrOnDup);
        Bd_Log::addNotice('insert', $strSQL);
        $arrDBRet = $this->objDB->query($strSQL);
        if ($arrDBRet === false) {
            throw new Exception('query failed', Lib_Const::ERRORNO_DB_QUERY_FAILED);
        } else {
            $strConnId = '' . $this->objDB->getInsertId();
            return $strConnId;
        } 
    }

    /**
     * sendCase
     * 
     * @param mixed $caseId
     * @access public
     * @return void
     */
    public function sendCase($caseId) {
        $data_case = $this->getSubscribe($caseId);
        $data_con = $data_case[0]['json_content'];
        $data_content = Bd_String::json_decode($data_con, true);
        Bd_Log::addNotice('data_content', $data_content);
        $title = '[No.-'. str_pad($caseId, 4, "0", STR_PAD_LEFT) .'-'.$data_content["company"].']';
        $subject = " 
            <style type=\"text/css\">

            .msgtable {
                width: 810px;
                font-size: 14px;
            }
            table {
                border-collapse: collapse;
                empty-cells: show;
            }
            .msgtable th {
                background-color: #F3F3F3;
            }
            .msgtable th {
                border: 1px solid #BBBBBB;
                font-weight: 700;
                padding: 4px;
            }

            .msgtable td {
                border: 1px solid #BBBBBB;
                padding: 4px;
            }

            ul.nav li {
                border-left: 5px solid #FF9000;
                display: inline;
                font-size: 18px;
                font-weight: bold;
                margin: 0 40px;
                padding-left: 15px;
            }
            </style>
            <table border='0' cellspacing='0' cellpadding='0'  class='msgtable'>
                <tr>
                     <th colspan='4'>$title</th>
                </tr>
                <tr>
                    <th>意向技术:</th>
                    <td>{$data_content['tech']}</td>
                    <th>咨询时间:</th>
                    <td>{$data_case[0]['create_time']}</td>
                </tr>
                <tr>
                    <th>客户公司:</th>
                    <td>{$data_content['company']}</td>
                    <th>客户称呼:</th>
                    <td>{$data_content['username']}</td>
                </tr>
                <tr>
                    <th>公司网址:</th>
                    <td>{$data_content['siteUrl']}</td>
                    <th>来源网址</th>
                    <td>{$data_content['urlFrom']}</td>
                </tr>
                <tr>
                    <th>联系电话:</th>
                    <td>{$data_content['phone']}</td>
                    <th>邮箱:</th>
                    <td>{$data_content['email']}</td>
                </tr>
                <tr>
                    <th>行业:</th>
                    <td>{$data_content['trade']}</td>
                </tr>
                <tr>
                    <td colspan='4'>
                        <p><strong><span style=\"font-family:宋体\">业务介绍：</span></strong></p>
                        <p><span>
                            {$data_content['business']}
                        </span></p>
                    </td>
                </tr>
                <tr>
                    <td colspan='4'>
                        <p><strong><span style=\"font - family:宋体\">需求介绍：</span></strong></p>
                        <p><span>
                            {$data_content['requirement']}
                        </span></p>
                    </td>
                </tr>
            </table>
        ";
        $smtp = new Bd_Smtp();
        $smtp->setFrom('ai-news@baidu.com');
        $case_send_mail = Bd_Conf::getAppConf('case_send_mail');
        $address = isset($case_send_mail) ? $case_send_mail['address'] : 'ai@baidu.com';
        $smtp->addAddress($address);
        $smtp->send($title, $subject);
    }

    /**
     * getCase 
     * 
     * @param mixed $caseId 
     * @access public
     * @return void
     */
    public function getSubscribe($caseId) {
        $arrFields = $this->arrDefaultFields;
        $arrConds = array(
            'id=' => $caseId,
        );
        $arrOptions = null;
        $arrAppends = array(
            'limit 1',
        );

        $strSQL = $this->objSQLAssember->getSelect($this->strTable, $arrFields, $arrConds, $arrOptions, $arrAppends);

        $arrDBRet = $this->query($strSQL);

        return $arrDBRet;
    }

}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=120: */
