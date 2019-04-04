// 数据库模块

const mysql=require('mysql');
//连接数据库
const connection=mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database:'baixiu'
})
//正式连接
connection.connect()
// connection.connect(function(err){
//   if(err){
//     console.log('数据库连接失败');
//   }else{
//     console.log('数据库连接成功');
//   }
// })

module.exports={
  loginValidate(email,callback){
    //获取用户输入的账号，就是email，因为是post提交
    // var sql = `select * from users where email='${email}' and status='activated`;
    var sql = `select * from users where email = '${email}' and status = 'activated'`
    
    connection.query(sql,(err,result)=>{
      // console.log(result);
      
        if(err){
          callback(err)
        }else{
          callback(null,result)
        }
    })
    

    //因为要将数据库获取到的数据，返回到控制器中
  }
}