const ENV = process.env.NODE_ENV;

/* mySQL --start */

export const pubMySqlOptions: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  // entities的文件位置，dev与prod可能是不同的
  entities: [`${ENV === 'production' ? 'dist' : 'dist'}/**/**.entity{.ts,.js}`],
  // development 实体和数据库保持同步
  synchronize: ENV === 'production' ? false : true,
};

export const mySqlDBOptions1 = {
  ...pubMySqlOptions,
  name: 'my_first_nest', // 连接名
  database: 'preview_sale', // 数据库名
};

/* mySQL --end */


/* mongoDB --start */

export const mongoOptions1 = {
  address: 'mongodb://localhost/nest_test'
}

/* mongoDB --end */
