// pages/splash/splash.js
const doubanRequset = require('../../utils/douban');
const app = getApp();
let timer = null;
let changeNum = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    count: 9
  },

  getCache() {
    return new Promise(resolve => {
      app.wechat.getStorage('last_splash_data')
        .then(res => {
          const {
            movies,
            expires
          } = res.data
          // 有缓存，判断是否过期
          if (movies && expires > Date.now()) {
            return resolve(res.data)
          }
          // 已经过期
          console.log('uncached')
          return resolve(null)
        })
        .catch(e => resolve(null))
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getImage();
    this.findImgUrls();

    this.countDown(9);

    // setTimeout(() => {
    //   this.jumpIndex();
    // }, 9000);

    // this.getCache()
    //   .then(cache => {
    //     if (cache) {
    //       return this.setData({ movies: cache.movies, loading: false })
    //     }

    //     app.douban.find('coming_soon', 1, 3)
    //       .then(d => {
    //         this.setData({ movies: d.subjects, loading: false })
    //         return app.wechat.setStorage('last_splash_data', {
    //           movies: d.subjects,
    //           expires: Date.now() + 1 * 24 * 60 * 60 * 1000
    //         })
    //       })
    //       .then(() => console.log('storage last splash data'))
    //   })

  },



  // 获取即将上映展示图片
  findImgUrls() {

    doubanRequset.find('coming_soon', 1, 3)
      .then(res => {
        let list = res.subjects;
        let imgUrls = [];
        list.forEach((item, index) => {
          if (index < 3) {
            imgUrls.push(item.images.large);
          }
        });
        this.setData({
          imgUrls
        })
      })
  },


  getImage() {
    let type = '/v2/movie/coming_soon';
    let url = `${app.globalData.doubanBase}${type}`;
    let params = {
      "start": 0,
      "count": 3
    }
    const that = this;
    wx.request({
      url: url,
      data: Object.assign({}, params),
      header: {
        'Content-Type': 'json'
      },
      success: function(res) {

        let list = res.data.subjects;
        let imgUrls = [];
        list.forEach((item) => {
          imgUrls.push(item.images.large);
        });
        that.setData({
          imgUrls
        })
      },
      fail: function() {}
    })
  },

  // 跳转到首页
  jumpIndex() {
    this.setData({
      count: 0
    });

    wx.switchTab({
      url: '../board/board',
    });
    clearTimeout(timer);
  },


  // 倒计时
  countDown(time) {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      changeNum++;
      this.setData({
        count: this.data.count - 1
      });

      if (time <= changeNum) {
        clearTimeout(timer);
        this.jumpIndex();
      } else {
        this.countDown(time);
      }
    }, 1000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})