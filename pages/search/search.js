// pages/search/search.js
const douban = require("../../utils/douban.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputFlag: false, // 判断input里是否有内容
    searchText: "", // 搜索文本
    recentSearchLiist: [], // 最近搜索列表
    searchFlag: false, // 是否点击搜索
    noSearchFalse: false, // 是否搜索到内容
    list: [], // 搜索到内容
    page: 1,
    count: 20,
    goTopFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取本地存储(同步)
    // this.setData({
    //   recentSearchLiist: wx.getStorageSync('recentSearchLiist')
    // });
    // 获取本地存储(异步)
    wx.getStorage({
      key: 'recentSearchLiist',
      success: (res) => {
        this.setData({
          recentSearchLiist: res.data
        });
      }
    })
  },

  /**
   * 搜索框触发
   */
  searchInputFocus(e) {
    let len = e.detail.cursor;
    switch (true) {
      case len > 6:
        this.showPop();
        break;
      case len <= 0:
        this.setData({
          inputFlag: false,
          searchText: ""
        });
        break;
      default:
        this.setData({
          inputFlag: true,
          searchText: e.detail.value
        });
    }
  },

  /**
   * 弹出窗口
   */
  showPop() {
    wx.showModal({
      title: '温馨提示',
      content: '搜索内容不要超过6个字',
      success: function(res) {
        if (res.confirm) {
          return false;
        } else if (res.cancel) {
          return false;
        }
      }
    });

    this.setData({
      inputFlag: false
    });

    return false;
  },


  /**
   * 清除搜索框内容
   */
  clearInput() {
    this.setData({
      inputFlag: false,
      searchText: "",
      searchFlag: false      
    })
  },

  formSubmit(e) {

    //  搜索前清空列表
    this.setData({
      list: [],
      page: 1
    })

    let td = this.data;
    let searchValue = e.detail.value.search;

    // 当有搜索内容时将搜索内容写入最近搜索中
    if (searchValue !== "") {
      let arr = td.recentSearchLiist.concat(searchValue);
      // 判断数组数量大于10个删除第1个数值
      if (arr.length > 10) {
        arr.shift();
      }

      this.setData({
        searchText: searchValue,
        recentSearchLiist: this.removeArraySomeConent(arr)
      })

      // 设置本地存储(同步)
      // wx.setStorageSync('recentSearchLiist', td.recentSearchLiist);
      // 设置本地存储(异步)
      wx.setStorage({
        key: "recentSearchLiist",
        data: td.recentSearchLiist
      });

      // 隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      // 搜索电影
      this.searchMovie(searchValue);
    }
  },

  /**
   * 清除最近搜索
   */
  clearHistory() {
    let self = this;
    // 删除本地存储（同步）
    // wx.removeStorageSync('recentSearchLiist')
    // 删除本地存储（异步）
    wx.showModal({
      title: '温馨提示',
      content: '是否清除最近搜索',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'recentSearchLiist',
            success: function(res) {
              self.setData({
                recentSearchLiist: null
              })
              wx.showToast({
                title: '最近搜索清除成功',
                icon: 'success',
              })
            }
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '放弃清除',
            icon: 'none',
          })
        }
      }
    });



  },

  /**
   * 点击最近搜索进行搜索
   */
  tapHistorySearch(e) {
    let searchValue = e.target.dataset.search;
    this.setData({
      inputFlag: true,
      searchText: searchValue
    });
    // 隐藏导航条加载动画
    wx.hideNavigationBarLoading();
    // 搜索电影
    this.searchMovie(searchValue);
  },

  /**
   * 搜索电影
   */
  searchMovie(searchValue) {
    let td = this.data;
    // 搜索豆瓣电影
    douban.find('search', td.page, td.count, searchValue)
      .then(res => {
        if (res.code || res.subjects.length === 0) {
          this.setData({
            searchFlag: false,
            noSearchFalse: true
          })
        } else if (res.subjects.length > 0) {
          this.setData({
            list: td.list.concat(res.subjects),
            page: td.page + 1,
            searchFlag: true,
            noSearchFalse: false
          });
        }
        // 隐藏导航条加载动画
        wx.hideNavigationBarLoading();
      })
  },


  /**
   * 删除数组中相同的内容
   */
  removeArraySomeConent(arr) {
    let newArr = [];
    arr.forEach((item) => {
      if (newArr.indexOf(item) === -1) {
        newArr.push(item);
      }
    });
    return newArr;
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
    // 搜索电影
    this.searchMovie(this.data.searchText);
  },

  onPageScroll: function(e) { // 获取滚动条当前位置

    let scrollTop = e.scrollTop;
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        if (scrollTop > res.windowWidth) {
          that.setData({
            goTopFlag: true
          });
        } else {
          that.setData({
            goTopFlag: false
          });
        }
      }
    });
  },


  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})