// pages/category/category.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
     leftMenuList:[],
     //右侧的菜单数据
     rightContent:[],
     //被点击的左侧菜单
     currentIndex:0,
     //右侧内容的滚动条距离顶部的距离
     scrollTop:0
  },
   //接口的返回数据
   Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    /**
     * 缓存技术小程序与web的区别
     * 1 写代码的方式不一样
     * web: 
     * 存储：localStorage.setItem("key","value")  获取：localStorage.setItem("key","value")
     * 小程序：
     * 存储：wx:setStorageSync("key","value");
     *  获取：wx:getStorageSync("key","value");
     * 2 存的时候有没有做类型转换
     * web :不管存入的是什么类型的数据，最终会先调用一下toString(),把数据变成字符串再存进去
     * 小程序：不存在类型转换这个操作，存在什么类型的数据进去，获取的就是什么类型的数据
     * 使用缓存技术
     * 1 判断本地存储中有没有旧的数据
     * {time:Date.now(),data:[...]}
     * 2 没有旧数据直接发送请求
     * 3 有旧的数据且旧的数据没有过期 使用本地存储的旧数据
     */
    // 1 获取本地存储中的数据 （小程序中也是存在本地存储数据技术的）
    const Cates = wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
      //不存在 发送请求获取数据
      console.log("发送请求获取数据");
      this.gateCates();
    }else{
      //有旧的数据 定义过期时间 10s
      if(Date.now() - Cates.time > 1000*10){
        //重新发送数据
        this.gateCates();
      }else{
        //可以使用旧数据
        console.log("使用旧的数据");
        this.Cates = Cates.data;
         //构造左侧的大菜单数据
       let leftMenuList = this.Cates.map(v=>v.cat_name);
       //构造右侧的商品数据
       let rightContent = this.Cates[0].children;
       this.setData({
        leftMenuList,
        rightContent
       })
      }
    }

  },
  //获取分类数据
 async gateCates(){
   /** 
    request({
      url:"/categories"
    })
    .then(res=>{
      // console.log(res);
       this.Cates = res.data.message;
       //把接口的数据存入到本地存储中
       wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
       //构造左侧的大菜单数据
       let leftMenuList = this.Cates.map(v=>v.cat_name);
       //构造右侧的商品数据
       let rightContent = this.Cates[0].children;
       this.setData({
        leftMenuList,
        rightContent
       })
    })
    */
   // 1 使用es7的async await来发送请求
   const res = await request({url:"/categories"});
       this.Cates = res;
       //把接口的数据存入到本地存储中
       wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
       //构造左侧的大菜单数据
       let leftMenuList = this.Cates.map(v=>v.cat_name);
       //构造右侧的商品数据
       let rightContent = this.Cates[0].children;
       this.setData({
        leftMenuList,
        rightContent
       })
  },
  //左侧菜单的点击事件
  handleItemTap(e){
     /**
   * 1 获取被点击的标题身上的索引
   * 2 给data中的currentIndex负值
   * 3 根据不同的索引渲染右侧的商品
   */
    const {index} = e.currentTarget.dataset;
      //构造右侧的商品数据
      let rightContent = this.Cates[index].children;
      this.setData({
        currentIndex:index,
        rightContent,
        //重新设置  右侧的内容scroll-view 标签距离顶部的距离
        scrollTop:0
      })
  },
})