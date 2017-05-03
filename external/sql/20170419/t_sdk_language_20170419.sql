CREATE TABLE t_sdk_language (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`name` varchar(50) NOT NULL DEFAULT '' COMMENT '语言名称(java,php,等)',
	`icon` varchar(200) NOT NULL DEFAULT '' COMMENT '图标',
	`enable` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用1:可用0:不可用',
	PRIMARY KEY (`id`)
) ENGINE=`Innodb` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='sdk支持语言' CHECKSUM=0 DELAY_KEY_WRITE=0;
