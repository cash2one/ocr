CREATE TABLE t_doc (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`version` bigint(13) NOT NULL DEFAULT 0 COMMENT '版本',
	`json_path` varchar(200) NOT NULL DEFAULT '' COMMENT 'json路径',
	`file_path` varchar(500) NOT NULL DEFAULT '' COMMENT '文件地址',
	`file_id` bigint(10) NOT NULL DEFAULT 0 COMMENT '文件ID',
	PRIMARY KEY (`id`),
	INDEX `idx_version_json_path` USING BTREE (`version`, `json_path`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=COMPACT COMMENT='文档' CHECKSUM=0 DELAY_KEY_WRITE=0;
