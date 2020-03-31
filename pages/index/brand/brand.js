import { Ljrqe } from '../../../utils/ljrqe.js';
import { SnapData } from '../../../utils/snapData.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    lclist: [],
    lcColorIndex:0,
    lcIndex:0,
    lcIndex1:0,
    lcdjPrice:0,
    pjlist: [],
    pjIndex: 0,
    fhllist: [],
    fhlIndex: 0,
    bllist: [],
    blIndex:0,
    azinfo: { name: '湖南蜘蛛人建筑工程安装有限公司', price: 105, txt: '单价成本构成：工资：75元/m2    高空作业保险：5元/m2    胶水辅材：：25元/m2', txt1:'专业蜘蛛人'},
    lcPrice: 0,
    pjPrice: 0,
    fhlPrice: 0,
    blPrice: 0,
    azPrice: 0,
    total_price:0,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info:SnapData.order
    })
    //console.log(SnapData.order)
    this.getList();
    
    
  },

  /**
  * onConta
  */
  onConta() {
    wx.navigateTo({
      url: '../contact/contract/contract',
    })
  },

  /**
     * 预览图片
     */
  onLook() {
    let this_ = this;
    let data = {
      areaId: SnapData.order.house.areaId
    };
    ljrqe.post('user/imgUser', data).then(res => {
      let img = Config.imgUrl+ res.data.topArea;
      wx.previewImage({
        urls: [img],
      })
    })
    
  },

  /**
   * 查看详情
   */
  onContent(e){
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/index/detail/detail?id=' + id + '&type=' + type,
    })
  },

  /**
 * 获取列表
 */
  getList() {
    let this_ = this;
    let data = {
      areaId:SnapData.order.house.areaId
     };
    ljrqe.post('houseType/getBrandData', data).then(res => {
      let lists = res.data;
      this_.setData({
        lclist: lists.AluminumBrand,
        pjlist: lists.Parts,
        fhllist: lists.GuardRailing,
        bllist: lists.GlassTypes,
        azinfo: lists.InstallationCompany[0],
      })
      this_.comPrice();
    })
    
  },

  /**
   * 总价计算
   */
  comPrice(){
    let area = this.data.info.area;
    let lvcai = this.data.info.lvcai;
    let pei = this.data.info.pei;
    let fhl = this.data.info.fhl;

    let lcPrice,pjPrice,fhlPrice,blPrice,azPrice,total_price;

    //铝材
    let spanLvPrice = this.data.lclist[this.data.lcIndex].seriesList[this.data.lcIndex1].price ;
    lcPrice = parseFloat((lvcai * spanLvPrice).toFixed(2));

    //配件
    pjPrice = parseFloat((pei * this.data.pjlist[this.data.pjIndex].price).toFixed(2));
    // console.log(pei, this.data.pjlist[this.data.pjIndex].price)
    //防护栏
    fhlPrice = parseFloat((pei * this.data.lclist[this.data.lcIndex].price).toFixed(2));
    if (this.data.fhlIndex==0){
      fhlPrice=0;
    }
    //玻璃
    blPrice = parseFloat((area * this.data.bllist[this.data.blIndex].price).toFixed(2));

    //安装
    azPrice = parseFloat((area * this.data.azinfo.price).toFixed(2));
    total_price =Math.round((lcPrice + pjPrice + fhlPrice + blPrice + azPrice)*100)/100;
    this.setData({
      lcdjPrice: spanLvPrice,
      lcPrice,
      pjPrice,
      fhlPrice,
      blPrice,
      azPrice,
      total_price,
    })

  },
  
  /**
   * 切换铝材颜色
   */
  onChangeLcColor(e){
    let index = e.currentTarget.dataset.index;
    if (index != this.data.lcColorIndex){
      this.setData({
        lcColorIndex: index
      })
    }
    this.comPrice();
    let url=Config.imgUrl+this.data.lclist[this.data.lcIndex].colorsList[this.data.lcColorIndex].cImage;
    wx.previewImage({
      urls: [url],
    })
  },
  /**
   * 切换铝材品牌
   */
  onChangeLc(e){
    let index = e.currentTarget.dataset.index;
    if (index != this.data.lcIndex) {
      this.setData({
        lcIndex: index
      })
    }
    this.comPrice();
  },

  /**
  * 切换铝材品牌系列
  */
  onChangeLcXl(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.lcIndex1) {
      this.setData({
        lcIndex1: index
      })
    }
    this.comPrice();
  },

  /**
* 切换配件品牌
*/
  onChangePj(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.pjIndex) {
      this.setData({
        pjIndex: index
      })
    }
    this.comPrice();
  },

  /**
* 切换玻璃
*/
  onChangeBl(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.blIndex) {
      this.setData({
        blIndex: index
      })
    }
    this.comPrice();
  },

  /**
* 切换防护栏
*/
  onChangeFhl(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.fhlIndex) {
      this.setData({
        fhlIndex: index
      })
    }
    this.comPrice();
  },

  /**
   * 提交订单
   */
  onClick(){
    SnapData.order.lcId = this.data.lclist[this.data.lcIndex].id;
    SnapData.order.xiId = this.data.lclist[this.data.lcIndex].seriesList[this.data.lcIndex1].id;
    SnapData.order.colorId = this.data.lclist[this.data.lcIndex].colorsList[this.data.lcColorIndex].id;
    SnapData.order.pjId = this.data.pjlist[this.data.pjIndex].id;
    SnapData.order.fhlId = this.data.fhllist[this.data.fhlIndex].id;
    SnapData.order.blId = this.data.bllist[this.data.blIndex].id;
    SnapData.order.anId = this.data.azinfo.id;
    SnapData.order.total_price=this.data.total_price;
    wx.navigateTo({
      url: '/pages/index/contact/contact',
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