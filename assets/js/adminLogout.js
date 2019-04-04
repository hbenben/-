// $(function(){
//   // console.log('11121');
//   //获退出登录对象
//   $('.fa-sign-out').on('click',(name)=>{
//     //cookie名字albx_cookis
//     name=req.session.name;
//     clearCookie(name);
//   })
// })
$(function(){
  //获取退出登录对象
  $('.adminSignOut').on('click', function () {
    console.log('退出登录');
    
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/admin/perSignOut',
      dataType:'json',
      success:function(result){
       if(result.code==1){
         console.log('退出登录失败');;
         return
       }else{
         console.log('退出登录成功');
         
       }
      }
    })
  })
})