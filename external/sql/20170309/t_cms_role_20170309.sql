CREATE TABLE `t_cms_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(50) NOT NULL COMMENT '角色名称',
  `platform` varchar(255) NOT NULL DEFAULT 'cms' COMMENT '平台名称',
  `enable` smallint(6) NOT NULL DEFAULT '0' COMMENT '是否启用(0:启用,1:关闭)',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8 COMMENT='角色表';