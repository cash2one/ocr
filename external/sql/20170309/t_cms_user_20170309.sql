CREATE TABLE `t_cms_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `uuap_id` bigint(20) NOT NULL COMMENT 'uuap用户id',
  `user_name` varchar(127) NOT NULL DEFAULT '' COMMENT '登录用户名',
  `name` varchar(127) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `email` varchar(127) NOT NULL COMMENT '用户邮箱',
  `employee_number` varchar(20) NOT NULL COMMENT '员工编号',
  `depart_id` bigint(20) NOT NULL COMMENT '部门id',
  `depart_name` varchar(255) NOT NULL DEFAULT '' COMMENT '部门名称',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '用户状态，1为可用 0为不可用',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_email` (`email`) USING BTREE,
  UNIQUE KEY `idx_user_name` (`user_name`) USING BTREE,
  UNIQUE KEY `idx_uuap_id` (`uuap_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';