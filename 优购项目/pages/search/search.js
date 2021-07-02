// pages/search/search.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
/**
 * 1 输入框绑定  值改变事件  input 事件
 *    1 获取到输入框的值
 *    2 合法性判断
 *    3 检验通过 把输入框的值发送给后台
 *    4 返回的数据打印到页面上
 * 2 防抖 （防止抖动） 定时器
 *   1 定义全局定时器id
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
  goods:[],
  //控制取消按钮的显示和隐藏
  isFouces:false,
  //输入框的值
  inpValue:""
  },
  //定时器
  TimeId:-1,
// 输入框的值改变 就会触发的事件
  handleInput(e){
    // 1 获取输入框的值
   const {value}=e.detail;
   // 2 检测合法性 判是不是空字符 trim()去掉字符串俩边的空字符 
   if(!value.trim()){
     this.setData({
       goods:[],
       isFouces:false
     })
     //值不合法
     return;
   }
   this.setData({
    isFouces:true
   })
   clearTimeout(this.TimeId);
   this.TimeId=setTimeout(() => {
      // 3 准备发送请求获取数据
      this.qsearch(value);
   }, 300);
  },
  // 发送请求获取搜索建议 数据
 async qsearch(query){
  const res = await request({url:'/goods/search',data:{query}});
  console.log(res);
  this.setData({
    goods:res.goods
  })
  },
  // 点击按钮取消
  handleCancel(){
    this.setData({
      inpValue:"",
      isFouces:false,
      goods:[]
    })
  }
})