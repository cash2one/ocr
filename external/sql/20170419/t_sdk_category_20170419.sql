CREATE TABLE t_sdk_category (
	`id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`pid` bigint(10) NOT NULL DEFAULT -1 COMMENT '父ID',
	`cat_name` varchar(50) NOT NULL DEFAULT '' COMMENT '名称',
	`cat_key` varchar(50) NOT NULL DEFAULT '' COMMENT '关键字(例如sdk-category-nlp)',
	`show_order` bigint(10) NOT NULL DEFAULT 0 COMMENT '显示顺序',
	`enable` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用 1可用，0不可用',
	`icon` varchar(200) NOT NULL DEFAULT '' COMMENT '图标',
	PRIMARY KEY (`id`)
) ENGINE=`Innodb` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='sdk分类' CHECKSUM=0 DELAY_KEY_WRITE=0;