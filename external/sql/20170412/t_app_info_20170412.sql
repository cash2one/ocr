CREATE TABLE t_app_info (
	`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
	`file_name` varchar(256) NOT NULL DEFAULT '' COMMENT '文件名',
	`version_name` varchar(256) NOT NULL DEFAULT '' COMMENT '版本号',
	`version_code` int(11) NOT NULL DEFAULT 0 COMMENT '版本编号，最大的为最新版本',
	`url` varchar(256) NOT NULL DEFAULT '' COMMENT '文件下载地址',
	`op_sys` smallint(6) NOT NULL DEFAULT 0 COMMENT '0:android，1:IOS',
	`md5` varchar(32) NOT NULL DEFAULT '' COMMENT '文件md5值',
	`file_size` int(11) NOT NULL DEFAULT 0 COMMENT '文件大小单位KB',
	`status` smallint(6) NOT NULL DEFAULT 0 COMMENT '是否有效0:有效 1:有效',
	`update_time` date NOT NULL COMMENT '更新时间',
	`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传时间',
	PRIMARY KEY (`id`),
	INDEX `idx_version_name` USING BTREE (`version_name`(255)) ,
	INDEX `idx_op_sys` USING BTREE (`op_sys`) ,
	INDEX `idx_status` USING BTREE (`status`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=COMPACT COMMENT='app上传下载表' CHECKSUM=0 DELAY_KEY_WRITE=0;