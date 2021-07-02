// pages/auth/auth.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import {login} from "../../libs/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户信息
  async handleGetUserInfo(e){
    // 1 获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail;
    // 2 获取小程序登录成功后的code
    const {code} = await login();
    const loginParams = {encryptedData,rawData,iv,signature,code};
    // 3 发送请求获取用户的token 需要用企业id
    // const res = await request({url:"/user/wxlogin",data:loginParams,method:"post"});
    // console.log(res);
  }
})