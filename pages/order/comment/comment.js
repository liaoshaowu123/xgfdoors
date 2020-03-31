import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xxIndex: -1,
    info: {},
    str: '',
    id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      info: {
        name: options.name,
        house: options.house,
        num: options.num,
        time: options.time,
      }
    })
    // this.getStr(options.id);
  },

  /**
   * 评价内容
   */
  onInput(e) {
    console.log(e);
    let str = e.detail.value;
    this.setData({
      str
    })
  },
  /**
  * 选择方案
  */
  onSelect(e) {
    // return;
    let index = e.currentTarget.dataset.index;
    this.setData({
      xxIndex: index
    })
  },

  /**
   * 获取评价
   */
  getStr(id) {
    let this_ = this;
    let data = {
      id
    };
    ljrqe.post('mcOrder/getComment', data).then(res => {
      console.log(res)
      this_.setData({
        str: res.data.comment,
        xxIndex: res.data.star - 1
      })
    })
  },

  onClick(){
    let this_ = this;
    let data = {
      id:this.data.id,
      comment:this.data.str,
      star: this.data.xxIndex+1,
      orderStatus:3
    };
    ljrqe.post('mcOrder/save', data).then(res => {
      console.log(res)
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
      setTimeout(()=>{
        wx.navigateBack({
          
        })
      },1200)
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