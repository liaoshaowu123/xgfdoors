import { Compute } from '../../../utils/compute.js';
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var id=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xxIndex:0,
    info:{},
    str:'',
    id:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) { return };
    id = options.id;
    this.onMake(id);
  },
  /**
     * 详情
     */
  onMake(id) {
    let this_ = this;
    let data = { id: id };
    ljrqe.post('mcOrder/get', data).then(res => {
      res.data['time'] = Compute.getTime(Compute.getTimestamp(res.data.createDate),'ydd');
      this_.setData({
        info: res.data,
      })
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