import { chooseAddress ,showModal ,showToast} from "../../libs/asyncWx"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/cart/cart.js

/**
 * ---购物车的数据渲染
 * onShow
 * 1 回到商品详情页面 第一次添加商品的时候 手动添加了属性
 *    1 num=1
 *    2 checked=true
 * 2 获取缓存中的购物车数组
 * 3 把购物车数据填充到data中的cart
 * 
 * ---全选的实现 数据的展示
 * 1 onShow 获取缓存中的购物车数组
 * 2 根据购物车中的商品数据 所有的商品都被选中 checked=true 全选就被选中
 * ---总价格和总数量
 * 1 都需要商品被选中 我们才拿它来计算
 * 2 获取购物车数组
 * 3 遍历
 * 4 判断商品是否被选中
 * 5 总价格 +=商品的单价 * 商品的数量
 * 6 总数量 +=商品的数量
 * 7 把计算后的价格和数量设置回data中
 * ---商品选中
 *  1 绑定change事件
 *  2 获取到被修改的商品对象
 *  3 商品对象的选中状态取反
 *  4 重新填充回data中的缓存中
 *  5 重新计算全选 总价格 总数量。。。
 * ---底部全选和反选
 *  1 全选复选框绑定事件 change
 *  2 获取data中的全选变量 allChecked
 *  3 直接取反 allChecked =! allChecked
 *  4 遍历购物车数组 让里面商品选中状态跟随allChecked改变而改变
 *  5 把购物车数组和allChecked重新设置回data 把购物车重新设置回缓存中
 * ---商品数量的编辑
 *  1 “+” “-” 按钮 绑定同一个点击事件  区分关键 自定义属性
 *      1 “+” “+1”   “-” “-1”
 *  2 传递被点击的商品id goods_id
 *  3 获取data中的购物车数组 来获取需要被修改的商品对象
 *  4 当购物车的数量=1 同时用户点击“-”
 *   弹窗提醒 询问用户是否要删除
 *   1 确定 直接执行删除
 *   2 取消 什么都不做
 *  4 直接修改商品对象的数量num
 *  5 把 cart数组 重新设置回换成中
 * ---点击结算
 *  1 判断是否有收货地址
 *  2 判断用户是否选购商品
 *  3 经过以上验证 跳转到支付页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
   address:{},
   cart:[],
   allChecked:false,
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
   const cart = wx.getStorageSync('cart');

   /**
    * 计算全选
    * every 数组方法 会遍历 会接受一个回调函数，
    * 如果每一个回调函数都返回true 那么every方法的返回值为true
    * 只要有一个回调函数返回了false，那么就不再循环执行，直接返回false
    * 空数组 调用every，返回值是true
    * cart.length不为0，即为真的时候再执行cart.every(v=>v.checked)，否则直接false
    */
  //  const allChecked=cart.length?cart.every(v=>v.checked):false;
  this.setData({address});
   this.setCart(cart);
 },
  /*
  获取权限状态 发现一些属性名很怪异（scope.address)的时候 ，都要用[]形式来获取属性值
  如:const scopeAdderss = result.authSetting["scope.address"];
  */
  //获取用户收货地址
  /**
   * 1 绑定点击事件
   * 2 调用小程序内置api 获取用户的收货地址 wx.chooseAddress 不用用户授权了
   */
  async handleChooseAddress(){
    // 获取收货地址的api
    // wx.chooseAddress({
    //   success:(result)=>{
    //     console.log(result);
    //   }
    // })
    try{
      //优化后的代码 1 调用获取地址的api
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // console.log(res);
      //2 存入缓存中
      wx.setStorageSync("address",address);
    }catch(error){
      console.log(error);
    }
  
  },
  // 商品的选中
  handleItemChange(e){
    // 1 获取被修改的商品id
    const goods_id=e.currentTarget.dataset.id;
    // console.log(goods_id);
    // 2 获取购物车数组
    let {cart} = this.data;
    // 3 获取到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 4 选状态取反
    cart[index].checked =!cart[index].checked;
    // 重新填充回data中的缓存中
   this.setCart(cart);
  },
  //设置购物车状态同时计算底部工具栏的数据 全选 总价格 购买数量
  setCart(cart){
    let allChecked = true;
  //  计算总数量和总价格
  let totalPrice = 0;
  let totalNum = 0;
  cart.forEach(v => {
    if(v.checked){
      totalPrice += v.num *v.goods_price;
      totalNum += v.num;
    }else{
      allChecked = false;
    }
  });
  // 判断数组是否为空
  allChecked=cart.length!=0?allChecked:false;
   //给data赋值
   this.setData({
     cart,
     allChecked,
     totalPrice,
     totalNum
   })
   wx.setStorageSync("cart",cart)
  },
  //底部全选和反选
  handleItemAllCheck(){
    //1 获取data中的数据
    let {cart,allChecked} = this.data;
    //2修改值
    allChecked =! allChecked;
    // 3 循环修改cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 4 把修改后的值填充回data和缓存中
    this.setCart(cart);
  },
  //商品数量加减
 async handleItemNumEdit(e){
    //1 获取传递过来的参数
   const {operation,id}=e.currentTarget.dataset;
   // 2 获取购物车数组
   let {cart}=this.data;
   // 3 找到需要修改的商品索引
   const index = cart.findIndex(v=>v.goods_id===id);
  //  4 判断是否要删除
  if(cart[index].num===1&&operation===-1){
    const res=await showModal({content:"您是否要删除"});
    if(res.confirm){
      cart.splice(index,1);
      this.setCart(cart);
    }
  }else{
    //  4 进行数量修改
    cart[index].num +=operation;
    //  5 设置回缓存和data中
    this.setCart(cart);
  }
  },
  //点击结算
  async handlePay(){
  // 1 判断收货地址
  const {address,totalNum} = this.data;
  if(!address.userName){
    await showToast({"title":"您还没有收货地址"});
    return;
  }
  // 2 判断用户有没有选购商品
  if(totalNum===0){
    await showToast({"title":"您还没有选购商品"});
    return;
  }
  // 3 跳转到支付页面
  wx.navigateTo({
    url: '/pages/pay/pay'
  })
  }
})