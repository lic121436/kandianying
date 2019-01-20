// pages/layer/layer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layerObj: [false, false, false, false],

    isHidden: true,
    titleMsg: " ",
    inputHidden: false,
    cancleBtn: false,
    inputPlaceHolder: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 弹窗1
  layerOpen1(e) {
    const index = e.currentTarget.dataset.index;
    this.layerOpen(index);
  },
  layerClose1(e) {
    const index = e.currentTarget.dataset.index;
    this.layerClose(index);
  },

  // 弹窗2
  layerOpen2(e) {
    const index = e.currentTarget.dataset.index;
    this.layerOpen(index);
  },
  layerClose2(e) {
    const index = e.currentTarget.dataset.index;
    this.layerClose(index);
  },

  // 弹窗3
  layerOpen3(e) {
    const index = e.currentTarget.dataset.index;
    this.layerOpen(index);
  },
  layerClose3(e) {
    const index = e.currentTarget.dataset.index;
    this.layerClose(index);
  },

  // 弹窗4
  layerOpen4(e) {
    const index = e.currentTarget.dataset.index;
    this.layerOpen(index);
  },
  layerClose4(e) {
    const index = e.currentTarget.dataset.index;
    this.layerClose(index);
  },

  



  /**
   * 打开弹窗
   */
  layerOpen(index) {
    this.setData({
      [`layerObj[${index}]`]: true
    });
  },
  /**
   * 关闭弹窗
   */
  layerClose(index) {
    this.setData({
      [`layerObj[${index}]`]: false
    })
  },

  // 调用自定义组件的函数
  onMyEvent: function(e) {
    console.log("e.detail :", e.detail)

    this.setData({
      isHidden: true,
      // inputHidden: false
    })

  },

  showCompomentDialog: function() {
    var that = this;
    that.setData({
      isHidden: false,
      titleMsg: "这样真的好吗",
      // inputPlaceHolder: "请输入想要发送的内容",
      inputHidden: true,
      // cancleBtn: true,
    })
  }


})