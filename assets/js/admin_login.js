$(function () {
  $('.btn-primary').on('click', () => {

    // console.log('111')
    //进行测试代码，是否引入成功
    //获取用户输入的内容
    var email = $('#email').val()
    var password = $('#password').val()

  //使用正则表达式验证邮箱格式
    var emailreg = /\w+[@]\w+[.]\w+/
    if (!emailreg.test(email)) {
      $('.alert-danger').html('<strong>错误！</strong> 邮箱格式错误！').fadeIn(1000).delay(2000).fadeOut(1000)
      return; //阻止代码往下面执行
    } else if (password.length < 6) {
      $('.alert-danger').html('<strong>错误！</strong> 密码格式错误！').fadeIn(1000).delay(2000).fadeOut(1000)
      //阻止代码往下面执行
      return;
    }
    $.ajax({
      type: 'post',
      url: '/login',
      dataType: 'json',
      data: {
        email,
        password
      },
      success: function (result) {  //拿到后台的数据
        if (result.code == 100) {
        //利用控制器返回的状态码来判断账号密码是否都正确
          $('.alert-danger').html('<strong>错误！</strong> ' + result.msg + '！').fadeIn(1000).delay(2000).fadeOut(1000)
        } else {
          location.href = '/admin'
        }
      }
    })
  })
})