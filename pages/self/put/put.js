import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();

var pageNo = 1;
var pageSize = 20;
var isHava = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:'0',
    putMoney:'',
    isOk:false,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    pageNo = 1;
    isHava = true;
    this.getList();
  },

  reStart(){
    this.setData({
      list: []
    })
    pageNo = 1;
    isHava = true;
  },

  /**
   * onClose
   */
  onClose(){
    this.setData({
      isOk:false
    })
  },
  /**
   * onAll
   */
  onAll(){
    let this_=this;
    this.setData({
      putMoney:this_.data.money
    })
  },
  /**
  * 获取对象
  */
  getData() {
    let this_ = this;
    let data = {};
    ljrqe.post('user/getUserById', data).then(res => {
      console.log(res)
      let data = {
        money: res.data.rewardMoney,
      }
      this_.setData(data)
    })
  },


  /**
     * 输入
     */
  onInput(e) {
    console.log(e)
    let n = e.detail.value;
    // if(!n){
    //   n=1;
    // }
    this.setData({
      putMoney: n
    })
  },

  /**
   * 
   */
  onClick(e){
    let r = e.detail.value;
    let formId = e.detail.formId;
    console.log(r);
    let this_ = this;
    let data = {
      // formid: formId,
      money: r.money,
      // wx:r.wx
    };
    this.setData({
      putMoney:'',
    })
    ljrqe.post('out/insertOutMoney', data).then(res => {
      console.log(res)
      wx.showToast({
        title: res.msg,
      })
      this_.getData();
      this_.reStart();
      this_.getList();
    })
  },

  /**
  * 记录
  */
  getList(id) {
    if (!isHava) { return };
    isHava = false;
    let this_ = this;
    let data = { pageNo: pageNo, pageSize: pageSize };
    ljrqe.post('out/getOutMoneyList', data).then(res => {
      if (res.data.length == pageSize) {
        isHava = true;
        pageNo += 1;
      }
      let lists = res.data;
      let list = this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
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
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})