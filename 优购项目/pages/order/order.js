// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
       id:1,
       value:"代付款",
       isActive:false
     },
     {
       id:2,
       value:"代发货",
       isActive:false
     },
     {
      id:3,
      value:"退款/退货",
      isActive:false
    }
    ],
  },
 onShow(options){
  //  1 获取当前的小程序的页面栈-数组  长度最大是10页面
  //  let pages =  getCurrentPages();
  //  2 数组中 索引最大的页面就是当前页面
  //  let currentPage = pages[pages.length - 1];
  //  const {type} = currentPage.options;
  //  this.changeTitleByIndex(type-1);
  //  this.getOrders(type);
   
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