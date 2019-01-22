// pages/movie-detail/movie-detail.js
const douban = require("../../utils/douban.js");
// 引入class类
import {
  Movie
} from 'class/Movie.js';
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let movieId = options.id;

    let url = getApp().globalData.doubanBase + "/v2/movie/subject/" + movieId;

    var movie = new Movie(url);
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })

      // 动态设置当前页面的标题
      wx.setNavigationBarTitle({
        title: movie.title
      });
    });


  },



  // 数据处理
  processDoubanData(data) {
    if (!data) {
      return;
    }

    // 导演
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    // 如果从豆瓣取过来的第0个元素不为空我们就取第0号下面的avatars.large(最大图片)
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    // 设置数据绑定变量
    var movie = {
      movieImg: data.images ? data.images.large : "", // 电影海报（数据不为空最大的海报，否则为空）
      country: data.countries[0], // 国家
      title: data.title,
      originalTitle: data.original_title, // 别名
      wishCount: data.wish_count, // 多少人想看
      commentCount: data.comments_count, // 多少人评论
      year: data.year, // 年份
      generes: data.genres.join("、"), // 剧情类型
      stars: utils.convertToStarsArray(data.rating.stars), // 评星
      score: data.rating.average, // 评分
      director: director, // 导演
      casts: utils.convertToCastString(data.casts), // 演员信息
      castsInfo: utils.convertToCastInfos(data.casts), // 影人
      summary: data.summary // 摘要总结
    }

    this.setData({
      movie: movie
    })

  },

  // 查看图片
  viewMoviePostImg(e) {
    let src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片htt链接列表
    })
  }

})