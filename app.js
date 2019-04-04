//创建核心模块
const express = require('express');
//引入路由木块
const router = require('./router.js');
//引入body-parser第三方模块
const bodyPsrser = require('body-parser')

//引入express-session模块
const session = require('express-session');

//创建对象
const app = express();

//监听事件
app.listen(3001, () => {
  console.log('http://127.0.0.1:3001');
})

//加载ejs引擎模板，为什么要使用ejs模板，因为要提取公共部分,公共部分抽离
app.set('view engine', 'ejs')
//制定渲染模板
app.set('views', './views');

//加载静态资源
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
//然后使用中间件,就不用再其他模块重新引入
app.use(bodyPsrser.urlencoded({
  extended: false
}))
//配置express-session中间件
app.use(session({
  secret: '加密',
  //给cookie一个名字，后面退出的时候，可以使用clearcookie来清除掉cookie，退出登录
  name: 'albx_cookis'
}))
//添加中间件
app.use((req, res, next) => {
  // console.log(req.session);
  // console.log(req.url.indexOf('/admin'));

  //下面有几重情况，应该让用户继续进行next()，而不是阻止下面的路由分配
  //1有状态保持，  2、访问登陆  3、访问前台页面，当页面有没有/admin请求的时候是前台得到页面，如果要检索的字符串值没有出现，则该方法返回 -1。说明不是访问后台页面，没有admin的路径
  if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
    next()
  }else{
    res.redirect('/admin/login')
  }

})
//注册路由中间件
app.use(router);
// app.get('/',(req,res)=>{
//   //渲染首页
//   res.render('index');
// })
// 其实这个页面主要是是调用中间件.use()