//引入数据库模块
const mysql=require('mysql');
//创建数据库连接对象
const connection=mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database: 'baixiu'
})
//调用数据库连接函数
connection.connect();


module.exports={
  //定义写入新文章数据函数，obj是ctrl传过来的数据
  postAdd(obj,callback){
    var sql='insert into posts set ?';
    connection.query(sql,[obj],(err,result)=>{
      if(err){
        callback(err.message)
      }else{
        callback(null,result)
      }
    })
  }
}