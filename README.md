## Description
 Nest.js + HTML + jQuery Demo

## Installation

```bash
 # install moudles
 yarn install
```

## Running the app

```bash
 # watch development mode
 yarn start:dev

 # build
 yarn start:build

 # production mode
 yarn start:prod

 # code format
 yarn format
```

## preview page
  localhost:3000


## mySQL数据库
```
  - port: 3306
  - username: root
  - password: 
  - 连接名: my_first_nest
  - 数据库名: preview_sale
+-------------+--------------+----------------------------+
|                     customer                            |
+-------------+---------------+---------------------------+
| id          | int           | PRIMARY KEY AUTO_INCREMENT|
| name        | varchar(100)  |                           |
| tel         | varchar(50)   |                           |
| company     | varchar(100)  |                           |
| views       | int           |                           |
| isPublished | tinyin        |                           |
+-------------+---------------+--------------------------+
```

## mongoDB
```
  - 数据库名: nest_test
+-------------+--------------+----------------------------+
|                       foods                             |
+-----------------+---------------------+-----------------+
| id              |       Number        |                 |
| cnName          |       String        |                 |
| enName          |       String        |                 |
| mainPic         |       String        |                 |
+-----------------+---------------------+-----------------+
```

## PS

```
 - tsc 用于打包服务端代码
 - webpack 用于打包前端静态文件及页面模板
 - 所有前端文件都在static文件下
 - 每个页面对应的js文件必须放在 static/public/js/product/[pageFileName]/
 - webpack 采用多入口配置，页面所用的主入口必须以[pageFileName].main.js命名
 - config/webpack.base.page 中每个页面要引入的入口文件在chunks属性中配置
```

## 关于webpack-parallel-uglify-plugin
```
 据说是应为uglify仅支持ES5环境，与babel-env结合有点问题
 Uglify has a work-in-progress "Harmony" branch to address the lack of ES6  support,but it is not yet stable.
 改用babel提供的babel-preset-minify及其插件
 [文档](https://babeljs.io/docs/en/babel-preset-minify)
 [文档](https://github.com/babel/minify)
```

## Support
 [Nest](https://github.com/nestjs/nest)
 [设计模式](《JavaScript设计模式 张容铭》)

## Stay in touch

 - Author - [Cat]

## License

 Nest is [MIT licensed](LICENSE).
