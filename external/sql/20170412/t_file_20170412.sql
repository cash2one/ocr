CREATE TABLE `t_file` (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`file_key` varchar(50) NOT NULL DEFAULT '' COMMENT '文件存储在bos的key',
	`type` tinyint(2) NOT NULL DEFAULT 1 COMMENT '1:图片,2:文件',
	`mete_data` varchar(500) NOT NULL DEFAULT '' COMMENT '文件信息',
	`name` varchar(200) NOT NULL DEFAULT '' COMMENT '文件名',
	`md5` varchar(32) NOT NULL DEFAULT '' COMMENT '文件的MD5值',
	`content_type` varchar(50) NOT NULL DEFAULT '' COMMENT '文件类型',
	`file_size` bigint(10) NOT NULL DEFAULT 0 COMMENT '文件大小',
	PRIMARY KEY (`id`),
	INDEX `idx_file_key` USING BTREE (`file_key`) ,
	INDEX `idx_file_md5` USING BTREE (`md5`)
) ENGINE=`Innodb` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='文件管理' CHECKSUM=0 DELAY_KEY_WRITE=0;