CREATE TABLE t_sdk_log (
	`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`uc_id` varchar(255) NOT NULL DEFAULT '' COMMENT 'UC帐号ID',
	`pass_id` varchar(255) NOT NULL DEFAULT '' COMMENT 'passport帐号ID',
	`service_type` smallint(6) NOT NULL DEFAULT 0 COMMENT '0:ocr,1:face,2:nlp,3:antiporn',
	`language` smallint(6) NOT NULL DEFAULT 0 COMMENT '0:java,1:php,2:python,3:Android,4:IOS',
	`create_time` date NOT NULL COMMENT '创建时间',
	PRIMARY KEY (`id`),
	INDEX `idx_language` USING BTREE (`language`) ,
	INDEX `idx_service_type` USING BTREE (`service_type`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=COMPACT COMMENT='sdk 下载日志表' CHECKSUM=0 DELAY_KEY_WRITE=0;