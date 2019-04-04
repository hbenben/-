//引入model模块
const postLitsModel=require('../model/postListModel.js')

module.exports={
  postList(req,res){
    var obj=req.query;
    var pageSize=obj.pageSize;
    var pageNum=obj.pageNum
    postLitsModel.postList(pageSize,pageNum,(err,data)=>{
      if(err){
        res.json({
          code:0,
          msg:'获取所有文章失败'
        })
      }else{
        res.json({
          code:1,
          msg:'获取分所有文章成功',
          data:data
        })
      }
    })
  }
}