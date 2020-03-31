import { Ljrqe } from '../../../utils/ljrqe.js';
import { Compute } from '../../../utils/compute.js';
var ljrqe = new Ljrqe();
var id = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    id = options.id;
    this.getList();
    //
  },

  /**
    * 预览图片
    */
  onLookPic(e) {
    let img = e.currentTarget.dataset.img;
    wx.previewImage({
      urls: [img],
    })
  },

  /**
   * 记录
   */
  getList() {
    let this_ = this;
    let data = { orderId:id, pageNo:1, pageSize:99 };
    ljrqe.post('mcOrder/recordList', data).then(res => {
      
      let list = res.data;
      list.map(v=>{
        v.payTime = Compute.getTime(v.payTime,'ys');
      })
      this_.setData({
        list: list
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

  }
})