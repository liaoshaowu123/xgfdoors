import { Config } from '../../utils/config.js';
import { SnapData } from '../../utils/snapData.js';
import { Ljrqe } from '../../utils/ljrqe.js';
var ljrqe=new Ljrqe();

const updateManager = wx.getUpdateManager()

var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk=null;
var citycode=-1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isMaster: false,
    areaList:[],
    city:'',
    isscope:false,
    showTip:false,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // return
    console.log(options)
    console.log(options.scene)
    if (!!options.scene){
      if (options.scene == wx.getStorageSync('userId')){
       
      }else{
        let parentId = options.scene;
        this.setParent(options.scene);
      }
      
    }

    if (wx.getStorageSync('userType')==1){
      this.setData({
        isMaster: true,
      })
    }
    let this_=this;
    this_.getlocat();
    
  },
  
  /**
   *绑定用户 
   */
  setParent(parentId){
    wx.login({
      success: function (res) {
        ljrqe.post('user/wxLoginCode.do', {
          Code: res.code,
          parentId: parentId
        }).then(r => {
          console.log(r)
        })
      }
    })
  },

  /**
   * 地图定位
   */
  getlocat(){
    // 实例化API核心类
    if (!qqmapsdk){
      qqmapsdk = new QQMapWX({
        key: 'EYOBZ-4XV6O-X75WV-SNZSM-ROXD7-IAFQB'
      });
    }
    
    let this_ = this;
    wx.showLoading({
      title: '读取位置中...',
      icon: 'none'
    })
    setTimeout(() => {
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          console.log(res)
          let data = res.result.ad_info;
          let city = wx.getStorageSync('city');
          citycode = wx.getStorageSync('citycode');
          let code = data.city_code.replace(data.nation_code, '');
          
          
          console.log(citycode);
          this_.setData({
            city: city
          })
          //storage!=result
          if (!!citycode && citycode != code){
            console.log(11)
            this_.changeCity({
              city:data.city,
              oldcity:city,
              citycode:code
            });
          }else{
            this_.setData({
              city: data.city
            })
            wx.setStorageSync('citycode', code);
            wx.setStorageSync('city', data.city);
            citycode = code;
            this_.getList();
          }
        }
      })
    }, 500)
  },

  /**
   * checkVer
   */
  checkVer(){
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function (res) {
      console.log(res)
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },

  /**
   * changecity
   */
  changeCity(r){
    let this_=this;
    wx.showModal({
      title: '提示',
      content: `定位城市${r.city}与当前选择城市${r.oldcity}不符，是否立即切换至${r.city}?`,
      showCancel: true,
      success: function(res) {
        if(res.confirm){
          this_.setData({
            city: r.city
          })
          wx.setStorageSync('citycode', r.citycode);
          wx.setStorageSync('city', r.city);
          citycode = r.citycode;
          this_.getList();
        }else{
          this_.setData({
            city: wx.getStorageSync('city')
          })

          citycode = wx.getStorageSync('citycode');
          this_.getList();
        }
      },
      fail: function(res) {
        console.log(res)
        
      },
      complete: function(res) {},
    })
  },

 
	/**
   * 拨打电话
   */
  onCall(){
    wx.makePhoneCall({
      phoneNumber: '17307415488',
    })
  },
	
  /**
   * 跳转
   */
  onSelect(e){
    let id = e.currentTarget.dataset.id;
    let areaId = e.currentTarget.dataset.areaid;
    let name = e.currentTarget.dataset.name;
    SnapData.order.house = { areaId, id, name, areaGroupId:0};
    wx.navigateTo({
      url: '/pages/index/house/house?id=' + id+'&name='+name,
    })
  },
  
  /**
   * 获取列表
   */
  getList(){
    
    if(citycode==-1){return}
    // wx.showLoading({
    //   title: '城市拉取中...',
    //   icon: 'none'
    // })
    let this_ = this;
    let data = {
      cityCode:citycode
     };
    ljrqe.post('plot/list', data).then(res => {
      wx.hideLoading();
      console.log(res)
      let list = res.data;
      let showTip=false;
      if (res.data.length == 0) {
        showTip=true;
      }
      this_.setData({
        areaList: list,
        showTip: showTip
      })
      
      // if(res.data.length==0){
      //   wx.showModal({
      //     title: '提示',
      //     content: '当前城市暂无支持的项目，是否切换其他城市查看？',
      //     success(res){
      //       if(res.confirm){
      //         wx.navigateTo({
      //           url: 'city/city?city='+this_.data.city,
      //         })
      //       }
      //     }
      //   })
      // }
    })
  },

  onMaster(){
    wx.navigateTo({
      url: '/pages/master/master',
    })
  },

  onShow(){
    // return
    console.log(SnapData.cityChange);
    if (SnapData.cityChange==true){
      SnapData.cityChange=false;
      citycode=wx.getStorageSync('citycode');
      this.setData({
        city: wx.getStorageSync('city')
      })
    }
    this.checkUserInfo();
    this.getList();
  },

  getInfo() {
    this.setData({
      name: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl'),
    })
  },
  /**
   * 检测授权
   */
  checkUserInfo() {
    let this_=this;
    wx.login({
      success: function (res) {
        ljrqe.post('user/wxLoginCode.do', {
          Code: res.code,
        }).then(r=>{
          wx.setStorageSync('userId', r.data.id);
          wx.setStorageSync('userType', r.data.userLevel);
          if (r.data.userLevel == 1) {
            this_.setData({
              isMaster: true
            })
          }
        })
      }
    })
    
    if (!wx.getStorageSync('gfnickName')) {
      //console.log('gfnickName')
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          const nickName = userInfo.nickName
          const avatarUrl = userInfo.avatarUrl
          const gender = userInfo.gender // 性别 0：未知、1：男、2：女
          const province = userInfo.province
          const city = userInfo.city
          const country = userInfo.country
          wx.setStorageSync('gfnickName', userInfo.nickName)
          wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
          let data = {
            userId: wx.getStorageSync('userId'),
            name: userInfo.nickName,
            sex: userInfo.gender,
            image: userInfo.avatarUrl
          };
          ljrqe.post('user/completeUser.do', data).then(res => {

            // this_.checkUserInfo();
            this_.setData({
              isscope:false
            })
            
          })
          // this_.getInfo();
        }, fail() {
          this_.setData({
            isscope: true,
          })
        }
      })
    } 
  },

  onGotUserInfo() {
    this.checkUserInfo();
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