import { Config } from '/utils/config.js';
import { SnapData } from '/utils/snapData.js';
import { Ljrqe } from '/utils/ljrqe.js';
var ljrqe = new Ljrqe();
App({
  onLaunch: function () {
    this.checkUserId();
    // console.log(1)
  },
  globalData: {
    userInfo: null
  },

  /**
   * 换取用户ID
   */
  checkUserId() {
    let that = this;
    //!wx.getStorageSync('userId')
    if (!wx.getStorageSync('userId')) {
      wx.login({
        success: function (res) {
          console.log(res.code)
          return
          wx.request({
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            url: Config.resUrl + 'user/wxLoginCode.do',
            method: 'post',
            data: {
              Code: res.code,
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
              wx.setStorageSync('userId', res.data.data.id);
              wx.setStorageSync('userType', res.data.data.userLevel);
              // wx.setStorageSync('userId', 2)
            }
          })
        }
      })
    }
  },
})