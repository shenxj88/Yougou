// pages/feedback/feedback.js
/**
 *  1 点击 “+”触发点击事件
 *     1 调用小程序内置的选择图片的api
 *     2 获取到图片的路径  数组
 *     3 把图片的路径存入到data的变量中
 *     4 页面就可以根据图片数组 进行循环显示 自定义组件
 * 2  点击自定义图片组件
 *    1 获取被点击的元素的索引
 *    2 获取data中的图片数组
 *    3 根据索引 数组中删除对于的元素
 *    4 把数组重新设置回data中
 * 3 点击“提交”
 *  1 获取文本域的内容 类似输入框的获取
 *    1 data中定义变量 表示输入框的内容
 *    2 文本域 绑定输入事件 事件触发的时候 把输入框的值 存入到变量中
 *  2 对这些内容 合法性验证
 *  3 验证通过用户选择的图片 上传到专门的图片服务器 返回图片外网的链接
 *     1 遍历图片数组
 *     2 挨个上传
 *     3 自己维护图片数组 存放图片上传后的外网的链接
 *  4 文本域 和外网的图片的路径 一起交到服务器 前端模拟 不会发送请求到后台
 *  5 清空当前页面
 *  6 返回上一页 
 * 
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
       id:1,
       value:"商品、商家投诉",
       isActive:false
     }
    ],
    // 图片列表
    chooseImages:[],
    // 文本框输入内容
    textVal:""
  },
   //外网的图片的路径数组
   UpLoadImgs:[],
 //标题点击事件  从子组件传递过来
 handleTabsItemChange(e){
  //1 获取被点击的索引标题
  const {index} = e.detail;
  //修改原数组
  let {tabs}=this.data;
  tabs.forEach((v,i) => i===index ? v.isActive=true:v.isActive=false);
  // 3 赋值到data中
  this.setData({
    tabs
  })
},
//点击+选择图片
handleChooseImg(e){
  console.log(e);
  // 调用小程序内置的选择图片api
  wx.chooseImage({
    //同时选中的图片的数量
    count: 9,	// 默认为9
    // 图片的格式 原图 压缩图
    sizeType: ['original', 'compressed'],	// 指定原图或者压缩图
    //  图片的来源  相册 照相机
    sourceType: ['album', 'camera'],	// 指定图片来源
    success: (res)=> {
      console.log(res);
      this.setData({
        chooseImages:[...this.data.chooseImages,...res.tempFilePaths]
      })
     
    }
  })
},
//点击删除图片
handleRemoveImg(e){
  //1 获取被点击的组件的索引
   const {index} = e.currentTarget.dataset;
  //  2 获取data中的图片数组
   let {chooseImages}=this.data;
  // 3 删除元素
   chooseImages.splice(index,1);
   this.setData({
    chooseImages
   })
},
// 文本框输入事件
handleTextIput(e){
    this.setData({
      textVal:e.detail.value
    })
},
// 提交按钮的点击事件
handleFormSubmit(){
  // 1 获取文本框的内容 图片数组
  const {textVal ,chooseImages} = this.data;
  // 2 合法性的验证
  if(!textVal.trim()){
    //不合法
    wx.showToast({
      title: '输入不合法',
      icon: 'none',
      mask:true
    });
    return;
     // 显示正在等待的图片
     wx.showLoading({
      title: "正在上传中",
      mask: true
  });
  }
  //判断有没有需要上传的图片数组
  if(chooseImages.length !=0){
    chooseImages.forEach((v,i)=>{
      wx.uploadFile({
        //图片要上传到哪里
        url: 'https://imgchr.com/i/MjaXxU',
        // 被上传文件的路径
        filePath: v,
        // 上传的文件的名称 后台获取文件 file
        name: 'file',
        // 顺带的文本信息
        fileData:{},
        success:(result)=>{
            console.log(result);
            let url = result.data.url;
            console.log(url);
            this.UpLoadImgs.push(url);
              //判断是否为最后一张图片  
            if(i===chooseImages.length - 1){
              wx.hideLoading();
              console.log("把文本上传到后台");
              //提交都成功了  重置页面
              this.setData({
                textVal:"",
                chooseImages:[]
              })
              //返回上一个页面
              wx.navigateBack({
                delta: 1
              });
            }
        },
      })
    })
  }else{
    wx.hideLoading();
    console.log("只是提交了文本");
    wx.navigateBack({
      delta:1
    })
  }

}
})