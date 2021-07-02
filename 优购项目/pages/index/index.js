//Page Object
// 引入用来发送请求的方法，一定要把路径补全
import { request } from '../../request/index.js';
Page({
  data: {
    //轮播图数据
    swiperList:[],
    //导航数据
    catesList:[],
    //楼层数据
    floorList:[],
  },
  //options(Object)
  //运行就加载的函数
  onLoad: function(options){
  //  wx.request({
  //    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
  //     success:(res)=>{
  //       // console.log(res);
  //       this.setData({
  //         swiperList:res.data.message
  //       })
  //     }
  //  })
  this.getSwiperList(); 
  this.getCateList();
  this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList(){
     //promise方法
    request ({ url:"/home/swiperdata"})
    .then(result =>{
           this.setData({
               swiperList:result
             })
    })
  },
  // 获取分类导航数据
  getCateList(){
    request ({ url:"/home/catitems"})
    .then(result =>{
           this.setData({
            catesList:result
             })
    })
  },
   // 获取楼层数据
   getFloorList(){
    request ({ url:"/home/floordata"})
    .then(result =>{
           this.setData({
            floorList:result
             })
    })
  },
});