import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
var id=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.imgUrl,
    info: { },
    txt: '完成'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) { return };
    id = options.id;
    this.onMake(options.id);
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
   * 拨打电话
   */
  onCall() {
    let tel = this.data.info.phone
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  /**
   * 
   */
  onIputRemaker(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let detail = e.detail.value;
    this.data.info.verandaList[index].mcOrderVeranda.detail = detail;
    console.log(this.data.info)
    this.setData({
      info: this.data.info
    })
  },
  /**
     * 输入宽度
     */
  onIputWidth(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let width = e.detail.value;
    this.data.info.verandaList[index].mcOrderVeranda.width = width;
    this.data.info.verandaList[index].mcOrderVeranda.area = Math.round(width * this.data.info.verandaList[index].mcOrderVeranda.length/10000)/100;
    this.setData({
      info: this.data.info
    })

  },

  /**
     * 输入高度
     */
  onIputHeight(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let height = e.detail.value;
    this.data.info.verandaList[index].mcOrderVeranda.length = height;
    this.data.info.verandaList[index].mcOrderVeranda.area = Math.round(height * this.data.info.verandaList[index].mcOrderVeranda.width / 10000) / 100;
    this.setData({
      info: this.data.info
    })


  },

  /**
     * 详情
     */
  onMake(id) {
    let this_ = this;
    let data = { id: id };
    ljrqe.post('mcOrder/get', data).then(res => {
      console.log(res)
      let arr = ['提交修改', '已量完房', '提交修改', '查看评价'];
      let txt = arr[parseInt(res.data.orderStatus)];

      //dantu
      // for (let ii = 0; ii < res.data.verandaList.length; ii++) {
      //   res.data.verandaList[ii].mcOrderVeranda.image = res.data.verandaList[ii].mcOrderVeranda.image.split(",")[1];
      // }

      this_.setData({
        info: res.data,
        txt:txt
      })
    })
  },

  /**
   * onClick
   */
  onClick() {
    console.log('点击了')
    if (this.data.info.orderStatus == 0 || this.data.info.orderStatus==2){
      let list = [];
      for (let i = 0; i < this.data.info.verandaList.length; i++) {
        let data = {
          mcVerandaId: this.data.info.verandaList[i].id,
          planId: this.data.info.verandaList[i].mcOrderVeranda.id,
          width: this.data.info.verandaList[i].mcOrderVeranda.width,
          length: this.data.info.verandaList[i].mcOrderVeranda.length,
          detail: this.data.info.verandaList[i].mcOrderVeranda.detail
        }
        list.push(data);
      }
      let str = JSON.stringify(list);
      str.substr(2, str.length - 2);
      let data = {
        plan: str,
        id: id,
        orderStatus: 1,
      };
      let this_=this;
      ljrqe.post('mcOrder/save', data).then(res => {
        console.log(res)
        wx.showToast({
          title: res.msg,
        })
        this_.onMake(id);
      })
    }
    if (this.data.info.orderStatus == 3) {
      wx.navigateTo({
        url: '../contract/contract?id=' + this.data.info.id + '&house=' + (this.data.info.plotName + this.data.info.houseNo) + '&num=' + this.data.info.orderNo + '&time=' + this.data.info.createDate + '&name=' + this.data.info.contacts,
      })
    }
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