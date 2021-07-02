let ajaxTime =0;
export const request=(params)=>{
    //请求前显示加载中
    ajaxTime++;
    wx.showLoading({
        title: '加载中',
        mask:true
      })
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,//解析出来数据
            url:baseUrl+params.url,
           success: (result)=> {
               resolve(result.data.message);
           },
           fail: (err)=> {
               reject(err);
           },
           complete:()=>{  //complete不管成功还是失败都会调用
               //关闭等待的图标
               ajaxTime--;
               if(ajaxTime==0){
                wx.hideLoading();
               }
              
           }
        });
    })
}