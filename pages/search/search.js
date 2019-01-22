// pages/search/search.js
import { SearchModel } from "../../models/search.js";
const searchModel = new SearchModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [],  // 搜索到内容
    total: null,
    noneResult: false, // 是否搜索到内容
    loading: false,
    hasMore: true,

    inputFlag: false, // 判断input里是否有内容
    searchText: "", // 搜索文本
    recentSearchLiist: [], // 最近搜索列表
    searchFlag: false, // 是否点击搜索

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
   * 长按删除
   */
  delHistory(e){
    const searchText = e.currentTarget.dataset.search;
    const searchArr = wx.getStorageSync("recentSearchLiist");
    const index = searchArr.indexOf(searchText);
    wx.showModal({
      title: '搜索记录删除提示',
      content: '您确定要删除该搜索记录',
      success: res => {
        if(res.confirm){
          searchArr.splice(index, 1);
          wx.setStorageSync("recentSearchLiist", searchArr);
          this.setData({
            recentSearchLiist: searchArr
          });
          this._showToast("success", "删除成功!");
        }
        if(res.cancel){
          this._showToast("none", "取消删除!");
        }
      }
    });

  },

  /**
   *  showToast提示
   */
  _showToast(iconType, title){
    wx.showToast({
      title: title,
      icon: iconType
    });
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
    this.initialize();

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

    // 搜索电影
    this.searchMovie(searchValue);
  },

  /**
   * 搜索电影
   */
  searchMovie(searchValue) {
    let td = this.data;
    searchModel.search(searchValue)
    .then(res => {
      // console.log(res);
      this.setData({
        searchFlag: true
      });
      this.setMoreData(res.subjects);
      this.setTotal(res.total);
    });
    // 搜索豆瓣电影
    // douban.find('search')
    //   .then(res => {
    //     this.setMoreData(res.books);
    //     this.setTotal(res.total);
    //   })
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

  setMoreData(dataArray) {
    const tempArray = this.data.dataArray.concat(dataArray);
    this.setData({
      dataArray: tempArray
    });
  },

  getCurrentStart() {
    return this.data.dataArray.length;
  },

  setTotal(total) {
    this.data.total = total;
    if (total == 0) {
      this.setData({
        noneResult: true
      });
    }
  },

  hasMore() {
    if (this.data.dataArray.length >= this.data.total) {
      this.setData({
        hasMore: false
      });
      return false;
    } else {
      this.setData({
        hasMore: true
      });
      return true;
    }
  },

  initialize() {
    this.setData({
      dataArray: [],
      noneResult: false,
      loading: false
    });
    this.data.total = null;
  },

  isLocked() {
    return this.data.loading ? true : false;
  },

  locked() {
    this.setData({
      loading: true
    });
  },

  unLocked() {
    this.setData({
      loading: false
    });
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

    const td = this.data;
    if (!td.searchText) {
      return;
    }
    if (this.isLocked()) {
      return;
    }

    if (this.hasMore()) {
      this.locked();
      searchModel.search(td.searchText, this.getCurrentStart())
        .then(res => {
          this.setMoreData(res.subjects);
          this.unLocked();
        }, () => {
          this.unLocked();
        });
    }

  },

/**
 * 获取滚动高度
 */
  onPageScroll(e) {
    const scrollTop = e.scrollTop;
    const flag = scrollTop > 320 ? true : false;
      this.setData({
        goTopFlag: flag
      });
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})