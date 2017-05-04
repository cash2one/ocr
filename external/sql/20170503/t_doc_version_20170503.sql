CREATE TABLE t_doc_version (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`version` bigint(14) NOT NULL DEFAULT 0 COMMENT '版本',
	`status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态 0未发布，1发布',
	`update_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
	`update_user` varchar(100) NOT NULL DEFAULT '' COMMENT '更新人',
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=COMPACT COMMENT='文档版本管理' CHECKSUM=0 DELAY_KEY_WRITE=0;