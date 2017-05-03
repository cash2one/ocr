CREATE TABLE t_doc_category (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`file_id` bigint(10) NOT NULL DEFAULT 0 COMMENT '文件ID',
	`file_path` varchar(500) NOT NULL DEFAULT '' COMMENT '文件路径',
	`uptime_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
	`status` int(2) NOT NULL DEFAULT 0 COMMENT '0未发布，0发布',
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=COMPACT COMMENT='文档目录' CHECKSUM=0 DELAY_KEY_WRITE=0;
