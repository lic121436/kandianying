/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
module.exports = function (url, type, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}${type}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}