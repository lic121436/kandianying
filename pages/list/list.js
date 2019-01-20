// pages/list/list.js
const app = getApp();
import {
  FindModel
} from "../../models/find.js";
const findModel = new FindModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    listTitle: "",
    movieType: null,

    inputValue: false,
    dataArray: [],
    loading: false,
    total: null,
    noneResult: false,
    hasMore: true,
    limit: 20,

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

    this.getMovesList(type);
  },

  getMovesList(type) {
    // 数据加载
    findModel.find(type)
      .then(res => {
        // console.log(res);
        if (type == "us_box" || type == "weekly") {
          this._setMore(this.setNewArray(res.subjects));
          this._setTotal(this.setNewArray(res.subjects).length);
        } else if (type == "new_movies") {
          this._setMore(res.subjects);
          this._setTotal(res.subjects.length);
        } else {
          this._setMore(res.subjects);
          this._setTotal(res.total);
        }
      });
  },

  _setMore(dataArray) {
    let tempArray = this.data.dataArray.concat(dataArray);
    this.setData({
      dataArray: tempArray
    });
  },

  // _setMoreData(dataArray) {
  //   const tempArray = this.data.dataArray.concat(dataArray);
  //   if (tempArray.length) {
  //     this.setData({
  //       dataArray: tempArray
  //     });
  //   } else {
  //     this.setData({
  //       noneResult: true
  //     });
  //   }
  // },
  // _getCurrentStart() {
  //   return Math.floor(this.data.dataArray.length / this.data.limit) + 1;
  // },

  // _hasMoreData(dataArray) {
  //   let flag = dataArray != "" && dataArray.length < this.data.limit ? false : true;
  //   this.setData({
  //     hasMore: flag
  //   });
  // },

  _hasMore() {
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

  _setTotal(total) {
    this.data.total = total;
    if (total == 0) {
      this.setData({
        noneResult: true
      });
    }
  },

  _setCurrentStart() {
    return this.data.dataArray.length;
  },

  _isLocked() {
    return this.data.loading ? true : false;
  },

  _locked() {
    this.setData({
      loading: true
    });
  },

  _unLocked() {
    this.setData({
      loading: false
    });
  },

  _initialize() {
    this.setData({
      dataArray: [],
      loading: false,
      noneResult: false,
      hasMore: true
    });
    this.data.total = null;
  },

  // 获取数据
  getMovieListData(url, settedKey, categoryTitle) {
    return fetch(url, settedKey)
  },

  loadData: function(type, start) {
    // console.log(type);
    if (this._isLocked()) {
      return;
    }

    if (this._hasMore()) {
      this._locked();
      findModel.find(type, start)
        .then(res => {
          this._setMore(res.subjects);
          this._setTotal(res.total);
          this._unLocked();
        }, () => {
          this._unLocked();
        });
    }


  },

  /**
   * 北美票房筛选
   */
  setNewArray(oldArray) {
    let newArray = oldArray.map(res => res.subject);
    return newArray;
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

    this.loadData(this.data.movieType, this._setCurrentStart());

  },

  // 调用自定义组件的函数
  onPageScroll: function(e) {
    this.setData({
      inputValue: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  onPageScroll: function(e) { // 获取滚动条当前位置
    // console.log(e);
    let scrollTop = e.scrollTop;
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        if (scrollTop > res.windowHeight - 160) {
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
  }
});