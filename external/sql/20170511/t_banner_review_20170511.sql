CREATE TABLE t_banner_review (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`version` bigint(13) NOT NULL DEFAULT 0 COMMENT '版本',
	`status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0:未发布 1:发布',
	`value` varchar(6000) NOT NULL DEFAULT '' COMMENT 'banner 值',
	`update_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
	`update_by` varchar(200) NOT NULL DEFAULT '' COMMENT '更新人',
	`dis_order` int(2) NOT NULL DEFAULT 0 COMMENT '显示顺序',
	`template_code` varchar(50) NOT NULL DEFAULT 'common' COMMENT '模板code',
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=COMPACT COMMENT='banner图管理' CHECKSUM=0 DELAY_KEY_WRITE=0;