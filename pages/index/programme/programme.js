import { Ljrqe } from '../../../utils/ljrqe.js';
import { SnapData } from '../../../utils/snapData.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
var houseId=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.imgUrl,
    zwlist: ['1', '2', '3', '4','5'],
    list:[],
    // list: [{
    //   name: '咖啡屋', area: '25.5', type: 0, 
    //   list: [{ id: 0, width: '3025', height: '2054', img: '/images/ch1.png', lvcai: '84', pei: '4' }, { id: 0, width: '3025', height: '2054', img: '/images/ch2.png', lvcai: '84', pei: '4' }]
    // },
    // {
    //   name: '咖啡屋', area: '25.5', type: 0, list: [{ id: 0, width: '3025', height: '2054', img: '/images/ch2.png', lvcai: '84', pei: '4' }, { id: 0, width: '3025', height: '2054', img: '/images/ch1.png', lvcai: '84', pei: '4' }]
    // },
    // ],
    info:{area:51,num:2},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    houseId=options.id;
    this.getList(options.id);
  },
  /**
   * 预览图片
   */
  onLookPic(e){
    let img = e.currentTarget.dataset.img;
    wx.previewImage({
      urls: [img],
    })
  },
  /**
  * 获取列表
  */
  getList(id) {
    let this_ = this;
    let data = { houseTypeId: id };
    ljrqe.post('windowScheme/listByHouseType', data).then(res => {
      let lists = res.data;
      for (let i = 0; i < lists.mcVeranda.length;i++){
        lists.mcVeranda[i].type=0;
        for (let ii = 0; ii < lists.mcVeranda[i].list.length; ii++) {
          lists.mcVeranda[i].list[ii].image = lists.mcVeranda[i].list[ii].image.split(",")[0];
        }
      }
      //console.log(lists);
      this_.setData({
        info: lists
      })
    })
  },


/**
  * 选择方案
  */
  onSelect(e) {
    let i = e.currentTarget.dataset.i;
    let index = e.currentTarget.dataset.index;
    this.data.info.mcVeranda[index].type=i;
    this.setData({
      info: this.data.info
    })
  },
  
  /**
   * 下一步
   */
  onClick(){
    let falist=[];
    let area = 0;
    let lvcai = 0;
    let pei = 0;
    let fhl = 0;
    for (let i = 0; i < this.data.info.mcVeranda.length;i++){
      let data={
        mcVerandaId: this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].verandaId,
        planId: this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].id,
        width: this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].width,
        length: this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].length,
        // type: this.data.info.mcVeranda[i].type,
        // area: this.data.info.mcVeranda[i].acreage,
        // lvcai: this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].aluminium,
        // pei: this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].parts,
      }
      fhl+=1;
      area += parseFloat((this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].acreage));
      lvcai += parseFloat((this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].aluminium));
      pei += parseFloat((this.data.info.mcVeranda[i].list[this.data.info.mcVeranda[i].type].parts));
      falist.push(data);
    }
    area = parseFloat(area.toFixed(2));
    lvcai = parseFloat(lvcai.toFixed(2));
    pei = parseFloat(pei.toFixed(2));
    SnapData.order = { house: SnapData.order.house,  falist: falist, area: area, lvcai: lvcai, pei: pei, fhl: fhl};
    //console.log(SnapData.order);
    wx.navigateTo({
      url: '/pages/index/brand/brand',
    })
  },
  
})