import { Config } from 'config.js';
var pgUrl = Config.resUrl;

import { Token } from 'token.js';
var token = new Token();

class Base {
  constructor() {
  }
  request(params) {
    var url = pgUrl + params.url;
    //为空默认get
    if (!params.type) {
      params.type = 'get';
    }
    
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        
      },
      success: function (res) {
        var code = res.statusCode.toString();
        //状态码首位
        //console.log(res)
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } 
      },
      fail: function (err) {
        
        console.log(err)
      }
    })
  }
};
export { Base };