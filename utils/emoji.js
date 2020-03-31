
class Emoji {
  constructor() {
  }
}
Emoji.Analysis = function (text) {
  let array = [];
  let isHava = true;
  let str = text;
  let strSub = "";
  let find = function (e) {
    str = e;
    strSub = e;
    let length = e.length;
    let startIndex = e.indexOf("[!");
    let endIndex = e.indexOf("!]");
    if (startIndex == -1 || endIndex == -1) {
      isHava = false;
      let strr = strSub;
      for (let i = 0; i < strr.length; i++) {
        let strrr = strr;
        let val = strrr.slice(i, i + 1)

        let data = {
          type: 0,
          val: val
        }
        array.push(data);
      }
      return;
    }
    let strr = strSub.slice(0, startIndex);
    for (let i = 0; i < strr.length; i++) {
      let strrr = strr;
      let val = strrr.slice(i, i + 1)

      let data = {
        type: 0,
        val: val
      }
      array.push(data);
    }

    strSub = str;
    let data1 = {
      type: 1,
      val: "https://m.uobrand.com/knowledge/public/static/tp/bq/" + strSub.slice(startIndex + 2, endIndex) + ".png"
    }
    strSub = str;
    str = strSub.slice(endIndex + 2);
    array.push(data1);
  }
  while (isHava) {
    find(str)
  }
  // console.log(array, str);
  return array;
}
export { Emoji };