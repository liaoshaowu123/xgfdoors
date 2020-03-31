import { Ljrqe } from '../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var pageNo = 1;
var pageSize = 10;
var isHava = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swicthIndex:0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  reStart() {
    pageNo = 1;
    pageSize = 10;
    isHava = true;
    this.setData({
      list: [],
    })
  },
  
  /**
     * 切换选择
     */
  onSwicth(e) {
    let index = e.currentTarget.dataset.index;
    if (index == this.data.swicthIndex) { return };
    this.setData({
      swicthIndex: index,
    })
    this.reStart();
    this.getList();
  },

  /**
   * 获取列表
   */
  getList() {
    if (!isHava) { return };
    isHava = false;
    let this_ = this;
    let arr=[2,1,3];
    let data = { pageNo, pageSize, lcUserId: wx.getStorageSync('userId'), orderStatus:arr[this.data.swicthIndex]};
    ljrqe.post('mcOrder/list', data).then(res => {
      //console.log(res)
      if (res.data.length >= pageSize && res.totalPage != pageNo) {
        pageNo += 1;
        isHava = true;
      }
      let lists = res.data;
      let arr = ['未量房', '已完成', '已派单', '已评价']
      lists.map(v => {
        v.statuss = arr[parseInt(v.orderStatus)]
      })
      let list = this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
      })
    })
  },

  /**
   * 查看详情
   */
  onRouter(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'masterinfo/masterinfo?id=' + id,
    })
  },

  /**
   * 查看合同
   */
  onClick(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'contract/contract?id=' + id,
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
    this.reStart();
    this.getList();
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
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})