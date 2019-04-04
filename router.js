//引入核心模板
const express = require('express');
//创建路由对象，定于路由，注意这个router是express里面的方法
const router = express.Router();
//调用控制模块
const adminPageController = require('./controllers/adminPagesController.js');
//引入用户登录模块
const adminUserController = require('./controllers/adminUserController');
//引入后台categories内容模块
const adminCategoriesCtrl = require('./controllers/adminCategotriesCtrl')
//引入后台写入文章的上传图片的模块
const adminUploadCtrl = require('./controllers/adminUploadCtrl')
//引入新增文件控制器
const getAdminPostCtrl = require('./controllers/adminPostAddCtrl')
//引入分类目录控制器
const adminPostListCtrl=require('./controllers/adminPostListCtrl')
//渲染页面
//render方法，包含阅读fs.readFile() req.end()
//路由分发
router.get('/', adminPageController.getIndexPage) //页面首页
      .get('/admin', adminPageController.getAdminIndexPage) //后台主页面
      .get('/admin/comments', adminPageController.getAdminCommentsPage) //后台评论页面
      .get('/admin/categories', adminPageController.getAdminCategoriesPage) //获取后台分类页面
      .get('/admin/login', adminPageController.getAdminLoginPage) //获取后台登录页面
      .get('/admin/nav-menus', adminPageController.getAdminNavMenusPage) //获取后台登录页面
      .get('/admin/password-reset.ejs', adminPageController.getAdminPasswordResetPage) //获取后台登录页面
      .get('/admin/post-add', adminPageController.getAdminPostAddPage) //获取后台登录页面
      .get('/admin/posts', adminPageController.getAdminPostsPage) //获取后台登录页面
      .get('/admin/profile', adminPageController.getAdminProfilePage) //获取后台登录页面
      .get('/admin/settings', adminPageController.getAdminSettingsPage) //获取后台登录页面
      .get('/admin/slides', adminPageController.getAdminSlidesPage) //获取后台登录页面
      .get('/admin/users', adminPageController.getAdminUsersPage) //获取后台登录页面

      //用户登录模块，路由请求
      .post('/login', adminUserController.login)
      //管理员退出登录的路由请求
      .get('/admin/perSignOut', adminUserController.adminSignout)

      //管理员异步请求categories数据路由
      .get('/admin/categoriesContent', adminCategoriesCtrl.getAdminCategoriesContent)
      //管理员添加目录模块路由
      .post('/admin/addCategories', adminCategoriesCtrl.addAdminCategories)
      //后台单次删除目录数据
      .get('/admin/delCategories', adminCategoriesCtrl.delAdminCate)
      //后台批量删除目录模块数据
      .get('/admin/delAllCate', adminCategoriesCtrl.delAllCate)
      //管理员修改数据
      .post('/admin/editCategories', adminCategoriesCtrl.editCategories)
      //写文章中的文件上传ajax请求
      .post('/admin/postUpload', adminUploadCtrl.postAddUploadCtrl)
      //实现后台加载文章
      .post('/admin/postAdd', getAdminPostCtrl.postAdd)
      //后台动态加载分类目录
      .get('/admin/postList', adminPostListCtrl.postList)
//将路由暴露出去
module.exports = router;