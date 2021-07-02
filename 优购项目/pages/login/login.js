// const app = getApp()
// const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    nickName: "",
    avatar: "",
    telephone: ""
  },
  // 授权登录
  handleGetUserInfo(event){
    wx.getUserProfile({
      desc: '用于登录小程序',
      success: (res) =>{
        console.log("小程序登录成功获取的数据",res);
         //如果用户允许，则能得到userInfo
        const userInfo = res.userInfo
        console.log(userInfo);
        wx.setStorageSync("userinfo", userInfo);
        //关闭当前页面 跳转到上一页面
        wx.navigateBack({
              delta: 1
            });
      }
    })
  },
  
})