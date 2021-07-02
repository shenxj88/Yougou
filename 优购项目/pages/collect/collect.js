// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"商品收藏",
        isActive:true
      },
      {
       id:1,
       value:"商品收藏",
       isActive:false
     },
     {
       id:2,
       value:"店铺收藏",
       isActive:false
     },
     {
      id:3,
      value:"浏览足迹",
      isActive:false
    }
    ],
    collect:[]
  },
onShow(){
  const collect = wx.getStorageSync('collect')||[];
  this.setData({
    collect
  })
},
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
})