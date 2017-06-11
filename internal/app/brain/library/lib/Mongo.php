<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
/**
 * @file Mongo.php
 * @author huanglinhao(huanglinhao@baidu.com)
 * @date 2016/05/05 10:37:08
 * @brief 单例
 *  
 **/

class Lib_Mongo {

    /*
     * mdb 实例
     */
    private static $mdbInstance;

    /*
     * mdb客户端
     */
    private static $mdbClient;

    /*
     * db
     */
    private static $mdbDB;

    /*
     * 集合 
     */
    private static $mdbCollection;

    /**
     * @brief 私有化构造函数
     *
     * @return  private function 
     *
     * @param db mdb name
     * 
     * @param user 用户名
     * 
     * @param pwd 密码
     * @author huanglinhao
     *
     * @date 2016/05/05 10:39:19
    **/
    private function __construct($db, $user, $pwd, $collection) {
        $dbConf = Bd_Conf::getAppConf('mongo');
        if (empty($dbConf)) {
            throw new Exception('mdb connection conf error', Lib_Const::MDB_ERR_CONF);
        }
        $strHostList = implode(',', $dbConf['server']['host']);
        $server = $dbConf['server']['scheme'] . $strHostList;

        if (empty($db) || empty($user) || empty($pwd)) {
            $arrOptions['db'] = $dbConf['options']['db'];
        } else {
            $arrOptions['db'] = $db;

        }
        if (empty($user) || empty($pwd)) {
            $arrOptions['username'] = $dbConf['options']['username'];
            $arrOptions['password'] = $dbConf['options']['password'];
        } else {
            $arrOptions['username'] = $user;
            $arrOptions['password'] = $pwd;
        }

        if (empty($arrOptions['username']) || empty($arrOptions['password'])) {
            unset($arrOptions['username']);
            unset($arrOptions['password']);
        }

        self::$mdbClient = new MongoClient($server, $arrOptions);
        self::$mdbDB = self::selectDB($db);
        self::$mdbCollection = self::selectCollection($db, $collection);

    }

    /**
     * @brief 私有化克隆方法
     *
     * @return  private function 
     *
     * @author huanglinhao
     *
     * @date 2016/05/05 10:39:46
    **/
    private function __clone() {
    }

    /**
     * @brief 获取mdb单例
     *
     * @return  public function 
     * 
     * @param db db name
     *
     * @param user 用户名
     *
     * @param pwd 密码
     * @author huanglinhao
     *
     * @date 2016/05/05 10:42:48
    **/
    public static function getInstance($db = '', $user = '', $pwd = '', $collection = '') {
        if (!(self::$mdbInstance instanceof self)) {
            try {
                self::$mdbInstance = new Lib_Mongo($db, $user, $pwd, $collection);;
            } catch (Exception $e) {
                throw new Exception($e->getMessage(), $e->getCode());
            }
        } else {
            self::selectCollection($db, $collection);
        }
        return self::$mdbInstance;
    }

    /**
     * @brief db连接
     *
     * @return  public function 
     *
     * @author huanglinhao
     *
     * @date 2016/05/05 11:25:47
    **/
    public function connect() {
        return self::$mdbClient->connect();
    }


    /**
     * @brief 选择db
     *
     * @return  public function 
     *
     * @param db : db name 
     *
     * @author huanglinhao
     *
     * @date 2016/05/05 11:33:12
    **/
    public function selectDB($db) {
        self::$mdbDB = self::$mdbClient->$db;
        return self::$mdbDB;
    }

    /**
     * @brief 选择集合
     *
     * @param $db   : db name
     *
     * @param $collection   :  collection name 
     *
     * @return  public function 
     *
     * @author huanglinhao
     *
     * @date 2016/05/05 11:33:26
    **/
    public function selectCollection($db, $collection) {
        self::$mdbCollection = self::$mdbClient->$db->$collection;
        return self::$mdbCollection;
    }

    /**
     * @brief 选择db执行非CRUD操作
     *
     * @param [in/out] $db   :  操作数据库
     * @param [in/out] $command   : 命令
     * @param [in/out] $options   : 选项
     *
     * @return  array
     *
     * @author huanglinhao
     *
     * @date 2016/05/05 14:40:06
    **/
    public function command($command, $options = array()) {
        return self::$mdbDB->command($command, $options);
    }

    /**
     * @brief 返回集合中的文档数量
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $query   : 
     * @param [in/out] $limit   : 
     * @param [in/out] $skip   : 
     * @return  int
     * @author huanglinhao
     * @date 2016/05/08 13:08:31
    **/
    public function count($query = array(), $limit = 0, $skip = 0)  {
        return self::$mdbCollection->count($query, $limit, $skip);
    }
    
    /**
     * @brief 创建数据库引用
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $documentOrId   : 
     * @return  array
     *
     * @author 
     * @date 2016/05/08 13:09:13
    **/
    public function createDBRef($documentOrId) {
        return self::$mdbCollection->createDBRef($documentOrId);
    }

