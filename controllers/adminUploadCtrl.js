//引入forminable第三方插件模块
const formidable=require('formidable')
//引入核心模块
const path=require('path')

module.exports={
  postAddUploadCtrl(req,res){
    //创建文件上传form对象
    var form=new formidable.IncomingForm()
    //设置编码，以后可以上传其他编码格式的文件
    form.encoding='utf-8'
    //设置文件上传的目录，注意这里要加载path内置核心模块  
    form.uploadDir = __dirname + '/../uploads';
    //设置保留扩展名
    form.keepExtensions=true

    //上传文件之后触发的函数，调用parse函数，实现文件上传
    // err:如果上传失败，则返回这个错误对象
    // fields：字段，其实就是用户传递的普通的键值对
    // files：用户上传的文件对象
    form.parse(req,(err,fields,files)=>{
      if (err) {
        res.json({
          code: 1,
          msg: '上传文件出现错误'
        })
      } else {
        //返回文件名，不要这个文件的绝对路径，使用path核心模块的basename。 //这个img是在前台页面设置追加的文件名字，files是用户上传的文件对象
        // 函数有三个参数的说明 ,这个函数在文件上传完成(不管成功还是失败都算完成)的时候触发
        
        var filename=path.basename(files.img.path);
        res.json({
          code: 0,
          msg: '上传文件成功',
          img:filename
          //img是传到前端页面，前端js接收的，filename是后台得到的结果
        })
      }
    })
  }
}