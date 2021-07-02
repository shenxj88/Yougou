// pages/good_list/good_list.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs:[
       {
         id:0,
         value:"综合",
         isActive:true
       },
       {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
     ],
     goodList:[]
  },
//接口要的参数
QuerParams:{
  query:"",
  cid:"",
  pagenum:1,  //页码
  pagesize:10
},
  /**
   * 生命周期函数--监听页面加载
   */
  //总页数
  totalPages:1,
  onLoad: function (options) {
      this.QuerParams.cid = options.cid||"";
      this.QuerParams.query = options.query||"";
      this. getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList(){
   const res = await request({url:"/goods/search",data:this.QuerParams});
  //  console.log(res);
   //获取总条数
   const total = res.total;
   //计算总页数
   //返回大于等于参数的最小整数
   this.totalPages=Math.ceil(total/this.QuerParams.pagesize);
   this.setData({
    //  goodList:res.goods
    //拼接了数组  ES6解析赋值
    goodList:[...this.data.goodList,...res.goods]
   })
   //关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错
   wx.stopPullDownRefresh();
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
  /*
  1 找到滚动条触底事件  
  2判断还有没有下一页
     1 获取到总条数  total
      总页数  = Math.ceil(总条数 / 页容量  pagesize)
              = Math.ceil(23/10) = 3
     2 获取当前页面  pagenum
     3 判断当前页码是否大于等于总页数
     表示 没有下一条数据
  3 没有下一条数据 弹出提示
  4 有下一条数据，加载下一页数据
    1 当前的页码++
    2 重新发送请求
    3 数据请求回来  要对data中的数据进行拼接 而不是全部替换！！！  
  */
  //页面上滑 滚动条触底时事件
  onReachBottom(){
       //判断还有没有下一页
       if(this.QuerParams.pagenum >=this.totalPages){
         wx.showToast({
           title: '没有下一页数据',
         })
       }else{
         //还有下一页数据
         this.QuerParams.pagenum++,
         this.getGoodsList();
       }
  },
  /*
  1 触发下拉刷新事件 需要在页面的json文件中开启配置项
  找到触发下拉刷新的事件
  2 重置  数据 数组
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果
  */
 onPullDownRefresh(){
  this.setData({
    goodList:[]
   })
   this.QuerParams.pagenum = 1;
   this.getGoodsList();
 }
})