CREATE TABLE `t_news_tag` (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`news_id` bigint(10) NOT NULL DEFAULT 0 COMMENT '新闻Id',
	`tag_id` bigint(10) NOT NULL DEFAULT 0 COMMENT 'tagId',
	PRIMARY KEY (`id`),
	INDEX `idx_news_id` USING BTREE (`news_id`) ,
	INDEX `idx_tags_id` USING BTREE (`tag_id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=FIXED COMMENT='新闻标签关系表' CHECKSUM=0 DELAY_KEY_WRITE=0;