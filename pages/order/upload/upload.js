import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
var isPay = true;
var id = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    info:null,
    upimg:'/images/add.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) { return };
    id = options.id;
    isPay = true;
    this.onMake(id);
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

  //选择图片
  onSelectImg() {
    let this_ = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        ////console.log(res);
        this_.setData({
          upimg: res.tempFilePaths[0]
        })
      },
    })
  },

  /**
     * 详情
     */
  onMake(id) {
    let this_ = this;
    let data = { orderId: id };
    ljrqe.post('mcOrder/payProofPortal', data).then(res => {
      //console.log(res)
      this_.setData({
        list: res.data.banks,
        info:res.data
      })
    })
  },

  /**
   * onClick
   */
  onClick() {
    let this_ = this;
    if (this_.data.upimg == '/images/add.png'){
      this.showModal({
        title:'提示',
        content:'请上传付款凭证!',
        showCancel:false
      })
    }
    wx.showLoading({
      title: '提交中...',
      mask:'true'
    })
    wx.uploadFile({
      url: Config.resUrl + 'mcOrder/uploadPayProof',
      filePath: this_.data.upimg,
      name: 'file',
      formData:{
        orderId: id,
        userId:wx.getStorageSync('userId'),
      },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        let ress = JSON.parse(res.data);
        if (ress.code != 1) {
          wx.showToast({
            title: ress.msg,
            icon: 'none'
          })
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/order/order',
            })
          },1000)
          
        }else{
          wx.showModal({
            title: '提示',
            content: ress.msg,
            showCancel: false,
          })
        }
      }
    })


  },

  /**
   * 支付
   */
  onPay() {
    if (!isPay) {
      isPay = false;
      return
    }
    let this_ = this;
    let data = {
      id: this.data.info.id,
      payType: 0,
      payAmount: Math.round((this.data.info.money - 0.01) * 100) / 100,
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