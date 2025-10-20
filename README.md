# myvue1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### table query(mysql)
```
CREATE TABLE `profile` (
  `id` double NOT NULL AUTO_INCREMENT,
  `data_type` varchar(1) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '데이터 타입',
  `content` varchar(100) COLLATE utf8mb3_bin DEFAULT NULL COMMENT '내용',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='경력,자격,스킬 관리'
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
