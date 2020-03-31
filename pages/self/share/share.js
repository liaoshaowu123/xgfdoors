import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    //
  },

  /**
   * 
   */
  getData() {
    let this_ = this;
    let data = { };
    ljrqe.post('user/getShareCode', data).then(res => {
      
      this_.setData({
        code: res.data.filePath
      })
    })
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '专业门窗服务商-新功夫团',
      path: '/pages/index/index?scene=' + wx.getStorageSync('userId')
    }
  }
})