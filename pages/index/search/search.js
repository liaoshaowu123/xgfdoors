import { Ljrqe } from '../../../utils/ljrqe.js';
import { SnapData } from '../../../utils/snapData.js';
var ljrqe = new Ljrqe();
var keywaord='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lsList: [],
    areaList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    keywaord='';
  },

  /**
   * 点击搜索历史
   */
  onLx(e){
    keywaord = e.currentTarget.dataset.name;
    if (keywaord == '') {
    } else {
      this.getList();
    }
  },
  /**
 * 跳转
 */
  onSelect(e) {
    let id = e.currentTarget.dataset.id;
    let areaId = e.currentTarget.dataset.areaid;
    let name = e.currentTarget.dataset.name;
    SnapData.order.house = { areaId, id, name, areaGroupId: 0 };
    wx.navigateTo({
      url: '/pages/index/house/house?id=' + id + '&name=' + name,
    })
  },

  onInput(e){
    //console.log(e)
    let str = e.detail.value;
    keywaord=str;
    if (str == '') {
    } else {
      this.getList();
    }
  },


  /**
  * 获取商铺列表
  */
  getList() {
    let this_ = this;
    let data = { name: keywaord, cityCode: wx.getStorageSync('citycode')};
    ljrqe.post('plot/serarchByName', data).then(res => {
      let lists = res.data;
      this_.setData({
        areaList: lists
      })
    })
  },

  /**
  * 获取历史列表
  */
  getLsList() {
    isHava = false;
    let this_ = this;
    let data = {};
    ljrqe.post('buniness/list', data).then(res => {
      let lists = res.data;
      this_.setData({
        lsList: lists
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getShopList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})