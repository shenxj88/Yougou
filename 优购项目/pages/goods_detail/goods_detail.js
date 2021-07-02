import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
/*
 商品收藏
 1 页面onShow的时候 加载缓存中的商品收藏的数据
 2 判断当前商品是不是被收藏
   1 是 改变图片 
   2 不是。。。。
  3 点击商品收藏按钮
   1 判断该商品是否存在于缓存数组中
   2 已经存在 把商品删除
   3 没有存在 把商品添加到收藏数组中  存入到缓存中即可
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
   goodsObj:{},
   isCollect:false
  },
  //商品对象  全局变量
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
      //  1 获取当前的小程序的页面栈-数组  长度最大是10页面
   let pages =  getCurrentPages();
  //  2 数组中 索引最大的页面就是当前页面
   let currentPage = pages[pages.length - 1];
   let options = currentPage.options;
   const {goods_id} = options;
   this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url: '/goods/detail',data: {goods_id}});
    this.GoodsInfo = goodsObj;
    // console.log(goodsObj);
    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // //iPhone部分手机不识别webp图片格式转换为jpg格式
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  //点击轮播图放大预览
  handlePrevewImage(e){
    //先构造要预览的图片数组  map构造数组
      const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
      // 接受传递过来的图片url
      const current=e.currentTarget.dataset.url;
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
  },
  //点击 加入购物车
  handleCartAdd(){
    //1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart')||[];//转换成数组
    //2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      //3 不存在 第一次添加
      this.GoodsInfo.num=1,
      this.GoodsInfo.checked=true;//购物车选中状态
      cart.push(this.GoodsInfo);
    }else{
      // 4 已经存在  执行num++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync("cart",cart);
    // 弹窗提醒
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // mask:true 防止用户疯狂点击按钮，隔1.5秒才能继续点击
      mask:true
    })
  },
  handleCollect(){
    let isCollect=false;
    //1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
   let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  //  3 当index!=-1 表示已经被收藏过
   if(index!==-1){
    //  能找到，已经收藏过了，在数组中删除该商品
     collect.splice(index,1);
     isCollect=false;
     wx.showToast({
       title:"取消成功",
       icon:'success',
       mask:true
     });
   }else{
    //  没有收藏过
     collect.push(this.GoodsInfo);
     isCollect=true;
     wx.showToast({
      title:"收藏成功",
      icon:'success',
      mask:true
    });
   }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect",collect);
    // 5 修改data中的属性  isCollect
   this.setData({
    isCollect
   })
  }
})