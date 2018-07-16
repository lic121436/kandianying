import utils from "../../../utils/util.js"

class Movie {
  // 构造函数传参
  constructor(url) {
    this.url = url; // this代表Movie的实例
  }

  // 定义层级变量函数 接收一个回调cb
  getMovieData(cb) {
    this.cb = cb
    utils.http(this.url, this.processDoubanData.bind(this));   // .bind(this) 绑定this
  }

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
      movieImg: data.images ? data.images.large : "",       // 电影海报（数据不为空最大的海报，否则为空）
      country: data.countries[0],                           // 国家
      title: data.title,
      originalTitle: data.original_title,                   // 别名
      wishCount: data.wish_count,                           // 多少人想看
      commentCount: data.comments_count,                    // 多少人评论
      year: data.year,                                      // 年份
      generes: data.genres.join("、"),                      // 剧情类型
      stars: utils.convertToStarsArray(data.rating.stars),  // 评星
      score: data.rating.average,                           // 评分
      director: director,                                   // 导演
      casts: utils.convertToCastString(data.casts),         // 演员信息
      castsInfo: utils.convertToCastInfos(data.casts),       // 影人
      summary: data.summary                                 // 摘要总结
    }
    this.cb(movie);                                         // 将数据返回出去
  }

}

export {Movie}