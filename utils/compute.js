
class Compute {
  constructor() {
  }
}
/**
 * getTime(value)           时间戳转日期
 * getTimestamp(value='')   获取时间戳(可传日期)
 * formatSeconds(value)     秒转00：00字符显示
 * getMinVal(list)          数组取最小值
 * getMaxVal(list)          数组取最大值
 * sortMin(list,pro='')     数组从小到大排序(可传属性)
 * sortMax(list,pro='')     数组从大到小排序(可传属性)
 * findList(list,val,pro='',findIndex=false)  查找list并返回值,可选返回index
 */

//解析时间 dhms->天时分秒结尾
Compute.getTime = function (n, type = 'ym'){
  let time=n ;
  if(n<11111111111){
    time = n * 1000;
  }
  var nows = new Date(time);
  var f = function (n) {
    if (n < 10) {
      n = '0' + n;
    }
    return n;
  }
  var years = nows.getFullYear();
  var months = f(nows.getMonth() + 1);
  var days = f(nows.getDate());
  var hour = f(nows.getHours());
  var min = f(nows.getMinutes());
  var s = f(nows.getSeconds());

  var t = '';
  switch (type) {
    case 'ydd':
      t = years + "年" + months + "月" + days + "日";
      break;
    case 'yd':
      t = years + "-" + months + "-" + days;
      break;
    case 'ym':
      t = years + "-" + months + "-" + days + " " + hour + ":" + min;
      break;
    case 'ys':
      t = years + "-" + months + "-" + days + " " + hour + ":" + min + ":" + s;
      break;
    case 'hs':
      t = hour + ":" + min + ":" + s;
      break;
    case 'hm':
      t = hour + ":" + min;
      break;
    case 'ms':
      t = min + ":" + s;
      break;
  }
  return t;
}

//日期转时间戳
Compute.getTimestamp=function(value=''){
  var date = new Date(); //时间对象
  if(value!=''){
    date = new Date(Date.parse(value.replace(/-/g, "/")));
  }
  var str = date.getTime(); //转换成时间戳
  var time2 = date.valueOf();
  var time3 = Date.parse(date);
  // console.log(str,time2,time3)
  return str;
}

//将进度转00：00时间
Compute.formatSeconds=function(value,type=0) {
  var theTime = parseInt(value);// 秒 
  var theTime1 = 0;// 分 
  var theTime2 = 0;// 小时 
  // alert(theTime); 
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime); 
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  // var result = "" + parseInt(theTime) + "秒";
  var result = "" + parseInt(theTime);
  if (result < 10) {
    result = "0" + parseInt(theTime);
  }
  if (theTime1 > 0) {
    if (theTime1 < 10) {
      result = "0" + parseInt(theTime1) + ":" + result;
    } else {
      result = "" + parseInt(theTime1) + ":" + result;
    }
  } else {
    result = "00:" + result;
  }
  if (theTime2 > 0) {
    // result = "" + parseInt(theTime2) + "小时" + result;
    result = "" + parseInt(theTime2) + ":" + result;
  }
  if(type==1){
    var list = [parseInt(theTime2), parseInt(theTime1), parseInt(theTime)];
    list.map(function(v){
      if(v<10){
        v='0'+v;
      }
    })
    result = list[0]+'时 '+list[1]+'分 '+list[2]+'秒';
  }
  return result;
}
//获取最小值
Compute.getMinVal=function(list){
  let val;
  Math.min.apply(null,list)
  return val;
}
//获取最大值
Compute.getMaxVal = function (list) {
  let val;
  Math.max.apply(null, list)
  return val;
}
//数组排序从小到大
Compute.sortMin=function(list,pro=''){
  if(pro==''){
      let i=0;let l=1;
      while (l < list.length){
        for (let j = l; j > i; j--) {
          if (list[j] < list[j - 1]) {
            let v = list[j - 1];
            list[j - 1] = list[j];
            list[j]=v;
          } else {
            break;
          }
        }
        l++
      }
    return list;
  }else{
    let i = 0; let l = 1;
    while (l < list.length) {
      for (let j = l; j > i; j--) {
        if (list[j][pro] < list[j - 1][pro]) {
          let v = list[j - 1];
          list[j - 1] = list[j];
          list[j] = v;
        } else {
          break;
        }
      }
      l++
    }
    return list;
  }
}
//数组排序从大到小
Compute.sortMax = function (list, pro = ''){
  if (pro == '') {
    let i = 0; let l = 1;
    while (l < list.length) {
      for (let j = l; j > i; j--) {
        if (list[j] > list[j - 1]) {
          let v = list[j - 1];
          list[j - 1] = list[j];
          list[j] = v;
        } else {
          break;
        }
      }
      l++
    }
    return list;
  } else {
    let i = 0; let l = 1;
    while (l < list.length) {
      for (let j = l; j > i; j--) {
        if (list[j][pro] > list[j - 1][pro]) {
          let v = list[j - 1];
          list[j - 1] = list[j];
          list[j] = v;
        } else {
          break;
        }
      }
      l++
    }
    return list;
  }
}
//查找并返回值,可选返回index
Compute.findList=function(list,val,pro='',findIndex=false){
  let temp=val;
  if (pro!=''){
    temp=val[pro];
    for (let i = 0; i < list.length; i++) {
      if(list[i][pro]==temp){
        return findIndex?i:list[i]
      }
    }
  }else{
    for (let i = 0; i < list.length; i++) {
      if (list[i] == temp) {
        return findIndex ? i :list[i]
      }
    }
  }
  return false;
}
export { Compute };