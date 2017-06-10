ALTER TABLE t_news ADD
(`show_index` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否首页展示',
`index_order` tinyint(2) NOT NULL DEFAULT 0 COMMENT '首页显示顺序',
`banner` varchar(255) NOT NULL DEFAULT '' COMMENT 'banner图地址',
`status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0保存,1发布');