//连接数据库 
const mysql = require('mysql');
//创建数据库对象
const connection = mysql.createConnection({
  host: '127.0.0.7',
  user: 'root',
  password: 'root',
  database: 'baixiu'
});
//创建连接
connection.connect()

module.exports = {
  postList(pageSize, pageNum, callback) {
    //注意数据库语句操作，现在数据库中实现了再复制粘贴过来，不然很容易出错
    // var sql = 'select posts.* , users.nickname,categories.name from posts INNER JOIN users ON posts.user_id = users.id    INNER JOIN categories ON posts.category_id = categories.id '

    var sql = `select posts.* , users.nickname,categories.name from posts INNER JOIN users ON posts.user_id = users.id    INNER JOIN categories ON posts.category_id = categories.id order by id desc LIMIT ${(pageNum-1)*pageSize},${pageSize}`
    //实现分页。limit 起始下标值（从零开始），每页显示的数据
    var sql2 = 'select count(*) as cnt from posts '
    connection.query(sql, (err, result) => {
      if (err) {
        callback(err)
      } else {
        //假如执行第一天MySQL语句成功的话，在执行第二条MySQL语句
        connection.query(sql2, (err2, result2) => {
          if (err2) {
            callback(err)
          } else {
            callback(null, {
              //因为两个数据需要返回，包装成一个对象的话，比较方便拿取
              data: result,
              count: result2[0]
            });
          }
        })
      }
    })
  }
}