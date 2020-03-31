class Storage {
  constructor() {
  }
}
Storage.get=function(text){
  let val='';
  val=wx.getStorageSync('text')
  if(val){
    return val;
  }
  return null;
}
Storage.set = function (text,data) {
  wx.setStorage({
    key: text,
    data: data,
  })
}
export { Storage };


