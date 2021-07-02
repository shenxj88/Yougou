import { chooseAddress ,showModal ,showToast} from "../../libs/asyncWx"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   address:{},
   cart:[],
   totalPrice:0,
   totalNum:0
  },
  /**
   * 生命周期函数--监听页面显示
   */
 onShow(){
   //1 获取缓存中的收货地址信息
   const address = wx.getStorageSync('address');
   //获取缓存中的购物车数据
   let cart = wx.getStorageSync('cart');
   //过滤后的购物车数组
   cart = cart.filter(v=>v.checked);
   //  计算总数量和总价格
  let totalPrice = 0;
  let totalNum = 0;
  cart.forEach(v => {
      totalPrice += v.num *v.goods_price;
      totalNum += v.num;
  });   
   //给data赋值
   this.setData({
     cart,
     totalPrice,
     totalNum,
     address
   })
 },
//  点击支付
 handleOrderPay(){
  //  判断缓存中有没有token
  const token = wx.getStorageSync("token");
  // 判断
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/auth'
    });
    return;
  }
  console.log("已经存在token");
 }
})