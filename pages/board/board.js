// pages/board/board.js
import {
  FindModel
} from "../../models/find.js";
const findModel = new FindModel();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    boardlist: [{
        type: 'in_theaters',
        title: "正在上映的电影-北京",
      },
      {
        type: 'coming_soon',
        title: "即将上映的电影",
      },
      {
        type: 'top250',
        title: "TOP250",
      },
      {
        type: 'us_box',
        title: "北美票房榜",
      },
      {
        type: 'weekly',
        title: "口碑榜",
      },
      {
        type: 'new_movies',
        title: "新片榜",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findImgUrls();
  },

  /**
   * 点击幻灯片
   */
  onClickBannerImg(e){
    let movieId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/movie-detail/movie-detail?id=${movieId}`
    })
  },

  // 获取展示图片
  findImgUrls() {
    const bdBannerImgs = util.getStorage("bdBannerImgs");
    if (bdBannerImgs) {
      this.setData({
        imgUrls: bdBannerImgs
      });
    } else {
    findModel.find('in_theaters', 1, 3)
      .then(res => {
        let list = res.subjects;
        let imgUrls = [];
        // list.forEach((item, index) => {
        //   if (index < 3) {
        //     imgUrls.push(item.images.large);
        //   }
        // });
        this.setData({
          imgUrls: list
        })
        util.setStorage("bdBannerImgs", list, 60 * 60);
      })
    }
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