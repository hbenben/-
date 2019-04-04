//控制模块，在分发完路由之后，实现业务逻辑
module.exports={
  //渲染首页
  getIndexPage(req,res){
    res.render('index');
  },  //渲染后台首页页面
  getAdminIndexPage(req,res){
    res.render('admin/index');
  },  //渲染评论页面
  getAdminCommentsPage(req,res){
    res.render('admin/comments')
  },  
  getAdminCategoriesPage(req, res) {
    //渲染后台分类页面
    res.render('admin/categories')
  },

  // 后台业务逻辑啊，因为后台有一个登录逻辑，不能直接访问到
  getAdminLoginPage(req, res) {
    //渲染后台登录页面
    //模拟试试session
    res.render('admin/login')
  },
  getAdminNavMenusPage(req, res) {
    //渲染后台菜单设置页面
    res.render('admin/nav-menus')
  },
  getAdminPasswordResetPage(req, res) {
    //渲染重置密码页面
    res.render('admin/password-reset')
  },
  getAdminPostAddPage(req, res) {
    //渲染添加文章也页面
    res.render('admin/post-add')
  },
  getAdminPostsPage(req, res) {
    //渲染文章列表页面
    res.render('admin/posts')
  },
  getAdminProfilePage(req, res) {
    //个人设置页面
    res.render('admin/profile')
  },
  getAdminSettingsPage(req, res) {
    //渲染后台设置页面
    res.render('admin/settings')
  },
  getAdminSlidesPage(req, res) {
    //渲染后台侧边栏页面
    res.render('admin/slides')
  },
  getAdminUsersPage(req, res) {
    //渲染后台用户页面
    res.render('admin/users')
  }
}