// pages/accredit/accredit.js
var loginStatus = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: "/images/ewm.jpg",
    userName: "电影查看",
    loginFlag: false,
    buttonText: "确定授权"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })

    this.isLogin();
  },

  /**
   * 进入页面时判断是否已经登录
   */
  isLogin() {
    const td = this.data;
    const userInfo = wx.getStorageSync("userInfo");
    const userImg = userInfo ? userInfo.avatarUrl : td.userImg;
    const userName = userInfo ? userInfo.nickName : td.userName;
    const loginFlag = userInfo ? true : false;
    const buttonText = userInfo ? "已模拟登陆" : td.buttonText;


    this.setData({
      userImg,
      userName,
      loginFlag,
      buttonText
    });
  },


  onGotUserInfo(e) {
    // console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.login({
        success: res => {
          this.setData({
            userImg: e.detail.userInfo.avatarUrl,
            userName: e.detail.userInfo.nickName,
            loginFlag: true,
            buttonText: "已模拟登陆"
          });
          wx.setStorageSync("userInfo", e.detail.userInfo);
          console.log(res);
        }
      })
    }
  },




  // 跳转设置页面授权
  openSetting: function() {

    if (wx.openSetting) {
      wx.openSetting({
        success: (res) => {
          //尝试再次登录

        }
      })
    } else {
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
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