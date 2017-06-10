CREATE TABLE `t_cms_session_ticket` (
  `session_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `session_ticket` varchar(36) NOT NULL DEFAULT '' COMMENT 'ticket',
  `user_name` varchar(100) NOT NULL DEFAULT '' COMMENT '用户名',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态 0 为不可用，1为可用',
  `add_time` bigint(14) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `expire_time` bigint(14) NOT NULL DEFAULT '0' COMMENT '过期时间',
  PRIMARY KEY (`session_id`),
  KEY `idx_session_ticket` (`session_ticket`) USING BTREE,
  KEY `idx_user_name` (`user_name`,`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户登录信息';