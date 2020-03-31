var WxParse = require('../../../wxParse/wxParse.js')
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var id = 0;
// pages/my/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
    this.getData();
  },

  //获取详情
  getData() {
    let this_ = this;
    let data = { id: id };
    ljrqe.post('mcExperienceShop/get', data).then(res => {
      let content = res.data.content;
      WxParse.wxParse('content', 'html', content, this_, 25);
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})