import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var pageNo=1;
var pageSize=20;
var isHava=true;
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
    pageNo = 1;
    isHava = true;
    this.getList();
    //
  },

  /**
   * 返现记录
   */
  getList(id) {
    if (!isHava){return};
    isHava=false;
    let this_ = this;
    let data = { page:pageNo,size:pageSize };
    ljrqe.post('my/putlist', data).then(res => {
      if (res.data.data.length == pageSize ){
        isHava=true;
        pageNo+=1;
      }
      let lists = res.data.data;
      let list=this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
      })
    })
  },
 
  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})