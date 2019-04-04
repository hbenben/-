$(function () {
  // 给点击上传文件添加点击事件,注意input,textarea,select事件不要使用click点击事件
  $('#feature').on('change', function () {

    //通过FormData可以获取文件资源
    //注意FormData是一个构造函数，通过这个函数，可以获取表单中的数据
    //文件资源不是普通的键值对字符串，通过FormData获取文件数据.获取指定的表单数据
    var formdata = new FormData();
    //通过这个对象可以自由的添加数据，可以添加任意类型的数据
    //要注意files是一个有长度的伪数组，实质还是一个对象
    var file = document.querySelector('#feature').files[0];
    //将要添加的文件追加到formdata中，这个对象可以自由在里面添加数据，重点在于可以添加任意类型的数据，为什么要img，因为我传输的数据是img，起这个名字有意义，img是传输的文件名
    formdata.append('img', file);

    //发起ajax请求
    $.ajax({
      //文件传输方式只能是post，不可能通过地址栏来传输数据
      type: 'post',
      url: '/admin/postUpload',
      //ajax传输数据有三种，key=value&key=value  {key:value,key:value}  formdata格式是XMLHTTPRequest新增的功能。formdata包含前面的内容
      data: formdata, //将前面获取的数据传输到后台中
      //不处理数据
      processData: false,
      //不设置内容类型
      contentType: false,
      datatype: 'json',
      success: function (result) {
        console.log(result);
        //接收后台传送过来的结果img，是一个文件名
        if (result.code == 0) {
          //说明文件上传成功到服务器，然后利用thumbnail的类名来添加src属性，让前端页面显示
          $('.thumbnail').attr('src', '/uploads/' + result.img).show();
          //注意这里不能漏掉，要将获取到的文件名，赋值给隐藏域中的value，后面才能获取的到文件名
          $('[name=feature]').val(result.img)
        }
      }
    })
  });
  //初始化，实现分类数据的动态加载,这个是加载所属分类
  (function () {
    //使用ajax请求
    $.ajax({
      type: 'get',
      url: '/admin/categoriesContent', //注意，直接跟最开始的获取分类数据一样的,所以请求路由是一样的
      dataType: 'json',
      success: function (result) {
        // console.log(result); 先尝试打印一下
        // {
        //   code: 0,
        //   msg: "获取数据成功",
        //   data: Array(4)
        // }
        //k可以不用模板打印，数据少，直接自己利用jQuery.html()方法渲染
        // console.log(result.data[0].id, result.data[0].name);，不要忘记data是一个数组

        var html = '';
        for (var i = 0; i < result.data.length; i++) {
          html += `<option value=${result.data[i].id}>${result.data[i].name}</option>`
        }
        $('#category').html(html);

      }
    })
  })();

  
  //使用CKeditor来渲染textarea模板，实现新增文章
  $('.cate-save').on('click', function () {
    //调用方法,同步数据
    // CKEDITOR.instances.content.updataElement()，别写错单词
    CKEDITOR.instances.content.updateElement()
    //查看获取表单的内容
    console.log($('.row').serialize())
    //获取富文本是使用val()方法，不是text。也不是html()
    // var content = $('#content').val()
    // console.log(content);
    //发送ajax请求 ，实现插入数据
    $.ajax({
      type:'post',
      url:'/admin/postAdd',
      data:$('.row').serialize(), //序列化表单
      dataType:'json',
      success:function(result){
        console.log(result);
        
      }
    })

  })


  

})