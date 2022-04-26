//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',//数据库地址
    user: 'root',//账号
    password: '******',//密码,填写自己数据库密码
    database: 'myblog',//库名
    port:'3306',     //端口号
    multipleStatements: true //允许执行多条语句
})
 
conn.connect(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('连接succeed');
});

export default conn