//引入添加新文章的数据，模块
const postAddModel=require('../model/postAddModel.js')

module.exports={
  postAdd(req,res){
    //接收用户传输的数据, data:$('.row').serialize(), //序列化表单
    var obj=req.body;
    //因为表单中没有user_id views likes所以先给obj自定义一个属性，吧数据传输给model模块，可以插进去
    //user_id是管理员当前账号，保存在会话中,会话自定义属性
    obj['user_id']=req.session.user_id; 
    // console.log(obj);
    obj['views']=1,
    obj['likes']=1
    console.log(obj);

    //调用model模块
    postAddModel.postAdd(obj,(err,data)=>{
      if(err){
        console.log(err);
        
        res.json({
          code:0,
          msg:'添加新文章失败'
        })
      }else{
        res.json({
          code:1,
          msg:'添加新文章成功',
          // data:data
        })
      }
    })
    
  }
}