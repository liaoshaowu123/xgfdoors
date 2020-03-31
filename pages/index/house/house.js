import { SnapData } from '../../../utils/snapData.js';
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex:0,
    houseIndex:0,
    list:[],
    houserId:0,
    // list: [{
    //   name: '咖啡屋', floor: [1, 2, 3, 4, 5, 6, 7], arealist: [{ id: 0, area: '3025', type: '两室一厅' }, { id: 0, area: '3025', type: '两室一厅' }, { id: 0, area: '3025', type: '两室一厅' }, { id: 0, area: '3025', type: '两室一厅' }]
    // },
    //   {
    //     name: '咖啡屋', floor: [1, 2, 3, 4, 5, 6, 7], arealist: [{ id: 0, area: '3025', type: '两室一厅' }, { id: 0, area: '3025', type: '两室一厅' }, { id: 0, area: '3025', type: '两室一厅' }, { id: 0, area: '3025', type: '两室一厅' }]
    //   },
    // ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      houserId:options.id
    })
    this.getList(options.id);
  },
  /**
  * 跳转
  */
  onSelect(e) {
    let id = e.currentTarget.dataset.id;
    let areaGroupId = e.currentTarget.dataset.areagroupid;
    let index=e.currentTarget.dataset.index;
    let i=e.currentTarget.dataset.i;
    if(i!=this.data.houseIndex||index!=this.data.typeIndex){
      this.setData({
        houseIndex:i,
        typeIndex:index,
      })
    }
    SnapData.order.house.houserId = id;
    SnapData.order.house.areaGroupId = areaGroupId;
    //console.log(SnapData.order)
    wx.navigateTo({
      url: '/pages/index/programme/programme?id=' + id ,
    })
  },


  /**
  * 获取列表
  */
  getList(id) {
    let this_ = this;
    let data = { areaId:id  };
    ljrqe.post('areaGroup/list', data).then(res => {
      let lists = res.data;
      this_.setData({
        list: lists
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
    return {
      title: '选择户型',
      path: '/pages/index/index',
      //imageUrl
    }
  }
})