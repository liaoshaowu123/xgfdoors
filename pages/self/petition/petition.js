import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex:0,
    region: ['未选择', '未选择', '未选择'],
    customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
    * 申请类型
    */
  onSelect(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.typeIndex) {
      this.setData({
        typeIndex: index,
      })
    }

  },

  /**
   * 提交订单
   */
  onClick(e) {
    let info = e.detail.value;
    //console.log(e.detail.value);
    let this_ = this;
   
    if (!info.name) {
      this.showModal('请填写联系人名称!');
      return;
    }
    if (info.tel.length != 11) {
      this.showModal('请填写正确的手机号!');
      return;
    }

    if (this.data.region[0]=='未选择') {
      this.showModal('请点击选择所在区域!');
      return;
    }

    if (!info.area) {
      this.showModal('请填写申请的小区!');
      return;
    }
    
    let data = {
      lyName:info.name,
      phoen:info.tel,
      // region: this.data.region[0] + this.data.region[1] + this.data.region[2],
      province: this.data.region[0],
      city: this.data.region[1],
      area: this.data.region[2],
      plotName: info.area,
      wxName: wx.getStorageSync('userId')
    };
    console.log(data);
    ljrqe.post('user/apply', data).then(res => {
      wx.showToast({
        title:res.msg,
        icon:'none'
      })
      setTimeout(()=>{
        wx.navigateBack({
          
        })
      },1500)
    })

  },

  showModal(txt) {
    wx.showModal({
      title: '提示',
      content: txt,
      showCancel: false,
    })
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