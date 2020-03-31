import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var pageNo = 1;
var pageSize = 20;
var isHava = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex:0,
    typeList: [],
    list: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNo = 1;
    isHava = true;
    this.getUserInfo();
    //
  },


  /**
  * getStorage
  */
  getUserInfo() {
    let this_ = this;
    let data = {};
    ljrqe.post('user/getUserById', data).then(res => {
      console.log(res)
      let userLevel = res.data.userLevel;
      let n1 = userLevel.indexOf("2");
      let n2 = userLevel.indexOf("3");
      console.log(n1,n2)
      let arr = [{ name: '分销佣金', type: 0 }];
      if(n1!=-1){
        arr.push({ name: '团长分红', type: 1 });
      }
      if (n2 != -1) {
        arr.push({ name: '师长分红', type: 2 });
      }
      this_.setData({
        typeList: arr
      })
      this_.getList();
    })
  },

  /**
   * onType
   */
  onType(e){
    let index= e.currentTarget.dataset.index;
    if(index!=this.data.typeIndex){
      this.setData({
        typeIndex:index,
        list:[]
      })
    }
    pageNo = 1;
    isHava = true;
    this.getList();
  },

  /**
   * list
   */
  getList(id) {
    if (!isHava) { return };
    isHava = false;
    let this_ = this;
    let data = { pageNo: pageNo, pageSize: pageSize, type: this_.data.typeList[this_.data.typeIndex].type };
    ljrqe.post('account/getAccountDetailList.do', data).then(res => {
      if (res.data.length == pageSize) {
        isHava = true;
        pageNo += 1;
      }
      let lists = res.data;
      let list = this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
      })
    })
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})