    /**
     * @brief 插入一条记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $arrValue   : 
     * @param [in/out] $arrOptions   : 
     * @return  bool
     *
     * @author 
     *
     * @date 2016/05/08 13:14:08
    **/
    public function insert($arrValue, $arrOptions) {
        return self::$mdbCollection->insert($arrValue, $arrOptions);
    }

    /**
     * @brief 批量插入多条记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $arrValue   : 
     * @param [in/out] $arrOptions   : 
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:15:30
    **/
    public function batchInsert($arrValue, $arrOptions) {
        return self::$mdbCollection->batchInsert($arrValue, $arrOptions);
    }

    /**
     * @brief 删除满足条件的记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $arrConds   : 
     * @param [in/out] $arrOptions   : 
     * @return  array or bool
     *
     * @author 
     *
     * @date 2016/05/08 13:22:54
    **/
    public function delete($arrConds, $arrOptions) {
        return self::$mdbCollection->remove($arrConds, $arrOptions);
    }

    /**
     * @brief 更新满足条件的记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $arrConds   : 
     * @param [in/out] $arrValue   : 
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:24:58
    **/
    public function update($arrConds, $arrValue, $arrOptions) {
        return self::$mdbCollection->update($arrConds, $arrValue, $arrOptions);
    }

    /**
     * @brief 更新并返回记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $query   : 
     * @param [in/out] $update   : 
     * @param [in/out] $arrFields   : 
     * @param [in/out] $arrOptions   : 
     * @return  array
     *
     * @author 
     *
     * @date 2016/05/08 13:29:24
    **/
    public function updateAndFind($query, $update = array(), $arrFields = array(), $arrOptions = array()) {
        return self::$mdbCollection->findAndModify($query, $update, $arrFields, $arrOptions);
    }

    /**
     * @brief 查找返回满足条件的记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $query   : 
     * @param [in/out] $fields   : 
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:31:13
    **/
    public function find($query = array(), $fields = array()) {
        return self::$mdbCollection->find($query, $fields);
    }

    /**
     * @brief 返回满足查询条件的记录数
     *
     * @param [in] $query   : 
     * @param [in] $fields   : 
     *
     * @return int 
     *
     * @author huanglinhao
     * @date 2016/05/17 10:59:31
    **/
    public function findCount($query = array(), $fields = array()) {
        return self::find($query, $fields)->count();
    }

    /**
     * @brief 返回最多limit条记录数
     *
     * @param [in] $limit   : int
     * @param [in] $query   : 
     * @param [in] $fields   : 
     * @return MongoCursor object
     *
     * @author huanglinhao
     * @date 2016/05/17 11:00:25
    **/
    public function findLimit(int $limit, $query = array(), $fields = array()) {
        return self::find($query, $fields)->limit((int) $limit);
    }

    /**
     * @brief 查找结果按照sortConds排序
     *
     * @param [in] $query   : 
     * @param [in] $fields   : 
     * @param [in] $sortConds   : array('fields' => 1/-1), 对应fields按照升序/降序排序
     * @return  MongoCursor object
     *
     * @author huanglinhao
     * @date 2016/05/17 11:10:27
    **/
    public function findSort($sortConds, $query = array(), $fields = array()) {
        return self::find($query, $fields)->sort($sortConds);
    }

    /**
     * @brief 查找返回一条满足条件的记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $query   : 
     * @param [in/out] $fields   : 
     * @param [in/out] $arrOptions   : 
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:33:36
    **/
    public function findOne($query = array(), $fields = array(), $arrOptions = array()) {
        return self::$mdbCollection->findOne($query, $fields, $arrOptions);
    }

    /**
     * @brief 更新或新增一条记录
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $arrValue   : 
     * @param [in/out] $arrOptions   : 
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:35:43
    **/
    public function save($arrValue, $arrOptions) {
        return self::$mdbCollection->save($arrValue, $arrOptions);
    }

    /**
     * @brief 创建索引
     *
     * @param [in/out] $db   : 
     * @param [in/out] $collection   : 
     * @param [in/out] $arrKeys   : 
     * @param [in/out] $arrOptions   : 
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:39:42
    **/
    public function createIndex($arrKeys, $arrOptions = array()) {
        return self::$mdbCollection->createIndex($arrKeys, $arrOptions);
    }

    /**
     * @brief 删除一个索引
     *
     * @param arrKeys 索引键值
     *
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:50:20
    **/
    public function deleteIndex($arrKeys) {
        return self::$mdbCollection->deleteIndex($arrKeys);
    }

    /**
     * @brief 删除集合的所有索引
     *
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:50:31
    **/
    public function deleteIndexes() {
        return self::$mdbCollection->deleteIndexes();
    }

    /**
     * @brief 删除集合
     *
     * @return  public function 
     *
     * @author 
     *
     * @date 2016/05/08 13:51:10
    **/
    public function drop() {
        return self::$mdbCollection->drop();
    }

    /**
     * @brief  获取表名
     *
     * @return string
     *
     * @author huanglinhao
     * @date 2016/05/26 10:51:40
    **/
    public function getName() {
        return self::$mdbCollection->getName();
    }
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=80: */
