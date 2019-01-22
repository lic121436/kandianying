const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//  获取星星个数
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0)
    }
  }
  return array;
}

// 数据请求
function http(url, callBack) {
  
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

// 把演员的名字用 / 拼起来
function convertToCastString(casts) {
  let castsjoin = "";
  for (let idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2); // 去除最后拼接的斜杠
}

// 影人信息生成数组
function convertToCastInfos(casts) {
  let castsArray = [];
  for (let idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

const dtime = '_deadtime';
const setStorage = (k, v, t) => {
  wx.setStorageSync(k, v);
  const seconds = parseInt(t);
  if (seconds > 0) {
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + dtime, timestamp + "");
  } else {
    wx.removeStorageSync(k + dtime);
  }
}

const getStorage = (k, def) => {
  const deadtime = parseInt(wx.getStorageSync(k + dtime));
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) {
        return def;
      } else {
        return;
      }
    }
  }
  const res = wx.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}

const removeStorage = (k) => {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + dtime);
}

const clearStorage = () => {
  wx.clearStorageSync();
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  setStorage: setStorage,
  getStorage: getStorage,
  removeStorage: removeStorage,
  clearStorage: clearStorage
}
