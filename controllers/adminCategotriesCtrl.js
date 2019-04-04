//引入categoriesModel模块
const getAdminCategoriesModel=require('../model/adminCategoriesModel')

module.exports={
  getAdminCategoriesContent(req,res){
    getAdminCategoriesModel.getCategoriesContent((err,data)=>{
      if(err){
        res.json({
          code:1,
          msg:'数据库出现错误'
        })
      }else{
        res.json({
          code:0,
          msg:'获取数据成功',
          data:data
        })
      }
    })
  },
  //添加分类的数据模块
  addAdminCategories(req,res){
    //获取post提交过来的用户数据
    var obj=req.body;
    // console.log(obj);
    getAdminCategoriesModel.addCategories(obj,(err,data)=>{
      if(err){
        res.json({
          code:1,
          msg:'添加失败'
        })
      }else{
        res.json({
          code:0,
          msg:'添加成功',
          // data:data
        })
      }
    })
  },
  //单次删除分类数据
  delAdminCate(req,res){
    //获取前端页面传输过来的id
    var id=req.query.id;
    getAdminCategoriesModel.delAdminCate(id,(err,data)=>{
      if(err){
        res.json({
          code:1,
          msg:'删除失败'
        })
      }else{
        res.json({
          code:0,
          msg:'删除成功'
        })
      }
    })
  },
  //批量删除分类目录
  delAllCate(req,res){
    //将从前端传输的数据拿过来，并且将数组转换成字符创，用逗号个还开
    var idArr=req.query.idArr.join(',')
    //然后调用数据模块，进行批量删除
    getAdminCategoriesModel.delAllCate(idArr,(err,data)=>{
        if (err) {
          res.json({
            code: 1,
            msg: '删除失败'
          })
        } else {
          res.json({
            code: 0,
            msg: '删除成功'
          })
        }
    })
  },
  //修改数据
  editCategories(req,res){
    //先接受ajax传过来的数据
    var obj=req.body;
    // console.log(obj);
     getAdminCategoriesModel.editCate(obj, (err, data) => {
       if (err) {
         res.json({
           code: 1,
           msg: '删除失败'
         })
       } else {
         res.json({
           code: 0,
           msg: '删除成功',
          //  data:data
         })
       }
     })
    
  }
}