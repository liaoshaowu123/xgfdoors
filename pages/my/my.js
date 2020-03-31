import { Config } from '../../utils/config.js';
import { Compute } from '../../utils/compute.js';
import { SnapData } from '../../utils/snapData.js';
import { Ljrqe } from '../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var lot=null;
var pageNo=1;
var pageSize=20;
var isHava=true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 获取会员
   */
  getMember() {
    let this_ = this;
    let data = {};
    ljrqe.post('userMember/userMemberInfo', data).then(res => {
      //console.log(res)
      this_.setData({
        state: res.data.activate,
        endTime: Compute.getTime(res.data.endTime, 'yd')
      })

    })
  },

  /**
   * 获取列表
   */
  getList() {
    let this_ = this;
    
    if(!lot){
      this.getlocat();
      return
    }
    if (!isHava) {
      return
    }
    isHava = false;
    let data = {
      longitude: lot.longitude,
      latitude: lot.latitude,
      pageNo:pageNo,
      pageSize:pageSize,
    };
    ljrqe.post('mcExperienceShop/getList', data).then(res => {
      //console.log(res)
      if(res.data.length==pageSize){
        isHava=true;
      }
      let list=this_.data.list;
      list.push(...res.data);
      this_.setData({
        list: list,
      })

    })
  },
  getlocat() {
    let this_ = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        lot=res;
        this_.getList();
      }
    })
  },

  /**
   * 商家入口
   */
  onClick(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.list[index];
    wx.openLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    })
  },

  /**
   * 查看详情 
   */
  onDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/detail/detail?id=' + id,
    })
  },

  onShow() {
    lot=null;
    pageNo = 1;
    pageSize = 20;
    isHava = true;
    this.setData({
      list:[]
    })
    this.getList();
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