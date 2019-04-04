//实现分页功能，先实现动态加载数据
//页面一加载的时候就发送请求
$(function () {

  //pageNum是页码
  //pageSize是每页的数量是多少
  var pageSize = 2;
  var pageNum = 1;

  function init(query = {}) {
    $.ajax({
      type: 'get',
      url: '/admin/postList',
      dataType: 'json',
      // data: {
      //   //前台页面需要传输的数据传给后台
      //   pageNum: pageNum, //当前页码
      //   pageSize: pageSize //每页显示的条数
      // },
      data: $.extend({
        pageNum: pageNum, //当前页码
        pageSize: pageSize //每页显示的记录数
      }, query),
      success: function (result) {
        console.log(result);
        console.log(result.data);
        //渲染页面
        if (result.code == 1) {
          // console.log('213123123123123');
          var html = template('allArtical', result.data);
          $('.tbodyPostList').html(html);

          setPagenator(Math.ceil(result.data.count.cnt / pageSize))
        }
      }
    })
  }
  init();


  //生成分页效果
  function setPagenator(total) {

    var options = {
      bootstrapMajorVersion: 3,
      alignment: "center", //居中显示
      currentPage: this.pageNum, //当前页数
      totalPages: total, //总页数 注意不是总条数，总公有多少页，可以通过总条数，除以每页数
      // 添加对分页按钮的操作，当单击分页按钮的时候，会触发下面的事件
      // 参数不要少写，不能少写，硬性要求
      //添加点击事件
      onPageClicked: function (event, originalEvent, type, page) {
        // page:这个值就是我们当前要去获取数据的当前页码,所以将全局的当前页码重置
        //使用全局变量
        pageNum = page
        // 重新发送获取分页数据的请求
        init()
      }
    }
    // 这里需要指定你想放置分页结构的窗口标识
    $(".pagination").bootstrapPaginator(options);
  }

  //先实现动态加载分类数据（所有文章中的）
  function initPostList() {
    $.ajax({
      type: 'get',
      url: '/admin/categoriesContent',
      dataType: 'json',
      success: function (result) {
        // console.log('111111');
        //渲染数据
        console.log(result);
        var html = '<option value="all">所有分类</option>';
        for (var i = 0; i < result.data.length; i++) {
          html += `<option value="${result.data[i].id}">${result.data[i].name}</option>`
        }
        $('.catePostList').html(html);

      }
    })
  }
  initPostList()

  //实现筛选，点击筛选，发送ajax请求
  $('.btn-search').on('click', function () {
    //先获取下拉列表的val值
    var cateType = $('.searchCateList').val()
    var status = $('.statusList').val();
    // 获取到ID和status
    console.log(cateType, status);

    //判断用户当前是否筛选了条件
    if (cateType != 'all') {
      query['category_id'] = cateType
    }
    if (status != 'all') {
      query['status'] = status
    }
  })
})