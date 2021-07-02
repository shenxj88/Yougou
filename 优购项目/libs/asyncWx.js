// promise形式的 chooseAddress
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}
/**
 * promise形式的 showModal
 * @param {object} param0 
 */
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            // 箭头函数和普通函数的区别只是this能够穿透  不用箭头函数则要
            success :(res) =>{
              resolve(res);
            },
            fail:(err)=>{
                reject(err);
            }
          })
    })
}
/**
 * promise形式的 showToast
 * @param {object} param0 
 */
export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title:title,
            icon:'none',
            // 箭头函数和普通函数的区别只是this能够穿透  不用箭头函数则要
            success :(res) =>{
              resolve(res);
            },
            fail:(err)=>{
                reject(err);
            }
          })
    })
}
// promise形式的 login
export const login=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            icon:'none',
            // 箭头函数和普通函数的区别只是this能够穿透  不用箭头函数则要
            success :(res) =>{
              resolve(res);
            },
            fail:(err)=>{
                reject(err);
            }
          })
    })
}

