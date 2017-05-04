CREATE TABLE t_sdk (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`name` varchar(50) NOT NULL DEFAULT '' COMMENT 'sdk名称',
	`abs` varchar(100) NOT NULL DEFAULT '' COMMENT '简介',
	`version` bigint(10) NOT NULL DEFAULT 1000100 COMMENT '版本',
	`file_path` varchar(500) NOT NULL DEFAULT '' COMMENT '下载地址',
	`pub_time` bigint(10) NOT NULL DEFAULT 0 COMMENT '发布时间',
	`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
	`icon` varchar(200) NOT NULL DEFAULT '' COMMENT '图标',
	`category` bigint(10) NOT NULL DEFAULT 0 COMMENT '分类',
	`language` bigint(10) NOT NULL DEFAULT 0 COMMENT '语言',
	`enable` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用1:可用0:不可用',
	PRIMARY KEY (`id`)
) ENGINE=`Innodb` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='SDK 表' CHECKSUM=0 DELAY_KEY_WRITE=0;