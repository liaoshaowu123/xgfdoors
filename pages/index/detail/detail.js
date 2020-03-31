
var WxParse = require('../../../wxParse/wxParse.js')
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var id=0;
var type=0;
var arr = ['aluminumBrand/getBrandConent', 'parts/getPartsConent', 'glassTypes/getGlassTypesConent', 'company/getCompanyConent','GuardRailing/getPartsConent']
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad(op) {
    //console.log(op)
    type = op.type;
    id = op.id;
    this.getData();
  },
  
  //获取文章详情
  getData() {
    let this_ = this;
    let data = { id: id };
    ljrqe.post(arr[parseInt(type)], data).then(res => {
      let content = res.data.conent;
      WxParse.wxParse('content', 'html', content, this_, 25);
    })
    
  },
 
 
})