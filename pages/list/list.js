// pages/list/list.js
const app = getApp();
const fetch = require('../../utils/fetch.js');
const douban = require('../../utils/douban.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    listTitle: "",
    movieType: null,
    dataUrl: 'https://bks.licbks.com/v2/movie/',
    list: [],
    page: 1,

    inputValue: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();

    setTimeout(() => {
      // 隐藏导航条加载动画
      wx.hideNavigationBarLoading();
    }, 1000);

    let type = options.type;
    let listTitle = options.title;

    this.setData({
      listTitle,
      movieType: type
    });
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: listTitle
    });



    // 数据加载
    this.loadData(type, this.data.page);



  },

  // 获取数据
  getMovieListData(url, settedKey, categoryTitle) {
    return fetch(url, settedKey)


  },

  loadData: function(type, page) {
    douban.find(type, page)
      .then(res => {
        if (res.code) {
          this.setData({
            flag: true
          })
        } else if (res.subjects.length > 0) {
          // 判断是否为北美票房是的话将数据进行处理
          if (type === 'us_box') {
            let newArr = [];
            res.subjects.forEach(item => {
              newArr.push(item.subject);
            });
            this.setData({
              list: this.data.list.concat(newArr),
              page: this.data.page + 1,
              flag: false
            });
          } else {
            this.setData({
              list: this.data.list.concat(res.subjects),
              page: this.data.page + 1,
              flag: false
            });
          }         

        } else {
          wx.stopPullDownRefresh();
          wx.showToast({
            title: '已经全部加载',
            duration: 2000
          })
        }
        // 隐藏导航条加载动画
        wx.hideNavigationBarLoading();
      });

  },

  /**
   * 跳转到详情页面
   */
  onMovieTap(event) {
    let movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + movieId
    })
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

    // 在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    this.setData({
      page: this.data.page + 1
    });

    this.loadData(this.data.movieType, this.data.page);

  },

  // 调用自定义组件的函数
  onPageScroll: function (e) {
    this.setData({
      inputValue: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});