$(function () {
  //使用ajax异步请求
  //封装成初始化页面
  function init() {
    $.ajax({
      type: 'get',
      url: '/admin/categoriesContent',
      datatype: 'json',
      success: function (result) {
        //异步请求成功之后，接收的数据为result
        // console.log(result);
        //template渲染模板
        var tempHTML = template('categoriesTemp', result);
        $('tbody').html(tempHTML);
      }
    })
  }
  //需要先自调用一下
  init();

  //添加目录部分
  $('.categories-add').on('click', () => {
    //获取用户输入的数据，要发送到后台
    // console.log('添加点击');

    var slug = $('#slug').val()
    var name = $('#name').val()
    //要对输入的内容进行验证
    // console.log(slug,name);

    if (slug.trim().length == 0) {
      // 说明输入空的内容
      $('.alert-danger').html('<strong>错误</strong>请输入正确的slug').fadeIn(500).delay(2000).fadeOut(500)
      return
    }
    if (name.trim().length == 0) {
      $('.alert-danger').html('<strong>错误</strong>请输入正确的name').fadeIn(500).delay(2000).fadeOut(500)
      return
    }

    //发送ajax请求
    $.ajax({
      type: 'post',
      url: '/admin/addCategories',
      datatype: 'json',
      data: {
        slug: slug,
        name: name
      },
      success: function (result) {
        if (result.code == 1) {
          //如果后台返回的数据是code==0，说明数据库添加操作失败
          $('.alert-danger').html('<strong>错误</strong>添加数据失败').fadeIn(500).delay(2000).fadeOut(500)
        } else {
          //说明数据添加成功
          $('.alert-danger').html('<strong>优秀</strong>添加数据成功').fadeIn(500).delay(2000).fadeOut(500)
          //数据库添加成功之后，要刷新当前的页面，就是重新加载，所以将上面的代码封装成一个函数
          init();
        }
      }
    })
  })

  //删除目录中的内容,单次删除数据
  $('.categories-tbody').on('click', '.categories-del', function () {
    //获取自定义属性的id
    var id = $(this).data('id');
    // console.log(id);验证是否获取id成功

    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/admin/delCategories',
      datatype: 'json',
      data: {
        id: id
      },
      success: function (result) {
        if (result.code == 1) {
          //如果后台返回的数据是code==0，说明数据库添加操作失败
          $('.alert-danger').html('<strong>错误</strong>删除数据失败').fadeIn(500).delay(2000).fadeOut(500)
        } else {
          //说明数据添加成功
          $('.alert-danger').html('<strong>优秀</strong>删除数据成功').fadeIn(500).delay(2000).fadeOut(500)
          //数据库添加成功之后，要刷新当前的页面，就是重新加载，所以将上面的代码封装成一个函数
          init();
        }
      }
    })
  })

  //多条删除目录
  $('.cate-chek-del').on('change', function () {
    //注意获取复选框的checked状态只能使用prop，不能使用attr或者.checked
    var status = $(this).prop('checked');
    //console.log(status); //检验是否获取成功
    //为其他复选框设置相同的状态
    $('.categories-tbody input').prop('checked', status);
  })
  //如果有其中一个tbody中的复选框没有被选中，则取消全选选择
  $('.categories-tbody').on('click', 'input', function () {
    //获取tbody里面的所有复选框
    var tbodyAllChecks = $('.categories-tbody input');
    // console.log(tbodyAllChecks);

    //获取tbody里面所有复选框的状态。获取到的是一个伪数组
    var seleChecks = $('.categories-tbody input:checked');
    // console.log(seleChecks);

    //长度大于1的话，显示批量删除
    if (seleChecks.length > 1) {
      $('.cate-tip-del').fadeIn(500)
    } else {
      $('.cate-tip-del').fadeOut(500)
    }
    // 再进行判断是否勾选全选 注意别搞错对象了
    if (tbodyAllChecks.length == seleChecks.length) {
      $('.cate-chek-del').prop('checked', true);
    } else {
      $('.cate-chek-del').prop('checked', false);
    }
  })

  //然后根据弹出来的批量删除，注册事件，要现获取所勾选中的复选框的id
  $('.cate-tip-del').on('click', function () {
    //用来存储所有id的数组
    var idArr = [];
    //获取所有被选中的复选框
    var selectedAll = $('.categories-tbody input:checked');
    // console.log(selectedAll);//循环验证
    selectedAll.each((index, value) => {
      //循环将获取到被选中的id追加到新数组中,很对坑，使用jQuery里面的data('属性')d的方法
      idArr.push($(value).data('id'));
    })
    console.log(idArr);
    $.ajax({
      type: 'get',
      url: '/admin/delAllCate',
      datatype: 'json',
      data: {
        idArr
      },
      success: function (result) {
        if (result.code == 1) {
          //如果后台返回的数据是code==0，说明数据库添加操作失败
          $('.alert-danger').html('<strong>错误</strong>删除数据失败').fadeIn(500).delay(2000).fadeOut(500)
        } else {
          //说明数据添加成功
          $('.alert-danger').html('<strong>优秀</strong>删除数据成功').fadeIn(500).delay(2000).fadeOut(500)
          //数据库添加成功之后，要刷新当前的页面，就是重新加载，所以将上面的代码封装成一个函数
          init();
        }
      }
    })

  })

  //编辑目录操作,给编辑注册事件，要注意对象，要注意使用事件委托
  $('.categories-tbody').on('click', '.categories-editAll', function () {
    //现获取id name slug值，赋值默认值到边框中
    var data = $(this).data();
    // console.log(data);成功拿到数据
    //将获取到数据赋值给编辑框的默认值
    $('#name').val(data.name)
    $('#slug').val(data.slug)
    //这里不能漏掉赋值，不然拿到不到ID值
    $('#id').val(data.id)
  })

  //点击确定编辑之后，ajax请求修改，点击修改
  $('.categories-edit').on('click', function () {
    //获取数据,弄成一个对象
    var data = $('.cate-form').serialize();
    //校验是否成功拿到对象
    console.log(data);
    $.ajax({
      type: 'post',
      url: '/admin/editCategories',
      datatype: 'json',
      data: data,
      success: function (result) {
        if (result.code == 1) {
          //如果后台返回的数据是code==0，说明数据库添加操作失败
          $('.alert-danger').html('<strong>错误</strong>修改数据失败').fadeIn(500).delay(2000).fadeOut(500)
        } else {
          //说明数据添加成功
          $('.alert-danger').html('<strong>优秀</strong>修改数据成功').fadeIn(500).delay(2000).fadeOut(500)
          //数据库添加成功之后，要刷新当前的页面，就是重新加载，所以将上面的代码封装成一个函数
          init();
          //提交成功之后，要将输入框的内容清空
          $('#name').val('')
          $('#slug').val('')
        }
      }
    })

  })
})