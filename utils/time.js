
class Time {
  constructor() {
  }
  //解析时间
  getTime(n, type = 'ym') {
    let time = n * 1000;
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

  //将进度转00：00时间
  formatSeconds(value) {
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
    return result;
  }
}
export { Time };