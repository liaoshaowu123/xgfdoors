import { Ljrqe } from '../../../utils/ljrqe.js';
import { SnapData } from '../../../utils/snapData.js';
var ljrqe = new Ljrqe();
var isPay=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    priceIndex:0,
    lfprice:0.01,
    orderid:-1,
    isSelect:false,
    isWx: false,
    payinfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isPay = true;
    //console.log(SnapData.order)
    this.setData({
      info:SnapData.order,
      lfprice:SnapData.lfprice
    })
  },

  /**
   * onConta
   */
  onConta(){
    wx.navigateTo({
      url: 'contract/contract',
    })
  },

  /**
    * 付款类型
    */
  onSelect(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.priceIndex) {
      this.setData({
        priceIndex: index,
      })
    }

  },

  /**
   * 提交订单
   */
  onClick(e){
    let info = e.detail.value;
    //console.log(e.detail.value);
    let this_ = this;
    if (!info.dong || !info.dy || !info.hao) {
      this.showModal('请填写完整房号信息!');
      return;
    }
    // if (!info.m || !info.d || !info.h) {
    //   this.showModal('请填写完整房号信息!');
    //   return;
    // }
    if (!info.username) {
      this.showModal('请填写联系人名称!');
      return;
    }
    if (info.tel.length != 11) {
      this.showModal('请填写正确的手机号!');
      return;
    }
    let address = `${info.dong}栋${info.dy}单元${info.hao}号`;
    let time = `${info.m}月${info.d}日${info.h}点`;
    let str = JSON.stringify(SnapData.order.falist);
    str.substr(2, str.length - 2);
    let data = {
      // areaId: SnapData.order.house.areaId,
      money: SnapData.order.total_price,//订单总金额
      payAmount: this.data.priceIndex == 1 ? SnapData.order.total_price : this.data.lfprice,//支付金额
      areaGroupId: SnapData.order.house.areaGroupId,//小区分组id
      aluminumBrandId: SnapData.order.lcId,//铝材品牌Id
      aluminumSeriesId: SnapData.order.xiId,//铝材系列id
      aluminumColorId: SnapData.order.colorId,//铝材颜色id
      partsId: SnapData.order.pjId,//配件id
      glassTypesId: SnapData.order.blId,//玻璃种类id
      guardRailingId: SnapData.order.fhlId,//防护栏id
      plotId: SnapData.order.house.id,//小区id
      houseTypeId: SnapData.order.house.houserId,//户型id
      areaName: SnapData.order.house.areaId,//市区
      houseNo: address,//楼号
      amountTime: time,//量房时间
      phone: info.tel,//电话
      contacts: info.username,//用户名
      plan: str,
      companyId: SnapData.order.anId,
      payType: this.data.priceIndex == 1 ? 0 : 1,
    };
    console.log(data);

    wx.showModal({
      title: '提示',
      content: '门窗属于定制产品，下单后不可修改，是否确认?',
      showCancel: true,
      success: function(res) {
        if(res.confirm){
          ljrqe.post('mcOrder/save', data).then(res => {
            if (this_.data.priceIndex==1){
              this_.setData({
                orderid: res.data.orderId,
                // isSelect: true,

              })
              this_.onWxPay();
            }else{
              this_.onPay(res);
            }
            
            //console.log(res)
            // this_.onPay(res);
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
    
  },
  onClose() {
    this.setData({
      isSelect: false,
      isWx: false,
    })
  },
  /**
   * onWxPay
   */
  onWxPay(){
    let this_=this;
    let data={
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
  onWxClick(e){
    let info = e.detail.value;
    console.log(e.detail.value);
    let this_ = this;
    if (!info.money) {
      this.showModal('请输入付款金额!');
      return;
    }
    let data = {
      orderId: this.data.orderid,
      payMoney:info.money
    }
    ljrqe.post('mcOrder/payWXOrder', data).then(res => {
      this_.onPay(res);
    })
  },

  /**
   * 支付
   */
  onPay(res){
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
        setTimeout(function(){
          wx.showModal({
            title: '提示',
            content: '是否立即查看订单?',
            showCancel: true,
            success: function(res) {
              if(res.confirm){
                wx.switchTab({
                  url: '/pages/order/order',
                })
              }
            },
          })
        },1000)
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
  showModal(txt){
    wx.showModal({
      title: '提示',
      content: txt,
      showCancel: false,
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

  
})