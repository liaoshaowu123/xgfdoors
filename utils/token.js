import { Config } from 'config.js';
import {SnapData} from 'snapData.js';
class Token {
  constructor() {
    this.tokenUrl = Config.resUrl + 'user/wxLoginCode.do';
  }
  //根据code去服务器拿token
  getTokenFromServer(callBack) {
    var that = this;
   
    wx.login({
      success: function (res) {
        wx.request({
          header: {'content-type': 'application/x-www-form-urlencoded'},
          url: that.tokenUrl,
          method: 'post',
          data: {
            code: res.code,
          },
          success: function (res) {
            console.log(res)
            // wx.setStorageSync('token', res.data.token);
            // //把结果通过回调返回去
            // callBack && callBack(res.data.token);
          }
        })
      }
    })
      
   
  }
}
export { Token }