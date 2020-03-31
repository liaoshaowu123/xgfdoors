import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
var isPay = true;
var id=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.imgUrl,
    info: {},
    payinfo:{},
    orderid:0,
    txt:'去评价',
    isSelect:false,
    isWx:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id){return};
    id = options.id;
    isPay = true;
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
     * 详情
     */
  onMake(id) {
    let this_ = this;
    let data = { id: id };
    ljrqe.post('mcOrder/get', data).then(res => {
      //console.log(res)
      let txt='';
      let arr1 = ['未派单', '去评价', '已派单', '查看评价']
      txt = arr1[parseInt(res.data.orderStatus)];
      // if (res.data.payType == 1){
      //   txt='补缴全款';
      // }
      let arr = ['未量房', '已完成', '已派单', '已评价']
      res.data.statuss = arr[parseInt(res.data.orderStatus)];
      for (let ii = 0; ii < res.data.verandaList.length; ii++) {
        res.data.verandaList[ii].mcOrderVeranda.image = res.data.verandaList[ii].mcOrderVeranda.image.split(",")[0];
      }
      this_.setData({
        info: res.data,
        orderid:res.data.id,
        txt: txt
      })
    })
  },

  /**
   * onClick
   */
  onClick(){
    //console.log('点击了')
    // if (this.data.info.payType == 1){
    //   this.onPay();
    // } else 
    if (this.data.info.orderStatus == 1){
      wx.navigateTo({
        url: '../comment/comment?id=' + this.data.info.id + '&house=' + (this.data.info.plotName + this.data.info.houseNo) + '&num=' + this.data.info.orderNo + '&time=' + this.data.info.createDate,
      })
    } else if (this.data.info.orderStatus == 3) {
      wx.navigateTo({
        url: '/pages/master/contract/contract?id=' + this.data.info.id + '&house=' + (this.data.info.plotName + this.data.info.houseNo) + '&num=' + this.data.info.orderNo + '&time=' + this.data.info.createDate + '&name=' + this.data.info.contacts,
      })
    }

    
  },

  /**
   * 支付
   */
  onPay() {
    if (!isPay){
      isPay = false;
      return
    }
    let this_ = this;
    let data = {
      id: this.data.info.id,
      payType:0,
      payAmount: Math.round((this.data.info.money-0.01)*100)/100,
     };
    ljrqe.post('mcOrder/save', data).then(res => {
      //console.log(res)
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.packageStr,
        signType: 'MD5',
        paySign: res.data.paySign,
        success(res) {
          isPay = true;
          wx.showToast({
            title: '缴费成功',
          })
          this_.onMake(id);
        },
        fail(res) {
          isPay = true;
          wx.showToast({
            title: '缴费失败',
            icon: 'none'
          })
        }
      });
    })
  },

/**
 * onClose
 */
  onClose(){
    this.setData({
      isSelect: false,
      isWx: false,
    })
  },
  /**
   <button class='btn row_c' catchtap='onPayend'>支付尾款</button>
   * 
   */
  onPayend(){
    this.setData({
      orderid: this.data.orderid,
      // isSelect: true,
    })
    this.onWxPay();
  },

  /**
  * onWxPay
  */
  onWxPay() {
    let this_ = this;
    let data = {
      orderId: this.data.orderid,
    }
    ljrqe.post('mcOrder/payPortal', data).then(res => {
      this_.setData({
        payinfo: res.data,
        isSelect: false,
        isWx: true,
      })
    })

  },

  /**
   * onWxClick
   */
  onWxClick(e) {
    let info = e.detail.value;
    console.log(e.detail.value);
    let this_ = this;
    if (!info.money) {
      this.showModal('请输入付款金额!');
      return;
    }
    let data = {
      orderId: this.data.orderid,
      payMoney: info.money
    }
    ljrqe.post('mcOrder/payWXOrder', data).then(res => {
      this_.onPays(res);
    })
  },

  /**
   * 支付
   */
  onPays(res) {
    let this_ = this;
    wx.requestPayment({
      timeStamp: res.data.timeStamp,
      nonceStr: res.data.nonceStr,
      package: res.data.packageStr,
      signType: 'MD5',
      paySign: res.data.paySign,
      success(res) {
        isPay = true;
        wx.showToast({
          title: '支付成功',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/order/order',
          })
        }, 1000)
      },
      fail(res) {
        isPay = true;
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        })
      }
    });
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
    if (!id) { return };
    this.onMake(id);
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