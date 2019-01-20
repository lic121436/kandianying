// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataItem: Object
  },


  /**
   * 组件的初始数据
   */
  data: {

  },

  attached() {
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 跳转到详情页面
     */
    onMovieTap(event) {
      let movieId = event.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '/pages/movie-detail/movie-detail?id=' + movieId
      })
    },
  }
})