import { Base } from './base.js';
import { Config } from 'config.js';
class Ljrqe extends Base {
  constructor() {
    super();
  }

  /**
   * get请求
   */
  get(url) {
    let this_ = this;
    let p = new Promise(function (resolve, reject) {
      var params = {
        url: url ,
        sCallback: function (res) {
          resolve(res);
        }
      }
      this_.request(params);
    });
    return p;
  }
  /**
   * post请求
   */
  post(url,data){
    data.userId=wx.getStorageSync('userId');
    let this_ = this;
    // wx.showLoading({
    //   title: '加载中...',
    //   mask:true
    // })
    let p = new Promise(function (resolve, reject) {
      var params = {
        url: url,
        type: "post",
        data: data,
        sCallback: function (res) {
          // console.log(res)
          if (res.code == 1) {
            
            wx.showModal({
              title: '提示',
              content: res.msg,
              showCancel:false
            })
            wx.login({
              success: function (ress) {
                wx.request({
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  url: Config.resUrl + 'user/wxLoginCode.do',
                  method: 'post',
                  data: {
                    Code: ress.code,
                  },
                  success: function (re) {
                    console.log(re)
                    if (re.data.code == 1) {
                      wx.showToast({
                        title: re.data.msg,
                        icon: 'none'
                      })
                    }
                    wx.setStorageSync('userId', re.data.data.id)
                  }
                })
              }
            })
            reject(res)
          }
          resolve(res);
          // wx.hideLoading()
        }
      }
      this_.request(params);
    });
    return p;
  }
  
}

export { Ljrqe };