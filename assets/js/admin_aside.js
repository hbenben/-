//实现左侧菜单栏的展开
$(function () {
  // console.log('侧边栏展开');，要用来检测是否引入成功
  //获取当前路径来，判断路由是否满足条件
  //http://127.0.0.1:3001/admin/posts
  var url = location.href;
  //获取路由中的最后一个部分，使用进行字符串剪切
  //这里主要是担心，路径中存在字符串拼接，就是后面存在参数，所以是获取路径admin-？之间的字符串，需要获得两个字符串的下边是什么
  //lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，
  var startIndex = url.lastIndexOf('/')
  var lastIndex = url.indexOf('?')
  //定义一个空数组
  var current = '';
  if (lastIndex != -1) {
    //当不存在参数的时候，就是没有？的时候,提取两个下标之间的字符串，但是注意，start必选，但是last可选
    //substring是从当字符串/开始计算，所以要添加+1
    current = url.substring(startIndex + 1, lastIndex);
  } else {
    current = url.substring(startIndex + 1)
  }
  // console.log(current);可以成功打印出路径
  //然后利用判断出来当前点击的路径，来添加类名
  if (current == 'posts' || current == 'post-add' || current == 'categories') {
    //先去掉其他地方的类名和数次那个
    //  $('#menu-settings').removeClass('in')
    //  $('#menu-settings').attr("aria-expanded", "false");
    //in是展开当前列表
    $('#menu-posts').addClass('in')
    $('#menu-posts').attr("aria-expanded", "true");

  }
  if (current == 'nav-menus' || current == 'slides' || current == 'settings') {
    //  $('#menu-posts').removeClass('in')
    //  $('#menu-posts').attr("aria-expanded", "false");
    //in是展开当前列表。怎样当点击当前的时候去掉其他地方的类名
    $('#menu-settings').addClass('in')
    $('#menu-settings').attr("aria-expanded", "true");
  }


  // 实现高亮,在前端页面中添加类名，获取属性，利用属性名来添加类名
  $('[data-id=' + current + ']').addClass('active')
})