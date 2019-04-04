//先引入用户登录数据模块
const userModel = require('../model/userModel.js');
//将模块暴露出去
module.exports = {
  login(req, res) {
    //控制模块调用model模块里面的方法，传入实参，有效的数据，回调函数，那边数据库传入正真的数据
    userModel.loginValidate(req.body.email, (err, data) => {
      if (err) {
        res.json({
          code: 100,
          msg: '服务器错误'
        })
      } else {
        if (data.length == 0) {
          //如果结果返回是0，说明用户名不存在，因为数据库查询返回的结果是受影响的行数
          res.json({
            code: 100,
            msg: '用户名不存在'
          })
        } else {
          if (data[0].password == req.body.password) {
            // 否则说明查询成功，然后直接检验用户输入的密码和数据库中的密码是否相等
            //设置session，响应set-sessiong
            req.session.isLogin='true';
            //因为要保留当前登录的用户，自定义属性一个标志,保存当前登录是谁
            // console.log(data[0]);
            //session的自定义一个属性，是在登录成功的时候设置的
            req.session.user_id=data[0].id;
            res.json({
              code: 200,
              msg: '登陆成功'
            })
          } else {
            //当密码不相等的时候，提示及密码错误
            res.json({
              code: 100,
              msg: '密码错误'
            })
          }
        }
      }
    })
  },
  //退出登录
  adminSignout(req, res, next) {
    // var user_key = req.session.name
    // res.clearCookie('albx_cookis')
    req.session.isLogin = 'false'
    // console.log(req.session,'退出操作')
    
    // req.session.destroy(function(err){
    //   if(err){

    //     res.json({
    //       //退出登录失败
    //       code:1,
    //     })
        
    //   }else{
    //      res.clearCookie(user_key)
    //      res.redirect("/admin")
    //     res.json({
    //       //退出登录成功
    //       code: 0
    //     })
    //   }
    // })
  }
}