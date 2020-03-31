import { SnapData } from '../../../utils/snapData.js';
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:400,
    city:'长沙',
    keyword:'',
    cityList: [],
    searchList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setHeight();
    this.setCity();
    this.getList();
  },

  /**
   * 
   */
  setHeight(){
    let this_ = this;
    wx.getSystemInfoSync({
      success(res) {
        console.log(res.windowHeight)
        this_.setData({
          winHeight: res.windowHeight - 90
        })
      },fail(res){
        console.log(res)
      }
    })
    wx.getSystemInfo({
      success(res) {
        this_.setData({
          winHeight: res.windowHeight - 110
        })
      }
    })
  },

  /*
   *
   */
  setCity(){
    this.setData({
      city:wx.getStorageSync('city')
    })
  },


  /**
   * 输入搜索值
   */
  onInput(e){
    console.log(e.detail.value);
    this.data.keyword = e.detail.value;
    if (e.detail.value==""){
      this_.setData({
        searchList: []
      })
    }
  },

  /**
   * 获取列表
   */
  getList() {
    let this_ = this;
    let data = {
    };
    ljrqe.post('user/getOpenAreaList.do', data).then(res => {
      console.log(res)
      this_.setData({
        cityList: res.data
      })
    })

  },

  /**
   * 搜索
   */
  onSearch() {
    let str=this.data.keyword;
    let this_ = this;
    let data = {
      name:str
    };
    ljrqe.post('user/getOpenAreaList.do', data).then(res => {
      console.log(res)
      this_.setData({
        cityList: res.data,
      })
    })
    
  },


  /**
   * 保存城市
   */
  onSelect(e) {
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    SnapData.cityChange = true;
    wx.setStorageSync('city', name)
    wx.setStorageSync('citycode', id)
    wx.navigateBack({
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