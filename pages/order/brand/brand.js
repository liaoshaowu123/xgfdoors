import { Ljrqe } from '../../../utils/ljrqe.js';
import { SnapData } from '../../../utils/snapData.js';

import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
var id=0;
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
    if (!options.id) { return };
    id = options.id;
    this.onMake(id);
    //console.log(SnapData.order)
    this.getList();
    
    
  },
  /**
     * 详情
     */
  onMake(id) {
    let this_ = this;
    let data = { id: id };
    ljrqe.post('mcOrder/get', data).then(res => {
      let info={
        lvcai:1,
        area:1,
        pei:1
      };
      info.lvcai = parseFloat(res.data.aluminumSum);
      info.pei = parseFloat(res.data.partsSum);
      info.area = parseFloat(res.data.acreageSum);
      this_.setData({
        info: info,
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
    let data = { };
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
    lcPrice = lvcai * spanLvPrice;

    //配件
    pjPrice = pei * this.data.pjlist[this.data.pjIndex].price;

    //防护栏
    fhlPrice = pei * this.data.lclist[this.data.lcIndex].price;
    if(this.data.fhlIndex==1){
      fhlPrice=0;
    }
    //玻璃
    blPrice = area * this.data.bllist[this.data.blIndex].price;

    //安装
    azPrice = area * this.data.azinfo.price;
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
    let url = Config.imgUrl + this.data.lclist[this.data.lcIndex].colorsList[this.data.lcColorIndex].cImage;
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