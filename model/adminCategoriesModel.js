//引入数据库
const mysql = require('mysql');
//连接数据库
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'baixiu'
})
connection.connect(function (err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功');
  }
})
module.exports = {
  getCategoriesContent(callback) {
    var sql = `select * from categories where id !=1`;
    connection.query(sql, (err, result) => {
      // console.log(result);
      if (err) {
        callback(err)
      } else {
        callback(null, result);
      }
    })
  },
  //添加分类数据模块
  addCategories(obj, callback) {
    var sql = `insert into categories values(null,?,?)`
    connection.query(sql, [obj.slug, obj.name], (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result);
      }
    })
  },
  //单次删除数据
  delAdminCate(id, callback) {
    //写数据库序列化删除
    var sql = `delete from categories where id=` + id;
    connection.query(sql, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result);
      }
    })
  },
  //批量删除数据模块
  delAllCate(idArr, callback) {
    var sql = `delete from categories where id in(${idArr})`;
    //为什么不能使用[idArr]
    connection.query(sql, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result);
      }
    })
  },
  //修改目录数据
  editCate(obj, callback) {
    console.log(obj);
    
    var sql = 'update categories set ? where id = ?'
     connection.query(sql, [obj, obj.id], (err, result) => {
       if (err) {
         callback(err)
       } else {
         callback(null, result)
       }
     })
  }
}