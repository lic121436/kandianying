// pages/layer/layer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layerFalg1: false,
    maskFlag1: false,

    layerFalg2: false,
    maskFlag2: false,

    layerFalg3: false,
    maskFlag3: false,

    layerFalg4: false,
    maskFlag4: false,

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
  layerOpen1(){
    this.layerOpen('layerFalg1', 'maskFlag1');
  },
  layerClose1(){
    this.layerClose('layerFalg1', 'maskFlag1')
  },

  // 弹窗2
  layerOpen2(){
    this.layerOpen('layerFalg2', 'maskFlag2');
  },
  layerClose2(){
    this.layerClose('layerFalg2', 'maskFlag2')
  },

  // 弹窗3
  layerOpen3(){
    this.layerOpen('layerFalg3', 'maskFlag3');
  },
  layerClose3(){
    this.layerClose('layerFalg3', 'maskFlag3')
  },

  // 弹窗4
  layerOpen4(){
    this.layerOpen('layerFalg4', 'maskFlag4');
  },
  layerClose4(){
    this.layerClose('layerFalg4', 'maskFlag4')
  },


  /**
   * 打开弹窗
   */
  layerOpen(layerFalg, maskFlag) {
    this.setData({
      [layerFalg]: true,
      [maskFlag]: true,
    });
  },
  /**
   * 关闭弹窗
   */
  layerClose(layerFalg, maskFlag) {
    this.setData({
      [layerFalg]: false,
      [maskFlag]: false,
    })
  },

  // 调用自定义组件的函数
  onMyEvent: function (e) {
    var that = this;
    console.log("e.detail :", e.detail)

    that.setData({
      isHidden: true,
      // inputHidden: false
    })

  },

  showCompomentDialog: function () {
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